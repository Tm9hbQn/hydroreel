import fs from 'fs';
import path from 'path';
import ReelRenderer from '@/components/ReelRenderer';

// Ordered list of lesson files to display in feed
const LESSON_ORDER = [
  'unit1_physics.json',
  'physiology_01_cardio.json',
  'physiology_02_renal.json',
  'physiology_03_respiratory.json',
  'physiology_04_neuro.json',
  'physiology_05_diabetes.json',
  'neuro_01_stroke.json',
  'neuro_02_sci.json',
  'neuro_03_pots.json',
  'neuro_04_epilepsy.json',
  'orthopedics_01_fractures.json',
  'orthopedics_02_spine.json',
  'orthopedics_03_lower_limb.json',
  'orthopedics_04_upper_limb.json',
];

interface Bite {
  bite_id: string;
  sequence_title?: string;
  [key: string]: any;
}

interface LessonData {
  lesson_id: string;
  lesson_title: string;
  bites: Bite[];
}

function groupBitesBySequence(bites: Bite[]): { title: string; bites: Bite[] }[] {
  const sequences: { title: string; bites: Bite[] }[] = [];
  let currentSequence: { title: string; bites: Bite[] } | null = null;
  for (const bite of bites) {
    const title = bite.sequence_title || 'כללי';
    if (!currentSequence || currentSequence.title !== title) {
      if (currentSequence) sequences.push(currentSequence);
      currentSequence = { title, bites: [bite] };
    } else {
      currentSequence.bites.push(bite);
    }
  }
  if (currentSequence) sequences.push(currentSequence);
  return sequences;
}

export default async function Home() {
  const lessonsDir = path.join(process.cwd(), 'content_data', 'lessons');

  // Load lessons in defined order, skip missing files
  const allLessons: LessonData[] = [];
  for (const filename of LESSON_ORDER) {
    const filePath = path.join(lessonsDir, filename);
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as LessonData;
        if (data.bites && data.bites.length > 0) {
          allLessons.push(data);
        }
      } catch (e) {
        console.error(`Failed to parse ${filename}:`, e);
      }
    }
  }

  // Build one big flat list of sequences across all lessons
  const allSequences: { lessonTitle: string; title: string; bites: Bite[] }[] = [];
  for (const lesson of allLessons) {
    const seqs = groupBitesBySequence(lesson.bites);
    for (const seq of seqs) {
      allSequences.push({ lessonTitle: lesson.lesson_title, title: seq.title, bites: seq.bites });
    }
  }

  return (
    <main className="w-full bg-[#fafcff]">
      {/* Intro Reel */}
      <section className="snap-start h-[100dvh] w-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-inner">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-10 -right-20 pointer-events-none" />
        <div className="absolute w-96 h-96 bg-blue-700/20 rounded-full blur-3xl -bottom-10 -left-20 pointer-events-none" />
        <div className="z-10 text-center px-8 flex flex-col items-center">
          <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl inline-block">
            <span className="text-6xl drop-shadow-lg">🌊</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 font-sans tracking-tight leading-tight drop-shadow-md text-white text-center" dir="rtl">
            Hydro-Reels
          </h1>
          <p className="text-lg font-semibold mb-4 text-blue-50" dir="rtl">
            האקדמיה להידרותרפיה בפורמט Bite-Sized
          </p>
          <p className="text-sm text-white/70 mb-12 bg-blue-900/20 px-4 py-2 rounded-full" dir="rtl">
            {allSequences.reduce((acc, s) => acc + s.bites.length, 0)} יחידות לימוד • {allLessons.length} נושאים
          </p>
          <div className="animate-bounce flex flex-col items-center">
            <span className="text-sm font-bold tracking-widest uppercase text-white/90">התחל</span>
            <div className="mt-3 w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2 backdrop-blur-sm">
              <div className="w-1.5 h-3 bg-white rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </section>

      {/* All lessons as one continuous reel feed */}
      {allSequences.map((seq, seqIndex) => (
        <section key={seqIndex} className="relative w-full">
          {/* Sticky Sequence Title */}
          <header className="sticky top-0 pt-4 z-50 w-full flex justify-center pointer-events-none">
            <div className="bg-white/80 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-slate-200/50 flex flex-col items-center">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest" dir="rtl">{seq.lessonTitle}</span>
              <h3 className="text-slate-800 font-bold text-sm md:text-base tracking-tight" dir="rtl">
                {seq.title}
              </h3>
            </div>
          </header>

          {seq.bites.map((bite: Bite) => (
            <ReelRenderer key={`${seqIndex}-${bite.bite_id}`} bite={bite} />
          ))}
        </section>
      ))}
    </main>
  );
}
