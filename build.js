const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const www = path.join(__dirname, 'www');
if (fs.existsSync(www)) {
  fs.rmSync(www, { recursive: true, force: true });
}
fs.mkdirSync(www, { recursive: true });

const filesToCopy = ['index.html', 'manifest.json', 'sw.js', 'bip39_wordlist.js'];
for (const file of filesToCopy) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(www, file));
  }
}

const dirsToCopy = ['vendor', 'icons'];
for (const dir of dirsToCopy) {
  if (fs.existsSync(dir)) {
    copyDir(dir, path.join(www, dir));
  }
}

console.log('Web directory "www" prepared successfully for Capacitor.');
