const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const shardArg = args.find(a => a.startsWith('--shards='));
const SHARDS = shardArg ? parseInt(shardArg.split('=')[1]) : 2;

const IMAGE = 'playwright-tests';

console.log(`🚀 Running tests with ${SHARDS} shards`);

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

// Build image
run(`docker build -t ${IMAGE} .`);

// Create compose file
let compose = `
version: "3.9"
services:
`;

for (let i = 1; i <= SHARDS; i++) {
  compose += `
  shard${i}:
    image: ${IMAGE}
    environment:
      SHARD_INDEX: ${i}
      TOTAL_SHARDS: ${SHARDS}
    volumes:
      - ./blob-report-${i}:/app/blob-report
    command: npx playwright test --shard=${i}/${SHARDS}
`;
}

fs.writeFileSync('docker-compose.yml', compose);

// Run containers
run(`docker-compose up --abort-on-container-exit`);

// Merge reports
console.log('📦 Merging reports...');
run(`npx playwright merge-reports blob-report-* --reporter html`);

console.log('✅ Done! Report available in playwright-report/');
