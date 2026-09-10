# V8 TurboFan Constant Inlining 3-Way Matrix

This repository provides an automated test harness to analyze and verify how Google V8's **TurboFan** JIT compiler optimizes constants (such as 16-bit word mask `0xFFFF`, 8-bit `0xFF`, or 32-bit `0xDEADBEEF`) across a full 3-way crisscross matrix:
$$\textbf{Constants Module} \times \textbf{Function Definition and Export} \times \textbf{Consumer Execution (CJS vs ESM)}$$

---

## Background & Architecture

In high-performance numerical computing, cryptography, PRNG algorithms, and multi-precision arithmetic libraries (such as [`@stdlib`](https://github.com/stdlib-js/stdlib) for `[u]int64`), bitwise masking operations (e.g., `x & 0xFFFF`) run in tight inner loops millions of times per second.

### The 3-Way Separation

To thoroughly analyze optimization boundaries, this repository separates the pipeline into 3 distinct layers:

1. **Layer 1: Constants Definitions (`constants/`)**:
   - CommonJS default scalar (`default.cjs`) & named object (`named.cjs`).
   - ECMAScript Modules default scalar (`default.mjs`) & named binding (`named.mjs`).

2. **Layer 2: Function Definition & Export (`functions/`)**:
   - 50 permutations of how `mask(x)` is defined and references constants (local lexical scopes, internal CJS/ESM, cross CJS/ESM interop).
   - Functions are defined and exported without being executed or optimized in their defining files.

3. **Layer 3: Consumer Execution & Optimization (`consumers/`)**:
   - **50 CommonJS Consumers (`consumers/cjs/`)**: Require each function and trigger TurboFan optimization (`%PrepareFunctionForOptimization` / `%OptimizeFunctionOnNextCall`).
   - **50 ESM Consumers (`consumers/esm/`)**: Import each function and trigger TurboFan optimization.
   - **Total**: 100 concrete test runs per mask.

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

---

## Directory Structure

```text
constinlin/
├── constants/                             # Layer 1: Constant Source Definitions
│   ├── cjs/                               # default.cjs, named.cjs
│   └── esm/                               # default.mjs, named.mjs
├── functions/                             # Layer 2: 50 pure function definition & export modules
│   ├── cjs/                               # CJS Functions
│   │   ├── cjs/                           # CJS Function referencing CJS/Local constant
│   │   │   ├── local/                     # 7 local lexical scope cases
│   │   │   ├── default/                   # 3 default require cases
│   │   │   └── named/                     # 6 named require / destructuring cases
│   │   └── esm/                           # CJS Function requiring ESM constant
│   │       ├── default/                   # 3 default require cases
│   │       └── named/                     # 6 named require / destructuring cases
│   └── esm/                               # ESM Functions
│       ├── esm/                           # ESM Function referencing ESM/Local constant
│       │   ├── local/                     # 7 local lexical scope cases
│       │   ├── default/                   # 4 default import cases
│       │   └── named/                     # 5 named import cases
│       └── cjs/                           # ESM Function importing CJS constant
│           ├── default/                   # 4 default import cases
│           └── named/                     # 5 named import cases
├── consumers/                             # Layer 3: 100 consumer test entrypoints
│   ├── cjs/                               # 50 CJS consumers (require functions)
│   │   ├── cjs/                           # Consumes CJS functions
│   │   │   ├── cjs/ (local, default, named)
│   │   │   └── esm/ (default, named)
│   │   └── esm/                           # Consumes ESM functions
│   │       ├── esm/ (local, default, named)
│   │       └── cjs/ (default, named)
│   └── esm/                               # 50 ESM consumers (import functions)
│       ├── cjs/                           # Consumes CJS functions
│       │   ├── cjs/ (local, default, named)
│       │   └── esm/ (default, named)
│       └── esm/                           # Consumes ESM functions
│           ├── esm/ (local, default, named)
│           └── cjs/ (default, named)
├── results/                               # Generated Markdown matrices (0xFFFF.md, 0xFF.md, etc.)
├── scripts/
│   ├── runner.js                          # Automated 3-way analysis runner and disassembly parser
│   └── set-mask.js                        # Utility to update mask across all test cases
└── package.json
```

---

## Key Insights from 3-Way TurboFan Optimization

### 1. Consumer Independence
- **CJS Consumer vs ESM Consumer produces identical optimization for `mask`**:
  - Whether a consumer uses CommonJS `require()` or ESM `import` to consume `mask`, TurboFan generates **identical machine code** for the `mask` function (62% inlining across both consumer types).
  - TurboFan's constant inlining decisions are strictly governed by the lexical environment and module record where the function is **declared**, not by how the caller imports the function.

### 2. CommonJS Functions (`module.exports`)
- **Top-level Destructuring (`const { MASK } = require(...)`)**: TurboFan inlines `MASK` directly into native machine instructions (e.g. zero-extension `movzx` or immediate `andl` on x86_64).
- **Property Access (`mod.MASK`)**: Inlined to native instructions because V8's hidden class (`Map`) tracks scalar field constants when the exported module object does not mutate.

### 3. ECMAScript Module Functions (`export default function`)
- **Direct Import (`import { MASK } from './mask.mjs'`)**: Does **NOT** inline into native instructions. TurboFan emits a dynamic heap context lookup on every call (`movq rcx, [cell + 0x7]` followed by register `andl` on x86_64) because ESM exports are live bindings that can change at runtime.
- **Local Rebinding Workaround (`const MASK = _MASK`)**: Re-binding the imported value to a top-level `const` inside the function's module eliminates the runtime lookup and completely restores native inlining.

---

## Instruction Selection (x86_64 Reference)

> **Note**: The disassembly snippets and instructions shown below were measured on **x86_64** (`linux-x64`). While the inlining boundaries and optimization rates are identical across platforms, the exact CPU instructions emitted will differ depending on the target architecture (such as ARM64 / Apple Silicon).

| Mask Pattern | Example Mask | x86_64 Machine Code | Summary |
| :--- | :--- | :--- | :--- |
| **8-bit Byte Boundary** | `0xFF` | `movzxbl rdx, rdx` | Zero-extends lower 8 bits (clears upper 56 bits). |
| **16-bit Word Boundary** | `0xFFFF` | `movzxwl rdx, rdx` | Zero-extends lower 16 bits (clears upper 48 bits). |
| **Arbitrary Bitmask** | `0x1234` | `andl rdx, 0x1234` | Immediate constant embedded directly into instruction stream. |
| **32-bit Integer Mask** | `0xDEADBEEF` | `andl rdx, 0xdeadbeef` | 32-bit immediate operand bitwise AND. |
| **Dynamic Context Load** *(ESM Live Binding)* | *Any* | `movq rdi, [cell + 0x7]`<br>`andl rdx, rdi` | Extra heap context dereference required on every call due to live export semantics. |




