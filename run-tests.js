const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

// Parse shard count
const shardCountArg = process.argv.find(a => a.startsWith("--shard="));
const shardCount = shardCountArg ? Number(shardCountArg.split("=")[1]) : 1;

console.log(`🚀 Running tests with ${shardCount} shards`);

const imageName = "playwright-tests";

// Ensure root report folder
const rootBlobDir = path.join(process.cwd(), "blob-report");
if (!fs.existsSync(rootBlobDir)) fs.mkdirSync(rootBlobDir);

// Build Docker image
console.log("🐳 Building docker image...");
run(`docker build -t ${imageName} .`);

// Generate docker compose dynamically
console.log("🧩 Generating docker-compose file...");

const compose = {
  services: {}
};

for (let i = 1; i <= shardCount; i++) {

  const shardReportDir = path.join(rootBlobDir, `shard${i}`);
  if (!fs.existsSync(shardReportDir)) fs.mkdirSync(shardReportDir);

  compose.services[`shard${i}`] = {
    image: imageName,
    container_name: `playwright-shard-${i}`,
    volumes: [
      `${shardReportDir}:/app/blob-report`
    ],
    command: `npm test -- --shard=${i}/${shardCount}`
  };
}

fs.writeFileSync(
  "docker-compose.yml",
  JSON.stringify(compose, null, 2)
);

console.log("🚦 Starting test execution...");
try {
  run("docker compose up --abort-on-container-exit");
} finally {
  console.log("🧹 Cleaning containers...");
  run("docker compose down");
}

console.log("📦 Merging reports...");

// Merge ALL shard reports at once
run(`npx playwright merge-reports blob-report --reporter html`);

console.log("\n🎉 HTML Report generated at:");
console.log("=> ./playwright-report/index.html");
