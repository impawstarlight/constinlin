# TurboFan 3-Way Constant Inlining Matrix (MASK = 0xDEADBEEF)

Tested on Node.js `v24.19.0` (V8 `13.6.233.17-node.51`, Platform: `linux-x64`)

**Matrix Structure**: 8 Three-Way Combinations ($2 \text{ Consumers} \times 2 \text{ Functions} \times 2 \text{ Constant Sources}$) = **100 Executed Test Cases**.

## 3-Way Comparison Matrix (Side-by-Side: CJS vs ESM Consumers)

| Function Type | Constant Source | Usage Type | Pattern File | CJS Consumer Inlined? | CJS Instruction (Size) | ESM Consumer Inlined? | ESM Instruction (Size) |
| :---: | :---: | :---: | :--- | :---: | :--- | :---: | :--- |
| `CJS` | `CJS` | `local` | `01-literal.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `local` | `02-func-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `local` | `03-func-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `local` | `04-func-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `local` | `05-top-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `local` | `06-top-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `local` | `07-top-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `default` | `01-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `default` | `02-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `default` | `03-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `named` | `01-destruct-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `named` | `02-destruct-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `named` | `03-destruct-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `named` | `04-prop-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `named` | `05-prop-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `CJS` | `named` | `06-prop-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `ESM` | `default` | `01-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `ESM` | `default` | `02-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `ESM` | `default` | `03-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `ESM` | `named` | `01-destruct-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `ESM` | `named` | `02-destruct-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `ESM` | `named` | `03-destruct-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `CJS` | `ESM` | `named` | `04-prop-const.cjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `CJS` | `ESM` | `named` | `05-prop-var.cjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `CJS` | `ESM` | `named` | `06-prop-let.cjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `ESM` | `ESM` | `local` | `01-literal.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `ESM` | `local` | `02-func-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `ESM` | `local` | `03-func-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `ESM` | `local` | `04-func-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `ESM` | `local` | `05-top-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `ESM` | `local` | `06-top-var.mjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `ESM` | `ESM` | `local` | `07-top-let.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `ESM` | `ESM` | `default` | `01-import.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `ESM` | `ESM` | `default` | `02-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `ESM` | `default` | `03-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `ESM` | `ESM` | `default` | `04-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `ESM` | `ESM` | `named` | `01-import.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `ESM` | `ESM` | `named` | `02-namespace.mjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `ESM` | `ESM` | `named` | `03-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `ESM` | `named` | `04-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `ESM` | `ESM` | `named` | `05-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `ESM` | `CJS` | `default` | `01-import.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `ESM` | `CJS` | `default` | `02-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `CJS` | `default` | `03-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `ESM` | `CJS` | `default` | `04-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `ESM` | `CJS` | `named` | `01-import.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |
| `ESM` | `CJS` | `named` | `02-namespace.mjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `ESM` | `CJS` | `named` | `03-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) | ✅ **YES** | `andl rdx,0xdeadbeef` (232 B) |
| `ESM` | `CJS` | `named` | `04-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` (364 B) | ❌ **NO** | `andl r8,rcx` (364 B) |
| `ESM` | `CJS` | `named` | `05-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` (424 B) | ❌ **NO** | `andl r8,rcx` (424 B) |

---

## Results Grouped by 3-Way Combinations

### CJS Consumer -> CJS Function -> CJS Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `local` | `01-literal.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `02-func-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `03-func-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `04-func-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `05-top-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `06-top-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `07-top-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `01-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `02-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `03-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `01-destruct-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `02-destruct-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `03-destruct-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `04-prop-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `05-prop-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `06-prop-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

**Subtotal**: 16 / 16 Inlined (100%)

### CJS Consumer -> CJS Function -> ESM Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `default` | `01-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `02-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `03-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `01-destruct-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `02-destruct-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `03-destruct-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `04-prop-const.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `05-prop-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `06-prop-let.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |

**Subtotal**: 6 / 9 Inlined (67%)

### CJS Consumer -> ESM Function -> ESM Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `local` | `01-literal.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `02-func-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `03-func-var.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `04-func-let.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `05-top-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `06-top-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `local` | `07-top-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | `01-import.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | `02-rebind-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `03-rebind-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `default` | `04-rebind-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | `01-import.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | `02-namespace.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `03-rebind-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `04-rebind-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `05-rebind-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

**Subtotal**: 7 / 16 Inlined (44%)

### CJS Consumer -> ESM Function -> CJS Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `default` | `01-import.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | `02-rebind-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `03-rebind-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `default` | `04-rebind-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | `01-import.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | `02-namespace.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `03-rebind-const.cjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `04-rebind-var.cjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `05-rebind-let.cjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

**Subtotal**: 2 / 9 Inlined (22%)

### ESM Consumer -> CJS Function -> CJS Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `local` | `01-literal.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `02-func-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `03-func-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `04-func-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `05-top-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `06-top-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `07-top-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `01-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `02-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `03-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `01-destruct-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `02-destruct-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `03-destruct-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `04-prop-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `05-prop-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `06-prop-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

**Subtotal**: 16 / 16 Inlined (100%)

### ESM Consumer -> CJS Function -> ESM Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `default` | `01-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `02-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `03-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `01-destruct-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `02-destruct-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `03-destruct-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `04-prop-const.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `05-prop-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `06-prop-let.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |

**Subtotal**: 6 / 9 Inlined (67%)

### ESM Consumer -> ESM Function -> ESM Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `local` | `01-literal.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `02-func-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `03-func-var.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `04-func-let.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `05-top-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | `06-top-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `local` | `07-top-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | `01-import.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | `02-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `03-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `default` | `04-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | `01-import.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | `02-namespace.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `03-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `04-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `05-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

**Subtotal**: 7 / 16 Inlined (44%)

### ESM Consumer -> ESM Function -> CJS Constant

| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `default` | `01-import.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | `02-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | `03-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `default` | `04-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | `01-import.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | `02-namespace.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `03-rebind-const.mjs` | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | `04-rebind-var.mjs` | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | `05-rebind-let.mjs` | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

**Subtotal**: 2 / 9 Inlined (22%)

---

## Summary Statistics by Combination

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
