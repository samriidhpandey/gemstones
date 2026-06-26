const fs = require('fs');
const path = require('path');

const galleryUrls = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Ruby-24535.jpg/1024px-Ruby-24535.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Amethyst_crystals_-_2.jpg/1024px-Amethyst_crystals_-_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Emerald_crystals_in_quartz.jpg/1024px-Emerald_crystals_in_quartz.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Sapphire-179308.jpg/1024px-Sapphire-179308.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Opal-244349.jpg/1024px-Opal-244349.jpg"
];

const featuredUrls = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_cristal.jpg/800px-Ruby_cristal.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Corundum-213936.jpg/800px-Corundum-213936.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Beryl_var_emerald.jpg/800px-Beryl_var_emerald.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Diamond_and_Graphite.jpg/800px-Diamond_and_Graphite.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Amethyst._Ametista.jpg/800px-Amethyst._Ametista.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Obsidian_Oregon.jpg/800px-Obsidian_Oregon.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Garnet_Andradite20.jpg/800px-Garnet_Andradite20.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Topaz-244243.jpg/800px-Topaz-244243.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Opal_-_Yowah%2C_Queensland%2C_Australia.jpg/800px-Opal_-_Yowah%2C_Queensland%2C_Australia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Citrine_-_Ouro_Preto%2C_Minas_Gerais%2C_Brazil.jpg/800px-Citrine_-_Ouro_Preto%2C_Minas_Gerais%2C_Brazil.jpg"
];

const dir = path.join(__dirname, 'public', 'gems');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function download(url, filename) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive"
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    fs.writeFileSync(path.join(dir, filename), buffer);
    console.log(`✅ Success: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`❌ Failed ${filename}:`, err.message);
  }
}

async function main() {
  console.log("Starting robust gemstone image downloads...");
  for (let i = 0; i < galleryUrls.length; i++) {
    await download(galleryUrls[i], `gallery-${i+1}.jpg`);
  }
  for (let i = 0; i < featuredUrls.length; i++) {
    await download(featuredUrls[i], `featured-${i+1}.jpg`);
  }
  console.log("All downloads finished. Please check your browser!");
}

main();
