#!/usr/bin/env node
/**
 * Generate TypeScript types from OpenAPI schema
 * This script fetches the OpenAPI schema from the backend and generates TypeScript types
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const OPENAPI_URL = `${BACKEND_URL}/openapi.json`;
const OUTPUT_FILE = path.join(__dirname, '../src/types/api.ts');

console.log('🔄 Generating API types from OpenAPI schema...');
console.log(`📡 Fetching schema from: ${OPENAPI_URL}`);

// Check if we should skip generation (e.g., during Docker build when API is not available)
const SKIP_IF_UNAVAILABLE = process.env.SKIP_API_TYPES_GENERATION === 'true' || process.env.CI === 'true';

try {
  // Ensure types directory exists
  const typesDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }

  // Generate types using openapi-typescript
  console.log('⚙️  Generating TypeScript types...');
  execSync(
    `npx openapi-typescript ${OPENAPI_URL} -o ${OUTPUT_FILE}`,
    { stdio: 'inherit' }
  );

  console.log('✅ API types generated successfully!');
  console.log(`📝 Types saved to: ${OUTPUT_FILE}`);
} catch (error) {
  console.error('⚠️  Warning: Could not generate API types:', error.message);
  console.error(`📡 Attempted to fetch from: ${OPENAPI_URL}`);
  
  // If types file doesn't exist and we can't generate, create a minimal one
  if (!fs.existsSync(OUTPUT_FILE)) {
    console.log('📝 Creating minimal types file...');
    const minimalTypes = `// Auto-generated API types
// Note: Could not fetch OpenAPI schema from ${OPENAPI_URL}
// Types will be generated on next successful build when API is available

export type paths = Record<string, any>;
export type components = Record<string, any>;
export type $defs = Record<string, any>;
`;
    fs.writeFileSync(OUTPUT_FILE, minimalTypes);
    console.log('✅ Created minimal types file');
  } else {
    console.log('✅ Using existing types file');
  }
  
  // Only exit with error if we're not in CI/Docker build mode
  if (!SKIP_IF_UNAVAILABLE) {
    console.error('\n💡 Make sure the backend is running at:', BACKEND_URL);
    console.error('💡 Or set SKIP_API_TYPES_GENERATION=true to skip during build');
    process.exit(1);
  } else {
    console.log('ℹ️  Skipping API type generation (CI/Docker build mode)');
    console.log('💡 Types will be generated when API is available');
  }
}

