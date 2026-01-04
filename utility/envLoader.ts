import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export function loadEnv() {
  const env = process.env.ENV || 'qa';
  const envFile = `${env}.env`;
  const envPath = path.resolve(envFile);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Loaded env file: ${envFile}`);
  } else {
    console.log(`⚠️ Env file not found (${envFile}), using process.env`);
  }
}
