import fs from 'fs';
import path from 'path';
import ReelCard from '@/components/ReelCard';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'content_data', 'lessons', 'pascal_lesson.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const lessonData = JSON.parse(fileContents);

  return (
    <main className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-blue-50">
      {/* Intro Reel */}
      <section className="snap-start h-[100dvh] w-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-inner">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-10 -right-20"></div>
        <div className="absolute w-96 h-96 bg-blue-700/20 rounded-full blur-3xl -bottom-10 -left-20"></div>
        
        <div className="z-10 text-center px-8 flex flex-col items-center">
          <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl inline-block">
            <span className="text-6xl">🌊</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 font-sans tracking-tight leading-tight" dir="rtl">{lessonData.topic}</h1>
          <p className="text-lg font-semibold mb-12 text-blue-50 bg-blue-900/30 px-4 py-2 rounded-full tracking-wider">{lessonData.metadata.target_audience}</p>
          
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-sm font-bold tracking-widest uppercase text-white/90">החלק למעלה ללמידה</span>
            <div className="mt-3 w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Reels */}
      {lessonData.bites.map((bite: any) => (
        <ReelCard 
          key={bite.bite_id}
          title={bite.title}
          text={bite.text}
          visual_trigger_id={bite.visual_trigger_id}
        />
      ))}
    </main>
  );
}
