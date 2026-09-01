const fs = require('fs');
const path = require('path');
const dir = 'src/bestiario/creature/';
for (let file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
  let c = fs.readFileSync(path.join(dir, file), 'utf8');
  c = c.replace(/(?:<br>\s*)+/g, '\n<br><br>\n');
  
  // also let's just make sure we don't have excessive newlines around <br><br>
  c = c.replace(/\n+(<br><br>)\n+/g, '\n$1\n');
  
  fs.writeFileSync(path.join(dir, file), c);
}
