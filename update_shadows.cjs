const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('C:\\Users\\code\\udghosh_unosq\\components\\sections', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    let original = content;
    content = content.replace(/hover:shadow-card-hover/g, "hover:shadow-card-hover hover:-translate-y-2");
    content = content.replace(/hover:-translate-y-2 hover:-translate-y-2/g, "hover:-translate-y-2");
    
    content = content.replace(/transition-shadow/g, "transition-all duration-300");
    content = content.replace(/transition-\[box-shadow\]/g, "transition-all");
    
    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated ' + filePath);
    }
  }
});
