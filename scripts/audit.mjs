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
console.log('\x1b[36m   FileForge V2 Production Readiness & Audit Suite      \x1b[0m');
console.log('\x1b[36m========================================================\x1b[0m\n');

// 1. Production Build Compilation Check
try {
  console.log('Running TypeScript compilation & Vite build verification...');
  execSync('npm run build', { stdio: 'pipe' });
  logPass('Production build (`tsc -b && vite build`) completed cleanly with exit code 0');
} catch (err) {
  logFail(`Production build failed: ${err.message}`);
}

// 2. Required Core & V2 Specification Files Check
const requiredFiles = [
  { path: 'PRODUCT_SPEC.json', desc: 'Machine-readable product specification' },
  { path: 'public/PRODUCT_SPEC.json', desc: 'Public static product specification' },
  { path: 'routes.json', desc: 'Public route manifest' },
  { path: 'public/routes.json', desc: 'Public static route manifest' },
  { path: 'SECURITY.md', desc: 'Security specification & vulnerability protections' },
  { path: 'PROJECT_AUDIT.md', desc: 'Comprehensive technical & architectural audit' },
  { path: 'VERIFICATION.md', desc: 'Reviewer verification guide' },
  { path: 'IMPLEMENTATION_REPORT.md', desc: 'Definition of Done implementation report' },
  { path: 'CHANGELOG.md', desc: 'Changelog documentation' },
  { path: 'README.md', desc: 'Project documentation' },
  { path: 'public/robots.txt', desc: 'SEO robots crawler configuration' },
  { path: 'public/sitemap.xml', desc: 'SEO XML sitemap' },
  { path: 'vercel.json', desc: 'Vercel deployment & SPA rewrite configuration' },
  { path: 'api/health.ts', desc: 'Health API endpoint (/api/health)' },
  { path: 'api/capabilities.ts', desc: 'Capabilities API endpoint (/api/capabilities)' },
  { path: 'api/audit.ts', desc: 'Audit API endpoint (/api/audit)' },
  { path: 'api/stats.ts', desc: 'Stats & Telemetry API endpoint (/api/stats)' },
  { path: '.env.example', desc: 'Environment configuration template' },
];

requiredFiles.forEach((file) => {
  const fullPath = path.join(rootDir, file.path);
  if (fs.existsSync(fullPath)) {
    logPass(`Required file present: ${file.path} (${file.desc})`);
  } else {
    logFail(`Missing required file: ${file.path}`);
  }
});

// 3. PRODUCT_SPEC.json Integrity & Monetization Specification Check
try {
  const specContent = fs.readFileSync(path.join(rootDir, 'PRODUCT_SPEC.json'), 'utf8');
  const parsedSpec = JSON.parse(specContent);
  if (parsedSpec.name === 'FileForge' && Array.isArray(parsedSpec.supported_tools) && parsedSpec.supported_tools.length >= 18) {
    logPass(`PRODUCT_SPEC.json valid: ${parsedSpec.supported_tools.length} supported tools registered`);
  } else {
    logWarn('PRODUCT_SPEC.json parsed but may be missing required tool entries');
  }

  if (parsedSpec.monetization && parsedSpec.monetization.ads_enabled === false) {
    logPass('Monetization specification verified (`ads_enabled: false`)');
  } else {
    logFail('PRODUCT_SPEC.json missing monetization configuration');
  }
} catch (e) {
  logFail(`PRODUCT_SPEC.json parsing failed: ${e.message}`);
}

// 4. Route Manifest Check
try {
  const routeContent = fs.readFileSync(path.join(rootDir, 'routes.json'), 'utf8');
  const parsedRoutes = JSON.parse(routeContent);
  if (Array.isArray(parsedRoutes.routes) && parsedRoutes.routes.length >= 25) {
    logPass(`routes.json valid: ${parsedRoutes.routes.length} public routes registered`);
  } else {
    logWarn('routes.json parsed but route count is low');
  }
} catch (e) {
  logFail(`routes.json parsing failed: ${e.message}`);
}

// 5. index.html Inspection
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

// 6. Sitemap & Robots Validation
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
