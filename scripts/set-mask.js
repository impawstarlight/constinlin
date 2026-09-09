import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

/**
 * Updates constant mask definitions across all relevant test cases and constants files.
 *
 * @param {string} newMask - The new mask representation (e.g. '0xFFFF', '0xFF', '0x1234')
 * @returns {number} Number of files successfully modified.
 */
export function setMask(newMask) {
  if (!newMask || typeof newMask !== 'string') {
    throw new Error('A valid mask string is required (e.g. 0xFFFF, 0xFF, 0x1234)');
  }

  // 1. Module export definition files
  const constantFiles = [
    join(repoRoot, 'constants', 'cjs', 'default.cjs'),
    join(repoRoot, 'constants', 'cjs', 'named.cjs'),
    join(repoRoot, 'constants', 'esm', 'default.mjs'),
    join(repoRoot, 'constants', 'esm', 'named.mjs'),
  ];

  // 2. Literal function definition files where the mask is encoded directly in the return statement
  const literalFiles = [
    join(repoRoot, 'functions', 'cjs', 'cjs', 'local', '01-literal.cjs'),
    join(repoRoot, 'functions', 'esm', 'esm', 'local', '01-literal.mjs'),
  ];

  // 3. Local function definition files with lexical declarations (function / top const/var/let)
  const localDeclFiles = [
    join(repoRoot, 'functions', 'cjs', 'cjs', 'local', '02-func-const.cjs'),
    join(repoRoot, 'functions', 'cjs', 'cjs', 'local', '03-func-var.cjs'),
    join(repoRoot, 'functions', 'cjs', 'cjs', 'local', '04-func-let.cjs'),
    join(repoRoot, 'functions', 'cjs', 'cjs', 'local', '05-top-const.cjs'),
    join(repoRoot, 'functions', 'cjs', 'cjs', 'local', '06-top-var.cjs'),
    join(repoRoot, 'functions', 'cjs', 'cjs', 'local', '07-top-let.cjs'),
    join(repoRoot, 'functions', 'esm', 'esm', 'local', '02-func-const.mjs'),
    join(repoRoot, 'functions', 'esm', 'esm', 'local', '03-func-var.mjs'),
    join(repoRoot, 'functions', 'esm', 'esm', 'local', '04-func-let.mjs'),
    join(repoRoot, 'functions', 'esm', 'esm', 'local', '05-top-const.mjs'),
    join(repoRoot, 'functions', 'esm', 'esm', 'local', '06-top-var.mjs'),
    join(repoRoot, 'functions', 'esm', 'esm', 'local', '07-top-let.mjs'),
  ];

  let updatedCount = 0;

  // Process constants definitions
  for (const file of constantFiles) {
    if (!existsSync(file)) continue;
    let content = readFileSync(file, 'utf-8');
    content = content.replace(/(export\s+)?(const|var|let)\s+MASK\s*=\s*[^;]+;/g, (match, exp, decl) => {
      return `${exp || ''}${decl} MASK = ${newMask};`;
    });
    writeFileSync(file, content, 'utf-8');
    updatedCount++;
  }

  // Process literal test files
  for (const file of literalFiles) {
    if (!existsSync(file)) continue;
    let content = readFileSync(file, 'utf-8');
    content = content.replace(/return\s+x\s*&\s*[^;]+;/g, `return x & ${newMask};`);
    writeFileSync(file, content, 'utf-8');
    updatedCount++;
  }

  // Process local declaration files (preserving `return x & MASK;`)
  for (const file of localDeclFiles) {
    if (!existsSync(file)) continue;
    let content = readFileSync(file, 'utf-8');
    content = content.replace(/(const|var|let)\s+MASK\s*=\s*[^;]+;/g, `$1 MASK = ${newMask};`);
    content = content.replace(/return\s+x\s*&\s*[^;]+;/g, 'return x & MASK;');
    writeFileSync(file, content, 'utf-8');
    updatedCount++;
  }

  return updatedCount;
}

// CLI Execution Entry Point
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const maskArg = process.argv[2];
  if (!maskArg) {
    console.error('Usage: npm run set-mask <mask_value>');
    console.error('Example: npm run set-mask 0xFFFF');
    console.error('Example: npm run set-mask 0xFF');
    console.error('Example: npm run set-mask 0x1234');
    process.exit(1);
  }

  try {
    const updatedCount = setMask(maskArg);
    console.log(`\x1b[32m✔ Successfully updated mask to ${maskArg} across ${updatedCount} files.\x1b[0m`);
    console.log(`Run \x1b[36mnpm run matrix\x1b[0m to run the analysis matrix and update results.`);
  } catch (err) {
    console.error(`\x1b[31m✖ Failed to update mask:\x1b[0m ${err.message}`);
    process.exit(1);
  }
}
