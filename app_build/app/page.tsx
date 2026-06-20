import fs from 'fs';
import path from 'path';
import { ReelContainer } from '@/components/ReelContainer';
import ReelRenderer from '@/components/ReelRenderer';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'content_data', 'lessons', 'unit1_physics.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const lessonData = JSON.parse(fileContents);

  return (
    <main className="w-full bg-slate-950 text-white overflow-hidden">
      <ReelContainer>
        {/* Intro Reel */}
        <section className="h-full w-full flex flex-col justify-center items-center relative bg-gradient-to-br from-blue-600 to-cyan-500 shadow-inner">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-10 -right-20 pointer-events-none"></div>
          <div className="absolute w-96 h-96 bg-blue-900/40 rounded-full blur-3xl -bottom-10 -left-20 pointer-events-none"></div>
          
          <div className="z-10 text-center px-8 flex flex-col items-center">
            <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl inline-block">
              <span className="text-6xl drop-shadow-lg">🌊</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-4 font-sans tracking-tight leading-tight drop-shadow-md text-white text-center" dir="rtl">{lessonData.lesson_title}</h1>
            <p className="text-lg font-semibold mb-12 text-blue-50 bg-black/20 px-5 py-2 rounded-full tracking-wider shadow-inner">החלק למעלה ללמידה</p>
            
            <div className="animate-bounce flex flex-col items-center">
              <div className="mt-3 w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
                <div className="w-1.5 h-3 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Reels */}
        {lessonData.bites.map((bite: any) => (
          <ReelRenderer key={bite.bite_id} bite={bite} />
        ))}
      </ReelContainer>
    </main>
  );
}
