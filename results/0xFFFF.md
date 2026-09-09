# TurboFan 3-Way Constant Inlining Matrix (MASK = 0xFFFF)

Tested on Node.js `v24.19.0` (V8 `13.6.233.17-node.51`, Platform: `linux-x64`)

**Matrix Dimensions**: $2 \text{ Consumers (CJS/ESM)} \times 2 \text{ Functions (CJS/ESM)} \times 2 \text{ Constant Sources (CJS/ESM)} = 100 \text{ Executed Test Cases}$.

## View 1: Consumer Layer Sensitivity (Varying Consumer: CJS vs ESM)

> **Key Takeaway**: The consumer layer has **0% impact** on TurboFan's inlining decision. In 100% of cases, changing only the consumer between `require()` and `import` produces identical assembly instructions and byte sizes for `mask`.

| Function Type | Constant Source | Usage Type | Test File | CJS Consumer Inlined? | CJS Instruction (Size) | ESM Consumer Inlined? | ESM Instruction (Size) | Consumer Delta |
| :---: | :---: | :---: | :--- | :---: | :--- | :---: | :--- | :---: |
| `CJS` | `CJS` | `local` | `01-literal.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `local` | `02-func-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `local` | `03-func-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `local` | `04-func-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `local` | `05-top-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `local` | `06-top-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `local` | `07-top-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `default` | `01-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `default` | `02-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `default` | `03-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `named` | `01-destruct-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `named` | `02-destruct-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `named` | `03-destruct-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `named` | `04-prop-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `named` | `05-prop-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `CJS` | `named` | `06-prop-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `ESM` | `default` | `01-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `ESM` | `default` | `02-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `ESM` | `default` | `03-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `ESM` | `named` | `01-destruct-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `ESM` | `named` | `02-destruct-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `ESM` | `named` | `03-destruct-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `CJS` | `ESM` | `named` | `04-prop-const.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `CJS` | `ESM` | `named` | `05-prop-var.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `CJS` | `ESM` | `named` | `06-prop-let.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `ESM` | `ESM` | `local` | `01-literal.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `ESM` | `local` | `02-func-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `ESM` | `local` | `03-func-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `ESM` | `local` | `04-func-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `ESM` | `local` | `05-top-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `ESM` | `local` | `06-top-var.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `ESM` | `ESM` | `local` | `07-top-let.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |
| `ESM` | `ESM` | `default` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |
| `ESM` | `ESM` | `default` | `02-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `ESM` | `default` | `03-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `ESM` | `ESM` | `default` | `04-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |
| `ESM` | `ESM` | `named` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |
| `ESM` | `ESM` | `named` | `02-namespace.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `ESM` | `ESM` | `named` | `03-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `ESM` | `named` | `04-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `ESM` | `ESM` | `named` | `05-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |
| `ESM` | `CJS` | `default` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |
| `ESM` | `CJS` | `default` | `02-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `CJS` | `default` | `03-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `ESM` | `CJS` | `default` | `04-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |
| `ESM` | `CJS` | `named` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |
| `ESM` | `CJS` | `named` | `02-namespace.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `ESM` | `CJS` | `named` | `03-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | `Identical` |
| `ESM` | `CJS` | `named` | `04-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | `Identical` |
| `ESM` | `CJS` | `named` | `05-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | `Identical` |

---

## View 2: Constant Layer Sensitivity (Varying Constant Source: CJS vs ESM)

> **Key Takeaway**: In 15 out of 18 comparable pairs (83%), the constant module format (CJS vs ESM) produces identical inlining results. The **sole divergence** occurs in **CJS Function Property Access** (`mod.MASK`): requiring a CJS constant object inlines via V8 Hidden Class tracking (136 B), whereas requiring an ESM namespace object drops into a dynamic runtime lookup (176 B).

| Function Type | Usage Type | Syntax Pattern | CJS Constant Inlined? | CJS Constant Instruction | ESM Constant Inlined? | ESM Constant Instruction | Constant Sensitivity Note |
| :---: | :---: | :--- | :---: | :--- | :---: | :--- | :--- |
| `CJS` | `default` | `01-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | No impact (both inline) |
| `CJS` | `default` | `02-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | No impact (both inline) |
| `CJS` | `default` | `03-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | No impact (both inline) |
| `CJS` | `named` | `01-destruct-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | No impact (destructuring inlines for both) |
| `CJS` | `named` | `02-destruct-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | No impact (destructuring inlines for both) |
| `CJS` | `named` | `03-destruct-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | No impact (destructuring inlines for both) |
| `CJS` | `named` | `04-prop-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | ⚠️ **ESM namespace object blocks property inlining** |
| `CJS` | `named` | `05-prop-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | ⚠️ **ESM namespace object blocks property inlining** |
| `CJS` | `named` | `06-prop-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | ⚠️ **ESM namespace object blocks property inlining** |
| `ESM` | `default` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | No impact (both fail without const rebind) |
| `ESM` | `default` | `02-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | No impact (both inline with rebind) |
| `ESM` | `default` | `03-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | No impact (both fail without const rebind) |
| `ESM` | `default` | `04-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | No impact (both fail without const rebind) |
| `ESM` | `named` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | No impact (both fail without const rebind) |
| `ESM` | `named` | `02-namespace.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | No impact (both fail without const rebind) |
| `ESM` | `named` | `03-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | ✅ **YES** | `movzxwl rdx,rdx` (136 B) | No impact (both inline with rebind) |
| `ESM` | `named` | `04-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` (176 B) | ❌ **NO** | `andl rdx,rdi` (176 B) | No impact (both fail without const rebind) |
| `ESM` | `named` | `05-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` (256 B) | ❌ **NO** | `andl rdx,rdi` (256 B) | No impact (both fail without const rebind) |

---

## View 3: Function Layer Sensitivity (Varying Function Module: CJS vs ESM)

> **Key Takeaway**: The function definition module format is the **primary driver** of optimization outcomes. CJS functions achieve **88% inlining** because Node's module wrapper treats top-level `const`/`var`/`let` and destructured imports as function-local lexical variables. Conversely, ESM functions achieve only **36% inlining** because top-level imports are live bindings to a mutable `Module Environment Record` that require explicit lexical re-binding (`const MASK = _MASK`).

| Constant Source | Syntax Pattern Category | CJS Function Syntax | CJS Function Inlined? | ESM Function Syntax | ESM Function Inlined? | Function Module Difference |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `Local` | Literal constant | `01-literal.cjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `01-literal.mjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Identical (literal inlines in both) |
| `Local` | Function-scoped const | `02-func-const.cjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `02-func-const.mjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Identical (function-scoped const inlines) |
| `Local` | Function-scoped var | `03-func-var.cjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `03-func-var.mjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Identical (function-scoped var inlines) |
| `Local` | Function-scoped let | `04-func-let.cjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `04-func-let.mjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Identical (function-scoped let inlines) |
| `Local` | Top-level const | `05-top-const.cjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `05-top-const.mjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Identical (top-level const inlines in both) |
| `Local` | Top-level var | `06-top-var.cjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `06-top-var.mjs` | ❌ **NO** (`andl rdx,rdi` (176 B)) | ⚠️ CJS inlines (wrapper closure); ESM fails (module context slot) |
| `Local` | Top-level let | `07-top-let.cjs` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `07-top-let.mjs` | ❌ **NO** (`andl rdx,rdi` (256 B)) | ⚠️ CJS inlines (wrapper closure); ESM fails (module context slot) |
| `CJS Constant` | Default direct assignment | `01-const.cjs (`const MASK = req(...)`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `01-import.mjs (`import MASK from ...`)` | ❌ **NO** (`andl rdx,rdi` (256 B)) | ⚠️ CJS inlines; ESM fails (ESM live binding) |
| `CJS Constant` | Default re-bound const | `01-const.cjs (`const MASK = req(...)`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `02-rebind-const.mjs (`const MASK = _M`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Both inline (re-binding restores ESM inlining) |
| `ESM Constant` | Default direct assignment | `01-const.cjs (`const MASK = req(...).default`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `01-import.mjs (`import MASK from ...`)` | ❌ **NO** (`andl rdx,rdi` (256 B)) | ⚠️ CJS inlines; ESM fails (ESM live binding) |
| `ESM Constant` | Default re-bound const | `01-const.cjs (`const MASK = req(...).default`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `02-rebind-const.mjs (`const MASK = _M`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Both inline (re-binding restores ESM inlining) |
| `CJS Constant` | Named direct / destructured | `01-destruct-const.cjs (`const { MASK }`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `01-import.mjs (`import { MASK }`)` | ❌ **NO** (`andl rdx,rdi` (256 B)) | ⚠️ CJS inlines; ESM fails (ESM live binding) |
| `CJS Constant` | Named property / namespace | `04-prop-const.cjs (`mod.MASK`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `02-namespace.mjs (`mod.MASK`)` | ❌ **NO** (`andl rdx,rdi` (176 B)) | ⚠️ CJS inlines (Hidden Class Map); ESM fails (namespace object) |
| `CJS Constant` | Named re-bound const | `01-destruct-const.cjs (`const { MASK }`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `03-rebind-const.mjs (`const MASK = _M`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Both inline (re-binding restores ESM inlining) |
| `ESM Constant` | Named direct / destructured | `01-destruct-const.cjs (`const { MASK }`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `01-import.mjs (`import { MASK }`)` | ❌ **NO** (`andl rdx,rdi` (256 B)) | ⚠️ CJS inlines; ESM fails (ESM live binding) |
| `ESM Constant` | Named property / namespace | `04-prop-const.cjs (`mod.MASK`)` | ❌ **NO** (`andl rdx,rdi` (176 B)) | `02-namespace.mjs (`mod.MASK`)` | ❌ **NO** (`andl rdx,rdi` (176 B)) | Both fail (dynamic property lookup on namespace object) |
| `ESM Constant` | Named re-bound const | `01-destruct-const.cjs (`const { MASK }`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | `03-rebind-const.mjs (`const MASK = _M`)` | ✅ **YES** (`movzxwl rdx,rdx` (136 B)) | Both inline (re-binding restores ESM inlining) |

---

## View 4: Results Grouped by 3-Way Combinations

### CJS Consumer -> CJS Function -> CJS Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `local` | `01-literal.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `02-func-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `03-func-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `04-func-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `05-top-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `06-top-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `07-top-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `01-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `02-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `03-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `01-destruct-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `02-destruct-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `03-destruct-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `04-prop-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `05-prop-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `06-prop-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |

**Subtotal**: 16 / 16 Inlined (100%)

### CJS Consumer -> CJS Function -> ESM Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `default` | `01-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `02-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `03-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `01-destruct-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `02-destruct-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `03-destruct-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `04-prop-const.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `05-prop-var.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `06-prop-let.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |

**Subtotal**: 6 / 9 Inlined (67%)

### CJS Consumer -> ESM Function -> ESM Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `local` | `01-literal.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `02-func-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `03-func-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `04-func-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `05-top-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `06-top-var.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `local` | `07-top-let.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `default` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `default` | `02-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `03-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `default` | `04-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `named` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `named` | `02-namespace.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `03-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `04-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `05-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

**Subtotal**: 7 / 16 Inlined (44%)

### CJS Consumer -> ESM Function -> CJS Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `default` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `default` | `02-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `03-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `default` | `04-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `named` | `01-import.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `named` | `02-namespace.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `03-rebind-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `04-rebind-var.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `05-rebind-let.cjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

**Subtotal**: 2 / 9 Inlined (22%)

### ESM Consumer -> CJS Function -> CJS Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `local` | `01-literal.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `02-func-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `03-func-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `04-func-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `05-top-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `06-top-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `07-top-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `01-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `02-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `03-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `01-destruct-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `02-destruct-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `03-destruct-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `04-prop-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `05-prop-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `06-prop-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |

**Subtotal**: 16 / 16 Inlined (100%)

### ESM Consumer -> CJS Function -> ESM Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `default` | `01-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `02-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `03-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `01-destruct-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `02-destruct-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `03-destruct-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `04-prop-const.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `05-prop-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `06-prop-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |

**Subtotal**: 6 / 9 Inlined (67%)

### ESM Consumer -> ESM Function -> ESM Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `local` | `01-literal.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `02-func-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `03-func-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `04-func-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `05-top-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `local` | `06-top-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `local` | `07-top-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `default` | `01-import.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `default` | `02-rebind-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `03-rebind-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `default` | `04-rebind-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `named` | `01-import.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `named` | `02-namespace.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `03-rebind-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `04-rebind-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `05-rebind-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

**Subtotal**: 7 / 16 Inlined (44%)

### ESM Consumer -> ESM Function -> CJS Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `default` | `01-import.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `default` | `02-rebind-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `default` | `03-rebind-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `default` | `04-rebind-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `named` | `01-import.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `named` | `02-namespace.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `03-rebind-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `named` | `04-rebind-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `named` | `05-rebind-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

**Subtotal**: 2 / 9 Inlined (22%)

---

## Summary Statistics Across Combinations

| Combination | Inlined / Total | Optimization Rate |
| :--- | :---: | :---: |
| `CJS Consumer -> CJS Function -> CJS Constant` | 16 / 16 | **100%** |
| `CJS Consumer -> CJS Function -> ESM Constant` | 6 / 9 | **67%** |
| `CJS Consumer -> ESM Function -> ESM Constant` | 7 / 16 | **44%** |
| `CJS Consumer -> ESM Function -> CJS Constant` | 2 / 9 | **22%** |
| `ESM Consumer -> CJS Function -> CJS Constant` | 16 / 16 | **100%** |
| `ESM Consumer -> CJS Function -> ESM Constant` | 6 / 9 | **67%** |
| `ESM Consumer -> ESM Function -> ESM Constant` | 7 / 16 | **44%** |
| `ESM Consumer -> ESM Function -> CJS Constant` | 2 / 9 | **22%** |
| **TOTAL OVERALL** | **62 / 100** | **62%** |
