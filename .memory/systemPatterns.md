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
"type": "principle_card",  
"visual_trigger": "animation_archimedes_vectors",  
"title": "למה אנחנו צפים?",  
"content": "גוף השקוע בנוזל מאבד ממשקלו כמשקל הנוזל שאותו הוא דוחה. כוח זה פועל מנגד לכוח הכבידה.",  
"clinical_highlight": "במים בגובה החזה, אדם נושא רק כ-30% ממשקל גופו."  
},  
{  
"bite_id": "b002",  
"type": "clinical_case_card",  
"visual_trigger": "animation_cp_spasticity_relief",  
"title": "השפעת ציפה על שיתוק מוחין (CP)",  
"content": "הפחתת משקל הגוף במים מאפשרת למטופלי CP לבצע תנועות שאינן אפשריות ביבשה, תוך שבירת תבניות תנועה פתולוגיות.",  
"clinical_highlight": "השילוב עם מים בטמפרטורה של 34 מעלות תורם להורדת הטונוס הספסטי."  
}  
]  
}
```

## 2. הגדרת בלוקים לימודיים (Learning Blocks)
על המערכת להשתמש בבלוקים מובנים כדי לייצר למידה דינמית:
1. **principle_card (כרטיס עקרון):** מסך בסיס עם אנימציה, טקסט תיאורטי (עד 40 מילים) ונקודת ציון קלינית.
2. **clinical_case_card (מקרה קליני):** יישום העיקרון על מטופל ספציפי ומה נכון לעשות.
3. **flashcard_carousel (קרוסלה):** רשימת מאפיינים שניתן לגלול ימינה/שמאלה במקום למטה.
4. **compare_card (מסך השוואה):** מסך מפוצל המראה הבדלים (למשל מים מול יבשה).
5. **interactive_check (בוחן אינטראקטיבי):** שאלת אימות קצרה לעצירת רצף הקריאה.

השדה `type` בכל אלמנט JSON חייב להיות מתוך הרשימה הנ"ל.
```

## 3. אסטרטגיית Frontend ופיתוח ממשק משתמש (UI Architecture)  
ארכיטקטורת האתר תתבסס על Component-Based UI המיועד במובהק למובייל (Mobile-First).

* **Scroll Snapping Pattern:** בניית מעטפת התומכת באפקט החלקה. רכיב האב יוגדר עם מחלקות `overflow-y-scroll snap-y snap-mandatory h-screen`. כל רכיב ילד (Reel Card) יוגדר כ-`snap-start h-screen w-full flex flex-col`.  
* **Dumb Components:** קומפוננטות ה-UI לא יכילו מידע קשה (Hardcoded). הן יוגדרו כמקבלות `Props` של אובייקט ה-`bite`.   
* **Dynamic Animation Binding (Registry Pattern):** ה-UI יעשה שימוש ברכיב מתווך (`AnimationFactory`) אשר יקרא את המחרוזת מהשדה `visual_trigger` (למשל `animation_archimedes_vectors`). ה-Factory פועל כ-Registry ויטען באופן דינמי קומפוננטות SVG/Framer Motion ייעודיות מתיקיית `animations/`. במידה והאנימציה טרם פותחה, הוא ירנדר `FallbackAnimation` גנרי.

## 4. מעקב מלאי אנימציות (Animation Triggers Backlog)
קיימים בסך הכל 22 טריגרים ויזואליים שנוצרו במהלך המרת יחידות 1 ו-2 (11 לכל יחידה).
*   **אנימציות ליבה (Core Physics Animations):** פותחו/מפותחות 4 קומפוננטות ראשיות (`animation_archimedes_vectors`, `animation_pascal_law`, `animation_drag_equation`, `animation_metacentric_torque`).
*   **אנימציות חסרות (Technical Debt):** נותרו עוד 18 טריגרים המקבלים כעת עיצוב Fallback (כגון `animation_uhthoff_ms`, `animation_gate_control`, `animation_turbulent_gliding` ועוד). על סוכני התכנון וה-UI לחזור למלאי זה בסשנים עתידיים ולהשלים את פיתוחן הויזואלי.
