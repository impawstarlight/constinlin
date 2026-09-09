# TurboFan 3-Way Constant Inlining Matrix (MASK = 0xDEADBEEF)

Tested on Node.js `v24.19.0` (V8 `13.6.233.17-node.51`, Platform: `linux-x64`)

**Matrix Dimensions**: $2 \text{ Consumers (CJS/ESM)} \times 2 \text{ Functions (CJS/ESM)} \times 2 \text{ Constant Sources (CJS/ESM)} = 100 \text{ Executed Test Cases}$.

## View 1: Consumer Layer Sensitivity (Varying Consumer: CJS vs ESM)

> **Key Takeaway**: The consumer layer has **0% impact** on TurboFan's inlining decision. In 100% of cases, changing only the consumer between `require()` and `import` produces identical assembly instructions and byte sizes for `mask`.

| Function Type | Constant Source | Usage Type | Function Module | CJS Consumer Inlined? | CJS Instruction (Size) | ESM Consumer Inlined? | ESM Instruction (Size) | Consumer Delta |
| :---: | :---: | :---: | :--- | :---: | :--- | :---: | :--- | :---: |
| `CJS` | `CJS` | `local` | [`01-literal.cjs`](../functions/cjs/cjs/local/01-literal.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/local/01-literal.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/local/01-literal.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `local` | [`02-func-const.cjs`](../functions/cjs/cjs/local/02-func-const.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/local/02-func-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/local/02-func-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `local` | [`03-func-var.cjs`](../functions/cjs/cjs/local/03-func-var.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/local/03-func-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/local/03-func-var.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `local` | [`04-func-let.cjs`](../functions/cjs/cjs/local/04-func-let.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/local/04-func-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/local/04-func-let.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `local` | [`05-top-const.cjs`](../functions/cjs/cjs/local/05-top-const.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/local/05-top-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/local/05-top-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `local` | [`06-top-var.cjs`](../functions/cjs/cjs/local/06-top-var.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/local/06-top-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/local/06-top-var.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `local` | [`07-top-let.cjs`](../functions/cjs/cjs/local/07-top-let.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/local/07-top-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/local/07-top-let.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `default` | [`01-const.cjs`](../functions/cjs/cjs/default/01-const.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/default/01-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/default/01-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `default` | [`02-var.cjs`](../functions/cjs/cjs/default/02-var.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/default/02-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/default/02-var.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `default` | [`03-let.cjs`](../functions/cjs/cjs/default/03-let.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/default/03-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/default/03-let.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `named` | [`01-destruct-const.cjs`](../functions/cjs/cjs/named/01-destruct-const.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/named/01-destruct-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/named/01-destruct-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `named` | [`02-destruct-var.cjs`](../functions/cjs/cjs/named/02-destruct-var.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/named/02-destruct-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/named/02-destruct-var.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `named` | [`03-destruct-let.cjs`](../functions/cjs/cjs/named/03-destruct-let.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/named/03-destruct-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/named/03-destruct-let.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `named` | [`04-prop-const.cjs`](../functions/cjs/cjs/named/04-prop-const.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/named/04-prop-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/named/04-prop-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `named` | [`05-prop-var.cjs`](../functions/cjs/cjs/named/05-prop-var.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/named/05-prop-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/named/05-prop-var.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `CJS` | `named` | [`06-prop-let.cjs`](../functions/cjs/cjs/named/06-prop-let.cjs) | [✅ **YES**](../consumers/cjs/cjs/cjs/named/06-prop-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/cjs/named/06-prop-let.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `ESM` | `default` | [`01-const.cjs`](../functions/cjs/esm/default/01-const.cjs) | [✅ **YES**](../consumers/cjs/cjs/esm/default/01-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/esm/default/01-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `ESM` | `default` | [`02-var.cjs`](../functions/cjs/esm/default/02-var.cjs) | [✅ **YES**](../consumers/cjs/cjs/esm/default/02-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/esm/default/02-var.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `ESM` | `default` | [`03-let.cjs`](../functions/cjs/esm/default/03-let.cjs) | [✅ **YES**](../consumers/cjs/cjs/esm/default/03-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/esm/default/03-let.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `ESM` | `named` | [`01-destruct-const.cjs`](../functions/cjs/esm/named/01-destruct-const.cjs) | [✅ **YES**](../consumers/cjs/cjs/esm/named/01-destruct-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/esm/named/01-destruct-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `ESM` | `named` | [`02-destruct-var.cjs`](../functions/cjs/esm/named/02-destruct-var.cjs) | [✅ **YES**](../consumers/cjs/cjs/esm/named/02-destruct-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/esm/named/02-destruct-var.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `ESM` | `named` | [`03-destruct-let.cjs`](../functions/cjs/esm/named/03-destruct-let.cjs) | [✅ **YES**](../consumers/cjs/cjs/esm/named/03-destruct-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/cjs/esm/named/03-destruct-let.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `CJS` | `ESM` | `named` | [`04-prop-const.cjs`](../functions/cjs/esm/named/04-prop-const.cjs) | [❌ **NO**](../consumers/cjs/cjs/esm/named/04-prop-const.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/cjs/esm/named/04-prop-const.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `CJS` | `ESM` | `named` | [`05-prop-var.cjs`](../functions/cjs/esm/named/05-prop-var.cjs) | [❌ **NO**](../consumers/cjs/cjs/esm/named/05-prop-var.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/cjs/esm/named/05-prop-var.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `CJS` | `ESM` | `named` | [`06-prop-let.cjs`](../functions/cjs/esm/named/06-prop-let.cjs) | [❌ **NO**](../consumers/cjs/cjs/esm/named/06-prop-let.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/cjs/esm/named/06-prop-let.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `ESM` | `ESM` | `local` | [`01-literal.mjs`](../functions/esm/esm/local/01-literal.mjs) | [✅ **YES**](../consumers/cjs/esm/esm/local/01-literal.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/esm/local/01-literal.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `ESM` | `local` | [`02-func-const.mjs`](../functions/esm/esm/local/02-func-const.mjs) | [✅ **YES**](../consumers/cjs/esm/esm/local/02-func-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/esm/local/02-func-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `ESM` | `local` | [`03-func-var.mjs`](../functions/esm/esm/local/03-func-var.mjs) | [✅ **YES**](../consumers/cjs/esm/esm/local/03-func-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/esm/local/03-func-var.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `ESM` | `local` | [`04-func-let.mjs`](../functions/esm/esm/local/04-func-let.mjs) | [✅ **YES**](../consumers/cjs/esm/esm/local/04-func-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/esm/local/04-func-let.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `ESM` | `local` | [`05-top-const.mjs`](../functions/esm/esm/local/05-top-const.mjs) | [✅ **YES**](../consumers/cjs/esm/esm/local/05-top-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/esm/local/05-top-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `ESM` | `local` | [`06-top-var.mjs`](../functions/esm/esm/local/06-top-var.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/local/06-top-var.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/esm/esm/local/06-top-var.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `ESM` | `ESM` | `local` | [`07-top-let.mjs`](../functions/esm/esm/local/07-top-let.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/local/07-top-let.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/esm/local/07-top-let.mjs) | `andl r8,rcx` (424 B) | `Identical` |
| `ESM` | `ESM` | `default` | [`01-import.mjs`](../functions/esm/esm/default/01-import.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/default/01-import.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/esm/default/01-import.mjs) | `andl r8,rcx` (424 B) | `Identical` |
| `ESM` | `ESM` | `default` | [`02-rebind-const.mjs`](../functions/esm/esm/default/02-rebind-const.mjs) | [✅ **YES**](../consumers/cjs/esm/esm/default/02-rebind-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/esm/default/02-rebind-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `ESM` | `default` | [`03-rebind-var.mjs`](../functions/esm/esm/default/03-rebind-var.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/default/03-rebind-var.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/esm/esm/default/03-rebind-var.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `ESM` | `ESM` | `default` | [`04-rebind-let.mjs`](../functions/esm/esm/default/04-rebind-let.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/default/04-rebind-let.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/esm/default/04-rebind-let.mjs) | `andl r8,rcx` (424 B) | `Identical` |
| `ESM` | `ESM` | `named` | [`01-import.mjs`](../functions/esm/esm/named/01-import.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/named/01-import.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/esm/named/01-import.mjs) | `andl r8,rcx` (424 B) | `Identical` |
| `ESM` | `ESM` | `named` | [`02-namespace.mjs`](../functions/esm/esm/named/02-namespace.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/named/02-namespace.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/esm/esm/named/02-namespace.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `ESM` | `ESM` | `named` | [`03-rebind-const.mjs`](../functions/esm/esm/named/03-rebind-const.mjs) | [✅ **YES**](../consumers/cjs/esm/esm/named/03-rebind-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/esm/named/03-rebind-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `ESM` | `named` | [`04-rebind-var.mjs`](../functions/esm/esm/named/04-rebind-var.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/named/04-rebind-var.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/esm/esm/named/04-rebind-var.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `ESM` | `ESM` | `named` | [`05-rebind-let.mjs`](../functions/esm/esm/named/05-rebind-let.mjs) | [❌ **NO**](../consumers/cjs/esm/esm/named/05-rebind-let.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/esm/named/05-rebind-let.mjs) | `andl r8,rcx` (424 B) | `Identical` |
| `ESM` | `CJS` | `default` | [`01-import.mjs`](../functions/esm/cjs/default/01-import.mjs) | [❌ **NO**](../consumers/cjs/esm/cjs/default/01-import.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/cjs/default/01-import.mjs) | `andl r8,rcx` (424 B) | `Identical` |
| `ESM` | `CJS` | `default` | [`02-rebind-const.mjs`](../functions/esm/cjs/default/02-rebind-const.mjs) | [✅ **YES**](../consumers/cjs/esm/cjs/default/02-rebind-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/cjs/default/02-rebind-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `CJS` | `default` | [`03-rebind-var.mjs`](../functions/esm/cjs/default/03-rebind-var.mjs) | [❌ **NO**](../consumers/cjs/esm/cjs/default/03-rebind-var.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/esm/cjs/default/03-rebind-var.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `ESM` | `CJS` | `default` | [`04-rebind-let.mjs`](../functions/esm/cjs/default/04-rebind-let.mjs) | [❌ **NO**](../consumers/cjs/esm/cjs/default/04-rebind-let.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/cjs/default/04-rebind-let.mjs) | `andl r8,rcx` (424 B) | `Identical` |
| `ESM` | `CJS` | `named` | [`01-import.mjs`](../functions/esm/cjs/named/01-import.mjs) | [❌ **NO**](../consumers/cjs/esm/cjs/named/01-import.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/cjs/named/01-import.mjs) | `andl r8,rcx` (424 B) | `Identical` |
| `ESM` | `CJS` | `named` | [`02-namespace.mjs`](../functions/esm/cjs/named/02-namespace.mjs) | [❌ **NO**](../consumers/cjs/esm/cjs/named/02-namespace.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/esm/cjs/named/02-namespace.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `ESM` | `CJS` | `named` | [`03-rebind-const.mjs`](../functions/esm/cjs/named/03-rebind-const.mjs) | [✅ **YES**](../consumers/cjs/esm/cjs/named/03-rebind-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../consumers/esm/esm/cjs/named/03-rebind-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | `Identical` |
| `ESM` | `CJS` | `named` | [`04-rebind-var.mjs`](../functions/esm/cjs/named/04-rebind-var.mjs) | [❌ **NO**](../consumers/cjs/esm/cjs/named/04-rebind-var.cjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../consumers/esm/esm/cjs/named/04-rebind-var.mjs) | `andl r8,rcx` (364 B) | `Identical` |
| `ESM` | `CJS` | `named` | [`05-rebind-let.mjs`](../functions/esm/cjs/named/05-rebind-let.mjs) | [❌ **NO**](../consumers/cjs/esm/cjs/named/05-rebind-let.cjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../consumers/esm/esm/cjs/named/05-rebind-let.mjs) | `andl r8,rcx` (424 B) | `Identical` |

---

## View 2: Constant Layer Sensitivity (Varying Constant Source: CJS vs ESM)

> **Key Takeaway**: In 15 out of 18 comparable pairs (83%), the constant module format (CJS vs ESM) produces identical inlining results. The **sole divergence** occurs in **CJS Function Property Access** (`mod.MASK`): requiring a CJS constant object inlines via V8 Hidden Class tracking (136 B), whereas requiring an ESM namespace object drops into a dynamic runtime lookup (176 B).

| Function Type | Usage Type | Syntax Pattern | CJS Constant Inlined? | CJS Constant Instruction | ESM Constant Inlined? | ESM Constant Instruction | Constant Sensitivity Note |
| :---: | :---: | :--- | :---: | :--- | :---: | :--- | :--- |
| `CJS` | `default` | `01-const.cjs` | [✅ **YES**](../functions/cjs/cjs/default/01-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../functions/cjs/esm/default/01-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | No impact (both inline) |
| `CJS` | `default` | `02-var.cjs` | [✅ **YES**](../functions/cjs/cjs/default/02-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../functions/cjs/esm/default/02-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | No impact (both inline) |
| `CJS` | `default` | `03-let.cjs` | [✅ **YES**](../functions/cjs/cjs/default/03-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../functions/cjs/esm/default/03-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | No impact (both inline) |
| `CJS` | `named` | `01-destruct-const.cjs` | [✅ **YES**](../functions/cjs/cjs/named/01-destruct-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../functions/cjs/esm/named/01-destruct-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | No impact (destructuring inlines for both) |
| `CJS` | `named` | `02-destruct-var.cjs` | [✅ **YES**](../functions/cjs/cjs/named/02-destruct-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../functions/cjs/esm/named/02-destruct-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | No impact (destructuring inlines for both) |
| `CJS` | `named` | `03-destruct-let.cjs` | [✅ **YES**](../functions/cjs/cjs/named/03-destruct-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../functions/cjs/esm/named/03-destruct-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | No impact (destructuring inlines for both) |
| `CJS` | `named` | `04-prop-const.cjs` | [✅ **YES**](../functions/cjs/cjs/named/04-prop-const.cjs) | `andl rdx,0xdeadbeef` (232 B) | [❌ **NO**](../functions/cjs/esm/named/04-prop-const.cjs) | `andl r8,rcx` (364 B) | ⚠️ **ESM namespace object blocks property inlining** |
| `CJS` | `named` | `05-prop-var.cjs` | [✅ **YES**](../functions/cjs/cjs/named/05-prop-var.cjs) | `andl rdx,0xdeadbeef` (232 B) | [❌ **NO**](../functions/cjs/esm/named/05-prop-var.cjs) | `andl r8,rcx` (364 B) | ⚠️ **ESM namespace object blocks property inlining** |
| `CJS` | `named` | `06-prop-let.cjs` | [✅ **YES**](../functions/cjs/cjs/named/06-prop-let.cjs) | `andl rdx,0xdeadbeef` (232 B) | [❌ **NO**](../functions/cjs/esm/named/06-prop-let.cjs) | `andl r8,rcx` (364 B) | ⚠️ **ESM namespace object blocks property inlining** |
| `ESM` | `default` | `01-import.mjs` | [❌ **NO**](../functions/esm/cjs/default/01-import.mjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../functions/esm/esm/default/01-import.mjs) | `andl r8,rcx` (424 B) | No impact (both fail without const rebind) |
| `ESM` | `default` | `02-rebind-const.mjs` | [✅ **YES**](../functions/esm/cjs/default/02-rebind-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../functions/esm/esm/default/02-rebind-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | No impact (both inline with rebind) |
| `ESM` | `default` | `03-rebind-var.mjs` | [❌ **NO**](../functions/esm/cjs/default/03-rebind-var.mjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../functions/esm/esm/default/03-rebind-var.mjs) | `andl r8,rcx` (364 B) | No impact (both fail without const rebind) |
| `ESM` | `default` | `04-rebind-let.mjs` | [❌ **NO**](../functions/esm/cjs/default/04-rebind-let.mjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../functions/esm/esm/default/04-rebind-let.mjs) | `andl r8,rcx` (424 B) | No impact (both fail without const rebind) |
| `ESM` | `named` | `01-import.mjs` | [❌ **NO**](../functions/esm/cjs/named/01-import.mjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../functions/esm/esm/named/01-import.mjs) | `andl r8,rcx` (424 B) | No impact (both fail without const rebind) |
| `ESM` | `named` | `02-namespace.mjs` | [❌ **NO**](../functions/esm/cjs/named/02-namespace.mjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../functions/esm/esm/named/02-namespace.mjs) | `andl r8,rcx` (364 B) | No impact (both fail without const rebind) |
| `ESM` | `named` | `03-rebind-const.mjs` | [✅ **YES**](../functions/esm/cjs/named/03-rebind-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | [✅ **YES**](../functions/esm/esm/named/03-rebind-const.mjs) | `andl rdx,0xdeadbeef` (232 B) | No impact (both inline with rebind) |
| `ESM` | `named` | `04-rebind-var.mjs` | [❌ **NO**](../functions/esm/cjs/named/04-rebind-var.mjs) | `andl r8,rcx` (364 B) | [❌ **NO**](../functions/esm/esm/named/04-rebind-var.mjs) | `andl r8,rcx` (364 B) | No impact (both fail without const rebind) |
| `ESM` | `named` | `05-rebind-let.mjs` | [❌ **NO**](../functions/esm/cjs/named/05-rebind-let.mjs) | `andl r8,rcx` (424 B) | [❌ **NO**](../functions/esm/esm/named/05-rebind-let.mjs) | `andl r8,rcx` (424 B) | No impact (both fail without const rebind) |

---

## View 3: Function Layer Sensitivity (Varying Function Module: CJS vs ESM)

> **Key Takeaway**: The function definition module format is the **primary driver** of optimization outcomes. CJS functions achieve **88% inlining** because Node's module wrapper treats top-level `const`/`var`/`let` and destructured imports as function-local lexical variables. Conversely, ESM functions achieve only **36% inlining** because top-level imports are live bindings to a mutable `Module Environment Record` that require explicit lexical re-binding (`const MASK = _MASK`).

> **Note on Syntactic Equivalence**: CommonJS and ESM function definitions do not have a strict 1-to-1 syntactic bijection because CommonJS uses `require()` and object destructuring/properties (25 total cases), while ESM uses `import` statements, namespace imports, and lexical re-binding patterns (25 total cases). The comparison table below pairs functionally corresponding intents.

| Constant Source | Syntax Pattern Category | CJS Function File | CJS Function Inlined? | ESM Function File | ESM Function Inlined? | Function Module Difference |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `Local` | Literal constant | [`01-literal.cjs`](../functions/cjs/cjs/local/01-literal.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`01-literal.mjs`](../functions/esm/esm/local/01-literal.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Identical (literal inlines in both) |
| `Local` | Function-scoped const | [`02-func-const.cjs`](../functions/cjs/cjs/local/02-func-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`02-func-const.mjs`](../functions/esm/esm/local/02-func-const.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Identical (function-scoped const inlines) |
| `Local` | Function-scoped var | [`03-func-var.cjs`](../functions/cjs/cjs/local/03-func-var.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`03-func-var.mjs`](../functions/esm/esm/local/03-func-var.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Identical (function-scoped var inlines) |
| `Local` | Function-scoped let | [`04-func-let.cjs`](../functions/cjs/cjs/local/04-func-let.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`04-func-let.mjs`](../functions/esm/esm/local/04-func-let.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Identical (function-scoped let inlines) |
| `Local` | Top-level const | [`05-top-const.cjs`](../functions/cjs/cjs/local/05-top-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`05-top-const.mjs`](../functions/esm/esm/local/05-top-const.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Identical (top-level const inlines in both) |
| `Local` | Top-level var | [`06-top-var.cjs`](../functions/cjs/cjs/local/06-top-var.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`06-top-var.mjs`](../functions/esm/esm/local/06-top-var.mjs) | ❌ **NO** (`andl r8,rcx` (364 B)) | ⚠️ CJS inlines (wrapper closure); ESM fails (module context slot) |
| `Local` | Top-level let | [`07-top-let.cjs`](../functions/cjs/cjs/local/07-top-let.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`07-top-let.mjs`](../functions/esm/esm/local/07-top-let.mjs) | ❌ **NO** (`andl r8,rcx` (424 B)) | ⚠️ CJS inlines (wrapper closure); ESM fails (module context slot) |
| `CJS Constant` | Default direct assignment | [`01-const.cjs (`const MASK = req(...)`)`](../functions/cjs/cjs/default/01-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`01-import.mjs (`import MASK from ...`)`](../functions/esm/cjs/default/01-import.mjs) | ❌ **NO** (`andl r8,rcx` (424 B)) | ⚠️ CJS inlines; ESM fails (ESM live binding) |
| `CJS Constant` | Default re-bound const | [`01-const.cjs (`const MASK = req(...)`)`](../functions/cjs/cjs/default/01-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`02-rebind-const.mjs (`const MASK = _M`)`](../functions/esm/cjs/default/02-rebind-const.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Both inline (re-binding restores ESM inlining) |
| `ESM Constant` | Default direct assignment | [`01-const.cjs (`const MASK = req(...).default`)`](../functions/cjs/esm/default/01-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`01-import.mjs (`import MASK from ...`)`](../functions/esm/esm/default/01-import.mjs) | ❌ **NO** (`andl r8,rcx` (424 B)) | ⚠️ CJS inlines; ESM fails (ESM live binding) |
| `ESM Constant` | Default re-bound const | [`01-const.cjs (`const MASK = req(...).default`)`](../functions/cjs/esm/default/01-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`02-rebind-const.mjs (`const MASK = _M`)`](../functions/esm/esm/default/02-rebind-const.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Both inline (re-binding restores ESM inlining) |
| `CJS Constant` | Named direct / destructured | [`01-destruct-const.cjs (`const { MASK }`)`](../functions/cjs/cjs/named/01-destruct-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`01-import.mjs (`import { MASK }`)`](../functions/esm/cjs/named/01-import.mjs) | ❌ **NO** (`andl r8,rcx` (424 B)) | ⚠️ CJS inlines; ESM fails (ESM live binding) |
| `CJS Constant` | Named property / namespace | [`04-prop-const.cjs (`mod.MASK`)`](../functions/cjs/cjs/named/04-prop-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`02-namespace.mjs (`mod.MASK`)`](../functions/esm/cjs/named/02-namespace.mjs) | ❌ **NO** (`andl r8,rcx` (364 B)) | ⚠️ CJS inlines (Hidden Class Map); ESM fails (namespace object) |
| `CJS Constant` | Named re-bound const | [`01-destruct-const.cjs (`const { MASK }`)`](../functions/cjs/cjs/named/01-destruct-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`03-rebind-const.mjs (`const MASK = _M`)`](../functions/esm/cjs/named/03-rebind-const.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Both inline (re-binding restores ESM inlining) |
| `ESM Constant` | Named direct / destructured | [`01-destruct-const.cjs (`const { MASK }`)`](../functions/cjs/esm/named/01-destruct-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`01-import.mjs (`import { MASK }`)`](../functions/esm/esm/named/01-import.mjs) | ❌ **NO** (`andl r8,rcx` (424 B)) | ⚠️ CJS inlines; ESM fails (ESM live binding) |
| `ESM Constant` | Named property / namespace | [`04-prop-const.cjs (`mod.MASK`)`](../functions/cjs/esm/named/04-prop-const.cjs) | ❌ **NO** (`andl r8,rcx` (364 B)) | [`02-namespace.mjs (`mod.MASK`)`](../functions/esm/esm/named/02-namespace.mjs) | ❌ **NO** (`andl r8,rcx` (364 B)) | Both fail (dynamic property lookup on namespace object) |
| `ESM Constant` | Named re-bound const | [`01-destruct-const.cjs (`const { MASK }`)`](../functions/cjs/esm/named/01-destruct-const.cjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | [`03-rebind-const.mjs (`const MASK = _M`)`](../functions/esm/esm/named/03-rebind-const.mjs) | ✅ **YES** (`andl rdx,0xdeadbeef` (232 B)) | Both inline (re-binding restores ESM inlining) |

---

## View 4: Results Grouped by 3-Way Combinations

### CJS Consumer -> CJS Function -> CJS Constant

| Usage Type | Consumer Test File | Target Function Module | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `local` | [`01-literal.cjs`](../consumers/cjs/cjs/cjs/local/01-literal.cjs) | [`01-literal.cjs`](../functions/cjs/cjs/local/01-literal.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`02-func-const.cjs`](../consumers/cjs/cjs/cjs/local/02-func-const.cjs) | [`02-func-const.cjs`](../functions/cjs/cjs/local/02-func-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`03-func-var.cjs`](../consumers/cjs/cjs/cjs/local/03-func-var.cjs) | [`03-func-var.cjs`](../functions/cjs/cjs/local/03-func-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`04-func-let.cjs`](../consumers/cjs/cjs/cjs/local/04-func-let.cjs) | [`04-func-let.cjs`](../functions/cjs/cjs/local/04-func-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`05-top-const.cjs`](../consumers/cjs/cjs/cjs/local/05-top-const.cjs) | [`05-top-const.cjs`](../functions/cjs/cjs/local/05-top-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`06-top-var.cjs`](../consumers/cjs/cjs/cjs/local/06-top-var.cjs) | [`06-top-var.cjs`](../functions/cjs/cjs/local/06-top-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`07-top-let.cjs`](../consumers/cjs/cjs/cjs/local/07-top-let.cjs) | [`07-top-let.cjs`](../functions/cjs/cjs/local/07-top-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`01-const.cjs`](../consumers/cjs/cjs/cjs/default/01-const.cjs) | [`01-const.cjs`](../functions/cjs/cjs/default/01-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`02-var.cjs`](../consumers/cjs/cjs/cjs/default/02-var.cjs) | [`02-var.cjs`](../functions/cjs/cjs/default/02-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`03-let.cjs`](../consumers/cjs/cjs/cjs/default/03-let.cjs) | [`03-let.cjs`](../functions/cjs/cjs/default/03-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`01-destruct-const.cjs`](../consumers/cjs/cjs/cjs/named/01-destruct-const.cjs) | [`01-destruct-const.cjs`](../functions/cjs/cjs/named/01-destruct-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`02-destruct-var.cjs`](../consumers/cjs/cjs/cjs/named/02-destruct-var.cjs) | [`02-destruct-var.cjs`](../functions/cjs/cjs/named/02-destruct-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`03-destruct-let.cjs`](../consumers/cjs/cjs/cjs/named/03-destruct-let.cjs) | [`03-destruct-let.cjs`](../functions/cjs/cjs/named/03-destruct-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`04-prop-const.cjs`](../consumers/cjs/cjs/cjs/named/04-prop-const.cjs) | [`04-prop-const.cjs`](../functions/cjs/cjs/named/04-prop-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`05-prop-var.cjs`](../consumers/cjs/cjs/cjs/named/05-prop-var.cjs) | [`05-prop-var.cjs`](../functions/cjs/cjs/named/05-prop-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`06-prop-let.cjs`](../consumers/cjs/cjs/cjs/named/06-prop-let.cjs) | [`06-prop-let.cjs`](../functions/cjs/cjs/named/06-prop-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

**Subtotal**: 16 / 16 Inlined (100%)

### CJS Consumer -> CJS Function -> ESM Constant

| Usage Type | Consumer Test File | Target Function Module | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `default` | [`01-const.cjs`](../consumers/cjs/cjs/esm/default/01-const.cjs) | [`01-const.cjs`](../functions/cjs/esm/default/01-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`02-var.cjs`](../consumers/cjs/cjs/esm/default/02-var.cjs) | [`02-var.cjs`](../functions/cjs/esm/default/02-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`03-let.cjs`](../consumers/cjs/cjs/esm/default/03-let.cjs) | [`03-let.cjs`](../functions/cjs/esm/default/03-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`01-destruct-const.cjs`](../consumers/cjs/cjs/esm/named/01-destruct-const.cjs) | [`01-destruct-const.cjs`](../functions/cjs/esm/named/01-destruct-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`02-destruct-var.cjs`](../consumers/cjs/cjs/esm/named/02-destruct-var.cjs) | [`02-destruct-var.cjs`](../functions/cjs/esm/named/02-destruct-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`03-destruct-let.cjs`](../consumers/cjs/cjs/esm/named/03-destruct-let.cjs) | [`03-destruct-let.cjs`](../functions/cjs/esm/named/03-destruct-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`04-prop-const.cjs`](../consumers/cjs/cjs/esm/named/04-prop-const.cjs) | [`04-prop-const.cjs`](../functions/cjs/esm/named/04-prop-const.cjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`05-prop-var.cjs`](../consumers/cjs/cjs/esm/named/05-prop-var.cjs) | [`05-prop-var.cjs`](../functions/cjs/esm/named/05-prop-var.cjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`06-prop-let.cjs`](../consumers/cjs/cjs/esm/named/06-prop-let.cjs) | [`06-prop-let.cjs`](../functions/cjs/esm/named/06-prop-let.cjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |

**Subtotal**: 6 / 9 Inlined (67%)

### CJS Consumer -> ESM Function -> ESM Constant

| Usage Type | Consumer Test File | Target Function Module | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `local` | [`01-literal.cjs`](../consumers/cjs/esm/esm/local/01-literal.cjs) | [`01-literal.mjs`](../functions/esm/esm/local/01-literal.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`02-func-const.cjs`](../consumers/cjs/esm/esm/local/02-func-const.cjs) | [`02-func-const.mjs`](../functions/esm/esm/local/02-func-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`03-func-var.cjs`](../consumers/cjs/esm/esm/local/03-func-var.cjs) | [`03-func-var.mjs`](../functions/esm/esm/local/03-func-var.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`04-func-let.cjs`](../consumers/cjs/esm/esm/local/04-func-let.cjs) | [`04-func-let.mjs`](../functions/esm/esm/local/04-func-let.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`05-top-const.cjs`](../consumers/cjs/esm/esm/local/05-top-const.cjs) | [`05-top-const.mjs`](../functions/esm/esm/local/05-top-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`06-top-var.cjs`](../consumers/cjs/esm/esm/local/06-top-var.cjs) | [`06-top-var.mjs`](../functions/esm/esm/local/06-top-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `local` | [`07-top-let.cjs`](../consumers/cjs/esm/esm/local/07-top-let.cjs) | [`07-top-let.mjs`](../functions/esm/esm/local/07-top-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | [`01-import.cjs`](../consumers/cjs/esm/esm/default/01-import.cjs) | [`01-import.mjs`](../functions/esm/esm/default/01-import.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | [`02-rebind-const.cjs`](../consumers/cjs/esm/esm/default/02-rebind-const.cjs) | [`02-rebind-const.mjs`](../functions/esm/esm/default/02-rebind-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`03-rebind-var.cjs`](../consumers/cjs/esm/esm/default/03-rebind-var.cjs) | [`03-rebind-var.mjs`](../functions/esm/esm/default/03-rebind-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `default` | [`04-rebind-let.cjs`](../consumers/cjs/esm/esm/default/04-rebind-let.cjs) | [`04-rebind-let.mjs`](../functions/esm/esm/default/04-rebind-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | [`01-import.cjs`](../consumers/cjs/esm/esm/named/01-import.cjs) | [`01-import.mjs`](../functions/esm/esm/named/01-import.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | [`02-namespace.cjs`](../consumers/cjs/esm/esm/named/02-namespace.cjs) | [`02-namespace.mjs`](../functions/esm/esm/named/02-namespace.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`03-rebind-const.cjs`](../consumers/cjs/esm/esm/named/03-rebind-const.cjs) | [`03-rebind-const.mjs`](../functions/esm/esm/named/03-rebind-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`04-rebind-var.cjs`](../consumers/cjs/esm/esm/named/04-rebind-var.cjs) | [`04-rebind-var.mjs`](../functions/esm/esm/named/04-rebind-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`05-rebind-let.cjs`](../consumers/cjs/esm/esm/named/05-rebind-let.cjs) | [`05-rebind-let.mjs`](../functions/esm/esm/named/05-rebind-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

**Subtotal**: 7 / 16 Inlined (44%)

### CJS Consumer -> ESM Function -> CJS Constant

| Usage Type | Consumer Test File | Target Function Module | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `default` | [`01-import.cjs`](../consumers/cjs/esm/cjs/default/01-import.cjs) | [`01-import.mjs`](../functions/esm/cjs/default/01-import.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | [`02-rebind-const.cjs`](../consumers/cjs/esm/cjs/default/02-rebind-const.cjs) | [`02-rebind-const.mjs`](../functions/esm/cjs/default/02-rebind-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`03-rebind-var.cjs`](../consumers/cjs/esm/cjs/default/03-rebind-var.cjs) | [`03-rebind-var.mjs`](../functions/esm/cjs/default/03-rebind-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `default` | [`04-rebind-let.cjs`](../consumers/cjs/esm/cjs/default/04-rebind-let.cjs) | [`04-rebind-let.mjs`](../functions/esm/cjs/default/04-rebind-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | [`01-import.cjs`](../consumers/cjs/esm/cjs/named/01-import.cjs) | [`01-import.mjs`](../functions/esm/cjs/named/01-import.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | [`02-namespace.cjs`](../consumers/cjs/esm/cjs/named/02-namespace.cjs) | [`02-namespace.mjs`](../functions/esm/cjs/named/02-namespace.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`03-rebind-const.cjs`](../consumers/cjs/esm/cjs/named/03-rebind-const.cjs) | [`03-rebind-const.mjs`](../functions/esm/cjs/named/03-rebind-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`04-rebind-var.cjs`](../consumers/cjs/esm/cjs/named/04-rebind-var.cjs) | [`04-rebind-var.mjs`](../functions/esm/cjs/named/04-rebind-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`05-rebind-let.cjs`](../consumers/cjs/esm/cjs/named/05-rebind-let.cjs) | [`05-rebind-let.mjs`](../functions/esm/cjs/named/05-rebind-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

**Subtotal**: 2 / 9 Inlined (22%)

### ESM Consumer -> CJS Function -> CJS Constant

| Usage Type | Consumer Test File | Target Function Module | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `local` | [`01-literal.mjs`](../consumers/esm/cjs/cjs/local/01-literal.mjs) | [`01-literal.cjs`](../functions/cjs/cjs/local/01-literal.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`02-func-const.mjs`](../consumers/esm/cjs/cjs/local/02-func-const.mjs) | [`02-func-const.cjs`](../functions/cjs/cjs/local/02-func-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`03-func-var.mjs`](../consumers/esm/cjs/cjs/local/03-func-var.mjs) | [`03-func-var.cjs`](../functions/cjs/cjs/local/03-func-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`04-func-let.mjs`](../consumers/esm/cjs/cjs/local/04-func-let.mjs) | [`04-func-let.cjs`](../functions/cjs/cjs/local/04-func-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`05-top-const.mjs`](../consumers/esm/cjs/cjs/local/05-top-const.mjs) | [`05-top-const.cjs`](../functions/cjs/cjs/local/05-top-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`06-top-var.mjs`](../consumers/esm/cjs/cjs/local/06-top-var.mjs) | [`06-top-var.cjs`](../functions/cjs/cjs/local/06-top-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`07-top-let.mjs`](../consumers/esm/cjs/cjs/local/07-top-let.mjs) | [`07-top-let.cjs`](../functions/cjs/cjs/local/07-top-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`01-const.mjs`](../consumers/esm/cjs/cjs/default/01-const.mjs) | [`01-const.cjs`](../functions/cjs/cjs/default/01-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`02-var.mjs`](../consumers/esm/cjs/cjs/default/02-var.mjs) | [`02-var.cjs`](../functions/cjs/cjs/default/02-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`03-let.mjs`](../consumers/esm/cjs/cjs/default/03-let.mjs) | [`03-let.cjs`](../functions/cjs/cjs/default/03-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`01-destruct-const.mjs`](../consumers/esm/cjs/cjs/named/01-destruct-const.mjs) | [`01-destruct-const.cjs`](../functions/cjs/cjs/named/01-destruct-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`02-destruct-var.mjs`](../consumers/esm/cjs/cjs/named/02-destruct-var.mjs) | [`02-destruct-var.cjs`](../functions/cjs/cjs/named/02-destruct-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`03-destruct-let.mjs`](../consumers/esm/cjs/cjs/named/03-destruct-let.mjs) | [`03-destruct-let.cjs`](../functions/cjs/cjs/named/03-destruct-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`04-prop-const.mjs`](../consumers/esm/cjs/cjs/named/04-prop-const.mjs) | [`04-prop-const.cjs`](../functions/cjs/cjs/named/04-prop-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`05-prop-var.mjs`](../consumers/esm/cjs/cjs/named/05-prop-var.mjs) | [`05-prop-var.cjs`](../functions/cjs/cjs/named/05-prop-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`06-prop-let.mjs`](../consumers/esm/cjs/cjs/named/06-prop-let.mjs) | [`06-prop-let.cjs`](../functions/cjs/cjs/named/06-prop-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |

**Subtotal**: 16 / 16 Inlined (100%)

### ESM Consumer -> CJS Function -> ESM Constant

| Usage Type | Consumer Test File | Target Function Module | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `default` | [`01-const.mjs`](../consumers/esm/cjs/esm/default/01-const.mjs) | [`01-const.cjs`](../functions/cjs/esm/default/01-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`02-var.mjs`](../consumers/esm/cjs/esm/default/02-var.mjs) | [`02-var.cjs`](../functions/cjs/esm/default/02-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`03-let.mjs`](../consumers/esm/cjs/esm/default/03-let.mjs) | [`03-let.cjs`](../functions/cjs/esm/default/03-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`01-destruct-const.mjs`](../consumers/esm/cjs/esm/named/01-destruct-const.mjs) | [`01-destruct-const.cjs`](../functions/cjs/esm/named/01-destruct-const.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`02-destruct-var.mjs`](../consumers/esm/cjs/esm/named/02-destruct-var.mjs) | [`02-destruct-var.cjs`](../functions/cjs/esm/named/02-destruct-var.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`03-destruct-let.mjs`](../consumers/esm/cjs/esm/named/03-destruct-let.mjs) | [`03-destruct-let.cjs`](../functions/cjs/esm/named/03-destruct-let.cjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`04-prop-const.mjs`](../consumers/esm/cjs/esm/named/04-prop-const.mjs) | [`04-prop-const.cjs`](../functions/cjs/esm/named/04-prop-const.cjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`05-prop-var.mjs`](../consumers/esm/cjs/esm/named/05-prop-var.mjs) | [`05-prop-var.cjs`](../functions/cjs/esm/named/05-prop-var.cjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`06-prop-let.mjs`](../consumers/esm/cjs/esm/named/06-prop-let.mjs) | [`06-prop-let.cjs`](../functions/cjs/esm/named/06-prop-let.cjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |

**Subtotal**: 6 / 9 Inlined (67%)

### ESM Consumer -> ESM Function -> ESM Constant

| Usage Type | Consumer Test File | Target Function Module | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `local` | [`01-literal.mjs`](../consumers/esm/esm/esm/local/01-literal.mjs) | [`01-literal.mjs`](../functions/esm/esm/local/01-literal.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`02-func-const.mjs`](../consumers/esm/esm/esm/local/02-func-const.mjs) | [`02-func-const.mjs`](../functions/esm/esm/local/02-func-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`03-func-var.mjs`](../consumers/esm/esm/esm/local/03-func-var.mjs) | [`03-func-var.mjs`](../functions/esm/esm/local/03-func-var.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`04-func-let.mjs`](../consumers/esm/esm/esm/local/04-func-let.mjs) | [`04-func-let.mjs`](../functions/esm/esm/local/04-func-let.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`05-top-const.mjs`](../consumers/esm/esm/esm/local/05-top-const.mjs) | [`05-top-const.mjs`](../functions/esm/esm/local/05-top-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `local` | [`06-top-var.mjs`](../consumers/esm/esm/esm/local/06-top-var.mjs) | [`06-top-var.mjs`](../functions/esm/esm/local/06-top-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `local` | [`07-top-let.mjs`](../consumers/esm/esm/esm/local/07-top-let.mjs) | [`07-top-let.mjs`](../functions/esm/esm/local/07-top-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | [`01-import.mjs`](../consumers/esm/esm/esm/default/01-import.mjs) | [`01-import.mjs`](../functions/esm/esm/default/01-import.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | [`02-rebind-const.mjs`](../consumers/esm/esm/esm/default/02-rebind-const.mjs) | [`02-rebind-const.mjs`](../functions/esm/esm/default/02-rebind-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`03-rebind-var.mjs`](../consumers/esm/esm/esm/default/03-rebind-var.mjs) | [`03-rebind-var.mjs`](../functions/esm/esm/default/03-rebind-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `default` | [`04-rebind-let.mjs`](../consumers/esm/esm/esm/default/04-rebind-let.mjs) | [`04-rebind-let.mjs`](../functions/esm/esm/default/04-rebind-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | [`01-import.mjs`](../consumers/esm/esm/esm/named/01-import.mjs) | [`01-import.mjs`](../functions/esm/esm/named/01-import.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | [`02-namespace.mjs`](../consumers/esm/esm/esm/named/02-namespace.mjs) | [`02-namespace.mjs`](../functions/esm/esm/named/02-namespace.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`03-rebind-const.mjs`](../consumers/esm/esm/esm/named/03-rebind-const.mjs) | [`03-rebind-const.mjs`](../functions/esm/esm/named/03-rebind-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`04-rebind-var.mjs`](../consumers/esm/esm/esm/named/04-rebind-var.mjs) | [`04-rebind-var.mjs`](../functions/esm/esm/named/04-rebind-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`05-rebind-let.mjs`](../consumers/esm/esm/esm/named/05-rebind-let.mjs) | [`05-rebind-let.mjs`](../functions/esm/esm/named/05-rebind-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

**Subtotal**: 7 / 16 Inlined (44%)

### ESM Consumer -> ESM Function -> CJS Constant

| Usage Type | Consumer Test File | Target Function Module | Inlined? | Target Instruction | Code Size | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| `default` | [`01-import.mjs`](../consumers/esm/esm/cjs/default/01-import.mjs) | [`01-import.mjs`](../functions/esm/cjs/default/01-import.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `default` | [`02-rebind-const.mjs`](../consumers/esm/esm/cjs/default/02-rebind-const.mjs) | [`02-rebind-const.mjs`](../functions/esm/cjs/default/02-rebind-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `default` | [`03-rebind-var.mjs`](../consumers/esm/esm/cjs/default/03-rebind-var.mjs) | [`03-rebind-var.mjs`](../functions/esm/cjs/default/03-rebind-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `default` | [`04-rebind-let.mjs`](../consumers/esm/esm/cjs/default/04-rebind-let.mjs) | [`04-rebind-let.mjs`](../functions/esm/cjs/default/04-rebind-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | [`01-import.mjs`](../consumers/esm/esm/cjs/named/01-import.mjs) | [`01-import.mjs`](../functions/esm/cjs/named/01-import.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |
| `named` | [`02-namespace.mjs`](../consumers/esm/esm/cjs/named/02-namespace.mjs) | [`02-namespace.mjs`](../functions/esm/cjs/named/02-namespace.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`03-rebind-const.mjs`](../consumers/esm/esm/cjs/named/03-rebind-const.mjs) | [`03-rebind-const.mjs`](../functions/esm/cjs/named/03-rebind-const.mjs) | ✅ **YES** | `andl rdx,0xdeadbeef` | 232 B | Inlined (immediate operand) |
| `named` | [`04-rebind-var.mjs`](../consumers/esm/esm/cjs/named/04-rebind-var.mjs) | [`04-rebind-var.mjs`](../functions/esm/cjs/named/04-rebind-var.mjs) | ❌ **NO** | `andl r8,rcx` | 364 B | Dynamic context/property load |
| `named` | [`05-rebind-let.mjs`](../consumers/esm/esm/cjs/named/05-rebind-let.mjs) | [`05-rebind-let.mjs`](../functions/esm/cjs/named/05-rebind-let.mjs) | ❌ **NO** | `andl r8,rcx` | 424 B | Dynamic context/property load |

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
