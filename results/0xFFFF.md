# TurboFan Constant Inlining Matrix (MASK = 0xFFFF)

Tested on Node.js `v24.19.0` (V8 `13.6.233.17-node.51`, Platform: `linux-x64`)

### CJS: Local (Same File)

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-literal.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `02-func-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `03-func-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `04-func-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `05-top-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `06-top-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `07-top-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |

### CJS: Internal -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `02-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `03-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |

### CJS: Internal -> Named Object

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-destruct-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `02-destruct-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `03-destruct-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `04-prop-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `05-prop-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `06-prop-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |

### CJS: Cross (require ESM) -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `02-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `03-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |

### CJS: Cross (require ESM) -> Named Object

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-destruct-const.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `02-destruct-var.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `03-destruct-let.cjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `04-prop-const.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `05-prop-var.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `06-prop-let.cjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |

### ESM: Local (Same File)

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-literal.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `02-func-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `03-func-var.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `04-func-let.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `05-top-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `06-top-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `07-top-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

### ESM: Internal -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `02-rebind-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `03-rebind-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `04-rebind-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

### ESM: Internal -> Named Binding

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `02-namespace.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `03-rebind-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `04-rebind-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `05-rebind-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

### ESM: Cross (import CJS) -> Default Scalar

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `02-rebind-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `03-rebind-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `04-rebind-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

### ESM: Cross (import CJS) -> Named Binding

| Test File | Inlined? | Target Instruction | Code Size | Notes |
| :--- | :---: | :--- | :---: | :--- |
| `01-import.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |
| `02-namespace.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `03-rebind-const.mjs` | ✅ **YES** | `movzxwl rdx,rdx` | 136 B | Inlined (16-bit zero-extend) |
| `04-rebind-var.mjs` | ❌ **NO** | `andl rdx,rdi` | 176 B | Dynamic context/property load |
| `05-rebind-let.mjs` | ❌ **NO** | `andl rdx,rdi` | 256 B | Dynamic context/property load |

