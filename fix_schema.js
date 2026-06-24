const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'app_build/content_data/lessons');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
let updatedCount = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('"type": "quiz_card"')) {
    content = content.replace(/"type":\s*"quiz_card"/g, '"type": "interactive_check"');
    fs.writeFileSync(filePath, content);
    updatedCount++;
  }
}
console.log('Updated', updatedCount, 'files.');
