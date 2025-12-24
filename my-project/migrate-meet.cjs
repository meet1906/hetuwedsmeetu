/**
 * MIGRATION SCRIPT: Meet Kankotri Lekhan
 */

const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

const CLOUDINARY_CONFIG = {
  cloud_name: 'dprfwfyhj',
  api_key: '928774434944795',
  api_secret: process.argv[2],
  secure: true
};

if (!CLOUDINARY_CONFIG.api_secret) {
  console.error('ERROR: Please provide your Cloudinary API Secret.');
  process.exit(1);
}

cloudinary.config(CLOUDINARY_CONFIG);

const SOURCE_IMAGES_FOLDER = './src/assets/Meet\'s Kankotri/compressed';
const TARGET_CLOUDINARY_FOLDER = 'wedding/meet-kankotri';

const crypto = require('crypto');

async function migrate() {
  console.log('🚀 Starting Migration for Meet Kankotri (using Fetch)...');
  
  const results = [];

  // 1. Upload Images
  if (!fs.existsSync(SOURCE_IMAGES_FOLDER)) {
    console.error(`ERROR: Source folder not found: ${SOURCE_IMAGES_FOLDER}`);
    process.exit(1);
  }

  const files = fs.readdirSync(SOURCE_IMAGES_FOLDER);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
      console.log(`Uploading ${file}...`);
      try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const folder = TARGET_CLOUDINARY_FOLDER;
        const public_id = path.parse(file).name;
        
        // Generate signature
        const signatureParams = `folder=${folder}&public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_CONFIG.api_secret}`;
        const signature = crypto.createHash('sha1').update(signatureParams).digest('hex');

        const formData = new URLSearchParams();
        formData.append('file', `data:image/jpeg;base64,${fs.readFileSync(path.join(SOURCE_IMAGES_FOLDER, file)).toString('base64')}`);
        formData.append('folder', folder);
        formData.append('public_id', public_id);
        formData.append('timestamp', timestamp);
        formData.append('api_key', CLOUDINARY_CONFIG.api_key);
        formData.append('signature', signature);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloud_name}/image/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error.message);

        results.push({ type: 'photo', src: data.public_id });
        console.log(`✅ Success: ${data.public_id}`);
      } catch (err) {
        console.error(`❌ Failed: ${file}`, err.message);
      }
    }
  }

  console.log('\n--- MIGRATION COMPLETE ---');
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

migrate();
