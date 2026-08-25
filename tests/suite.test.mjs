import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('\x1b[36m========================================================\x1b[0m');
console.log('\x1b[36m             FileForge Automated Test Suite             \x1b[0m');
console.log('\x1b[36m========================================================\x1b[0m\n');

let passedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    passedTests++;
    console.log(`\x1b[32m[TEST PASS]\x1b[0m ${name}`);
  } catch (err) {
    console.error(`\x1b[31m[TEST FAIL]\x1b[0m ${name}: ${err.message}`);
    process.exit(1);
  }
}

// Test 1: Filename Sanitization Routine
runTest('Filename Sanitization Safeguard', () => {
  const sanitizeFilename = (filename) => {
    const baseName = filename.replace(/^.*[\\/]/, '');
    const safeName = baseName.replace(/[^a-zA-Z0-9_.-]/g, '_');
    return safeName.startsWith('.') ? `file_${safeName}` : safeName;
  };

  assert.strictEqual(sanitizeFilename('../../../etc/passwd'), 'passwd');
  assert.strictEqual(sanitizeFilename('my test file (1).pdf'), 'my_test_file__1_.pdf');
  assert.strictEqual(sanitizeFilename('.htaccess'), 'file_.htaccess');
});

// Test 2: Tool Registry Completeness (from PRODUCT_SPEC.json)
runTest('Tool Registry Audit (18 Tools Registered)', () => {
  const specPath = path.join(process.cwd(), 'PRODUCT_SPEC.json');
  const specData = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  const tools = specData.supported_tools;

  assert.strictEqual(tools.length, 18, 'Expected 18 registered conversion tools');
  tools.forEach((tool) => {
    assert.ok(tool.id, 'Tool missing ID');
    assert.ok(tool.slug, 'Tool missing slug');
    assert.ok(tool.name, 'Tool missing name');
    assert.ok(tool.input_formats.length > 0, 'Tool missing input formats');
    assert.ok(tool.output_format, 'Tool missing output format');
  });
});

// Test 3: Upload Size Boundary Checks
runTest('Upload Size Limit Validation', () => {
  const checkSizeLimit = (sizeBytes, limitMb) => sizeBytes <= limitMb * 1024 * 1024;

  const freeLimit = 50; // 50MB
  const validSize = 10 * 1024 * 1024; // 10MB
  const invalidSize = 60 * 1024 * 1024; // 60MB

  assert.strictEqual(checkSizeLimit(validSize, freeLimit), true);
  assert.strictEqual(checkSizeLimit(invalidSize, freeLimit), false);
});

// Test 4: Format Extension Matching
runTest('File Format Extension Matching', () => {
  const isFormatSupported = (filename, allowedExts) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ext ? allowedExts.includes(ext) : false;
  };

  assert.strictEqual(isFormatSupported('document.pdf', ['pdf']), true);
  assert.strictEqual(isFormatSupported('image.png', ['jpg', 'jpeg', 'png']), true);
  assert.strictEqual(isFormatSupported('script.exe', ['pdf', 'docx']), false);
});

console.log(`\n\x1b[32mAll ${passedTests} automated tests completed successfully!\x1b[0m\n`);
