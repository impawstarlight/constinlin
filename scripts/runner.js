import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setMask } from './set-mask.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

const SUITES = [
  { section: 'CJS: Local (Same File)', path: join(repoRoot, 'cjs', 'local') },
  { section: 'CJS: Internal -> Default Scalar', path: join(repoRoot, 'cjs', 'internal', 'default') },
  { section: 'CJS: Internal -> Named Object', path: join(repoRoot, 'cjs', 'internal', 'named') },
  { section: 'CJS: Cross (require ESM) -> Default Scalar', path: join(repoRoot, 'cjs', 'cross', 'default') },
  { section: 'CJS: Cross (require ESM) -> Named Object', path: join(repoRoot, 'cjs', 'cross', 'named') },
  { section: 'ESM: Local (Same File)', path: join(repoRoot, 'esm', 'local') },
  { section: 'ESM: Internal -> Default Scalar', path: join(repoRoot, 'esm', 'internal', 'default') },
  { section: 'ESM: Internal -> Named Binding', path: join(repoRoot, 'esm', 'internal', 'named') },
  { section: 'ESM: Cross (import CJS) -> Default Scalar', path: join(repoRoot, 'esm', 'cross', 'default') },
  { section: 'ESM: Cross (import CJS) -> Named Binding', path: join(repoRoot, 'esm', 'cross', 'named') }
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
    const defaultCjs = readFileSync(join(repoRoot, 'cjs', 'constants', 'default.cjs'), 'utf-8');
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
  // Use process.execPath for reliable cross-platform execution on Windows, macOS, and Linux
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

  // Multi-architecture Inlining Detection:
  // - x86_64: movzxwl / movzwl (16-bit), movzxbl / movzbl (8-bit), andl/andq <reg>, <imm>
  // - ARM64 (Apple Silicon / AArch64): uxth (16-bit), uxtb (8-bit), and <reg>, <reg>, #<imm>, ubfx/ubfm
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

  console.log('='.repeat(80));
  console.log(` V8 TURBOFAN CONSTANT INLINING ANALYSIS (MASK = ${activeMask})`);
  console.log(` Platform: ${platformArch} | Node: ${process.version} | V8: ${process.versions.v8}`);
  console.log('='.repeat(80));
  console.log();

  let md = `# TurboFan Constant Inlining Matrix (MASK = ${activeMask})\n\n`;
  md += `Tested on Node.js \`${process.version}\` (V8 \`${process.versions.v8}\`, Platform: \`${platformArch}\`)\n\n`;

  for (const suite of SUITES) {
    if (!existsSync(suite.path)) continue;

    const files = readdirSync(suite.path)
      .filter(f => f.endsWith('.cjs') || f.endsWith('.mjs'))
      .sort();

    console.log(`\n--- ${suite.section} ---`);
    md += `### ${suite.section}\n\n`;
    md += `| Test File | Inlined? | Target Instruction | Code Size | Notes |\n`;
    md += `| :--- | :---: | :--- | :---: | :--- |\n`;

    for (const file of files) {
      const fullPath = join(suite.path, file);
      const res = analyzeTestCase(fullPath);

      const inlinedBadge = res.immediateInlined ? '✅ **YES**' : '❌ **NO**';
      const size = res.codeSize ? `${res.codeSize} B` : 'N/A';
      const instruction = res.targetSnippet ? `\`${res.targetSnippet}\`` : 'N/A';
      const note = res.note || 'N/A';

      const statusStr = res.immediateInlined ? 'YES (Inlined)' : 'NO (Dynamic Load)';
      const sizeStr = res.codeSize ? `${res.codeSize} B` : 'N/A';
      console.log(`  ${file.padEnd(24)} | ${statusStr.padEnd(18)} | Size: ${sizeStr.padStart(5)} | ${res.targetSnippet}`);

      md += `| \`${file}\` | ${inlinedBadge} | ${instruction} | ${size} | ${note} |\n`;
    }

    md += `\n`;
  }

  // Save report to results/<mask_hex>.md
  const resultsDir = join(repoRoot, 'results');
  if (!existsSync(resultsDir)) {
    mkdirSync(resultsDir, { recursive: true });
  }

  const safeMaskName = activeMask.replace(/[^a-zA-Z0-9_#-]/g, '_');
  const resultFileName = `${safeMaskName}.md`;
  const resultFilePath = join(resultsDir, resultFileName);

  writeFileSync(resultFilePath, md, 'utf-8');

  console.log('\n' + '='.repeat(80));
  console.log(` 📁 Matrix saved to: results/${resultFileName}`);
  console.log(` 📍 Full path:       ${resultFilePath}`);
  console.log('='.repeat(80));
}

main();
