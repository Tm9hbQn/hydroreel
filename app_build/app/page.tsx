import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function CatalogPage() {
  const lessonsDir = path.join(process.cwd(), 'content_data', 'lessons');
  const files = fs.readdirSync(lessonsDir).filter(file => file.endsWith('.json'));

  const lessons = files.map(file => {
    const filePath = path.join(lessonsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      const data = JSON.parse(content);
      return {
        id: file.replace('.json', ''),
        lesson_id: data.lesson_id,
        lesson_title: data.lesson_title,
        biteCount: data.bites ? data.bites.length : 0
      };
    } catch (e) {
      console.error(`Error parsing ${file}:`, e);
      return null;
    }
  }).filter(Boolean);

  return (
    <main className="w-full min-h-[100dvh] bg-[#f0f4f8] font-sans pb-12">
      <header className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white pt-16 pb-8 px-6 rounded-b-[2rem] shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-2xl -top-10 -right-10 pointer-events-none"></div>
        <div className="absolute w-40 h-40 bg-blue-800/20 rounded-full blur-xl bottom-0 -left-10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
             <span className="text-4xl drop-shadow-md">🌊</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-center drop-shadow-md" dir="rtl">
            Hydro-Reels
          </h1>
          <p className="text-blue-100 mt-2 font-medium text-center" dir="rtl">
            האקדמיה להידרותרפיה בפורמט Bite-Sized
          </p>
        </div>
      </header>

      <section className="px-5 mx-auto max-w-md w-full flex flex-col gap-5">
        <h2 className="text-xl font-bold text-slate-800 mb-2 px-1" dir="rtl">ספריית שיעורים</h2>
        
        {lessons.map((lesson: any) => (
          <Link href={`/lesson/${lesson.id}`} key={lesson.id} className="block group">
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-md">
              <div className="absolute top-0 right-0 w-1 h-full bg-cyan-400 group-hover:bg-blue-500 transition-colors"></div>
              
              <div className="flex justify-between items-start" dir="rtl">
                <div className="flex-1 pl-4">
                  <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md mb-2 inline-block">
                    {lesson.lesson_id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2">
                    {lesson.lesson_title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 font-medium">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400 ml-2"></span>
                    {lesson.biteCount} יחידות לימוד
                  </div>
                </div>
                
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center shadow-inner group-hover:bg-blue-50 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        ))}
        
        {lessons.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm" dir="rtl">
            <span className="text-4xl mb-4 block">📭</span>
            <p className="text-slate-500 font-medium">לא נמצאו שיעורים בספרייה</p>
          </div>
        )}
      </section>
    </main>
  );
}
