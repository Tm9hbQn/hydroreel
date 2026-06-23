const fs = require('fs');
const path = require('path');

const data = {
  "anatomy_01_muscles.json": [
    {
      "type": "quiz_card",
      "question": "איזה שריר אחראי על יישור הברך ונחשב מרכזי במניעת קריסה בנשיאת משקל?",
      "options": [
        { "text": "ארבע ראשי (Quadriceps)", "isCorrect": true, "feedback": "תשובה נכונה! הארבע ראשי קריטי ליישור הברך ונשיאת משקל." },
        { "text": "מיתר הברך (Hamstrings)", "isCorrect": false, "feedback": "ההמסטרינגס אחראים בעיקר על כיפוף הברך ופשיטת הירך." },
        { "text": "שרירי הליבה (Core)", "isCorrect": false, "feedback": "שרירי הליבה מייצבים את האגן ועמוד השדרה, אך לא מיישרים את הברך." },
        { "text": "תאומים (Gastrocnemius)", "isCorrect": false, "feedback": "התאומים אחראים על כיפוף כפי (פוינט) בקרסול וסיוע בכיפוף הברך." }
      ]
    },
    {
      "type": "quiz_card",
      "question": "כיצד כוח הציפה מסייע למטופל עם חולשה בארבע ראשי?",
      "options": [
        { "text": "מוריד עומס מהמפרק ומקל על נשיאת משקל", "isCorrect": true, "feedback": "נכון! כוח הציפה מאפשר נשיאת משקל פחותה, וכך מקל על השריר החלש לייצב את הברך." },
        { "text": "מגדיל את המשקל שהמטופל נושא", "isCorrect": false, "feedback": "להיפך, המים מפחיתים את המשקל האפקטיבי." },
        { "text": "מבטל לחלוטין את פעולת השרירים", "isCorrect": false, "feedback": "השרירים עדיין נדרשים לפעול לשם יציבות ותנועה, אם כי בעומס מופחת." },
        { "text": "מקשה על התנועה בשל צמיגות המים", "isCorrect": false, "feedback": "אמנם הצמיגות יוצרת התנגדות, אך עיקר הסיוע בנשיאת משקל נובע מכוח הציפה." }
      ]
    }
  ],
  "anatomy_02_joints.json": [
    {
      "type": "quiz_card",
      "question": "איזה סוג מפרק מאפשר את טווח התנועה הגדול ביותר (כדוגמת מפרק הירך)?",
      "options": [
        { "text": "מפרק כדורי (Ball and Socket)", "isCorrect": true, "feedback": "תשובה נכונה! מפרק כדורי מאפשר תנועה במרחב התלת-ממדי, כולל סיבוב." },
        { "text": "מפרק ציר (Hinge)", "isCorrect": false, "feedback": "מפרק ציר מאפשר תנועה בעיקר במישור אחד (כפיפה ופשיטה)." },
        { "text": "מפרק החלקה (Gliding)", "isCorrect": false, "feedback": "מפרק החלקה מאפשר תנועה מוגבלת מאוד של החלקה בין עצמות מישוריות." },
        { "text": "מפרק אוכף (Saddle)", "isCorrect": false, "feedback": "מפרק אוכף מאפשר תנועה בשני מישורים, אך פחותה ממפרק כדורי." }
      ]
    },
    {
      "type": "quiz_card",
      "question": "מהי הפעולה של 'הרחקה' (Abduction)?",
      "options": [
        { "text": "הרחקת הגפה מקו האמצע של הגוף", "isCorrect": true, "feedback": "נכון. כדוגמת הנפת הרגל הצידה כמו ב'כוכב מים'." },
        { "text": "הקטנת הזווית בין עצמות המפרק", "isCorrect": false, "feedback": "זוהי הגדרה של כפיפה (Flexion)." },
        { "text": "החזרת הגפה לקו האמצע של הגוף", "isCorrect": false, "feedback": "זוהי הגדרה של קירוב (Adduction)." },
        { "text": "הגדלת הזווית בין העצמות", "isCorrect": false, "feedback": "זוהי הגדרה של פשיטה (Extension)." }
      ]
    }
  ],
  "anatomy_03_proprioception.json": [
    {
      "type": "quiz_card",
      "question": "איזה כוח או תכונה של המים תורמת במיוחד לחיזוק תחושת הפרופריוצפציה?",
      "options": [
        { "text": "הלחץ ההידרוסטטי השווה מכל הכיוונים", "isCorrect": true, "feedback": "נכון. הלחץ מספק משוב תחושתי תמידי העוטף את הגוף כ'מחוך מגע'." },
        { "text": "כוח הציפה של המים", "isCorrect": false, "feedback": "כוח הציפה גורם לשינוי במשקל הגוף המורגש, אך התרומה העיקרית למשוב התחושתי היא מהלחץ." },
        { "text": "הזרמים ומערבולות המים", "isCorrect": false, "feedback": "זרמים תורמים לאתגור שיווי המשקל, אך המעטפת הסנסורית הרציפה נובעת מהלחץ ההידרוסטטי." },
        { "text": "טמפרטורת המים של 34 מעלות", "isCorrect": false, "feedback": "הטמפרטורה מסייעת בהרפיית השרירים והפאסיה, אך אינה הגורם הראשי למשוב הפרופריוצפטיבי." }
      ]
    },
    {
      "type": "quiz_card",
      "question": "כיצד סביבת המים תורמת למטופלי פרקינסון בכל הנוגע למערכת הוסטיבולרית?",
      "options": [
        { "text": "יוצרת חוסר יציבות בטוח המאלץ תיקוני שיווי משקל", "isCorrect": true, "feedback": "נכון מאוד! חוסר היציבות דורש תגובות שיווי משקל תכופות בסביבה המגינה מנפילה כואבת." },
        { "text": "מונעת מהם לזוז וכך מגינה מנפילות", "isCorrect": false, "feedback": "המים אינם מונעים תנועה; ההפך הוא הנכון." },
        { "text": "מבטלת לחלוטין את הלחץ על עמוד השדרה", "isCorrect": false, "feedback": "כוח הציפה מפחית את העומס על עמוד השדרה, אך אין בכך תרומה ספציפית למערכת הוסטיבולרית." },
        { "text": "גורמת לקפיאה תנועתית פחותה עקב החום בלבד", "isCorrect": false, "feedback": "החום מרפה, אך דווקא הדרישה לפעולה מול מים נעים היא שמגרה את המערכת." }
      ]
    }
  ],
  "movement_01_fitness.json": [
    {
      "type": "quiz_card",
      "question": "מהו היתרון המרכזי של אימון במים עבור מטופלים עם פגיעות מפרקיות?",
      "options": [
        { "text": "אימון התנגדות אקטיבי ללא אימפקט שלילי על המפרקים", "isCorrect": true, "feedback": "נכון! המים מאפשרים לבנות כוח תוך הגנה על המפרקים נושאי המשקל." },
        { "text": "המים חמים ומקטינים כאבים", "isCorrect": false, "feedback": "המים החמים אכן מקטינים כאב, אך היתרון באימון הכושר הוא הורדת האימפקט בזמן העמסה." },
        { "text": "המים גורמים להרפיית השרירים ללא צורך בהתנגדות", "isCorrect": false, "feedback": "אימון דורש התנגדות, והמים מספקים אותה בצורת גרר וצמיגות." },
        { "text": "המטופל יכול להרים משקולות כבדות יותר במים", "isCorrect": false, "feedback": "בדרך כלל אנו משתמשים בהתנגדות המים עצמם ולא במשקולות חיצוניות, מה גם שהמשקל הפעיל מופחת." }
      ]
    },
    {
      "type": "quiz_card",
      "question": "כיצד מומלץ לשלוט בעומס האימון למטופלי פיברומיאלגיה במים?",
      "options": [
        { "text": "שינוי מהירות התנועה תוך ניצול חוק הגרר", "isCorrect": true, "feedback": "מדויק. שליטה במהירות מאפשרת ויסות מושלם של ההתנגדות למניעת כאבים." },
        { "text": "הוספת משקולות חיצוניות כבדות", "isCorrect": false, "feedback": "העמסה מהירה מדי במשקולות עלולה להחמיר את כאבי השרירים במטופלים אלה." },
        { "text": "הארכת משך הטיפול לשעתיים ומעלה", "isCorrect": false, "feedback": "אימון יתר (Overtraining) עלול לגרום לתשישות קשה (DOMS)." },
        { "text": "שימוש במים קרים לשיכוך כאב", "isCorrect": false, "feedback": "ההעדפה היא מים חמים (33-34 מעלות) להרפיית מערכת העצבים והשרירים." }
      ]
    }
  ],
  "movement_02_swimming.json": [
    {
      "type": "quiz_card",
      "question": "איזו בעיה נפוצה יכולה להחמיר בעת שחיית חזה לא מותאמת (עם הוצאת הראש)?",
      "options": [
        { "text": "עומס על העורף אצל הסובלים מבלט דיסק צווארי", "isCorrect": true, "feedback": "נכון. הוצאת הראש החוצה מאלצת פשיטת-יתר של הצוואר, מה שעלול להחמיר בעיות דיסק." },
        { "text": "קושי בנשימה בשל הלחץ ההידרוסטטי", "isCorrect": false, "feedback": "הלחץ ההידרוסטטי אכן קיים, אך עומס צווארי היא הבעיה האורתופדית השכיחה ביותר כאן." },
        { "text": "הגברת אסימטריה במפרקי הירך", "isCorrect": false, "feedback": "שחיית חזה דורשת סימטריה, ולכן הבעיה היא הפוכה – היא לא מתאימה למי שאין לו סימטריה." },
        { "text": "פגיעה בשיווי המשקל במים", "isCorrect": false, "feedback": "שחיית חזה נחשבת לסגנון יחסית יציב וסימטרי." }
      ]
    },
    {
      "type": "quiz_card",
      "question": "מהי המטרה העיקרית של לימוד 'רוטציה סגיטלית' לפי שיטת הליוויק?",
      "options": [
        { "text": "בקרת שיווי משקל ועצמאות בטיחותית במים", "isCorrect": true, "feedback": "נכון. שליטה ברוטציה חיונית כדי שהמטופל ידע כיצד לחזור לעמידה בטוחה או למנח נשימה במים." },
        { "text": "שיפור מהירות השחייה בתחרויות", "isCorrect": false, "feedback": "שיטת הליוויק אינה מתמקדת בשחייה תחרותית אלא בבטיחות ועצמאות." },
        { "text": "חיזוק של שרירי הליבה בלבד", "isCorrect": false, "feedback": "שרירי הליבה מופעלים, אך המטרה היא פונקציונלית - בטיחות ושליטה." },
        { "text": "הימנעות מכניסת מים לאוזניים", "isCorrect": false, "feedback": "חלק מתהליך ההסתגלות הוא להרגיל את המטופל למים באוזניים ופנים." }
      ]
    }
  ],
  "movement_03_gait.json": [
    {
      "type": "quiz_card",
      "question": "מדוע סיכון הנפילה בסביבה מימית הופך למזערי במהלך הליכה?",
      "options": [
        { "text": "המים מאריכים את שלב ההליכה ומאטים את התנועה", "isCorrect": true, "feedback": "נכון. זמן התגובה המוארך (Slow Motion) מאפשר קליטה ותיקון של שגיאות תנועה." },
        { "text": "הלחץ ההידרוסטטי מחזיק את הקרסוליים במקומם כקיבוע", "isCorrect": false, "feedback": "הלחץ לא מקבע מפרקים אלא מקיף אותם, התנועה היא זו שמואטת על ידי הגרר." },
        { "text": "רפלקס המתיחה מנוטרל במים החמים", "isCorrect": false, "feedback": "החום מרפה שרירים, אך אינו מנטרל רפלקסים לחלוטין." },
        { "text": "המטופל מרגיש קל יותר בשל כוח הציפה", "isCorrect": false, "feedback": "כוח הציפה מסייע להליכה, אך סכנת הנפילה יורדת הודות לעיכוב והאטת הנפילה על ידי תמיכת המים." }
      ]
    },
    {
      "type": "quiz_card",
      "question": "כיצד ניתן לסייע למטופל עם 'דרופ פוט' (Drop Foot) בעזרת תכונות המים?",
      "options": [
        { "text": "שימוש בסנפיר קל היוצר גרר ומתקן את זווית הקרסול", "isCorrect": true, "feedback": "נכון! הסנפיר משתמש בהתנגדות המים כדי להעלות את כף הרגל במהלך שלב ההנפה." },
        { "text": "הליכה לאחור בלבד", "isCorrect": false, "feedback": "הליכה לאחור עובדת על פושטים, אך אינה פותרת את בעיית ה'דרופ פוט' בהכרח." },
        { "text": "חיבור משקולות לשוקיים כדי למשוך את הרגל למטה", "isCorrect": false, "feedback": "משקולות עלולות להגביר את הקושי ולהחמיר את הבעיה." },
        { "text": "שימוש במצופים על האגן להקלת משקל", "isCorrect": false, "feedback": "זה יעזור בנשיאת המשקל, אך לא לתיקון הפונקציונלי של הקרסול במהלך ההליכה." }
      ]
    }
  ],
  "methodology_01_lesson.json": [
    {
      "type": "quiz_card",
      "question": "מהי החשיבות של מטרות SMART בטיפול הידרותרפי?",
      "options": [
        { "text": "מדידה מדויקת והצבת יעדים ריאליים עם המטופל", "isCorrect": true, "feedback": "תשובה מדויקת! מטרה חייבת להיות ספציפית, מדידה ותחומה בזמן כדי שנוכל לאמוד הצלחה." },
        { "text": "הן מבטיחות שהמטופל יהנה יותר בטיפול", "isCorrect": false, "feedback": "למרות שחוויה חיובית חשובה, המטרה של SMART היא הצלחה קלינית מוגדרת." },
        { "text": "הן חוסכות זמן של רישום רפואי", "isCorrect": false, "feedback": "הגדרתן עשויה לדרוש רישום מדויק, אך הן מוודאות שהזמן מושקע נכון בשיקום." },
        { "text": "רלוונטיות רק למטופלים כרוניים ולא לשיקום זמני", "isCorrect": false, "feedback": "הן קריטיות גם ואף יותר בשיקום אורתופדי קצר מועד להשגת תוצאות מהירות." }
      ]
    },
    {
      "type": "quiz_card",
      "question": "מדוע מבנה שיעור ברור וצפוי (חימום, חלק עיקרי, הרפיה) הוא קריטי בטיפול שיקומי?",
      "options": [
        { "text": "מפחית חרדה, מעלה היענות לטיפול ומכין את הגוף לפעילות", "isCorrect": true, "feedback": "נכון מאוד! מבנה מאורגן מסייע לוויסות רגשי וגופני אצל המטופל." },
        { "text": "מאפשר למטפל לעבוד על אוטומט מבלי לחשוב", "isCorrect": false, "feedback": "המטפל נדרש לבחון ולהתאים מחדש בכל טיפול, אין עבודה 'על אוטומט'." },
        { "text": "חוסך זמן וכך ניתן לטפל ביותר מטופלים", "isCorrect": false, "feedback": "זמן הטיפול נשאר זהה, האיכות והמיקוד הם שמשתפרים." },
        { "text": "מגביר את קצב הלב מהר יותר", "isCorrect": false, "feedback": "חימום נועד להעלות את הקצב באופן הדרגתי ולאו דווקא מהר." }
      ]
    }
  ],
  "unit1_physics.json": [
    {
      "type": "quiz_card",
      "question": "לפי חוק ארכימדס, מה קורה לאדם העומד במים בגובה החזה?",
      "options": [
        { "text": "הוא נושא רק כ-30% ממשקל גופו", "isCorrect": true, "feedback": "תשובה נכונה. כוח הציפה העובד נגד הכבידה מפחית משמעותית את המשקל הנישא." },
        { "text": "הלחץ ההידרוסטטי על רגליו מתאפס", "isCorrect": false, "feedback": "הלחץ ההידרוסטטי רק הולך וגדל ככל שמעמיקים." },
        { "text": "משקלו מוגדל בגלל צפיפות המים", "isCorrect": false, "feedback": "משקל הגוף לא גדל במים." },
        { "text": "הוא מאבד לחלוטין את שיווי המשקל וצף", "isCorrect": false, "feedback": "בגובה החזה, יש עדיין מספיק משקל לקרקוע רגליים (כ-30%)." }
      ]
    },
    {
      "type": "quiz_card",
      "question": "כיצד ניתן להגדיל משמעותית את התנגדות המים בטיפול, בהתבסס על חוק הגרר?",
      "options": [
        { "text": "הגדלת מהירות התנועה - ההתנגדות עולה בריבוע (v²)", "isCorrect": true, "feedback": "נכון! כפל המהירות יעלה את ההתנגדות פי 4. זהו כלי טיפולי מרכזי לשינוי רמות הקושי." },
        { "text": "עבודה איטית מאוד מול הזרם", "isCorrect": false, "feedback": "עבודה איטית תוריד דרסטית את התנגדות הגרר." },
        { "text": "שימוש במים קרים יותר שצמיגותם שונה", "isCorrect": false, "feedback": "הצמיגות אכן משתנה קלות עם הטמפרטורה, אך זוהי לא דרך לשלוט בעומס תוך כדי אימון." },
        { "text": "שינוי עומק המים כך שהלחץ הידרוסטטי יהיה גבוה יותר", "isCorrect": false, "feedback": "לחץ הידרוסטטי לא משפיע ישירות על התנגדות לתנועה אופקית באותו האופן." }
      ]
    }
  ]
};

const basePath = path.join(__dirname, 'app_build', 'content_data', 'lessons');

for (const [filename, quizzes] of Object.entries(data)) {
  const filePath = path.join(basePath, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  
  let content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let bites = content.bites || [];
  
  // Find where to insert: before the first card of type "sequence_end_card", or at the end
  let insertIndex = bites.findIndex(bite => bite.type === 'sequence_end_card');
  if (insertIndex === -1) {
    insertIndex = bites.length;
  }
  
  // Sequence_title extraction
  let sequence_title = "מבדק סיום (Quiz)"; 
  if (insertIndex > 0) {
    sequence_title = bites[insertIndex - 1].sequence_title || sequence_title;
  } else if (bites.length > 0) {
    sequence_title = bites[bites.length - 1].sequence_title || sequence_title;
  }
  
  // Inject the quiz cards
  const toInsert = quizzes.map((q, idx) => ({
    bite_id: `q_${filename.replace('.json', '')}_${idx + 1}`,
    type: q.type,
    visual_trigger: "animation_quiz_time",
    title: "בחן את עצמך!",
    sequence_title: sequence_title,
    question: q.question,
    options: q.options
  }));
  
  bites.splice(insertIndex, 0, ...toInsert);
  content.bites = bites;
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`Updated ${filename} successfully with ${quizzes.length} quiz cards.`);
}
