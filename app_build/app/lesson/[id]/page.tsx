import fs from 'fs';
import path from 'path';
import ReelRenderer from '@/components/ReelRenderer';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const lessonsDir = path.join(process.cwd(), 'content_data', 'lessons');
  const files = fs.readdirSync(lessonsDir).filter(file => file.endsWith('.json'));
  
  return files.map((file) => ({
    id: file.replace('.json', ''),
  }));
}

export default async function LessonPage({ params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), 'content_data', 'lessons', `${params.id}.json`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const lessonData = JSON.parse(fileContents);

  // Group bites by sequence_title
  const sequences: { title: string; bites: any[] }[] = [];
  let currentSequence: { title: string; bites: any[] } | null = null;

  lessonData.bites.forEach((bite: any) => {
    const title = bite.sequence_title || "כללי";
    if (!currentSequence || currentSequence.title !== title) {
      if (currentSequence) sequences.push(currentSequence);
      currentSequence = { title, bites: [bite] };
    } else {
      currentSequence.bites.push(bite);
    }
  });
  if (currentSequence) sequences.push(currentSequence);

  return (
    <main className="w-full bg-[#fafcff]">
      {/* Intro Reel */}
      <section className="snap-start h-[100dvh] w-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-inner">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-10 -right-20 pointer-events-none"></div>
        <div className="absolute w-96 h-96 bg-blue-700/20 rounded-full blur-3xl -bottom-10 -left-20 pointer-events-none"></div>
        
        <div className="z-10 text-center px-8 flex flex-col items-center">
          <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl inline-block">
            <span className="text-6xl drop-shadow-lg">🌊</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 font-sans tracking-tight leading-tight drop-shadow-md text-white text-center" dir="rtl">{lessonData.lesson_title}</h1>
          <p className="text-lg font-semibold mb-12 text-blue-50 bg-blue-900/30 px-5 py-2 rounded-full tracking-wider shadow-inner">מוכן ללמוד? החלק למטה</p>
          
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-sm font-bold tracking-widest uppercase text-white/90">החלק</span>
            <div className="mt-3 w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
              <div className="w-1.5 h-3 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Reels Grouped by Sequence */}
      {sequences.map((seq, seqIndex) => (
        <section key={seqIndex} className="relative w-full">
          {/* Sticky Sequence Title */}
          <header className="sticky top-0 pt-4 z-50 w-full flex justify-center pointer-events-none">
            <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-slate-200/50">
              <h3 className="text-slate-800 font-bold text-sm md:text-base tracking-tight" dir="rtl">
                {seq.title}
              </h3>
            </div>
          </header>
          
          {seq.bites.map((bite: any) => (
            <ReelRenderer key={bite.bite_id} bite={bite} />
          ))}
        </section>
      ))}
    </main>
  );
}
