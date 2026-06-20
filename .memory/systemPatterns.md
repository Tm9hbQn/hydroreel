# **תבניות וארכיטקטורת מערכת (System Patterns)**

## **1. אסטרטגיית ניהול תוכן קליני (Clinical Content Architecture)**

התוכן הרפואי אינו נכתב על ידי מתכנתים. הסוכן הקליני מייצר קבצי נתונים טהורים הנשמרים בתיקיית app_build/content_data/lessons/.2 כל יחידת לימוד מחויבת לעבור הערכת ראיות, לכלול התייחסות לשיטות טיפול מוכרות כגון הלוויק (Halliwick) או ג'הארה (Jahara), ולהסביר את המכניקה שלהן.2  
**תבנית הנתונים (Strict JSON Schema):**  
כל קובץ שינוצר חייב לעמוד במבנה המדויק הבא:
```json
{  
"lesson_id": "physics_01_buoyancy",  
"lesson_title": "עקרון ארכימדס וכוח הציפה",  
"bites": [  
{  
"bite_id": "b001",  
"type": "physics_principle",  
"visual_trigger": "animation_archimedes_vectors",  
"title": "למה אנחנו צפים?",  
"content": "גוף השקוע בנוזל מאבד ממשקלו כמשקל הנוזל שאותו הוא דוחה. כוח זה פועל מנגד לכוח הכבידה.",  
"clinical_highlight": "במים בגובה החזה, אדם נושא רק כ-30% ממשקל גופו."  
},  
{  
"bite_id": "b002",  
"type": "clinical_application",  
"visual_trigger": "animation_cp_spasticity_relief",  
"title": "השפעת ציפה על שיתוק מוחין (CP)",  
"content": "הפחתת משקל הגוף במים מאפשרת למטופלי CP לבצע תנועות שאינן אפשריות ביבשה, תוך שבירת תבניות תנועה פתולוגיות.",  
"clinical_highlight": "השילוב עם מים בטמפרטורה של 34 מעלות תורם להורדת הטונוס הספסטי."  
}  
]  
}
```

## 2. אסטרטגיית Frontend ופיתוח ממשק משתמש (UI Architecture)  
ארכיטקטורת האתר תתבסס על Component-Based UI המיועד במובהק למובייל (Mobile-First).

* **Scroll Snapping Pattern:** בניית מעטפת התומכת באפקט החלקה. רכיב האב יוגדר עם מחלקות `overflow-y-scroll snap-y snap-mandatory h-screen`. כל רכיב ילד (Reel Card) יוגדר כ-`snap-start h-screen w-full flex flex-col`.  
* **Dumb Components:** קומפוננטות ה-UI לא יכילו מידע קשה (Hardcoded). הן יוגדרו כמקבלות `Props` של אובייקט ה-`bite`.   
* **Dynamic Animation Binding:** ה-UI יעשה שימוש ברכיב מתווך (`AnimationFactory`) אשר יקרא את המחרוזת מהשדה `visual_trigger` (למשל `animation_archimedes_vectors`) ויטען באופן דינמי את קומפוננטת ה-Framer Motion הרלוונטית כדי למנוע קריסות רינדור.
