import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setMask } from '#scripts/set-mask.js';

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
  console.log(` Multi-Angle Views: Consumer Sensitivity | Constant Sensitivity | Function Sensitivity`);
  console.log(` Platform: ${platformArch} | Node: ${process.version} | V8: ${process.versions.v8}`);
  console.log('='.repeat(95));
  console.log();

  // Execute all 100 test cases and store into memory structure
  // resultsMap[consumerType][funcType][constSource][usageType][filename] = res
  const resultsMap = { cjs: {}, esm: {} };

  for (const consumerType of ['cjs', 'esm']) {
    resultsMap[consumerType] = {};
    for (const suite of SUITES) {
      if (!resultsMap[consumerType][suite.funcType]) resultsMap[consumerType][suite.funcType] = {};
      if (!resultsMap[consumerType][suite.funcType][suite.constSource]) resultsMap[consumerType][suite.funcType][suite.constSource] = {};
      if (!resultsMap[consumerType][suite.funcType][suite.constSource][suite.usageType]) resultsMap[consumerType][suite.funcType][suite.constSource][suite.usageType] = {};

      const consumerDir = join(repoRoot, 'consumers', consumerType, suite.funcType, suite.constSource, suite.usageType);
      if (!existsSync(consumerDir)) continue;

      const files = readdirSync(consumerDir).sort();
      for (const file of files) {
        const fullPath = join(consumerDir, file);
        const res = analyzeTestCase(fullPath);
        resultsMap[consumerType][suite.funcType][suite.constSource][suite.usageType][file] = res;
      }
    }
  }

  let md = `# TurboFan 3-Way Constant Inlining Matrix (MASK = ${activeMask})\n\n`;
  md += `Tested on Node.js \`${process.version}\` (V8 \`${process.versions.v8}\`, Platform: \`${platformArch}\`)\n\n`;
  md += `**Matrix Dimensions**: $2 \\text{ Consumers (CJS/ESM)} \\times 2 \\text{ Functions (CJS/ESM)} \\times 2 \\text{ Constant Sources (CJS/ESM)} = 100 \\text{ Executed Test Cases}$.\n\n`;

  // =========================================================================
  // VIEW 1: Consumer Layer Sensitivity (Varying Consumer: CJS vs ESM)
  // =========================================================================
  md += `## View 1: Consumer Layer Sensitivity (Varying Consumer: CJS vs ESM)\n\n`;
  md += `| Function Source | Constant Source | Constant Export Type | Function Module | CJS Consumer Inlined? | CJS Instruction (Size) | ESM Consumer Inlined? | ESM Instruction (Size) | Consumer Delta |\n`;
  md += `| :---: | :---: | :---: | :--- | :---: | :--- | :---: | :--- | :---: |\n`;

  for (const suite of SUITES) {
    const cjsFiles = resultsMap.cjs[suite.funcType]?.[suite.constSource]?.[suite.usageType] || {};
    for (const [file, cjsRes] of Object.entries(cjsFiles)) {
      const esmFile = file.replace(/\.cjs$/, '.mjs');
      const esmRes = resultsMap.esm[suite.funcType]?.[suite.constSource]?.[suite.usageType]?.[esmFile] || {};

      const funcExt = suite.funcType === 'cjs' ? '.cjs' : '.mjs';
      const funcFilename = file.replace(/\.(cjs|mjs)$/, funcExt);
      const funcRelPath = `../functions/${suite.funcType}/${suite.constSource}/${suite.usageType}/${funcFilename}`;
      const cjsConsumerRelPath = `../consumers/cjs/${suite.funcType}/${suite.constSource}/${suite.usageType}/${file}`;
      const esmConsumerRelPath = `../consumers/esm/${suite.funcType}/${suite.constSource}/${suite.usageType}/${esmFile}`;

      const cjsBadge = cjsRes.immediateInlined ? `[✅ **YES**](${cjsConsumerRelPath})` : `[❌ **NO**](${cjsConsumerRelPath})`;
      const esmBadge = esmRes.immediateInlined ? `[✅ **YES**](${esmConsumerRelPath})` : `[❌ **NO**](${esmConsumerRelPath})`;

      const cjsInst = cjsRes.targetSnippet ? `\`${cjsRes.targetSnippet}\` (${cjsRes.codeSize || 'N/A'} B)` : 'N/A';
      const esmInst = esmRes.targetSnippet ? `\`${esmRes.targetSnippet}\` (${esmRes.codeSize || 'N/A'} B)` : 'N/A';

      const delta = (cjsRes.immediateInlined === esmRes.immediateInlined && cjsRes.codeSize === esmRes.codeSize)
        ? '✅ Identical'
        : '⚠️ Different';

      md += `| \`${suite.funcType.toUpperCase()}\` | \`${suite.constSource.toUpperCase()}\` | \`${suite.usageType}\` | [\`${funcFilename}\`](${funcRelPath}) | ${cjsBadge} | ${cjsInst} | ${esmBadge} | ${esmInst} | ${delta} |\n`;
    }
  }

  md += `\n---\n\n`;

  // =========================================================================
  // VIEW 2: Constant Layer Sensitivity (Varying Constant Source: CJS vs ESM)
  // =========================================================================
  md += `## View 2: Constant Layer Sensitivity (Varying Constant Source: CJS vs ESM)\n\n`;
  md += `| Function Source | Constant Export Type | Function Pattern | CJS Constant Inlined? | CJS Constant Instruction (Size) | ESM Constant Inlined? | ESM Constant Instruction (Size) | Constant Delta |\n`;
  md += `| :---: | :---: | :--- | :---: | :--- | :---: | :--- | :---: |\n`;

  // 1. CJS Function Constant Comparison
  const cjsFuncDefaultFiles = ['01-const.cjs', '02-var.cjs', '03-let.cjs'];
  for (const f of cjsFuncDefaultFiles) {
    const cjsConstRes = resultsMap.cjs.cjs.cjs.default[f] || {};
    const esmConstRes = resultsMap.cjs.cjs.esm.default[f] || {};
    const cjsRel = `../functions/cjs/cjs/default/${f}`;
    const esmRel = `../functions/cjs/esm/default/${f}`;
    const cBadge = cjsConstRes.immediateInlined ? `[✅ **YES**](${cjsRel})` : `[❌ **NO**](${cjsRel})`;
    const eBadge = esmConstRes.immediateInlined ? `[✅ **YES**](${esmRel})` : `[❌ **NO**](${esmRel})`;
    const cInst = cjsConstRes.targetSnippet ? `\`${cjsConstRes.targetSnippet}\` (${cjsConstRes.codeSize} B)` : 'N/A';
    const eInst = esmConstRes.targetSnippet ? `\`${esmConstRes.targetSnippet}\` (${esmConstRes.codeSize} B)` : 'N/A';
    const delta = (cjsConstRes.immediateInlined === esmConstRes.immediateInlined && cjsConstRes.codeSize === esmConstRes.codeSize)
      ? '✅ Identical'
      : '⚠️ Different';
    md += `| \`CJS\` | \`default\` | \`${f}\` | ${cBadge} | ${cInst} | ${eBadge} | ${eInst} | ${delta} |\n`;
  }

  const cjsFuncNamedFiles = ['01-destruct-const.cjs', '02-destruct-var.cjs', '03-destruct-let.cjs', '04-prop-const.cjs', '05-prop-var.cjs', '06-prop-let.cjs'];
  for (const f of cjsFuncNamedFiles) {
    const cjsConstRes = resultsMap.cjs.cjs.cjs.named[f] || {};
    const esmConstRes = resultsMap.cjs.cjs.esm.named[f] || {};
    const cjsRel = `../functions/cjs/cjs/named/${f}`;
    const esmRel = `../functions/cjs/esm/named/${f}`;
    const cBadge = cjsConstRes.immediateInlined ? `[✅ **YES**](${cjsRel})` : `[❌ **NO**](${cjsRel})`;
    const eBadge = esmConstRes.immediateInlined ? `[✅ **YES**](${esmRel})` : `[❌ **NO**](${esmRel})`;
    const cInst = cjsConstRes.targetSnippet ? `\`${cjsConstRes.targetSnippet}\` (${cjsConstRes.codeSize} B)` : 'N/A';
    const eInst = esmConstRes.targetSnippet ? `\`${esmConstRes.targetSnippet}\` (${esmConstRes.codeSize} B)` : 'N/A';
    const delta = (cjsConstRes.immediateInlined === esmConstRes.immediateInlined && cjsConstRes.codeSize === esmConstRes.codeSize)
      ? '✅ Identical'
      : '⚠️ Different';
    md += `| \`CJS\` | \`named\` | \`${f}\` | ${cBadge} | ${cInst} | ${eBadge} | ${eInst} | ${delta} |\n`;
  }

  // 2. ESM Function Constant Comparison
  const esmFuncDefaultFiles = ['01-import.cjs', '02-rebind-const.cjs', '03-rebind-var.cjs', '04-rebind-let.cjs'];
  for (const f of esmFuncDefaultFiles) {
    const cjsConstRes = resultsMap.cjs.esm.cjs.default[f] || {};
    const esmConstRes = resultsMap.cjs.esm.esm.default[f] || {};
    const esmFilename = f.replace(/\.cjs$/, '.mjs');
    const cjsRel = `../functions/esm/cjs/default/${esmFilename}`;
    const esmRel = `../functions/esm/esm/default/${esmFilename}`;
    const cBadge = cjsConstRes.immediateInlined ? `[✅ **YES**](${cjsRel})` : `[❌ **NO**](${cjsRel})`;
    const eBadge = esmConstRes.immediateInlined ? `[✅ **YES**](${esmRel})` : `[❌ **NO**](${esmRel})`;
    const cInst = cjsConstRes.targetSnippet ? `\`${cjsConstRes.targetSnippet}\` (${cjsConstRes.codeSize} B)` : 'N/A';
    const eInst = esmConstRes.targetSnippet ? `\`${esmConstRes.targetSnippet}\` (${esmConstRes.codeSize} B)` : 'N/A';
    const delta = (cjsConstRes.immediateInlined === esmConstRes.immediateInlined && cjsConstRes.codeSize === esmConstRes.codeSize)
      ? '✅ Identical'
      : '⚠️ Different';
    md += `| \`ESM\` | \`default\` | \`${esmFilename}\` | ${cBadge} | ${cInst} | ${eBadge} | ${eInst} | ${delta} |\n`;
  }

  const esmFuncNamedFiles = ['01-import.cjs', '02-namespace.cjs', '03-rebind-const.cjs', '04-rebind-var.cjs', '05-rebind-let.cjs'];
  for (const f of esmFuncNamedFiles) {
    const cjsConstRes = resultsMap.cjs.esm.cjs.named[f] || {};
    const esmConstRes = resultsMap.cjs.esm.esm.named[f] || {};
    const esmFilename = f.replace(/\.cjs$/, '.mjs');
    const cjsRel = `../functions/esm/cjs/named/${esmFilename}`;
    const esmRel = `../functions/esm/esm/named/${esmFilename}`;
    const cBadge = cjsConstRes.immediateInlined ? `[✅ **YES**](${cjsRel})` : `[❌ **NO**](${cjsRel})`;
    const eBadge = esmConstRes.immediateInlined ? `[✅ **YES**](${esmRel})` : `[❌ **NO**](${esmRel})`;
    const cInst = cjsConstRes.targetSnippet ? `\`${cjsConstRes.targetSnippet}\` (${cjsConstRes.codeSize} B)` : 'N/A';
    const eInst = esmConstRes.targetSnippet ? `\`${esmConstRes.targetSnippet}\` (${esmConstRes.codeSize} B)` : 'N/A';
    const delta = (cjsConstRes.immediateInlined === esmConstRes.immediateInlined && cjsConstRes.codeSize === esmConstRes.codeSize)
      ? '✅ Identical'
      : '⚠️ Different';
    md += `| \`ESM\` | \`named\` | \`${esmFilename}\` | ${cBadge} | ${cInst} | ${eBadge} | ${eInst} | ${delta} |\n`;
  }

  md += `\n---\n\n`;

  // =========================================================================
  // Summary Statistics Table
  // =========================================================================
  md += `## Summary Statistics Across Combinations\n\n`;
  md += `| Combination | Inlined / Total | Optimization Rate |\n`;
  md += `| :--- | :---: | :---: |\n`;

  const comboStats = [];
  let grandTotal = 0;
  let grandInlined = 0;

  for (const combo of COMBINATIONS) {
    console.log(`\n\x1b[1;36m=== ${combo.label} ===\x1b[0m`);

    const relevantSuites = SUITES.filter(s => s.funcType === combo.funcType && s.constSource === combo.constSource);
    let comboTotal = 0;
    let comboInlined = 0;

    for (const suite of relevantSuites) {
      const consumerDir = join(repoRoot, 'consumers', combo.consumerType, combo.funcType, combo.constSource, suite.usageType);
      if (!existsSync(consumerDir)) continue;

      const files = readdirSync(consumerDir).sort();
      for (const file of files) {
        const res = resultsMap[combo.consumerType][combo.funcType][combo.constSource][suite.usageType][file];

        comboTotal++;
        grandTotal++;
        if (res.immediateInlined) {
          comboInlined++;
          grandInlined++;
        }

        const statusConsole = res.immediateInlined ? '\x1b[32mYES\x1b[0m' : '\x1b[31mNO \x1b[0m';
        console.log(`  [${suite.usageType.padEnd(7)}] ${file.padEnd(24)} | Inlined: ${statusConsole} | Size: ${(res.codeSize + 'B').padStart(5)} | ${res.targetSnippet}`);
      }
    }

    comboStats.push({ label: combo.label, inlined: comboInlined, total: comboTotal });
  }

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
  console.log(` 📁 Multi-Angle 3-Way Matrix saved to: results/${resultFileName}`);
  console.log(` 📍 Full path:                        ${resultFilePath}`);
  console.log('='.repeat(95));
}

main();



