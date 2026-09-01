const fs = require('fs');
const path = require('path');

const dir = 'src/bestiario/creature/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove poteri block
  content = content.replace(/\npoteri:[\s\S]*?(?=\n---)/, '');
  
  // If this is one of the newly generated files, replace \n<br> with \n<br><br>\n
  if (file !== 'changeling.md' && file !== 'uomo-falena.md' && file !== 'sheepsquatch.md') {
    // Some might have <br> inside the line instead of at the start of the line, 
    // let's replace all <br> with \n<br><br>\n and then clean up multiple newlines.
    // Wait, the original format was \n<br>Text. So:
    content = content.replace(/\n<br>\s*/g, '\n<br><br>\n');
    content = content.replace(/<br>\s*(?!\n)/g, '\n<br><br>\n'); // if <br> is inline
  }
  
  fs.writeFileSync(filePath, content);
}
console.log('Fixed all files');
