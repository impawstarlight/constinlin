# V8 TurboFan Constant Inlining Matrix

This repository provides an automated test harness to analyze and verify how Google V8's **TurboFan** JIT compiler optimizes constants (such as 16-bit word mask `0xFFFF`, 8-bit `0xFF`, or 32-bit `0xDEADBEEF`) across CommonJS (`.cjs`), ECMAScript Modules (`.mjs`), local lexical scopes, and cross-boundary module interop.

---

## Background & Motivation

In high-performance numerical computing, cryptography, PRNG algorithms, and multi-precision arithmetic libraries (such as [`@stdlib`](https://github.com/stdlib-js/stdlib) for `[u]int64`), bitwise masking operations (e.g., `x & 0xFFFF`) run in tight inner loops millions of times per second.

### The CommonJS Baseline
Historically in Node.js / CommonJS, modularizing constants across files had **zero performance overhead**:
```javascript
// constants.cjs
exports.MASK = 0xFFFF;

// consumer.cjs
const { MASK } = require('./constants.cjs');
function mask(x) {
  return x & MASK; // -> Inlined directly into 3-byte CPU instruction (movzxwl rdx, rdx)
}
```
Because Node wraps `.cjs` files in a wrapper function `(function(exports, require, module, ...))`, `const { MASK }` is treated as a function-local lexical constant. TurboFan evaluates its immutable initialization value and inlines it directly into native machine code.

### The ESM "Live Binding" Performance Gotcha
When migrating codebases to native ECMAScript Modules (`.mjs`), developers naturally expect `export const MASK = 0xFFFF;` to inline identically. **It does not.**

Under the ECMAScript specification (ECMA-262), all ESM imports are **live bindings** to a `Module Environment Record`. Because an exporting module could theoretically mutate bindings (`export let`), V8 cannot assume an imported identifier is an immutable primitive at compile time.

Instead of generating a hardware zero-extension instruction, TurboFan emits a **heap memory lookup** to fetch the value from a `Cell` slot on every execution:
```javascript
// constants.mjs
export const MASK = 0xFFFF;

// consumer.mjs
import { MASK } from './constants.mjs';
function mask(x) {
  return x & MASK; // -> Forces heap Cell dereference: movq rcx, [cell + 0x7] + andl rdx, rdi
}
```

### The 1-Line Solution: Lexical Re-binding
Re-binding the imported identifier to a top-level module `const` provides TurboFan with the static immutability guarantee it needs, immediately restoring 100% hardware inlining:
```javascript
import { MASK as _MASK } from './constants.mjs';
const MASK = _MASK; // Re-bind to lexical const

function mask(x) {
  return x & MASK; // -> 100% Inlined! (movzxwl rdx, rdx / 136 bytes)
}
```

This repository was created to systematically benchmark, test, and document all 52 permutations of constant usage across CommonJS, ESM, and cross-boundary interop with concrete V8 disassembly verification.

---

## Quick Start

### 1. Run Analysis for Current Active Mask
```bash
npm run matrix
```

### 2. Run Analysis with Any Mask (Auto-Sets Mask & Saves Results)
```bash
npm run matrix 0xFFFF       # 16-bit word mask (generates results/0xFFFF.md)
npm run matrix 0xFF         # 8-bit byte mask (generates results/0xFF.md)
npm run matrix 0xDEADBEEF   # 32-bit test mask (generates results/0xDEADBEEF.md)
npm run matrix 0x1234       # Arbitrary test mask (generates results/0x1234.md)
```

### 3. Update Mask Across Files Without Running Analysis
```bash
npm run set-mask 0xFFFF
```

---

## Directory Structure

```text
constinlin/
├── cjs/
│   ├── constants/       # default.cjs, named.cjs
│   ├── local/           # 7 local lexical scope cases
│   ├── internal/        # default (3 cases), named (6 cases)
│   └── cross/           # require(esm) default (3 cases), named (6 cases)
├── esm/
│   ├── constants/       # default.mjs, named.mjs
│   ├── local/           # 7 local lexical scope cases
│   ├── internal/        # default (4 cases), named (5 cases with rebind)
│   └── cross/           # import cjs default (4 cases), named (5 cases with rebind)
├── results/             # Generated Markdown matrices (0xFFFF.md, 0xFF.md, etc.)
├── scripts/
│   ├── runner.js        # Automated analysis runner and disassembly parser
│   └── set-mask.js      # Utility to update mask across all test cases
└── package.json
```

---

## Key Insights from TurboFan Optimization

### 1. CommonJS (`require` / `module.exports`)
- **Top-level Destructuring (`const { MASK } = require(...)`)**: TurboFan inlines `MASK` into a direct immediate operand (or `movzxwl` for 16-bit masks). This happens because Node wraps CJS files in a function closure `(function(exports, require, module, ...))`, making `const MASK` a local lexical variable whose immutable initialization value is inlined.
- **Property Access (`mod.MASK`)**: Inlined to immediate because V8's hidden class (`Map`) tracks field constants when the exported object shape does not mutate.

### 2. ECMAScript Modules (`import` / `export`)
- **Direct Import (`import { MASK } from './mask.mjs'`)**: Does **NOT** inline into an immediate operand. TurboFan emits a dynamic module context slot load (`movq rcx, [cell + 0x7]`) followed by register bitwise AND (`andl rdx, rdi`). This is because ESM imported bindings are live context bindings that V8 treats as dynamically bound to the module record context.
- **Local Rebinding Workaround (`const MASK = _MASK`)**: Re-binding the imported identifier to a top-level lexical `const` eliminates runtime context lookups and completely restores inlining (`movzxwl rdx, rdx`).

### 3. Cross-Boundary Interop
- **ESM importing CJS (`import { MASK } from './mask.cjs'`)**: Node synthesizes an ESM module record via `cjs-module-lexer`, resulting in ESM live binding semantics (not inlined to immediate unless rebound).
- **CJS requiring ESM (`const { MASK } = require('./mask.mjs')`)**: Destructuring into a CJS top-level `const` allows TurboFan to inline the value into an immediate operand.
