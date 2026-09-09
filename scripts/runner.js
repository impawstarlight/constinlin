import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setMask } from './set-mask.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

// 10 underlying function suites (50 cases total)
const SUITES = [
  // CJS Functions
  { funcType: 'cjs', constSource: 'cjs', usageType: 'local', title: 'Local Lexical Scope' },
  { funcType: 'cjs', constSource: 'cjs', usageType: 'default', title: 'Default Scalar (CJS Constant)' },
  { funcType: 'cjs', constSource: 'cjs', usageType: 'named', title: 'Named Object (CJS Constant)' },
  { funcType: 'cjs', constSource: 'esm', usageType: 'default', title: 'Default Scalar (ESM Constant)' },
  { funcType: 'cjs', constSource: 'esm', usageType: 'named', title: 'Named Object (ESM Constant)' },

  // ESM Functions
  { funcType: 'esm', constSource: 'esm', usageType: 'local', title: 'Local Lexical Scope' },
  { funcType: 'esm', constSource: 'esm', usageType: 'default', title: 'Default Scalar (ESM Constant)' },
  { funcType: 'esm', constSource: 'esm', usageType: 'named', title: 'Named Binding (ESM Constant)' },
  { funcType: 'esm', constSource: 'cjs', usageType: 'default', title: 'Default Scalar (CJS Constant)' },
  { funcType: 'esm', constSource: 'cjs', usageType: 'named', title: 'Named Binding (CJS Constant)' }
];

// The 8 three-way combinations: [Consumer] -> [Function] -> [Constant Source]
const COMBINATIONS = [
  { consumerType: 'cjs', funcType: 'cjs', constSource: 'cjs', label: 'CJS Consumer -> CJS Function -> CJS Constant' },
  { consumerType: 'cjs', funcType: 'cjs', constSource: 'esm', label: 'CJS Consumer -> CJS Function -> ESM Constant' },
  { consumerType: 'cjs', funcType: 'esm', constSource: 'esm', label: 'CJS Consumer -> ESM Function -> ESM Constant' },
  { consumerType: 'cjs', funcType: 'esm', constSource: 'cjs', label: 'CJS Consumer -> ESM Function -> CJS Constant' },
  { consumerType: 'esm', funcType: 'cjs', constSource: 'cjs', label: 'ESM Consumer -> CJS Function -> CJS Constant' },
  { consumerType: 'esm', funcType: 'cjs', constSource: 'esm', label: 'ESM Consumer -> CJS Function -> ESM Constant' },
  { consumerType: 'esm', funcType: 'esm', constSource: 'esm', label: 'ESM Consumer -> ESM Function -> ESM Constant' },
  { consumerType: 'esm', funcType: 'esm', constSource: 'cjs', label: 'ESM Consumer -> ESM Function -> CJS Constant' }
];

/**
 * Resolves the active mask either from CLI argument or default.cjs.
 *
 * @param {string|undefined} cliMask - Optional mask passed via CLI
 * @returns {string}
 */
function resolveActiveMask(cliMask) {
  if (cliMask) {
    setMask(cliMask);
    console.log(`\x1b[32m✔ Active mask configured to ${cliMask}\x1b[0m\n`);
    return cliMask;
  }

  try {
    const defaultCjs = readFileSync(join(repoRoot, 'constants', 'cjs', 'default.cjs'), 'utf-8');
    const maskMatch = defaultCjs.match(/MASK\s*=\s*([^;]+);/);
    if (maskMatch) {
      return maskMatch[1].trim();
    }
  } catch {
    // Fallback default
  }

  return '0xFFFF';
}

/**
 * Executes an individual test file and extracts TurboFan assembly.
 *
 * @param {string} filePath - Absolute path to test file
 * @returns {object} Analysis result
 */
function analyzeTestCase(filePath) {
  const result = spawnSync(process.execPath, [
    '--allow-natives-syntax',
    '--print-opt-code',
    '--print-opt-code-filter=mask',
    filePath
  ], { encoding: 'utf-8' });

  const stdout = result.stdout || '';
  const stderr = result.stderr || '';

  if (result.status !== 0) {
    return {
      optimized: false,
      error: stderr || stdout || `Exited with status ${result.status}`
    };
  }

  const match = stdout.match(/name = mask[\s\S]*?--- End code ---/m);
  if (!match) {
    return {
      optimized: false,
      error: 'Function mask was not compiled by TurboFan'
    };
  }

  const codeSection = match[0];

  // Extract compiled machine code size (in bytes)
  const sizeMatch = codeSection.match(/Instructions \(size = (\d+)\)/);
  const codeSize = sizeMatch ? parseInt(sizeMatch[1], 10) : null;

  // Extract target operation instruction across architectures (x86_64 movzx/and, ARM64 uxt/ubf/and)
  const targetMatch = codeSection.match(/0x[0-9a-f]+\s+[0-9a-f]+\s+(?:[0-9a-f]+\s+)?(?:REX\.W\s+)?(movz[a-z0-9]+[^\r\n]+|uxt[a-z0-9]*[^\r\n]+|ubf[a-z0-9]*[^\r\n]+|and[a-z0-9]*[^\r\n]+)/i);
  const targetSnippet = targetMatch ? targetMatch[1].trim() : 'N/A';

  const is16BitZeroExtend = /movzx?w[lq]?|uxth/i.test(targetSnippet);
  const is8BitZeroExtend = /movzx?b[lq]?|uxtb/i.test(targetSnippet);
  const isImmediateAnd = /and[a-z0-9]*\s+[^,]+,\s*(?:#|0x[0-9a-f]+|-?\d+)/i.test(targetSnippet) || /ubf[a-z0-9]*/i.test(targetSnippet);

  const immediateInlined = is16BitZeroExtend || is8BitZeroExtend || isImmediateAnd;

  let note = 'Dynamic context/property load';
  if (is16BitZeroExtend) {
    note = 'Inlined (16-bit zero-extend)';
  } else if (is8BitZeroExtend) {
    note = 'Inlined (8-bit zero-extend)';
  } else if (isImmediateAnd) {
    note = 'Inlined (immediate operand)';
  }

  return {
    optimized: true,
    immediateInlined,
    codeSize,
    targetSnippet,
    note
  };
}

/**
 * Main execution runner
 */
function main() {
  const cliMask = process.argv[2];
  const activeMask = resolveActiveMask(cliMask);
  const platformArch = `${process.platform}-${process.arch}`;

  console.log('='.repeat(95));
  console.log(` V8 TURBOFAN 3-WAY CONSTANT INLINING ANALYSIS (MASK = ${activeMask})`);
  console.log(` Format: Consumers [cjs/esm] x Functions [cjs/esm] x Constants [cjs/esm] = 100 Runs`);
  console.log(` Platform: ${platformArch} | Node: ${process.version} | V8: ${process.versions.v8}`);
  console.log('='.repeat(95));
  console.log();

  let md = `# TurboFan 3-Way Constant Inlining Matrix (MASK = ${activeMask})\n\n`;
  md += `Tested on Node.js \`${process.version}\` (V8 \`${process.versions.v8}\`, Platform: \`${platformArch}\`)\n\n`;
  md += `**Matrix Structure**: 8 Three-Way Combinations ($2 \\text{ Consumers} \\times 2 \\text{ Functions} \\times 2 \\text{ Constant Sources}$) = **100 Executed Test Cases**.\n\n`;

  // 1. Comparison Matrix
  md += `## 3-Way Comparison Matrix (Side-by-Side: CJS vs ESM Consumers)\n\n`;
  md += `| Function Type | Constant Source | Usage Type | Pattern File | CJS Consumer Inlined? | CJS Instruction (Size) | ESM Consumer Inlined? | ESM Instruction (Size) |\n`;
  md += `| :---: | :---: | :---: | :--- | :---: | :--- | :---: | :--- |\n`;

  for (const suite of SUITES) {
    const funcDir = join(repoRoot, 'functions', suite.funcType, suite.constSource, suite.usageType);
    if (!existsSync(funcDir)) continue;

    const files = readdirSync(funcDir).sort();
    for (const file of files) {
      const cjsConsumerFile = file.replace(/\.(mjs|cjs)$/, '.cjs');
      const esmConsumerFile = file.replace(/\.(mjs|cjs)$/, '.mjs');

      const cjsConsumerPath = join(repoRoot, 'consumers', 'cjs', suite.funcType, suite.constSource, suite.usageType, cjsConsumerFile);
      const esmConsumerPath = join(repoRoot, 'consumers', 'esm', suite.funcType, suite.constSource, suite.usageType, esmConsumerFile);

      const cjsRes = analyzeTestCase(cjsConsumerPath);
      const esmRes = analyzeTestCase(esmConsumerPath);

      const cjsBadge = cjsRes.immediateInlined ? '✅ **YES**' : '❌ **NO**';
      const esmBadge = esmRes.immediateInlined ? '✅ **YES**' : '❌ **NO**';

      const cjsInst = cjsRes.targetSnippet ? `\`${cjsRes.targetSnippet}\` (${cjsRes.codeSize || 'N/A'} B)` : 'N/A';
      const esmInst = esmRes.targetSnippet ? `\`${esmRes.targetSnippet}\` (${esmRes.codeSize || 'N/A'} B)` : 'N/A';

      md += `| \`${suite.funcType.toUpperCase()}\` | \`${suite.constSource.toUpperCase()}\` | \`${suite.usageType}\` | \`${file}\` | ${cjsBadge} | ${cjsInst} | ${esmBadge} | ${esmInst} |\n`;
    }
  }

  md += `\n---\n\n`;

  // 2. Results Grouped by the 8 Three-Way Combinations
  md += `## Results Grouped by 3-Way Combinations\n\n`;

  const comboStats = [];
  let grandTotal = 0;
  let grandInlined = 0;

  for (const combo of COMBINATIONS) {
    console.log(`\n\x1b[1;36m=== ${combo.label} ===\x1b[0m`);
    md += `### ${combo.label}\n\n`;
    md += `| Usage Type | Pattern File | Inlined? | Target Instruction | Code Size | Notes |\n`;
    md += `| :---: | :--- | :---: | :--- | :---: | :--- |\n`;

    const relevantSuites = SUITES.filter(s => s.funcType === combo.funcType && s.constSource === combo.constSource);
    let comboTotal = 0;
    let comboInlined = 0;

    for (const suite of relevantSuites) {
      const consumerDir = join(repoRoot, 'consumers', combo.consumerType, combo.funcType, combo.constSource, suite.usageType);
      if (!existsSync(consumerDir)) continue;

      const files = readdirSync(consumerDir).sort();
      for (const file of files) {
        const fullPath = join(consumerDir, file);
        const res = analyzeTestCase(fullPath);

        comboTotal++;
        grandTotal++;
        if (res.immediateInlined) {
          comboInlined++;
          grandInlined++;
        }

        const badge = res.immediateInlined ? '✅ **YES**' : '❌ **NO**';
        const sizeStr = res.codeSize ? `${res.codeSize} B` : 'N/A';
        const instStr = res.targetSnippet ? `\`${res.targetSnippet}\`` : 'N/A';
        const noteStr = res.note || 'N/A';

        const statusConsole = res.immediateInlined ? '\x1b[32mYES\x1b[0m' : '\x1b[31mNO \x1b[0m';
        console.log(`  [${suite.usageType.padEnd(7)}] ${file.padEnd(24)} | Inlined: ${statusConsole} | Size: ${(res.codeSize + 'B').padStart(5)} | ${res.targetSnippet}`);

        md += `| \`${suite.usageType}\` | \`${file}\` | ${badge} | ${instStr} | ${sizeStr} | ${noteStr} |\n`;
      }
    }

    md += `\n**Subtotal**: ${comboInlined} / ${comboTotal} Inlined (${Math.round((comboInlined / comboTotal) * 100)}%)\n\n`;
    comboStats.push({ label: combo.label, inlined: comboInlined, total: comboTotal });
  }

  // 3. Summary Statistics Table
  md += `---\n\n## Summary Statistics by Combination\n\n`;
  md += `| Combination | Inlined / Total | Optimization Rate |\n`;
  md += `| :--- | :---: | :---: |\n`;

  for (const stat of comboStats) {
    const rate = Math.round((stat.inlined / stat.total) * 100);
    md += `| \`${stat.label}\` | ${stat.inlined} / ${stat.total} | **${rate}%** |\n`;
  }

  md += `| **TOTAL OVERALL** | **${grandInlined} / ${grandTotal}** | **${Math.round((grandInlined / grandTotal) * 100)}%** |\n`;

  // Save report to results/<mask_hex>.md
  const resultsDir = join(repoRoot, 'results');
  if (!existsSync(resultsDir)) {
    mkdirSync(resultsDir, { recursive: true });
  }

  const safeMaskName = activeMask.replace(/[^a-zA-Z0-9_#-]/g, '_');
  const resultFileName = `${safeMaskName}.md`;
  const resultFilePath = join(resultsDir, resultFileName);

  writeFileSync(resultFilePath, md, 'utf-8');

  console.log('\n' + '='.repeat(95));
  console.log(` 📁 3-Way Matrix saved to: results/${resultFileName}`);
  console.log(` 📍 Full path:            ${resultFilePath}`);
  console.log('='.repeat(95));
}

main();


