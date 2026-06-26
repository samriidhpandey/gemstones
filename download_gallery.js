const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
  "https://images.unsplash.com/photo-1590400518776-88e5832a79eb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1601121853354-e6e866bd2aca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1588612143493-274e179e8ea6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a8f73f5006c?auto=format&fit=crop&w=1200&q=80"
];

const dir = path.join(__dirname, 'public', 'gallery');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

urls.forEach((url, i) => {
  const dest = path.join(dir, `gallery-${i+1}.jpg`);
  const file = fs.createWriteStream(dest);
  https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();  
      console.log(`Downloaded gallery-${i+1}.jpg`);
    });
  });
});
