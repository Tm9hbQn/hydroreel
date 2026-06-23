const fs = require('fs');
const path = require('path');

const targetFiles = [
  'pediatrics_01_development.json',
  'pediatrics_02_dcd.json',
  'pediatrics_03_adhd.json',
  'pediatrics_04_asd.json',
  'pediatrics_05_syndromes.json',
  'physiology_01_cardio.json',
  'physiology_02_renal.json',
  'physiology_03_respiratory.json',
  'physiology_04_neuro.json',
  'physiology_05_diabetes.json'
];

const dirPath = path.join(__dirname, 'app_build', 'content_data', 'lessons');

const quizData = {
  pediatrics_01_development: [
    {
      question: "מאיזה גיל מתחיל התינוק לפתח יכולת ישיבה עצמאית (ללא תמיכה)?",
      options: [
        { text: "3-4 חודשים", isCorrect: false, feedback: "בגיל זה יש שליטת ראש אך לא ישיבה." },
        { text: "6-8 חודשים", isCorrect: true, feedback: "בשלב זה שרירי הליבה מפותחים דיים לישיבה." },
        { text: "10-12 חודשים", isCorrect: false, feedback: "בגיל זה כבר מתחילים לעמוד וללכת." },
        { text: "חודש-חודשיים", isCorrect: false, feedback: "בשלב זה התנועות עדיין רפלקסיביות בעיקר." }
      ]
    },
    {
      question: "כיצד סביבת המים תורמת להתפתחות מוטורית של תינוקות?",
      options: [
        { text: "מעכבת יציבה בגלל חוסר כבידה", isCorrect: false, feedback: "המים אינם מעכבים אלא מעודדים יציבה." },
        { text: "מאפשרת תנועה עצמאית מוקדמת ותומכת ביציבה", isCorrect: true, feedback: "כוח הציפה מאפשר חופש תנועה ותרגול יציבה בתנאים תומכים." },
        { text: "גורמת לנזק למפרקים בגלל הלחץ ההידרוסטטי", isCorrect: false, feedback: "לחץ הידרוסטטי דווקא תומך ומייצב." },
        { text: "אין השפעה על התפתחות מוטורית", isCorrect: false, feedback: "למים השפעה רבה על מוטוריקה." }
      ]
    }
  ],
  pediatrics_02_dcd: [
    {
      question: "מהו המאפיין הבולט ביותר של הפרעה בקואורדינציה התפתחותית (DCD)?",
      options: [
        { text: "פגיעה קוגניטיבית חמורה", isCorrect: false, feedback: "DCD אינו מאופיין בפגיעה קוגניטיבית." },
        { text: "סרבול מוטורי וקושי ברכישת מיומנויות תנועה", isCorrect: true, feedback: "הקושי העיקרי הוא בתכנון וביצוע תנועות מתואמות." },
        { text: "חולשת שרירים מולדת", isCorrect: false, feedback: "השרירים לרוב תקינים, הבעיה היא בתכנון התנועה." },
        { text: "קשיים נשימתיים", isCorrect: false, feedback: "זהו אינו תסמין מרכזי של DCD." }
      ]
    },
    {
      question: "מדוע הידרותרפיה יעילה עבור ילדים עם DCD?",
      options: [
        { text: "היא מחזקת את העצמות", isCorrect: false, feedback: "ההשפעה על העצמות פחות משמעותית מההשפעה הקואורדינטיבית." },
        { text: "המים מאטים תנועה ומאפשרים זמן לתכנון מוטורי", isCorrect: true, feedback: "ההתנגדות במים מספקת פרופריוצפציה וזמן תגובה ארוך יותר." },
        { text: "זהו טיפול פסיכולוגי בלבד", isCorrect: false, feedback: "הטיפול הינו פיזי ומוטורי מובהק." },
        { text: "היא מחליפה את הצורך בריפוי בעיסוק", isCorrect: false, feedback: "הידרותרפיה משלימה ולא מחליפה." }
      ]
    }
  ],
  pediatrics_03_adhd: [
    {
      question: "אילו יתרונות מספקת סביבת המים עבור ילדים עם ADHD?",
      options: [
        { text: "סביבה עמוסת גירויים המגבירה עוררות", isCorrect: false, feedback: "המטרה היא פעמים רבות ויסות והרגעה." },
        { text: "ויסות תחושתי עמוק והפחתת מוסחות", isCorrect: true, feedback: "הלחץ ההידרוסטטי והמים החמים מספקים מעטפת מרגיעה." },
        { text: "אין למים כל יתרון על פני היבשה", isCorrect: false, feedback: "המים מספקים יתרונות תחושתיים ייחודיים." },
        { text: "תחרותיות מוגברת", isCorrect: false, feedback: "טיפול פרטני או בקבוצה קטנה לרוב אינו תחרותי." }
      ]
    }
  ],
  pediatrics_04_asd: [
    {
      question: "כיצד טיפול במים יכול לסייע בוויסות חושי לילדים על הרצף האוטיסטי?",
      options: [
        { text: "על ידי יצירת תחושת ניתוק", isCorrect: false, feedback: "המים דווקא מספקים תחושת מגע מתמדת (לחץ הידרוסטטי)." },
        { text: "על ידי הגברת הגירויים האודיטוריים", isCorrect: false, feedback: "ההפך, במים ניתן להפחית רעשי רקע ויזואליים ושמיעתיים." },
        { text: "באמצעות לחץ הידרוסטטי המספק תחושת גבולות ומגע עמוק", isCorrect: true, feedback: "הלחץ האחיד מסייע בוויסות הפרופריוצפטיבי." },
        { text: "הוא לא מסייע", isCorrect: false, feedback: "מים הם סביבה מצוינת לויסות חושי." }
      ]
    },
    {
      question: "באיזו טכניקה נהוג להשתמש לשם הרגעה ראשונית של ילד עם אוטיזם במים?",
      options: [
        { text: "שחייה תחרותית", isCorrect: false, feedback: "תחרות מעלה לחץ ולא מרגיעה." },
        { text: "צלילה למעמקים", isCorrect: false, feedback: "צלילה ללא הכנה עלולה לעורר חרדה." },
        { text: "הליכה במים רדודים ללא תמיכה", isCorrect: false, feedback: "ללא תמיכה, הילד עלול להרגיש חוסר ביטחון." },
        { text: "החזקה מעורסלת ותנועה איטית (כמו Halliwick/Jahara)", isCorrect: true, feedback: "ערסול ותמיכה קרובה מעניקים ביטחון ומורידים טונוס." }
      ]
    }
  ],
  pediatrics_05_syndromes: [
    {
      question: "מהו סיכון שכיח אצל ילדים עם תסמונת דאון (Trisomy 21) המצריך תשומת לב מיוחדת בהידרותרפיה?",
      options: [
        { text: "לחץ דם גבוה מאוד", isCorrect: false, feedback: "אינו שכיח ואינו המגבלה העיקרית במים." },
        { text: "גמישות יתר מסוכנת בעמוד השדרה הצווארי (C1-C2)", isCorrect: true, feedback: "חוסר יציבות אטלנטו-אקסיאלית הוא סיכון ידוע המצריך זהירות." },
        { text: "עצמות שבירות במיוחד (Osteogenesis Imperfecta)", isCorrect: false, feedback: "זוהי תסמונת נפרדת לחלוטין." },
        { text: "שנאת מים קיצונית", isCorrect: false, feedback: "ילדים רבים עם תסמונת דאון אוהבים מאוד את המים." }
      ]
    }
  ],
  physiology_01_cardio: [
    {
      question: "כיצד הלחץ ההידרוסטטי משפיע על מערכת הלב וכלי הדם בזמן טבילה עד החזה?",
      options: [
        { text: "מוריד את נפח הדם החוזר ללב (Venous return)", isCorrect: false, feedback: "הלחץ ההידרוסטטי דוחף דם מהגפיים ומעלה את הנפח החוזר." },
        { text: "מגדיל את החזר הדם הוורידי (Venous return) ואת נפח הפעימה (Stroke volume)", isCorrect: true, feedback: "המים דוחפים דם פריפריאלי חזרה למרכז, מה שמגדיל את עבודת הלב." },
        { text: "אין לו שום השפעה", isCorrect: false, feedback: "ללחץ ההידרוסטטי השפעה קרדיאלית משמעותית." },
        { text: "מוריד את תפוקת הלב לרמות מסוכנות", isCorrect: false, feedback: "תפוקת הלב עולה, לא יורדת." }
      ]
    },
    {
      question: "עבור אילו מטופלים יש להיזהר במיוחד עם טבילה עמוקה בשל עלייה בעבודת הלב?",
      options: [
        { text: "ספורטאים צעירים", isCorrect: false, feedback: "ליבם יכול להתמודד עם העומס." },
        { text: "מטופלים עם אי ספיקת לב קשה (Heart Failure)", isCorrect: true, feedback: "הלב שלהם עלול שלא לעמוד בעלייה הפתאומית בנפח הדם החוזר." },
        { text: "ילדים עם אוטיזם", isCorrect: false, feedback: "אין קשר ישיר לבעיות לב באוטיזם בהקשר זה." },
        { text: "מטופלים עם פריצת דיסק", isCorrect: false, feedback: "אין מניעה קרדיאלית עבורם." }
      ]
    }
  ],
  physiology_02_renal: [
    {
      question: "מדוע מטופלים חווים צורך מוגבר לתת שתן במהלך ואחרי טיפול הידרותרפיה (Diuresis)?",
      options: [
        { text: "המים קרים מדי", isCorrect: false, feedback: "הבריכה בדרך כלל חמימה (33-34 מעלות)." },
        { text: "שתיית מים בטעות", isCorrect: false, feedback: "הצורך נגרם ממנגנון פיזיולוגי, לא מבליעת מים." },
        { text: "החזר הדם המוגבר ללב מדכא הפרשת הורמון ADH", isCorrect: true, feedback: "עליית הנפח בלב מובילה לדיכוי ההורמון נוגד ההשתנה (ADH), ולכן הכליות מפרישות יותר מים." },
        { text: "לחץ המים על שלפוחית השתן", isCorrect: false, feedback: "זהו תהליך הורמונלי וכליתי, לא לחץ פיזי על השלפוחית." }
      ]
    }
  ],
  physiology_03_respiratory: [
    {
      question: "מהו האתגר הנשימתי המרכזי שנוצר כתוצאה מטבילה עמוקה במים (עד הצוואר)?",
      options: [
        { text: "קושי לנשוף את האוויר החוצה", isCorrect: false, feedback: "הנשיפה דווקא נעשית קלה יותר בגלל לחץ המים על בית החזה." },
        { text: "סכנת טביעה מיידית", isCorrect: false, feedback: "האתגר הוא פיזיולוגי בעבודת הנשימה." },
        { text: "עבודת השאיפה (Inspiration) הופכת קשה יותר בגלל הלחץ ההידרוסטטי על בית החזה", isCorrect: true, feedback: "שרירי השאיפה צריכים לגבור על התנגדות המים כדי להרחיב את בית החזה." },
        { text: "שרירי הצוואר נתפסים", isCorrect: false, feedback: "זה לא קשור למנגנון הנשימה עצמו." }
      ]
    },
    {
      question: "הידרותרפיה בטבילה עמוקה נחשבת למעולה עבור חולי אסתמה (במצב יציב), מדוע?",
      options: [
        { text: "היא מרפאת לחלוטין את המחלה", isCorrect: false, feedback: "אסתמה היא מחלה כרונית." },
        { text: "האוויר הלח מעל המים מונע התכווצות דרכי נשימה, והלחץ ההידרוסטטי מחזק את שרירי השאיפה", isCorrect: true, feedback: "הלחות טובה לאסתמטיים, והקושי לשאוף מתפקד כאימון התנגדות לשרירי הנשימה." },
        { text: "סכנת אלרגיה בבריכה נמוכה יותר", isCorrect: false, feedback: "לא בהכרח, כלור יכול לעורר תגובה." },
        { text: "היא מאפשרת עצירת נשימה לזמן רב", isCorrect: false, feedback: "המטרה היא נשימה סדירה." }
      ]
    }
  ],
  physiology_04_neuro: [
    {
      question: "כיצד מים חמים (סביב 34 מעלות) משפיעים על מערכת העצבים המרכזית?",
      options: [
        { text: "מעוררים וממריצים אותה", isCorrect: false, feedback: "מים חמים מרגיעים את המערכת." },
        { text: "גורמים להזיות", isCorrect: false, feedback: "טמפרטורה זו בטוחה ולא גורמת לשינוי תודעתי." },
        { text: "מפחיתים את רגישות קצות העצבים ומרפים שרירים (הורדת טונוס)", isCorrect: true, feedback: "חום המים מוריד את קצב הירי העצבי, מה שמוביל להרפיה והפחתת כאב." },
        { text: "מכווצים את כלי הדם במוח", isCorrect: false, feedback: "חום גורם להרחבת כלי דם (Vasodilation)." }
      ]
    },
    {
      question: "בטיפול במטופלי שבץ (CVA), מה היתרון בשימוש בהתנגדות המים (Drag)?",
      options: [
        { text: "גורם לתנועה להיות קופצנית", isCorrect: false, feedback: "המים מחליקים את התנועה." },
        { text: "תנועה נגד התנגדות המים מחזקת שרירים חלשים, תוך מתן זמן עיבוד ארוך יותר למערכת העצבים", isCorrect: true, feedback: "התנגדות הצמיגות מעכבת את התנועה ונותנת למוח זמן לתקן טעויות מוטוריות." },
        { text: "מונעת כניסת מים לאוזניים", isCorrect: false, feedback: "אין קשר בין הדברים." },
        { text: "משתקת את הצד הבריא", isCorrect: false, feedback: "אין שיתוק, יש ויסות של התנועה." }
      ]
    }
  ],
  physiology_05_diabetes: [
    {
      question: "מדוע מטופלים עם סוכרת מועדים לסיכון של היפוגליקמיה (נפילת סוכר) בבריכה הטיפולית?",
      options: [
        { text: "הכלור סופג את הסוכר", isCorrect: false, feedback: "לכלור אין השפעה על רמות הסוכר בדם." },
        { text: "הפעילות הגופנית והמים החמים מגבירים משמעותית את המטבוליזם וניצול הגלוקוז", isCorrect: true, feedback: "שילוב של מאמץ שרירי יחד עם הרחבת כלי דם גורם לצריכה מהירה של סוכר בדם." },
        { text: "כי הם שוכחים לאכול", isCorrect: false, feedback: "הסיבה הפיזיולוגית היא קצב ניצול הסוכר." },
        { text: "הלחץ ההידרוסטטי מונע ייצור גלוקגון", isCorrect: false, feedback: "אין מנגנון כזה." }
      ]
    },
    {
      question: "מהו אמצעי הזהירות החשוב ביותר לפני הכנסת מטופל סוכרתי למים?",
      options: [
        { text: "מדידת חום", isCorrect: false, feedback: "חשוב, אך לא קריטי כמו מדידת סוכר בסוכרת." },
        { text: "בדיקת רמות סוכר בדם, תשאול על ארוחה אחרונה, ווידוא נוכחות פחמימה זמינה בשפת הבריכה", isCorrect: true, feedback: "מניעת היפוגליקמיה והיערכות מראש היא חובה קלינית." },
        { text: "חבישת כובע ים", isCorrect: false, feedback: "אמצעי היגייני, לא רפואי." },
        { text: "שקילת המטופל", isCorrect: false, feedback: "משקל אינו גורם סיכון אקוטי למים." }
      ]
    }
  ]
};

function generateQuizCard(quizObj, index, seqTitle) {
  return {
    bite_id: "q_" + Date.now() + "_" + Math.floor(Math.random()*1000) + "_" + index,
    type: 'quiz_card',
    sequence_title: seqTitle,
    question: quizObj.question,
    options: quizObj.options
  };
}

targetFiles.forEach(fileName => {
  const filePath = path.join(dirPath, fileName);
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    try {
      const jsonData = JSON.parse(rawData);
      const fileKey = fileName.replace('.json', '');
      const questionsForFile = quizData[fileKey] || [];
      
      if (questionsForFile.length > 0 && jsonData.bites) {
        // Find sequence_end_card index
        const endCardIndex = jsonData.bites.findIndex(b => b.type === 'sequence_end_card');
        
        let seqTitle = "סיכום ובחן את עצמך";
        // Grab sequence_title from the last real card if possible
        const lastRealCard = endCardIndex !== -1 ? jsonData.bites[endCardIndex - 1] : jsonData.bites[jsonData.bites.length - 1];
        if (lastRealCard && lastRealCard.sequence_title) {
          seqTitle = lastRealCard.sequence_title;
        }

        const newCards = questionsForFile.map((q, i) => generateQuizCard(q, i, seqTitle));
        
        if (endCardIndex !== -1) {
          // insert before sequence_end_card
          jsonData.bites.splice(endCardIndex, 0, ...newCards);
        } else {
          // just push at the end
          jsonData.bites.push(...newCards);
        }
        
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log("Successfully updated " + fileName + " with " + newCards.length + " quiz cards.");
      } else {
        console.log("Skipping " + fileName + " - No questions configured or invalid schema.");
      }
    } catch (e) {
      console.error("Error parsing " + fileName + ":", e);
    }
  } else {
    console.error("File not found: " + filePath);
  }
});
