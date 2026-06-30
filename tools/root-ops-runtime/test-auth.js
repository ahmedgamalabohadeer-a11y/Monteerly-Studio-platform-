require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
console.log("Checking key at:", keyPath);

if (fs.existsSync(keyPath)) {
    console.log("✅ Success: Key file found and accessible!");
    const content = JSON.parse(fs.readFileSync(keyPath));
    console.log("✅ Project ID from key:", content.project_id);
} else {
    console.error("❌ Error: Key file NOT found at the specified path.");
}
