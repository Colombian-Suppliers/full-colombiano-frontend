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
  console.error('❌ Error generating API types:', error.message);
  console.error('\n💡 Make sure the backend is running at:', BACKEND_URL);
  process.exit(1);
}

