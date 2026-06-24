const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'app_build/content_data/lessons');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let raw = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    continue;
  }
  
  let modified = false;
  
  if (data.bites && Array.isArray(data.bites)) {
    for (let bite of data.bites) {
      // Look for interactive_check (or quiz_card that might have been skipped)
      if ((bite.type === 'interactive_check' || bite.type === 'quiz_card') && bite.options && bite.options.length > 0 && typeof bite.options[0] === 'object') {
        
        let correctIndex = 0;
        let explanation = "התשובה הנכונה נבחרה.";
        
        const newOptions = bite.options.map((opt, i) => {
          if (opt.isCorrect) {
            correctIndex = i;
            if (opt.feedback) explanation = opt.feedback;
          }
          return opt.text || opt.label || "Option";
        });
        
        bite.type = 'interactive_check';
        bite.options = newOptions;
        bite.correct_index = correctIndex;
        bite.explanation = explanation;
        modified = true;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    updatedCount++;
  }
}

console.log('Migrated schema in', updatedCount, 'files.');
