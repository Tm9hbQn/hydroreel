const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'app_build/content_data/lessons');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const unenriched = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const data = JSON.parse(content);
  
  let hasDenseCarousel = false;
  let hasInteractiveCheck = false;
  let hasQuizCard = false;

  for (const bite of data.bites) {
    if (bite.type === 'flashcard_carousel' && bite.items && bite.items.length >= 4) {
      hasDenseCarousel = true;
    }
    if (bite.type === 'interactive_check') {
      hasInteractiveCheck = true;
    }
    if (bite.type === 'quiz_card') {
      hasQuizCard = true;
    }
  }

  // A file is considered "unenriched" if it still has a dense carousel 
  // OR if it hasn't been updated to interactive_check (still uses quiz_card)
  if (hasDenseCarousel || hasQuizCard) {
    unenriched.push(file);
  }
}

console.log("Unenriched files:");
console.log(unenriched.join('\n'));
