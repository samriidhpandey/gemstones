const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'ezgif-8aa7b9858e683248-png-split (1)');
const targetDir = path.join(__dirname, 'public', 'hero-sequence');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Read all files
const files = fs.readdirSync(sourceDir);

console.log(`Copying ${files.length} frames to public/hero-sequence...`);

files.forEach(file => {
  if (file.endsWith('.png')) {
    const sourcePath = path.join(sourceDir, file);
    // Rename to a simpler format: 001.png, 002.png etc.
    const newName = file.replace('ezgif-frame-', '');
    const targetPath = path.join(targetDir, newName);
    
    fs.copyFileSync(sourcePath, targetPath);
  }
});

console.log('Successfully copied and renamed all frames!');
