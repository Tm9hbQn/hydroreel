import json
import os
import uuid

base_dir = r'C:\Users\lavno\OneDrive\Desktop\projects\hydroreel\app_build\content_data\lessons'

quizzes = {
    'neuro_01_stroke.json': [
        {
            'question': 'מהי אחת המטרות העיקריות בטיפול הידרותרפי לאחר שבץ מוחי (CVA)?',
            'options': [
                {'text': 'שיפור שיווי משקל והפחתת טונוס ספסטי', 'isCorrect': True, 'feedback': 'המים תומכים במשקל הגוף ומאפשרים תרגול שיווי משקל, בעוד החום מסייע בהפחתת ספסטיות.'},
                {'text': 'הגברת עומס על מפרקים', 'isCorrect': False, 'feedback': 'להפך, המים מפחיתים עומס בזכות כוח הציפה.'},
                {'text': 'עידוד אי מוביליות', 'isCorrect': False, 'feedback': 'המטרה היא לעודד תנועה ועצמאות.'},
                {'text': 'העלאת לחץ דם', 'isCorrect': False, 'feedback': 'זו אינה מטרה טיפולית ואף עלולה להיות מסוכנת.'}
            ]
        },
        {
            'question': 'באיזה אופן כוח הצמיגות של המים תורם לשיקום לאחר CVA?',
            'options': [
                {'text': 'מאפשר תרגול בקצב תנועה נשלט ומתן זמן תגובה לאיזון', 'isCorrect': True, 'feedback': 'הצמיגות מאטה תנועות פתאומיות ומאפשרת למטופל להגיב ולתקן יציבה.'},
                {'text': 'גורם לנפילות תכופות', 'isCorrect': False, 'feedback': 'הצמיגות דווקא מאטה נפילות ומאפשרת ייצוב.'},
                {'text': 'מבטל לחלוטין את התנגדות המים', 'isCorrect': False, 'feedback': 'צמיגות היא המקור להתנגדות, לא מבטלת אותה.'},
                {'text': 'מגביר תנועות בלתי רצוניות', 'isCorrect': False, 'feedback': 'הצמיגות נוטה לשכך תנועות פתאומיות.'}
            ]
        }
    ],
    'neuro_02_sci.json': [
        {
            'question': 'כיצד המים מסייעים למטופל עם פגיעת חוט שדרה (SCI)?',
            'options': [
                {'text': 'הפחתת משקל גוף המאפשרת תנועתיות קלה יותר', 'isCorrect': True, 'feedback': 'כוח הציפה מפחית את משקל הגוף, ומאפשר תנועה שלא מתאפשרת ביבשה.'},
                {'text': 'קירור קיצוני של הגוף', 'isCorrect': False, 'feedback': 'בריכות טיפוליות הן חמימות בדרך כלל.'},
                {'text': 'החמרת כאבים עצביים', 'isCorrect': False, 'feedback': 'לרוב המים החמים עוזרים בהפחתת כאב.'},
                {'text': 'הגדלת כוח הכבידה', 'isCorrect': False, 'feedback': 'כוח הציפה מנוגד לכוח הכבידה.'}
            ]
        },
        {
            'question': 'מדוע שיווי משקל בישיבה חשוב לתרגול במים עבור נפגעי חוט שדרה?',
            'options': [
                {'text': 'לשיפור עצמאות תפקודית וחיזוק שרירי גו שנותרו פעילים', 'isCorrect': True, 'feedback': 'יציבות גו קריטית לתפקוד יומיומי כמו מעברים וישיבה בכיסא גלגלים.'},
                {'text': 'משום שאין לכך השפעה מחוץ למים', 'isCorrect': False, 'feedback': 'יש לכך השפעה ישירה על התפקוד ביבשה.'},
                {'text': 'כדי להעלות את קצב הלב למקסימום', 'isCorrect': False, 'feedback': 'זו לא המטרה העיקרית של תרגול שיווי משקל.'},
                {'text': 'כי זו התנוחה היחידה האפשרית במים', 'isCorrect': False, 'feedback': 'ניתן לתרגל במגוון תנוחות, בהתאם לפגיעה.'}
            ]
        }
    ],
    'neuro_03_pots.json': [
        {
            'question': 'מדוע חשוב לשים לב לטמפרטורת המים בטיפול ב-POTS?',
            'options': [
                {'text': 'מים חמים מדי עלולים להרחיב כלי דם ולהחמיר סחרחורות', 'isCorrect': True, 'feedback': 'הרחבת כלי דם בפריפריה מקשה על החזר דם ועלולה להוביל להתעלפות ב-POTS.'},
                {'text': 'מים קרים משפרים מיד את קצב הלב', 'isCorrect': False, 'feedback': 'התגובה למים קרים עשויה להיות מורכבת.'},
                {'text': 'טמפרטורה לא משפיעה על סימפטומים', 'isCorrect': False, 'feedback': 'טמפרטורה היא גורם קריטי אצל מטופלי POTS.'},
                {'text': 'מים חמים מעלים את לחץ הדם בפתאומיות', 'isCorrect': False, 'feedback': 'הם מורידים לחץ דם, מה שמחמיר סימפטומים.'}
            ]
        }
    ],
    'neuro_04_epilepsy.json': [
        {
            'question': 'מהו דגש בטיחותי קריטי בטיפול בבריכה לאדם עם אפילפסיה?',
            'options': [
                {'text': 'השגחה צמודה ורצופה למקרה של פרכוס במים', 'isCorrect': True, 'feedback': 'פרכוס במים מהווה סכנת טביעה מיידית ולכן דורש השגחה מתמדת במרחק נגיעה.'},
                {'text': 'טיפול רק במים עמוקים', 'isCorrect': False, 'feedback': 'העומק לא מונע פרכוסים.'},
                {'text': 'שחייה ללא ליווי לשיפור הביטחון', 'isCorrect': False, 'feedback': 'מסוכן מאוד ויכול להוביל לטביעה.'},
                {'text': 'שימוש בטמפרטורות קיצוניות', 'isCorrect': False, 'feedback': 'עלול אפילו לעורר התקף.'}
            ]
        }
    ],
    'neuro_05_cp.json': [
        {
            'question': 'אילו יתרונות מספקת ההידרותרפיה לילדים עם שיתוק מוחין (CP)?',
            'options': [
                {'text': 'הרפיית שרירים ספסטיים ושיפור טווחי תנועה', 'isCorrect': True, 'feedback': 'המים החמים והרפיית הגוף מסייעים בהורדת ספסטיות.'},
                {'text': 'עלייה בטונוס השרירים', 'isCorrect': False, 'feedback': 'לרוב המטרה היא הפחתת הטונוס במקרי ספסטיות.'},
                {'text': 'מניעת התפתחות מוטורית', 'isCorrect': False, 'feedback': 'המטרה היא לעודד התפתחות מוטורית.'},
                {'text': 'החמרת כיווצים', 'isCorrect': False, 'feedback': 'הטיפול נועד למנוע או לשחרר כיווצים.'}
            ]
        },
        {
            'question': 'כיצד מים חמים משפיעים על שרירים ספסטיים בילדים עם CP?',
            'options': [
                {'text': 'מסייעים בהרפיית השריר ומאפשרים מתיחה פסיבית טובה יותר', 'isCorrect': True, 'feedback': 'החום מרפה את הרקמות ומאפשר עבודה אפקטיבית יותר על טווחי תנועה.'},
                {'text': 'מעלים את הטונוס השרירי', 'isCorrect': False, 'feedback': 'לרוב החום מוריד טונוס.'},
                {'text': 'גורמים להתקפים אפילפטיים', 'isCorrect': False, 'feedback': 'אין קשר ישיר.'},
                {'text': 'מונעים התפתחות קוגניטיבית', 'isCorrect': False, 'feedback': 'התפתחות קוגניטיבית אינה נפגעת ממים חמים.'}
            ]
        }
    ],
    'neuro_06_ms.json': [
        {
            'question': 'מדוע טמפרטורת הבריכה היא פקטור משמעותי עבור מטופלי טרשת נפוצה (MS)?',
            'options': [
                {'text': 'חום עלול להחמיר זמנית את התסמינים הנוירולוגיים (תופעת אוהטוף)', 'isCorrect': True, 'feedback': 'עליה בטמפרטורת הגוף מחמירה בעיות הולכה עצבית ולכן דורשת מים קרירים יותר או בקרה קפדנית.'},
                {'text': 'הם סובלים מיתר לחץ דם תמידי', 'isCorrect': False, 'feedback': 'לא תסמין מרכזי של טרשת נפוצה.'},
                {'text': 'מים קרים גורמים להתקפים', 'isCorrect': False, 'feedback': 'להפך, מים קרירים לרוב מיטיבים עם חולי טרשת.'},
                {'text': 'טמפרטורה חמה מרפאת את המחלה', 'isCorrect': False, 'feedback': 'אין ריפוי דרך טמפרטורה למחלה זו.'}
            ]
        }
    ],
    'neuro_07_parkinson.json': [
        {
            'question': 'איזו תרומה יש לטיפול במים לחולי פרקינסון?',
            'options': [
                {'text': 'שיפור סימטריה, שיווי משקל והליכה ללא חשש מנפילות', 'isCorrect': True, 'feedback': 'תמיכת המים מעניקה ביטחון שמאפשר תרגול צעדים רחבים ורוטציות ללא פחד.'},
                {'text': 'הגדלת הקיפאון התנועתי (Freezing)', 'isCorrect': False, 'feedback': 'המטרה היא לשבור את הקיפאון התנועתי.'},
                {'text': 'החלשת שרירי הליבה', 'isCorrect': False, 'feedback': 'אנו עובדים על חיזוקם.'},
                {'text': 'מניעת תנועה עצמאית', 'isCorrect': False, 'feedback': 'אנו מעודדים תנועה אקטיבית.'}
            ]
        }
    ],
    'orthopedics_01_fractures.json': [
        {
            'question': 'מתי לרוב ישולב טיפול הידרותרפי לאחר שבר?',
            'options': [
                {'text': 'לאחר אישור רופא, כדי לשקם טווחי תנועה ללא נשיאת משקל מלאה', 'isCorrect': True, 'feedback': 'כוח הציפה מאפשר הפעלה ראשונית של המפרק לפני שאפשר לשאת משקל מלא ביבשה.'},
                {'text': 'מיד ביום שלאחר השבר', 'isCorrect': False, 'feedback': 'מסוכן מדי ולרוב השבר מקובע עדיין.'},
                {'text': 'רק לאחר החלמה מלאה של העצם', 'isCorrect': False, 'feedback': 'לרוב מתחילים בשלבי השיקום למניעת נוקשות.'},
                {'text': 'כתחליף לקיבוע גבס', 'isCorrect': False, 'feedback': 'ההידרותרפיה אינה תחליף לקיבוע הרפואי.'}
            ]
        }
    ],
    'orthopedics_02_spine.json': [
        {
            'question': 'כיצד הציפה במים עוזרת בטיפול בכאבי גב ועמוד שדרה?',
            'options': [
                {'text': 'מפחיתה את העומס על החוליות והדיסקים', 'isCorrect': True, 'feedback': 'צמצום כוח הכבידה במים מרווח בין החוליות ומקל על כאב כתוצאה מעומס.'},
                {'text': 'מגדילה את הלחץ על העצבים', 'isCorrect': False, 'feedback': 'היא מפחיתה לחץ דחיסתי.'},
                {'text': 'מונעת הפעלת שרירי ליבה', 'isCorrect': False, 'feedback': 'להפך, היא דורשת הפעלתם לצורך ייצוב בסביבה לא יציבה.'},
                {'text': 'יוצרת תנועתיות יתר מסוכנת', 'isCorrect': False, 'feedback': 'הצמיגות מונעת תנועתיות יתר פתאומית.'}
            ]
        }
    ],
    'orthopedics_03_lower_limb.json': [
        {
            'question': 'איזה יתרון יש לסביבת המים בשיקום פציעות גפיים תחתונות?',
            'options': [
                {'text': 'התחלת תרגול נשיאת משקל הדרגתית ובטוחה', 'isCorrect': True, 'feedback': 'ניתן לשלוט בכמות המשקל הנישאת על ידי שינוי עומק המים (למשל מים עד המותניים מפחיתים כ-50%).'},
                {'text': 'מניעת עבודת שרירים לחלוטין', 'isCorrect': False, 'feedback': 'השרירים עדיין עובדים מול צמיגות המים.'},
                {'text': 'יצירת עומס כפול על המפרק', 'isCorrect': False, 'feedback': 'עומס מופחת.'},
                {'text': 'הפחתת סיכויי ההחלמה', 'isCorrect': False, 'feedback': 'הם משפרים ומאיצים שיקום.'}
            ]
        }
    ],
    'orthopedics_04_upper_limb.json': [
        {
            'question': 'מהי תרומת ההתנגדות של המים בשיקום גפיים עליונות?',
            'options': [
                {'text': 'חיזוק שרירים הדרגתי בכל כיווני התנועה', 'isCorrect': True, 'feedback': 'בניגוד למשקולות שעובדות עם כוח הכבידה לכיוון אחד, המים מתנגדים לכל כיוון שבו ננוע.'},
                {'text': 'הקטנת זרימת הדם לאזור', 'isCorrect': False, 'feedback': 'התרגול והחום מגבירים זרימת דם.'},
                {'text': 'יצירת חוסר יציבות מפרקית', 'isCorrect': False, 'feedback': 'היא תורמת לייצוב דרך עבודת שרירים מתואמת.'},
                {'text': 'מניעת הפעלת שרירים מייצבים', 'isCorrect': False, 'feedback': 'שרירים מייצבים פועלים רבות לייצוב במים.'}
            ]
        }
    ],
    'orthopedics_05_fibromyalgia.json': [
        {
            'question': 'מה מטרת העל בטיפול הידרותרפי לחולי פיברומיאלגיה?',
            'options': [
                {'text': 'הפחתת כאב כללית ושיפור איכות חיים באמצעות תנועה במים חמימים', 'isCorrect': True, 'feedback': 'המים החמים מסייעים בהרפיה כללית, והתנועה משחררת אנדורפינים המשפרים תחושה.'},
                {'text': 'אימוני כוח עצימים', 'isCorrect': False, 'feedback': 'עצימות גבוהה מדי עלולה להחמיר כאב בפיברומיאלגיה.'},
                {'text': 'הגדלת העייפות הכרונית', 'isCorrect': False, 'feedback': 'אנו מנסים להילחם בעייפות באמצעות פעילות מתונה.'},
                {'text': 'קירור הגוף לכיווץ שרירים', 'isCorrect': False, 'feedback': 'קירור לרוב יגביר נוקשות וכאב אצל חולים אלו.'}
            ]
        }
    ]
}

def inject_quizzes():
    for filename, quiz_data_list in quizzes.items():
        filepath = os.path.join(base_dir, filename)
        if not os.path.exists(filepath):
            print(f'File {filename} not found.')
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        bites = data.get('bites', [])
        if not bites:
            continue
            
        # Find where to insert (before sequence_end_card or at the very end)
        insert_idx = len(bites)
        for i, bite in enumerate(bites):
            if bite.get('type') == 'sequence_end_card':
                insert_idx = i
                break
                
        # Get sequence_title from the card right before insert_idx
        seq_title = 'Quiz'
        if insert_idx > 0 and 'sequence_title' in bites[insert_idx - 1]:
            seq_title = bites[insert_idx - 1]['sequence_title']
            
        # Prepare quiz cards
        quiz_cards = []
        for j, q_data in enumerate(quiz_data_list):
            q_id = f'q_{filename.replace(".json", "")}_{j+1}_{uuid.uuid4().hex[:6]}'
            quiz_card = {
                'bite_id': q_id,
                'type': 'quiz_card',
                'sequence_title': seq_title,
                'question': q_data['question'],
                'options': q_data['options']
            }
            quiz_cards.append(quiz_card)
            
        # Insert them
        for card in reversed(quiz_cards):
            bites.insert(insert_idx, card)
            
        data['bites'] = bites
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        print(f'Injected {len(quiz_cards)} quizzes into {filename}.')

if __name__ == "__main__":
    inject_quizzes()
