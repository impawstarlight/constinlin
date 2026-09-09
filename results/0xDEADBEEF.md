# TurboFan 3-Way Constant Inlining Matrix (MASK = 0xDEADBEEF)

Tested on Node.js `v24.19.0` (V8 `13.6.233.17-node.51`, Platform: `linux-x64`)

**Matrix Structure**: 50 Function Implementations $\times$ 2 Consumer Module Types (CommonJS `.cjs` vs ESM `.mjs`) = **100 Executed Test Cases**.

## 3-Way Comparison Matrix (CJS vs ESM Consumers)

| Suite / Function Case | Func Ext | CJS Consumer Inlined? | CJS Instruction (Size) | ESM Consumer Inlined? | ESM Instruction (Size) |
| :--- | :---: | :---: | :--- | :---: | :--- |
| `Local Lexical Scope` / `01-literal.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `02-func-const.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `03-func-var.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `04-func-let.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `05-top-const.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `06-top-var.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `07-top-let.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Default Scalar` / `01-const.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Default Scalar` / `02-var.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Default Scalar` / `03-let.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Named Object` / `01-destruct-const.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Named Object` / `02-destruct-var.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Named Object` / `03-destruct-let.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Named Object` / `04-prop-const.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Named Object` / `05-prop-var.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal CJS Constant -> Named Object` / `06-prop-let.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross ESM Constant (require ESM) -> Default Scalar` / `01-const.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross ESM Constant (require ESM) -> Default Scalar` / `02-var.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross ESM Constant (require ESM) -> Default Scalar` / `03-let.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross ESM Constant (require ESM) -> Named Object` / `01-destruct-const.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross ESM Constant (require ESM) -> Named Object` / `02-destruct-var.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross ESM Constant (require ESM) -> Named Object` / `03-destruct-let.cjs` | `CJS` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross ESM Constant (require ESM) -> Named Object` / `04-prop-const.cjs` | `CJS` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Cross ESM Constant (require ESM) -> Named Object` / `05-prop-var.cjs` | `CJS` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Cross ESM Constant (require ESM) -> Named Object` / `06-prop-let.cjs` | `CJS` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Local Lexical Scope` / `01-literal.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `02-func-const.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `03-func-var.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `04-func-let.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `05-top-const.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Local Lexical Scope` / `06-top-var.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Local Lexical Scope` / `07-top-let.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `Internal ESM Constant -> Default Scalar` / `01-import.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `Internal ESM Constant -> Default Scalar` / `02-rebind-const.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal ESM Constant -> Default Scalar` / `03-rebind-var.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Internal ESM Constant -> Default Scalar` / `04-rebind-let.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `Internal ESM Constant -> Named Binding` / `01-import.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `Internal ESM Constant -> Named Binding` / `02-namespace.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Internal ESM Constant -> Named Binding` / `03-rebind-const.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Internal ESM Constant -> Named Binding` / `04-rebind-var.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Internal ESM Constant -> Named Binding` / `05-rebind-let.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `Cross CJS Constant (import CJS) -> Default Scalar` / `01-import.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `Cross CJS Constant (import CJS) -> Default Scalar` / `02-rebind-const.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross CJS Constant (import CJS) -> Default Scalar` / `03-rebind-var.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Cross CJS Constant (import CJS) -> Default Scalar` / `04-rebind-let.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `Cross CJS Constant (import CJS) -> Named Binding` / `01-import.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `Cross CJS Constant (import CJS) -> Named Binding` / `02-namespace.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Cross CJS Constant (import CJS) -> Named Binding` / `03-rebind-const.mjs` | `ESM` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `Cross CJS Constant (import CJS) -> Named Binding` / `04-rebind-var.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `Cross CJS Constant (import CJS) -> Named Binding` / `05-rebind-let.mjs` | `ESM` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |

---

## Summary Statistics

- **Total Cases Tested**: 100 (50 Function Variants $\times$ 2 Consumers)
- **CJS Consumers Inlined**: 31 / 50 (62%)
- **ESM Consumers Inlined**: 31 / 50 (62%)

---

## Detailed Breakdown: CommonJS Consumers (`.cjs`)

### CJS Function: Local Lexical Scope

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-literal.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-func-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-func-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-func-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `05-top-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `06-top-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `07-top-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

### CJS Function: Internal CJS Constant -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

### CJS Function: Internal CJS Constant -> Named Object

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-destruct-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-destruct-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-destruct-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-prop-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `05-prop-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `06-prop-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

### CJS Function: Cross ESM Constant (require ESM) -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

### CJS Function: Cross ESM Constant (require ESM) -> Named Object

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-destruct-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-destruct-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-destruct-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-prop-const.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `05-prop-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `06-prop-let.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |

### ESM Function: Local Lexical Scope

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-literal.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-func-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-func-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-func-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `05-top-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `06-top-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `07-top-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

### ESM Function: Internal ESM Constant -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `02-rebind-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-rebind-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `04-rebind-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

### ESM Function: Internal ESM Constant -> Named Binding

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `02-namespace.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `03-rebind-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-rebind-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `05-rebind-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

### ESM Function: Cross CJS Constant (import CJS) -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `02-rebind-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-rebind-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `04-rebind-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

### ESM Function: Cross CJS Constant (import CJS) -> Named Binding

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `02-namespace.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `03-rebind-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-rebind-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `05-rebind-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

---

## Detailed Breakdown: ESM Consumers (`.mjs`)

### CJS Function: Local Lexical Scope

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-literal.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-func-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-func-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-func-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `05-top-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `06-top-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `07-top-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

### CJS Function: Internal CJS Constant -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

### CJS Function: Internal CJS Constant -> Named Object

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-destruct-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-destruct-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-destruct-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-prop-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `05-prop-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `06-prop-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

### CJS Function: Cross ESM Constant (require ESM) -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

### CJS Function: Cross ESM Constant (require ESM) -> Named Object

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-destruct-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-destruct-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-destruct-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-prop-const.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `05-prop-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `06-prop-let.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |

### ESM Function: Local Lexical Scope

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-literal.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `02-func-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-func-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-func-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `05-top-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `06-top-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `07-top-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

### ESM Function: Internal ESM Constant -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `02-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `04-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

### ESM Function: Internal ESM Constant -> Named Binding

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `02-namespace.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `03-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `05-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

### ESM Function: Cross CJS Constant (import CJS) -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `02-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `03-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `04-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

### ESM Function: Cross CJS Constant (import CJS) -> Named Binding

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `02-namespace.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `03-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `04-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `05-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
