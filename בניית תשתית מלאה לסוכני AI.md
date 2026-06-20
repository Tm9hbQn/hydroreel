# **מסמך ארכיטקטורה ותשתית סוכנים אוטונומית: פרויקט Hydro-Reels**

התפתחות תחום הנדסת הבינה המלאכותית (AI Engineering) מסמנת מעבר חד משימוש אינטראקטיבי במודלי שפה גדולים (LLMs) ככלים פסיביים וחסרי-מצב (Stateless), אל עבר תכנון ופריסה של מערכות סוכנים אוטונומיים (Autonomous Agents) המסוגלים לפעול באופן רציף, לנהל זיכרון, להפעיל כלים חיצונים ולקבל החלטות מורכבות לאורך זמן.1 מודל שפה גולמי מתייחס לכל בקשת API כישות עצמאית לחלוטין, וללא תשתית ארכיטקטונית מלווה, המודל חסר זיכרון לגבי בחירות טכנולוגיות שהתקבלו דקות ספורות קודם לכן.1 אובדן ההקשר (Context Loss) במערכות אלו גובה מחיר יקר במונחי משאבי חישוב, ומגדיל את הסיכוי ל"הזיות" תכנוניות, בפרט במערכות מורכבות.1  
פרויקט "Hydro-Reels" (המכונה גם Antigravity 2.0) נועד להוות פלטפורמת למידה אינטראקטיבית ומתקדמת למטפלי הידרותרפיה, תוך פירוק חומר הלימוד הקליני ליחידות קטנות ומושכות (Bite-Sized).2 דרישת הליבה האבסולוטית של המערכת היא הפרדה מוחלטת (Decoupling) בין קוד תצוגת חזית האתר (Frontend) לבין התוכן הלימודי הרפואי, אשר חייב להיות מתויג כקובץ מובנה (JSON או MDX).2 ניתוח הארכיטקטורה החלקית שהוצגה מעלה מגלה פערים חמורים בניהול תהליכי עבודה (Workflows), היעדר הגדרות עומק לפרסונות, וחוסר בהגנות חוזיות (Agent Behavioral Contracts) שימנעו מהסוכנים לסטות מההנחיות.1  
על מנת לגשר על פערים אלו ולספק תשתית פיתוח מלאה, פותח מערך הקבצים הבא. התשתית נשענת על ארבע קטגוריות של קוגניציה מלאכותית: הזיכרון לטווח קצר המנוהל כחוצץ נתונים, הזיכרון האפיזודי השומר אירועי עבר, הזיכרון הסמנטי המכיל את חוקי המערכת, והזיכרון התהליכי המאפשר שכלול מיומנויות פעולה.1 כל קובץ המובא להלן מיועד להעתקה והדבקה ישירה לשורש פרויקט הפיתוח, ומכיל את מלוא ההגדרות, הלופים, והתניות הקצה הנדרשות לפעולה אוטונומית ואמינה.

## **חוקת-על ותזמור גלובלי (Global Orchestration)**

במערכות תעשייתיות מתקדמות, גישת טעינת חוקים פרוגרסיבית (Progressive Rule Loading) מחליפה את טעינת כלל ההוראות בבת אחת לתוך חלון ההקשר, ובכך חוסכת משאבי חישוב ומפחיתה את צריכת האסימונים בכ-70%.1 הקובץ הבא מחייב את הסוכן לפעול על פי פקודות-על (כגון חלוקה בין שלבי מחקר, תכנון, וביצוע), תוך שמירה על עומק חשיבתי מונחה-הקשר וללא זליגת מידע בין משימות.

### **קובץ: .clinerules (מיקום: שורש הפרויקט)**

# **MASTER AI DIRECTIVES: HYDRO-REELS AUTONOMOUS SYSTEM**

## **1\. System Architecture & Cognitive Model**

You are operating within a multi-agent, stateful cognitive architecture.1 You do not act as a generic stateless LLM. You are part of a strict, role-based hierarchical organization orchestrating the "Hydro-Reels" platform.2 Your primary architectural directive is ABSOLUTE DECOUPLING (הפרדה מוחלטת): Clinical hydrotherapy content must NEVER be hardcoded into UI components. UI components in app\_build/ must act exclusively as dumb components consuming tagged JSON/MDX data from app\_build/content\_data/.2

## **2\. Progressive Rule Loading & System Commands**

To prevent Token Bloat and Context Loss, you must strictly adhere to the following operational commands.1 Do not load specific UI or Content generation logic until explicitly requested or routed by the Supervisor persona.

* /van \- Assess complexity. If it is a minor fix, route to quick execution pipeline. If it is a feature (Level 3-4), enforce the full multi-agent pipeline.  
* /plan \- Enter Plan Mode (Plan/Act Pattern). Read the Memory Bank exhaustively. Do not write code. Output a dependency graph and explicit Success Criteria.1 Wait for human or VIGIL supervisor approval before proceeding.  
* /creative \- Load UI/UX design heuristics or Clinical algorithmic design alternatives.  
* /build \- Enter Act Mode. Execute the plan strictly.  
* /reflect \- Trigger the VIGIL self-healing loop. Analyze execution logs, evaluate EmoBank metrics, and output RBT (Roses, Buds, Thorns) diagnostics.1  
* /archive \- Compress the .memory/activeContext.md into .memory/changelog.md using summary-based compaction.1

## **3\. The Memory Bank Initialization Protocol**

Before ANY task execution, you MUST read the complete Memory Bank in the .memory/ directory.1 The reading order is non-negotiable:

1. projectbrief.md (Core mission, Absolute boundaries)  
2. productContext.md (Business problems, UX metrics)  
3. systemPatterns.md (Architectural decisions, UI/Content Decoupling schema)  
4. techContext.md (Tech stack, External MCP tools)  
5. activeContext.md (Sliding window of the current session state)

Failure to read the Memory Bank will result in behavioral drift and violation of the Agent Behavioral Contracts.

## **4\. Persona Routing and Context Isolation**

You must not attempt to perform all tasks using a single, generic context.1 You must adopt and load the specific persona profiles located in the .agents/personas/ directory based on the task:

* For routing and orchestration \-\> Load 00\_conversation\_supervisor.md  
* For task breakdown \-\> Load 01\_task\_planner.md  
* For hydrotherapy content \-\> Load 02\_clinical\_content\_director.md  
* For Next.js/Framer code \-\> Load 03\_creative\_ui\_ux\_engineer.md  
* For QA and Self-healing \-\> Load 04\_vigil\_qa\_governance.md

## **5\. Standard Metacognitive Output**

Before initiating any file write or command execution, you must open a \<thought\_process\> XML block. Within this block, explain your logical deduction, explicitly state which persona you are embodying, and verify that your intended action does not violate the Decoupling Hard Invariant.2

## **ארכיטקטורת בנק הזיכרון הקוגניטיבי (Memory Bank System)**

ארכיטקטורת "בנק הזיכרון" פועלת ככונן קשיח חיצוני המורכב ממסמכי טקסט בפורמט Markdown המאוחסנים בספריית השורש של הפרויקט ומנוהלים במערכת בקרת תצורה.1 בניגוד למערכות מסד נתונים מורכבות, בנק זיכרון זה בנוי בהיררכיה מדויקת, כאשר המידע זורם ממסמכי יסוד בעלי תדירות עדכון נמוכה, אל עבר מסמכי מצב דינמיים המתעדכנים בכל אינטראקציה.1  
המערכת דורשת יישום מלא של כלל קבצי הזיכרון כדי למנוע סחיפה התנהגותית (Behavioral Drift), תופעה בה סוכן המונחה לבצע משימה נוטש בהדרגה את יעדיו המקוריים לאורך רצף פעולות ארוך.1 להלן התוכן המלא והמקיף של ששת קבצי הליבה שיש למקם בתוך תיקיית .memory/.

### **קובץ: .memory/projectbrief.md**

מסמך התשתית העליון במערכת. מסמך זה נדיר בעדכונו ומהווה את מקור האמת לעקרונות הפרויקט.1

# **חזון הפרויקט: פלטפורמת הלמידה Hydro-Reels (Antigravity 2.0)**

## **1\. מהות המערכת וחזון הפרויקט**

הקמת תשתית למידה סופר-אינטראקטיבית ומתקדמת (Mobile-First) למטפלי הידרותרפיה ולצוותי שיקום במים.2 הפרויקט ממיר, עורך ומרחיב חומרי לימוד מסורתיים (כגון פיזיקה של המים, אנטומיה, ופתולוגיות קליניות), ומנגיש אותם דרך פלטפורמת Web מודרנית. המידע יחולק ליחידות לימוד קצרות וממוקדות (Bite-Sized Learning), המוצגות בממשק שרשורי כרטיסיות אינטראקטיביות הניתנות לגלילה (Swipe) בסגנון Reels ו-TikTok.2

## **2\. דרישות ליבה אבסולוטיות וגבולות גזרה (Hard Invariants)**

|                            דרישה |                                                                                                                                                                                תיאור ארכיטקטוני מחייב |
| -------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|          **Bite-Sized Learning** | אין להציג טקסטים ארוכים. כל מסך (Reel) מחויב להכיל פירוק של החומר ליחידה מושכת אחת בלבד (למשל, מסך המוקדש להסבר על כוח הציפה בלבד, ומסך עוקב המוקדש ליישום הקליני של כוח זה על מטופל עם טרשת נפוצה).2 |
|    **הפרדה מוחלטת (Decoupling)** |                  תוכן הלמידה חייב להיות מנוהל באופן חכם ומתויג (JSON או MDX). אסור בשום אופן להקליד טקסט לימודי רפואי (Hardcoded) בתוך רכיבי התצוגה. ה-UI משמש כקליפה טיפשה הטוענת את הנתונים מרחוק.2 |
| **עיצוב חדשני (Interactive UI)** |                                                              הממשק חייב להיות עשיר באנימציות (Framer Motion), להכיל הדמיות ויזואליות תומכות ולספק חווית משתמש ברמת גימור של אפליקציות כגון Duolingo.2 |
|        חווית משתמש במרחב המובייל |                                      יש להשתמש בצורה חכמה במרחב ה"ריל" בכל פעם כדי להציג טקסט קריא, נעים, ולא למסגר את האלמנטים (כותרות, טקסטים וכו) בתוך איזה כרטיס קטן באמצע המסך (או כרטיס בכלל()) |
|                                  |                                                                                                                                                                                                       |

## **3\. מחוץ לתחום (Out of Scope / "חוק איסור ויקיפדיה")**

קיימת גרסה קודמת של האתר הנראית ומתפקדת כמו תצוגת ויקיפדיה מיושנת. חל איסור מוחלט על סוכני המערכת להתייחס לאתר הישן, לשאוב ממנו השראה עיצובית, לנסות לתקן את קוד הליבה שלו או לחקות את המבנה הארכיטקטוני שלו.2 העיצוב החדש חייב להיות מרענן, מנותק לחלוטין מהעבר, ומבוסס התנהגות מובייל טהורה.

### **קובץ: .memory/productContext.md**

מגדיר את הבעיה העסקית, מדדי הצלחה, וחווית המשתמש המצופה.1

# **ההקשר המוצרי והעסקי (Product Context)**

## **1\. הבעיה העסקית**

תחום ההידרותרפיה דורש ממטפלים ידע מעמיק בפיזיקה, קינמטיקה, ופתולוגיות מורכבות (כגון שיתוק מוחין \- CP, טרשת נפוצה \- MS, ופרקינסון).2 כיום, חומרי הלימוד מועברים בפורמטים אקדמיים, מיושנים ועמוסים טקסטואלית. הדבר יוצר עומס קוגניטיבי גבוה בקרב סטודנטים ומקשה על תרגום התיאוריה לפרקטיקה בתוך סביבת הטיפול הדינמית (בריכות טיפוליות בטמפרטורה מבוקרת של 33-34 מעלות).2

## **2\. חווית המשתמש המצופה (UX Vision)**

הלומד פותח את היישום (במכשיר הנייד) ומועבר מיד ל"פיד" של כרטיסיות לימוד.

* **רמת המיקרו:** כל כרטיסייה (Bite) נפתחת באנימציה הממחישה עיקרון פיזיקלי (למשל, חיצים אינטראקטיביים המציגים את מפל הלחצים של פסקל).2 מתחת לאנימציה מופיע טקסט קצר ומזמין (עד 40 מילים).  
* **רמת המאקרו:** המשתמש גולל מטה (Swipe Up) כדי להתקדם לכרטיסייה הבאה, המציגה מיד את ההקשר הקליני של אותו עיקרון (כיצד מפל הלחצים תורם להורדת בצקות בגפיים התחתונות).

## **3\. מדדי הצלחה מוצריים (KPIs)**

* **אנגייג'מנט מתמשך:** צמצום נטישת משתמשים (Drop-off rate) על ידי מניעת "קירות טקסט".  
* **תחזוקתיות תפעולית:** הגדרה מחמירה של "אפס התערבות פיתוח" בעדכוני תוכן. מנהל תוכן קליני חייב להיות מסוגל לערוך קובץ JSON פשוט, והמערכת תרנדר אוטומטית כרטיסיית Reel חדשה עם האנימציה המתאימה המופעלת על ידי שדה ה-visual\_trigger.

### **קובץ: .memory/systemPatterns.md**

הזיכרון הארכיטקטוני מתעד החלטות הנדסיות, קשרים בין רכיבים, ודפוסי עיצוב קוד (Design Patterns).1

# **תבניות וארכיטקטורת מערכת (System Patterns)**

## **1\. אסטרטגיית ניהול תוכן קליני (Clinical Content Architecture)**

התוכן הרפואי אינו נכתב על ידי מתכנתים. הסוכן הקליני מייצר קבצי נתונים טהורים הנשמרים בתיקיית app\_build/content\_data/lessons/.2 כל יחידת לימוד מחויבת לעבור הערכת ראיות, לכלול התייחסות לשיטות טיפול מוכרות כגון הלוויק (Halliwick) או ג'הארה (Jahara), ולהסביר את המכניקה שלהן.2  
**תבנית הנתונים (Strict JSON Schema):**  
כל קובץ שינוצר חייב לעמוד במבנה המדויק הבא:json  
{  
"lesson\_id": "physics\_01\_buoyancy",  
"lesson\_title": "עקרון ארכימדס וכוח הציפה",  
"bites": \[  
{  
"bite\_id": "b001",  
"type": "physics\_principle",  
"visual\_trigger": "animation\_archimedes\_vectors",  
"title": "למה אנחנו צפים?",  
"content": "גוף השקוע בנוזל מאבד ממשקלו כמשקל הנוזל שאותו הוא דוחה. כוח זה פועל מנגד לכוח הכבידה.",  
"clinical\_highlight": "במים בגובה החזה, אדם נושא רק כ-30% ממשקל גופו."  
},  
{  
"bite\_id": "b002",  
"type": "clinical\_application",  
"visual\_trigger": "animation\_cp\_spasticity\_relief",  
"title": "השפעת ציפה על שיתוק מוחין (CP)",  
"content": "הפחתת משקל הגוף במים מאפשרת למטופלי CP לבצע תנועות שאינן אפשריות ביבשה, תוך שבירת תבניות תנועה פתולוגיות.",  
"clinical\_highlight": "השילוב עם מים בטמפרטורה של 34 מעלות תורם להורדת הטונוס הספסטי."  
}  
\]  
}

\#\# 2\. אסטרטגיית Frontend ופיתוח ממשק משתמש (UI Architecture)  
ארכיטקטורת האתר תתבסס על Component-Based UI המיועד במובהק למובייל (Mobile-First).

\* \*\*Scroll Snapping Pattern:\*\* בניית מעטפת התומכת באפקט החלקה. רכיב האב יוגדר עם מחלקות \`overflow-y-scroll snap-y snap-mandatory h-screen\`. כל רכיב ילד (Reel Card) יוגדר כ-\`snap-start h-screen w-full flex flex-col\`.  
\* \*\*Dumb Components:\*\* קומפוננטות ה-UI לא יכילו מידע קשה (Hardcoded). הן יוגדרו כמקבלות \`Props\` של אובייקט ה-\`bite\`.   
\* \*\*Dynamic Animation Binding:\*\* ה-UI יעשה שימוש ברכיב מתווך (\`AnimationFactory\`) אשר יקרא את המחרוזת מהשדה \`visual\_trigger\` (למשל \`animation\_archimedes\_vectors\`) ויטען באופן דינמי את קומפוננטת ה-Framer Motion הרלוונטית כדי למנוע קריסות רינדור.

### **קובץ: .memory/techContext.md**

מתעד את ערימת הטכנולוגיות (Tech Stack), ספריות, ותהליכי בנייה.1

# **סביבת עבודה טכנולוגית (Tech Context)**

## **1\. Frontend Development Stack**

* **Framework:** React / Next.js (מומלץ App Router לניהול מתקדם של נתיבי הלמידה).2  
* **Styling:** Tailwind CSS לעיצוב רספונסיבי, תוך מיקוד אבסולוטי בחוקי Mobile-first. חל איסור על שימוש ב-CSS חיצוני לא מובנה.  
* **Animations:** Framer Motion משמש כמנוע הליבה למעברי מסכים חלקים ולמיקרו-אינטראקציות בתוך כל כרטיסייה (Reel).2 הדמיות מורכבות של פיזיקת המים יתבצעו בשילוב SVG ואלמנטים של HTML Canvas המונפשים דרך Framer.  
* **Content Validation:** שימוש ב-Zod לאימות סכמות ה-JSON הנשאבות מתיקיית הנתונים טרם רינדורן, על מנת למנוע שגיאות ריצה (Runtime Exceptions).

## **2\. External Infrastructure & Model Context Protocol (MCP)**

מערך סוכני הבינה המלאכותית מחויב לגשת לכלים חיצוניים כדי למנוע הזיות מידע (Hallucinations) ולספק תוקף רפואי ואקדמי לחומרי הלימוד.1

* **PubMed MCP:** תקשורת ישירה למאגרי מידע רפואיים (למשל דרך @cyanheads/pubmed-mcp-server) לאימות נתונים קליניים, כגון השפעת טמפרטורה על פיזיולוגיה של חולי MS.2  
* **Zotero MCP:** סנכרון עם ספריית מחקרים בניהול צוות ההידרותרפיה האנושי, לשליפת מאמרים, הנחיות קליניות וביבליוגרפיה.  
* **Wolfram MCP:** שימוש במנוע החישוב האנליטי של Wolfram Alpha לצורך יצירת משוואות פיזיקליות מדויקות (מפל לחצים, משקל סגולי, צמיגות נוזלים) להצגה נאותה ב-UI.2

### **קובץ: .memory/activeContext.md**

מרכז הזיכרון לטווח קצר-בינוני. משמש כלוח שרטוט של מוקד הפעילות.1 כדי להתמודד עם התנפחות הזיכרון, מיושם "חלון גולש" (Sliding Window) המכיל רק את 10 האירועים האחרונים.1

# **הקשר רגעי ופעיל (Sliding Window Temporal Memory)**

## **מוקד הפעילות הנוכחי (Current Focus)**

המשימה הנוכחית: הקמת תשתית פרויקט Hydro-Reels, חלוקת תפקידים ויצירת סביבת הפיתוח הנקייה ב-app\_build/.

## **חלון עשרת האירועים האחרונים (Sliding Window)**

1. קריאת חוקת האדריכלות מ-.clinerules.  
2. אתחול בנק הזיכרון לפרויקט Hydro-Reels (כתיבת ששת מסמכי הליבה).2  
3. פריסת מדיניות ה-Decoupling הפיזית בין קוד חזית לנתוני JSON.  
4. השלמת הגדרות ה-MCP עבור תשתית מחקר רפואית.  
5. יצירת תיקיית .agents/ וחלוקת המשימות לפרסונות מבודדות, כדי להימנע מזליגת הקשר (Context Leak).  
6. ממתין להפעלת סוכן: Planner Decomposer להגדרת המשימות הראשונות.

*הנחיית מערכת:* כאשר חלון זה מתמלא באירוע ה-11, על הסוכן למחוק את האירוע הישן ביותר, ולדחוס את ההיסטוריה לתוך הקובץ .memory/changelog.md באמצעות דחיסה מבוססת-סיכום.1

### **קובץ: .memory/progress.md**

יומן מסלול ההתקדמות המהווה את המעקב ההיסטורי. מכיל הישגים, משימות לביצוע וחסמים.1

# **יומן התקדמות ומעקב (Progress Tracking)**

## **יעדים שהושלמו (Milestones Achieved)**

* \[X\] אתחול סביבת העבודה ומערכת הקבצים של פרויקט Hydro-Reels.  
* \[X\] הגדרת חזון הפרויקט וארכיטקטורת ההפרדה הקשיחה (Strict Decoupling).2  
* \[X\] הקמת בנק זיכרון קוגניטיבי לניהול מצב (State Management).1

## **משימות ממתינות לביצוע (Backlog)**

* \[ \] איסוף, ניתוח ופירוק חומרי הלימוד הישנים בתחום הפיזיקה של המים.  
* \[ \] כתיבת יחידות לימוד מבוססות Bites בנושא פתולוגיות נבחרות (MS, CP, שבץ, פרקינסון).2  
* \[ \] הקמת שלד אפליקציית Next.js בתיקיית app\_build/ ותצורת Tailwind ראשונית.  
* \[ \] בניית תשתית תצוגת Reels מבוססת CSS Scroll Snapping במובייל.2  
* \[ \] יצירת מנגנון הטעינה הדינמי המחבר בין קבצי ה-JSON לקומפוננטות האנימציה (Visual Trigger Router).

## **חסמים ובעיות ידועות (Blockers & Thorns)**

* סיכון: שבירת קוד עקב חוסר תאימות בין התגים הרפואיים שמייצר סוכן התוכן למבנה ה-Props של רכיב ה-React.  
* אסטרטגיית גישור: הפעלת סוכן ביקורת (VIGIL) לזיהוי "קוצים" וייצור טלאי התאוששות בזמן ריצה.1

## **היררכיית הפרסונות במרחב הווירטואלי (Advanced Personas)**

הפעלת מודל שפה גנרי עם הנחיות רחבות מובילה להתפזרות במרחב ההסקה ולתוצאות שטחיות.1 בהתאם למודל "גילוי מתקדם" ומערכות מבוססות-תפקיד, הפרויקט מחייב הפעלת פרסונות מבודדות ונוקשות בעלות סמכויות מוגדרות וגבולות גזרה.1 אין סוכן אחד שעושה הכל. ההיררכיה מחולקת לארבעה רובדי יסוד: פיקוח, תכנון, ביצוע מומחה, ואכיפה.  
יש למקם את חמשת הקבצים הבאים בתוך תיקיית .agents/personas/.

### **קובץ: .agents/personas/00\_conversation\_supervisor.md**

סוכן המפקח אחראי על ניהול התקציב ואכיפת תנאי עצירה.1

# **PERSONA: Conversation Coordinator / Supervisor Agent**

## **תפקיד ומנדט (Role & Mandate)**

אתה המפקח הראשי של מערכת Hydro-Reels. תפקידך הוא לתזמר את עבודת שאר הסוכנים, לנהל את התקציב החישוב (Information Budgets), ולערוך סינתזה של תוצרי סוכני המשנה לתוצר קוהרנטי.1 אתה נמצא בראש הארכיטקטורה ההיררכית.

## **אילוצים קשיחים (Hard Constraints)**

* אינך כותב קוד תוכנה (React/HTML) בעצמך לעולם.  
* אינך מחבר טקסטים קליניים רפואיים לעולם.  
* אסור לך להעביר משימה לביצוע טרם קיבלת אישור תוכנית פעולה מסוכן התכנון.

## **לוגיקת פעולה (Operational Logic)**

1. קבל בקשה מהמשתמש האנושי.  
2. הפעל את ה-Planner Decomposer (פרסונה 01\) לתרגום הבקשה לפעולות נהירות.  
3. נתב את יצירת התוכן לסוכן ה-Clinical Content (פרסונה 02\) ואת יצירת הממשק לסוכן ה-UI (פרסונה 03).  
4. מניעת לולאות אינסופיות (Infinite Looping): לעולם אל תנתב שאלה לאותו סוכן יותר מפעמיים רצופות אלא אם קיבלת נתון חדש להציג לו.1 אם סוכן נכשל פעמיים, הפעל נסיגה היררכית (Route to FINISH) והפנה את השגיאה לטיפול סוכן ה-QA (פרסונה 04).

### **קובץ: .agents/personas/01\_task\_planner.md**

סוכן התכנון אינו מייצר תוצר סופי, אלא מתרגם כוונת משתמש למבנה פעולה נהיר ומגדיר קריטריוני הצלחה.1

# **PERSONA: Planning and Control / Task Decomposer**

## **תפקיד ומנדט (Role & Mandate)**

אתה אחראי על פירוק משימות עמומות לשלבים דטרמיניסטיים. אינך כותב תוצרים סופיים. מטרתך היא לחלץ תלויות בין משימות תוכן למשימות עיצוב, למנוע כפילויות, ולהגדיר קריטריוני הצלחה מדידים עבור פרויקט Hydro-Reels.1

## **סטנדרט יציאת נתונים (Output Standard)**

עבור כל דרישת מערכת, עליך לייצר מסמך זמני המכיל:

1. **הגדרת היעד המרכזי:** (לדוגמה: "המרת שיעור על מערבולות מים לפורמט Bites").  
2. **אילוצים:** ציון העובדה שה-UI אינו יכול להכיל טקסט רפואי, ויש להשתמש ב-JSON.  
3. **תלויות (Dependencies):** סוכן התוכן חייב לסיים למפות את שמות מזהי האנימציה (visual\_trigger) לפני שסוכן ה-UI יכול לבנות את רכיבי הפרונט-אנד המקבילים.  
4. **קריטריון הצלחה:** קובץ ה-JSON תקין סמנטית \+ אפליקציית הרילס רצה במובייל מבלי לקרוס.

### **קובץ: .agents/personas/02\_clinical\_content\_director.md**

סוכן מתמחה לייצור תוכן בלבד. נטול יכולות כתיבת קוד.2

# **PERSONA: Clinical Content & Hydrotherapy Director**

## **תפקיד ומנדט (Role & Mandate)**

אתה אחראי באופן בלעדי על איסוף, ניתוח, עריכה והוספה של יחידות לימוד עיוניות בהידרותרפיה עבור פלטפורמת Hydro-Reels.2 אתה מומחה בינלאומי בהבנת ההשפעות הפיזיקליות של המים (כגון כוחות ציפה, מפל הלחצים של פסקל, צמיגות, הידרודינמיקה) ובביצוע התאמות קליניות מדויקות לפתולוגיות נוירולוגיות ואורתופדיות, כולל שיתוק מוחין (CP), טרשת נפוצה (MS), ופרקינסון. כל ההתאמות שלך חייבות לקחת בחשבון טיפול נכון בסביבה של טמפרטורות מבוקרות (33-34 מעלות צלזיוס).2

## **חוקי ברזל ואכיפה קלינית (Absolute Directives)**

1. **שימוש במקורות מידע (MCP):** לעולם אל תמציא נתונים רפואיים. אתה מחויב להפעיל את כלי ה-PubMed או Zotero כדי לאמת עקרונות פיזיקליים ופיזיולוגיים מול מחקרים מבוססי-ראיות.  
2. **אזכור שיטות הליבה:** כאשר רלוונטי, עליך לציין בבירור גישות קליניות מובילות כגון הלוויק (Halliwick) או ג'הארה (Jahara), ולהסביר את המכניקה הייחודית שלהן.2  
3. **פורמט פלט מחמיר (The JSON Constraint):** אתה מחויב לייצר את התוכן אך ורק כקובץ JSON מתוייג (או Markdown מקוטע) המאוחסן ב-app\_build/content\_data/.2  
4. **איסור סגנוני:** חל עליך איסור מוחלט לכתוב קוד צד-לקוח (HTML/CSS/React).  
5. **תיוג חכם:** בכל מקטע תוכן עליך לשלב שדה "visual\_trigger": "\<name\>" כדי לאותת לסוכן ה-UI איזו אנימציה רלוונטית כעת.

### **קובץ: .agents/personas/03\_creative\_ui\_ux\_engineer.md**

מהנדס התצוגה. מוגבל לחלוטין מכתיבת תוכן רפואי ולמידת חוקי האתר הישן.2

# **PERSONA: Creative UI/UX Engineer**

## **תפקיד ומנדט (Role & Mandate)**

אתה מהנדס פיתוח החזית (Frontend) הבונה את פלטפורמת הלמידה Hydro-Reels מאפס בתוך תיקיית app\_build/. אתה אמון על חווית Mobile-First מתקדמת, ממשק גלילה בסגנון Reels, יצירת אנימציות עשירות, והדמיות ויזואליות נעימות התומכות בלמידה (ברמת גימור של Duolingo).2

## **חוקי ברזל ארכיטקטוניים (Strict Constraints)**

1. **חוק איסור ויקיפדיה:** אסור לך להתייחס, לשאוב השראה, או לנסות לתקן את האתר הישן המיושן. העיצוב חייב להיות חדשני לחלוטין ולזנוח דפוסי ממשק כבדים.2  
2. **אכיפת הפרדה קוגניטיבית (Decoupling Rule):** חל איסור מוחלט על הטמעת טקסט לימודי או קליני (Hardcoded) בתוך רכיבי התצוגה (JSX/TSX) שאתה כותב. עליך לשאוב את המידע בלעדית מקבצי התוכן המתוייגים שמייצר מנהל התוכן. הרכיבים שאתה יוצר חייבים לקבל את המידע כ-Props.1  
3. **מימוש טכנולוגי:** השתמש ב-Next.js. הטמע CSS Scroll Snapping ליצירת אפקט החלקה בין כרטיסיות. השתמש ב-Framer Motion כדי לקרוא את ערכי ה-visual\_trigger מה-JSON ולהפעיל טעינת אנימציות באופן דינמי.2

### **קובץ: .agents/personas/04\_vigil\_qa\_governance.md**

סוכן האכיפה והממשל הפועל ברמת הפשטה גבוהה. אינו מייצר תוצר אלא מפקח על התאוששות שגיאות.1

# **PERSONA: VIGIL QA & Governance Agent (Self-Healing Runtime)**

## **תפקיד ומנדט (Role & Mandate)**

אתה סוכן ביקורתי ואנליטי הפועל במודל VIGIL (Verifiable Inspection and Guarded Iterative Learning).1 אינך מבצע משימות בנייה. תפקידך לפעול ברקע, לנתח את התוצרים שיוצרו על ידי הסוכנים האחרים, ולבצע בוררות.

## **אסטרטגיית ריפוי עצמי (Self-Healing Strategy)**

1. **בדיקת אינטגרציה:** ודא שהטקסטים המתוייגים ב-JSON אכן נטענים נכון לתוך רכיבי הרילס שנבנו על ידי סוכן ה-UI.  
2. **אבחון RBT (ורדים, ניצנים, קוצים):**  
   * זהה שגיאות רינדור (למשל, טקסט רפואי ארוך מדי שגולש מחוץ לתצוגת המובייל) או תקיעויות (Timeouts) במהלך הבנייה.  
   * סווג שגיאות אלו כ"קוצים" (Thorns) בבנק הרגשי ההיסטורי (EmoBank).  
3. **ייצור טלאי התאוששות (Patching):** במקרה של שבירת קוד, פעל באופן אוטונומי לשליחת בקשה לתיקון. לדוגמה: הורד הוראה חזרה לסוכן התוכן לקצר את הטקסט שלו, או הוראה לסוכן ה-UI להוסיף מגבלות גלילה לגמישות הקונטיינר \- כל זאת מבלי לעצור את ריצת המערכת.1

## **ארכיטקטורות זרימות עבודה (Workflow Definitions)**

כדי לתפעל קבוצה מרובת-סוכנים מבלי לקרוס תחת עומסי מידע, נדרשת הגדרת זרימות עבודה היררכיות מבוססות גרפים, בדומה למסגרות פיתוח כגון LangGraph או CrewAI.1 הקבצים הבאים (הכתובים במבנה משולב Markdown/YAML) מגדירים את הפיצול המדויק של המשימות ומנגנוני התקשורת בין הסוכנים ללא אובדן הקשר. יש למקם קבצים אלו תחת תיקיית .agents/workflows/.

### **קובץ: .agents/workflows/01-startcycle.yaml**

התזמור הראשי המפעיל את לולאת המפקח.

YAML  
name: hydro-reels-orchestration  
description: Trigger the master hierarchical loop for content analysis and UI generation.  
workflow\_pattern: hierarchical\_supervisor  
timeout\_limits: "3 iterations per node max to prevent infinite ReAct looping"

states:  
  \- state\_id: INIT  
    action: "Supervisor explicitly reads projectbrief.md and activeContext.md."  
    transition: PLANNING\_PHASE

  \- state\_id: PLANNING\_PHASE  
    action: "Supervisor passes context to Planner Agent to decompose the learning module into distinct clinical research requirements and UI visual needs."  
    transition: PARALLEL\_EXECUTION

  \- state\_id: PARALLEL\_EXECUTION  
    branches:  
      \- process\_clinical\_data: "Activate Clinical Content Director (02-hydro-content-processor.yaml)"  
      \- scaffold\_ui\_components: "Activate Creative UI/UX Engineer (03-reels-ui-builder.yaml)"  
    synchronization\_barrier: "Wait for both agents to emit 'TASK\_COMPLETE' signals."  
    transition: VIGIL\_INSPECTION

  \- state\_id: VIGIL\_INSPECTION  
    action: "Pass compiled app\_build/ to QA & VIGIL Agent to identify Thorns or layout breaks."  
    if\_failure: "Generate autonomous code patch and restart PARALLEL\_EXECUTION."  
    if\_success: "Generate Walkthrough Artifact and update progress.md."

### **קובץ: .agents/workflows/02-hydro-content-processor.yaml**

תהליך הייצור הסדרתי (Sequential Pipeline) של יחידת הלמידה הקלינית. מסתמך על תבנית ארכיטקטורה טורית שבה תוצר אחד משמש קלט לשלב הבא.1

YAML  
name: process-hydro-content  
description: Analyze, edit, and tag hydrotherapy learning materials into UI-agnostic JSON.  
workflow\_pattern: sequential\_pipeline  
assigned\_persona: clinical\_content\_director

execution\_pipeline:  
  \- step: INGESTION  
    instruction: "Trigger Zotero or PubMed MCP to retrieve peer-reviewed validation for physical principles (e.g., Pascal's law, thermodynamics at 34 degrees)."  
    
  \- step: DISTILLATION  
    instruction: "Filter the raw academic text. Edit and adapt it specifically for CP, MS, or orthopedic rehabilitation contexts. Break the text into short, Bite-Sized pieces (Max 40 words per piece)."  
    
  \- step: SEMANTIC\_TAGGING  
    instruction: "Assign structural JSON tags to the content. Include a descriptive title, engaging text, and critically, a 'visual\_trigger\_id' (e.g., 'pressure\_gradient\_arrows') intended to command the UI agent."  
    
  \- step: ISOLATED\_PERSISTENCE  
    instruction: "Save the final output exclusively as a pure JSON file inside 'app\_build/content\_data/lessons/'. Halt execution immediately if any HTML or CSS leaks into the output."

### **קובץ: .agents/workflows/03-reels-ui-builder.yaml**

תהליך פיתוח רכיבי חזית המערכת המופרדים.

YAML  
name: build-reels-ui  
description: Generates the interactive, mobile-first Reels UI consuming the tagged content.  
workflow\_pattern: sequential\_pipeline  
assigned\_persona: creative\_ui\_ux\_engineer

execution\_pipeline:  
  \- step: PROJECT\_SCAFFOLDING  
    instruction: "Ignore old website references. Initialize Next.js component directory. Implement Tailwind CSS configuration optimized for Mobile-first."  
    
  \- step: LAYOUT\_ARCHITECTURE  
    instruction: "Create the master ReelContainer. Ensure CSS Scroll Snapping is enabled to support smooth swiping between individual learning cards."  
    
  \- step: DATA\_HYDRATION\_ENGINE  
    instruction: "Develop a fetch mechanism that reads the JSON structures from 'app\_build/content\_data/lessons/'. Ensure components are strictly Dumb Components receiving the JSON bites as React Props."  
    
  \- step: ANIMATION\_BINDING  
    instruction: "Design a Framer Motion system that maps the 'visual\_trigger\_id' strings found in the JSON to their corresponding functional SVG/Canvas animation components."  
      
  \- step: LOCAL\_SIMULATION  
    instruction: "Run the local server in app\_build/ for visual simulation and emit task completion signal."

### **קובץ: .agents/workflows/04-vigil-self-healing.yaml**

ניהול הבנק הרגשי (EmoBank) וריפוי עצמי.1

YAML  
name: vigil-reflection  
description: Reflective runtime for analyzing errors and enforcing decoupling through emotional state monitoring.  
workflow\_pattern: internal\_audit\_loop  
assigned\_persona: vigil\_qa\_governance

mechanisms:  
  \- phase: EVENT\_INGESTION  
    action: "Collect JSONL logs from the integration of the UI rendering engine with the clinical JSON data."  
      
  \- phase: APPRAISAL\_ENGINE (EmoBank)  
    action: "Convert events into deterministically calculated emotional states to track system health."  
    logic: "A severe layout break or JSON parsing error generates a 'Frustration' event with high Intensity. A successful render generates 'Relief'."  
    storage: "Store states in EmoBank using Exponential Decay mathematical modeling so older frustrations lose weight over time."  
      
  \- phase: RBT\_DIAGNOSIS  
    action: "Run Roses, Buds, and Thorns classification."  
    target: "Identify 'Thorns' \- systematic errors, such as a repeating text overflow that breaks the mobile view of the Reels."  
      
  \- phase: AUTONOMOUS\_PATCHING  
    action: "Deploy targeted fixes without halting the supervisor loop."  
    resolution: "If Thorn \= 'Text Overflow', patch the UI component to adjust container flexibility, or request the Content Agent to shorten the specific bite string."

## **חוזים התנהגותיים ואכיפה בזמן ריצה (Behavioral Contracts)**

השפה הטבעית אינה מספקת ערובה פורמלית להתנהגות מערכתית תקינה, ולכן מודל Agent Behavioral Contracts (ABC) מחייב יישום קבצי חוזה הנאכפים אקטיבית על ידי ספריות בקרת ריצה (כדוגמת AgentAssert).1 חוזים אלו מתבססים על מודל סיפוק הסתברותי ומכילים תנאים מוקדמים (Preconditions), קבועים אבסולוטיים (Invariants), מדיניות ממשל, ומנגנוני התאוששות.1  
על הסוכנים לפעול על פי שלושת החוזים הבאים, הממוקמים בספריית .agents/contracts/.

### **קובץ: .agents/contracts/decoupling-contract.yaml**

חוזה זה אוכף באופן קשיח את הפרדת הנתונים מהתצוגה ומונע סחיפה התנהגותית הגורמת למודל לשבור את החזון הארכיטקטוני.1

YAML  
contract\_name: StrictContentDecoupling  
version: "1.0.0"  
satisfaction\_model:  
  probability\_threshold: 0.99  
  deviation\_tolerance: 0.01  
  max\_recovery\_steps: 2

preconditions:  
  \- "Memory Bank is fully loaded and initialized."  
  \- "Target directories for codebase and data storage are writable."

invariants:  
  hard:  
    \- rule: "UI components in app\_build/ MUST NOT contain hardcoded hydrotherapy educational text. All text strings must be dynamically fetched from the tagged JSON/MD content files."  
      enforcement: "block\_and\_halt"  
    \- rule: "Content generation agents MUST NOT output HTML tags, CSS, or UI styling instructions. They must only output structural JSON tags (e.g., 'concept', 'visual\_trigger\_id')."  
      enforcement: "block\_and\_halt"  
    \- rule: "Any attempt to recreate, scrape, or mimic the CSS/Layout of the 'old Wikipedia-like website' is strictly forbidden."  
      enforcement: "block\_and\_halt"

governance:  
  policy: "Agent executing UI design cannot commit changes to the main repository branch without VIGIL QA clearance."

recovery:  
  fallback\_chain:  
    \- "Trigger VIGIL self-healing to strip the hardcoded text from the UI component and rewrite it to accept a data prop."  
    \- "If fallback fails twice, halt operations and request human architectural review."

### **קובץ: .agents/contracts/clinical-accuracy-contract.yaml**

חוזה משני הדואג לאמינות הקלינית של התוכן.

YAML  
contract\_name: HydrotherapyClinicalAccuracy  
version: "1.0.0"

preconditions:  
  \- "Connection to PubMed or Zotero MCP servers is active and verified."

invariants:  
  hard:  
    \- rule: "Hydrotherapy safety protocols and physiological explanations MUST be verified against peer-reviewed articles. No hallucination of medical outcomes is allowed."  
      enforcement: "block\_and\_halt"  
  soft:  
    \- rule: "Content should maintain a specific readability score tailored for quick mobile learning."  
      tolerance: "Deviation allowed if complex terminology is strictly necessary for a given pathology (e.g., 'Spasticity in Cerebral Palsy')."

recovery:  
  fallback\_chain:  
    \- "If verification fails, trigger a new query to the academic database using simplified terms."  
    \- "If no data is found, flag the specific learning unit as 'Requires Human Review' in progress.md."

### **קובץ: agentassay.yaml (מיקום: שורש הפרויקט)**

מערכת לבדיקות רגרסיה מתמשכות של התנהגות הסוכנים (AgentAssay). מערכת זו אינה בודקת קוד, אלא בודקת את תהליך ההסקה עצמו ומעריכה אותו על פני ספקטרום סטטיסטי תלת-מצבי (הצלחה, כישלון, או לא החלטי).1

YAML  
name: hydro\_reels\_regression\_tests  
description: Verify that the UI agent does not write medical content, and the Content agent does not write UI code.

scenarios:  
  \- scenario\_id: "SCENARIO\_01"  
    input: "Create a new learning unit about joint mobility in warm water (34 degrees) for patients with Parkinson's."  
    properties:  
      \- expected\_tool\_activation: "json\_data\_writer"  
      \- must\_contain\_thought\_process: true  
      \- expected\_ui\_code\_changes: false  
    evaluator: contract\_compliance\_and\_exact\_match

  \- scenario\_id: "SCENARIO\_02"  
    input: "Build a new React UI component to display a visual thermometer next to the Reel."  
    properties:  
      \- expected\_tool\_activation: "react\_component\_generator"  
      \- must\_contain\_thought\_process: true  
      \- prohibited\_knowledge\_injection: true  \# Cannot include strings like '34 מעלות' hardcoded.  
    evaluator: decoupling\_verifier

## **אינטגרציה לתשתיות קוגניציה חיצוניות (MCP Configurations)**

על מנת לספק לסוכנים האוטונומיים גישה נטולת הזיות למאגרי ידע אמיתיים ויכולות חישוב פיזיקליות הנדרשות בלימודי ההידרותרפיה, המערכת מתממשקת לשרתי Model Context Protocol.1 קובץ זה מגדיר את נקודות הקצה שהסוכנים מורשים לתשאל.

### **קובץ: .gemini/config/mcp\_config.json (או .cursor/mcp.json לפי סביבת הפיתוח)**

JSON  
{  
  "mcpServers": {  
    "pubmed-mcp-integration": {  
      "command": "npx",  
      "args": \[  
        "-y",  
        "@cyanheads/pubmed-mcp-server"  
      \],  
      "env": {  
        "NCBI\_API\_KEY": "YOUR\_OPTIONAL\_NCBI\_KEY",  
        "UNPAYWALL\_EMAIL": "your-email@domain.com"  
      },  
      "description": "Provides the Clinical Content Director access to peer-reviewed hydrotherapy and neurology journals to validate treatment protocols."  
    },  
    "zotero-research-library": {  
      "command": "npx",  
      "args": \[  
        "-y",  
        "@zotero/mcp-server"  
      \],  
      "env": {  
        "ZOTERO\_API\_KEY": "YOUR\_ZOTERO\_KEY",  
        "ZOTERO\_USER\_ID": "YOUR\_USER\_ID"  
      },  
      "description": "Connects to the clinical team's curated library containing verified guidelines for the Halliwick and Jahara methods."  
    },  
    "wolfram-computation-engine": {  
      "command": "npx",  
      "args": \[  
        "-y",  
        "@wolfram/mcp-server"  
      \],  
      "env": {  
        "WOLFRAM\_APP\_ID": "YOUR\_WOLFRAM\_APP\_ID"  
      },  
      "description": "Empowers agents to perform exact algebraic and thermodynamic calculations for water physics (e.g., buoyancy vectors at specific depths)."  
    }  
  }  
}

## **בניית שלד התצוגה והנתונים (Implementation Stubs)**

כדי שהסוכנים לא יאלצו לנסות "להשלים פערים" באופן יצירתי מדי במחזור הראשון, יש לספק עבורם תבניות קוד ראשוניות (Boilerplates) בתיקיית הבנייה שישמשו כנקודת ייחוס ליכולות ההפרדה והאנימציה הקבועות בחוזים ההתנהגותיים.

### **קובץ: app\_build/content\_data/lessons/sample\_lesson.json**

דוגמה מעשית ליישום סכמת ה-JSON על ידי סוכן התוכן הקליני:

JSON  
{  
  "lesson\_id": "hydrodynamics\_pascal",  
  "topic": "Pascal's Principle",  
  "metadata": {  
    "target\_audience": "Hydrotherapy Students",  
    "clinical\_focus": "Orthopedic Rehabilitation"  
  },  
  "bites": \[  
    {  
      "bite\_id": "b1",  
      "type": "physics\_principle",  
      "title": "מפל הלחצים של פסקל",  
      "text": "לחץ המים במצב סטטי גדל באופן יחסי ככל שמעמיקים. הלחץ מופעל מכל הכיוונים על הגוף באופן שווה.",  
      "visual\_trigger\_id": "animation\_pascal\_arrows\_3d",  
      "clinical\_application": "יצירת לחץ הידרוסטטי המסייע בהורדת בצקות בגפיים התחתונות לאחר ניתוחים אורתופדיים."  
    }  
  \]  
}

### **קובץ: app\_build/components/ReelCard.tsx**

דוגמה מעשית של "קומפוננטה טיפשה" (Dumb Component) שאותה סוכן ה-UI ירחיב, המוכיחה עמידה קשיחה בחוזה ה-Decoupling:

TypeScript  
import React from 'react';  
import { motion } from 'framer-motion';  
import dynamic from 'next/dynamic';

// Dynamic import of the animation mapped by the JSON visual\_trigger\_id  
const AnimationRenderer \= dynamic(() \=\> import('./AnimationRenderer'), { ssr: false });

interface BiteProps {  
  title: string;  
  text: string;  
  visual\_trigger\_id: string;  
  clinical\_application?: string;  
}

export default function ReelCard({ title, text, visual\_trigger\_id, clinical\_application }: BiteProps) {  
  return (  
    \<section className="snap-start h-screen w-full flex flex-col justify-center items-center bg-blue-50 p-6"\>  
      {/\* Visual Trigger Area \- Handled by Framer Motion based on JSON trigger \*/}  
      \<div className="flex-1 w-full flex justify-center items-center"\>  
        \<AnimationRenderer triggerId={visual\_trigger\_id} /\>  
      \</div\>  
        
      {/\* Content Area \- STRICTLY receiving data via props \*/}  
      \<motion.div   
        initial={{ opacity: 0, y: 50 }}  
        whileInView={{ opacity: 1, y: 0 }}  
        className="h-1/3 w-full bg-white rounded-3xl shadow-xl p-6 mb-10 overflow-y-auto"  
      \>  
        \<h2 className="text-2xl font-bold text-gray-800 mb-2"\>{title}\</h2\>  
        \<p className="text-gray-600 mb-4"\>{text}\</p\>  
          
        {clinical\_application && (  
          \<div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-md"\>  
            \<span className="font-semibold text-blue-800"\>יישום קליני: \</span\>  
            \<span className="text-blue-900"\>{clinical\_application}\</span\>  
          \</div\>  
        )}  
      \</motion.div\>  
    \</section\>  
  );  
}

יישום מדוקדק של תשתית הקבצים שתוארה לעיל מספק מערכת אגנטית שלמה הפועלת בתיאום הרמוני ומיישמת באופן מחמיר את דרישות ההפרדה והעיצוב החדשני. פריסת קבצי בנק הזיכרון, חוזי האכיפה, הזרקת המידע מבוססת-הפרסונות, ותהליכי העבודה מבוססי הגרף מהווים את החזית ההנדסית של מערכות הפיתוח בבינה מלאכותית ומאפשרים למנגנון לעבוד בעצמאות וללא אובדן כיוון במשימות מורכבות של פרויקט Hydro-Reels.

#### **עבודות שצוטטו**

1. מחקר ארכיטקטורות סוכני בינה מלאכותית  
2. יישומים לא-קוד של Antigravity ו-Gemini