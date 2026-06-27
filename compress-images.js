const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public', 'hero-sequence');

async function processImages() {
  console.log('Starting compression. This might take a minute...');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dir, file);
    const webpPath = filePath.replace('.png', '.webp');
    
    // Compress and convert to webp (width 1280px is usually enough for hero sequences, and significantly smaller)
    await sharp(filePath)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(webpPath);
      
    // Delete the original 2MB PNG to save space
    fs.unlinkSync(filePath);
    
    if (i % 30 === 0) {
      console.log(`Processed ${i} / ${files.length} images...`);
    }
  }
  
  console.log('✅ All images compressed successfully!');
}

processImages().catch(console.error);
