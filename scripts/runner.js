import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setMask } from './set-mask.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

const SUITES = [
  {
    category: 'CJS Functions',
    section: 'CJS Function: Local Lexical Scope',
    funcPath: join(repoRoot, 'functions', 'cjs', 'local'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'cjs-local'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'cjs-local')
  },
  {
    category: 'CJS Functions',
    section: 'CJS Function: Internal CJS Constant -> Default Scalar',
    funcPath: join(repoRoot, 'functions', 'cjs', 'internal', 'default'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'cjs-internal-default'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'cjs-internal-default')
  },
  {
    category: 'CJS Functions',
    section: 'CJS Function: Internal CJS Constant -> Named Object',
    funcPath: join(repoRoot, 'functions', 'cjs', 'internal', 'named'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'cjs-internal-named'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'cjs-internal-named')
  },
  {
    category: 'CJS Functions',
    section: 'CJS Function: Cross ESM Constant (require ESM) -> Default Scalar',
    funcPath: join(repoRoot, 'functions', 'cjs', 'cross', 'default'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'cjs-cross-default'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'cjs-cross-default')
  },
  {
    category: 'CJS Functions',
    section: 'CJS Function: Cross ESM Constant (require ESM) -> Named Object',
    funcPath: join(repoRoot, 'functions', 'cjs', 'cross', 'named'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'cjs-cross-named'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'cjs-cross-named')
  },
  {
    category: 'ESM Functions',
    section: 'ESM Function: Local Lexical Scope',
    funcPath: join(repoRoot, 'functions', 'esm', 'local'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'esm-local'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'esm-local')
  },
  {
    category: 'ESM Functions',
    section: 'ESM Function: Internal ESM Constant -> Default Scalar',
    funcPath: join(repoRoot, 'functions', 'esm', 'internal', 'default'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'esm-internal-default'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'esm-internal-default')
  },
  {
    category: 'ESM Functions',
    section: 'ESM Function: Internal ESM Constant -> Named Binding',
    funcPath: join(repoRoot, 'functions', 'esm', 'internal', 'named'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'esm-internal-named'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'esm-internal-named')
  },
  {
    category: 'ESM Functions',
    section: 'ESM Function: Cross CJS Constant (import CJS) -> Default Scalar',
    funcPath: join(repoRoot, 'functions', 'esm', 'cross', 'default'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'esm-cross-default'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'esm-cross-default')
  },
  {
    category: 'ESM Functions',
    section: 'ESM Function: Cross CJS Constant (import CJS) -> Named Binding',
    funcPath: join(repoRoot, 'functions', 'esm', 'cross', 'named'),
    cjsConsumerPath: join(repoRoot, 'consumers', 'cjs', 'esm-cross-named'),
    esmConsumerPath: join(repoRoot, 'consumers', 'esm', 'esm-cross-named')
  }
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

  console.log('='.repeat(90));
  console.log(` V8 TURBOFAN 3-WAY CONSTANT INLINING ANALYSIS (MASK = ${activeMask})`);
  console.log(` Constants x Functions (50 Cases) x Consumers (CJS & ESM = 100 Total Runs)`);
  console.log(` Platform: ${platformArch} | Node: ${process.version} | V8: ${process.versions.v8}`);
  console.log('='.repeat(90));
  console.log();

  let md = `# TurboFan 3-Way Constant Inlining Matrix (MASK = ${activeMask})\n\n`;
  md += `Tested on Node.js \`${process.version}\` (V8 \`${process.versions.v8}\`, Platform: \`${platformArch}\`)\n\n`;
  md += `**Matrix Structure**: 50 Function Implementations $\\times$ 2 Consumer Module Types (CommonJS \`.cjs\` vs ESM \`.mjs\`) = **100 Executed Test Cases**.\n\n`;

  md += `## 3-Way Comparison Matrix (CJS vs ESM Consumers)\n\n`;
  md += `| Suite / Function Case | Func Ext | CJS Consumer Inlined? | CJS Instruction (Size) | ESM Consumer Inlined? | ESM Instruction (Size) |\n`;
  md += `| :--- | :---: | :---: | :--- | :---: | :--- |\n`;

  const detailedCjsMd = [];
  const detailedEsmMd = [];

  let totalRuns = 0;
  let cjsInlinedCount = 0;
  let esmInlinedCount = 0;

  for (const suite of SUITES) {
    if (!existsSync(suite.funcPath)) continue;

    const funcFiles = readdirSync(suite.funcPath).sort();

    console.log(`\n\x1b[1m--- ${suite.section} (${funcFiles.length} cases) ---\x1b[0m`);

    let sectionCjsMd = `### ${suite.section}\n\n`;
    sectionCjsMd += `| Test File | Inlined? | Target Instruction | Code Size | Notes |\n`;
    sectionCjsMd += `| :--- | :---: | :--- | :---: | :--- |\n`;

    let sectionEsmMd = `### ${suite.section}\n\n`;
    sectionEsmMd += `| Test File | Inlined? | Target Instruction | Code Size | Notes |\n`;
    sectionEsmMd += `| :--- | :---: | :--- | :---: | :--- |\n`;

    for (const funcFile of funcFiles) {
      const baseName = funcFile.replace(/\.(mjs|cjs)$/, '');
      const cjsConsumerFile = `${baseName}.cjs`;
      const esmConsumerFile = `${baseName}.mjs`;

      const cjsConsumerFullPath = join(suite.cjsConsumerPath, cjsConsumerFile);
      const esmConsumerFullPath = join(suite.esmConsumerPath, esmConsumerFile);

      const cjsRes = analyzeTestCase(cjsConsumerFullPath);
      const esmRes = analyzeTestCase(esmConsumerFullPath);

      totalRuns += 2;
      if (cjsRes.immediateInlined) cjsInlinedCount++;
      if (esmRes.immediateInlined) esmInlinedCount++;

      // Badges
      const cjsBadge = cjsRes.immediateInlined ? '✅ **YES**' : '❌ **NO**';
      const esmBadge = esmRes.immediateInlined ? '✅ **YES**' : '❌ **NO**';

      const cjsInst = cjsRes.targetSnippet ? `\`${cjsRes.targetSnippet}\` (${cjsRes.codeSize || 'N/A'} B)` : 'N/A';
      const esmInst = esmRes.targetSnippet ? `\`${esmRes.targetSnippet}\` (${esmRes.codeSize || 'N/A'} B)` : 'N/A';

      const funcExt = funcFile.endsWith('.cjs') ? 'CJS' : 'ESM';

      md += `| \`${suite.section.split(':')[1]?.trim() || suite.section}\` / \`${funcFile}\` | \`${funcExt}\` | ${cjsBadge} | ${cjsInst} | ${esmBadge} | ${esmInst} |\n`;

      // Console logging
      const cjsStatus = cjsRes.immediateInlined ? '\x1b[32mYES\x1b[0m' : '\x1b[31mNO \x1b[0m';
      const esmStatus = esmRes.immediateInlined ? '\x1b[32mYES\x1b[0m' : '\x1b[31mNO \x1b[0m';
      console.log(`  ${funcFile.padEnd(24)} | CJS Consumer: ${cjsStatus} (${(cjsRes.codeSize + 'B').padStart(5)}) | ESM Consumer: ${esmStatus} (${(esmRes.codeSize + 'B').padStart(5)})`);

      // Section tables
      sectionCjsMd += `| \`${cjsConsumerFile}\` | ${cjsBadge} | \`${cjsRes.targetSnippet}\` | ${cjsRes.codeSize ? cjsRes.codeSize + ' B' : 'N/A'} | ${cjsRes.note || 'N/A'} |\n`;
      sectionEsmMd += `| \`${esmConsumerFile}\` | ${esmBadge} | \`${esmRes.targetSnippet}\` | ${esmRes.codeSize ? esmRes.codeSize + ' B' : 'N/A'} | ${esmRes.note || 'N/A'} |\n`;
    }

    detailedCjsMd.push(sectionCjsMd);
    detailedEsmMd.push(sectionEsmMd);
  }

  md += `\n---\n\n## Summary Statistics\n\n`;
  md += `- **Total Cases Tested**: ${totalRuns} (${totalRuns / 2} Function Variants $\\times$ 2 Consumers)\n`;
  md += `- **CJS Consumers Inlined**: ${cjsInlinedCount} / ${totalRuns / 2} (${Math.round((cjsInlinedCount / (totalRuns / 2)) * 100)}%)\n`;
  md += `- **ESM Consumers Inlined**: ${esmInlinedCount} / ${totalRuns / 2} (${Math.round((esmInlinedCount / (totalRuns / 2)) * 100)}%)\n\n`;

  md += `---\n\n## Detailed Breakdown: CommonJS Consumers (\`.cjs\`)\n\n`;
  md += detailedCjsMd.join('\n');

  md += `\n---\n\n## Detailed Breakdown: ESM Consumers (\`.mjs\`)\n\n`;
  md += detailedEsmMd.join('\n');

  // Save report to results/<mask_hex>.md
  const resultsDir = join(repoRoot, 'results');
  if (!existsSync(resultsDir)) {
    mkdirSync(resultsDir, { recursive: true });
  }

  const safeMaskName = activeMask.replace(/[^a-zA-Z0-9_#-]/g, '_');
  const resultFileName = `${safeMaskName}.md`;
  const resultFilePath = join(resultsDir, resultFileName);

  writeFileSync(resultFilePath, md, 'utf-8');

  console.log('\n' + '='.repeat(90));
  console.log(` 📁 3-Way Matrix saved to: results/${resultFileName}`);
  console.log(` 📍 Full path:            ${resultFilePath}`);
  console.log('='.repeat(90));
}

main();

