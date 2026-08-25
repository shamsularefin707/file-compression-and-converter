import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
let passCount = 0;
let warnCount = 0;
let failCount = 0;

function logPass(msg) {
  passCount++;
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

function logWarn(msg) {
  warnCount++;
  console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`);
}

function logFail(msg) {
  failCount++;
  console.log(`\x1b[31m[FAIL]\x1b[0m ${msg}`);
}

console.log('\x1b[36m========================================================\x1b[0m');
console.log('\x1b[36m   FileForge Production Readiness & Security Audit      \x1b[0m');
console.log('\x1b[36m========================================================\x1b[0m\n');

// 1. Build Verification
try {
  console.log('Running TypeScript compilation & Vite build verification...');
  execSync('npm run build', { stdio: 'pipe' });
  logPass('Production build (`tsc -b && vite build`) completed cleanly with exit code 0');
} catch (err) {
  logFail(`Production build failed: ${err.message}`);
}

// 2. Required File Existence Checks
const requiredFiles = [
  { path: 'PRODUCT_SPEC.json', desc: 'Machine-readable product specification' },
  { path: 'SECURITY.md', desc: 'Security specification & vulnerability protections' },
  { path: 'PROJECT_AUDIT.md', desc: 'Comprehensive technical & architectural audit' },
  { path: 'public/robots.txt', desc: 'SEO robots crawler configuration' },
  { path: 'public/sitemap.xml', desc: 'SEO XML sitemap' },
  { path: 'vercel.json', desc: 'Vercel deployment & SPA rewrite configuration' },
  { path: 'api/health.ts', desc: 'Health endpoint (/api/health)' },
  { path: 'api/capabilities.ts', desc: 'Capabilities endpoint (/api/capabilities)' },
  { path: '.env.example', desc: 'Environment template' },
];

requiredFiles.forEach((file) => {
  const fullPath = path.join(rootDir, file.path);
  if (fs.existsSync(fullPath)) {
    logPass(`Required file present: ${file.path} (${file.desc})`);
  } else {
    logFail(`Missing required file: ${file.path}`);
  }
});

// 3. PRODUCT_SPEC.json Integrity Check
try {
  const specContent = fs.readFileSync(path.join(rootDir, 'PRODUCT_SPEC.json'), 'utf8');
  const parsedSpec = JSON.parse(specContent);
  if (parsedSpec.name === 'FileForge' && Array.isArray(parsedSpec.supported_tools) && parsedSpec.supported_tools.length >= 18) {
    logPass(`PRODUCT_SPEC.json valid: ${parsedSpec.supported_tools.length} supported tools registered`);
  } else {
    logWarn('PRODUCT_SPEC.json parsed but may be missing required tool entries');
  }
} catch (e) {
  logFail(`PRODUCT_SPEC.json parsing failed: ${e.message}`);
}

// 4. index.html Inspection
try {
  const htmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  if (htmlContent.includes('<title>') && htmlContent.includes('<h1>')) {
    logPass('index.html contains pre-rendered title and H1 heading tags for crawlers');
  } else {
    logFail('index.html is missing pre-rendered title or H1 heading tags');
  }

  if (htmlContent.includes('<meta name="description"')) {
    logPass('index.html contains meta description tag');
  } else {
    logFail('index.html is missing meta description tag');
  }

  if (htmlContent.includes('application/ld+json')) {
    logPass('index.html contains embedded JSON-LD schema');
  } else {
    logFail('index.html is missing JSON-LD schema script');
  }

  if (htmlContent.includes('<noscript>')) {
    logPass('index.html contains noscript fallback for non-JS text crawlers');
  } else {
    logWarn('index.html missing noscript tag fallback');
  }
} catch (e) {
  logFail(`index.html reading failed: ${e.message}`);
}

// 5. Sitemap & Robots validation
try {
  const robots = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf8');
  if (robots.includes('GPTBot') && robots.includes('Sitemap:')) {
    logPass('robots.txt explicitly allows GPTBot and references sitemap.xml');
  } else {
    logWarn('robots.txt missing explicit GPTBot rule or Sitemap reference');
  }
} catch (e) {
  logFail(`robots.txt reading failed: ${e.message}`);
}

// Summary Output
console.log('\n--------------------------------------------------------');
console.log(`AUDIT RESULT: ${passCount} PASS, ${warnCount} WARN, ${failCount} FAIL`);
console.log('--------------------------------------------------------\n');

if (failCount > 0) {
  console.error('Audit failed with critical errors!');
  process.exit(1);
} else {
  console.log('Audit completed successfully!');
  process.exit(0);
}
