/**
 * MIGRATION SCRIPT: Hetvi Kankotri Lekhan
 */

const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

const CLOUDINARY_CONFIG = {
  cloud_name: 'dprfwfyhj',
  api_key: '928774434944795',
  api_secret: process.argv[2] 
};

if (!CLOUDINARY_CONFIG.api_secret) {
  console.error('ERROR: Please provide your Cloudinary API Secret.');
  process.exit(1);
}

cloudinary.config(CLOUDINARY_CONFIG);

const SOURCE_IMAGES_FOLDER = './src/assets/Hetu\'s kankotri/compressed';
const VIDEO_REEL_PATH = './src/assets/Hetu\'s kankotri/Hetvi KANKOTRI REEL.mp4';
const TARGET_CLOUDINARY_FOLDER = 'wedding/hetvi-kankotri';

async function migrate() {
  console.log('🚀 Starting Migration for Hetvi Kankotri...');
  
  const results = [];

  // 1. Upload Video Reel
  if (fs.existsSync(VIDEO_REEL_PATH)) {
    console.log(`Uploading Video Reel: ${VIDEO_REEL_PATH}...`);
    try {
      const res = await cloudinary.uploader.upload(VIDEO_REEL_PATH, {
        folder: TARGET_CLOUDINARY_FOLDER,
        resource_type: 'video',
        use_filename: true,
        unique_filename: false,
        timeout: 300000 // 5 minutes for large video
      });
      results.push({ type: 'video', src: res.public_id });
      console.log(`✅ Success (Video): ${res.public_id}`);
    } catch (err) {
      console.error(`❌ Failed (Video): ${VIDEO_REEL_PATH}`, err);
    }
  }

  // 2. Upload Images
  const files = fs.readdirSync(SOURCE_IMAGES_FOLDER);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
      console.log(`Uploading ${file}...`);
      try {
        const res = await cloudinary.uploader.upload(path.join(SOURCE_IMAGES_FOLDER, file), {
          folder: TARGET_CLOUDINARY_FOLDER,
          resource_type: 'image',
          use_filename: true,
          unique_filename: false,
          timeout: 120000 // 120 seconds
        });
        results.push({ type: 'photo', src: res.public_id });
        console.log(`✅ Success: ${res.public_id}`);
      } catch (err) {
        console.error(`❌ Failed: ${file}`, err);
      }
    }
  }

  console.log('\n--- MIGRATION COMPLETE ---');
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

migrate();
