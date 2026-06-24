import fs from 'fs';
import path from 'path';
import HomeClient from '@/components/HomeClient';

// ==========================================
// DATA TYPES
// ==========================================

interface Bite {
  bite_id: string;
  sequence_title?: string;
  title?: string;
  content?: string;
  [key: string]: any;
}

interface LessonData {
  lesson_id: string;
  lesson_title: string;
  bites: Bite[];
}

interface CatalogCategory {
  category_id: string;
  category_title: string;
  icon: string;
  color_from: string;
  color_to: string;
  description: string;
  lessons: string[];
}

interface CourseCatalog {
  categories: CatalogCategory[];
  learning_order: string[];
}

// ==========================================
// DATA LOADING (Server-side only)
// ==========================================

function loadCatalog(): CourseCatalog {
  const catalogPath = path.join(process.cwd(), 'content_data', 'course_catalog.json');
  return JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
}

function loadLessons(catalog: CourseCatalog): Map<string, LessonData> {
  const lessonsDir = path.join(process.cwd(), 'content_data', 'lessons');
  const lessonMap = new Map<string, LessonData>();

  for (const lessonId of catalog.learning_order) {
    const filePath = path.join(lessonsDir, `${lessonId}.json`);
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as LessonData;
        if (data.bites && data.bites.length > 0) {
          lessonMap.set(lessonId, data);
        }
      } catch (e) {
        console.error(`Failed to parse ${lessonId}.json:`, e);
      }
    }
  }

  return lessonMap;
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

// ==========================================
// BUILD SEARCH INDEX
// ==========================================

interface SearchItem {
  lesson_id: string;
  lesson_title: string;
  bite_title: string;
  bite_id: string;
  sequence_title: string;
  category_title: string;
  category_icon: string;
}

function buildSearchIndex(
  catalog: CourseCatalog,
  lessonMap: Map<string, LessonData>
): SearchItem[] {
  const index: SearchItem[] = [];

  for (const category of catalog.categories) {
    for (const lessonId of category.lessons) {
      const lesson = lessonMap.get(lessonId);
      if (!lesson) continue;

      for (const bite of lesson.bites) {
        index.push({
          lesson_id: lesson.lesson_id,
          lesson_title: lesson.lesson_title,
          bite_title: bite.title || '',
          bite_id: bite.bite_id,
          sequence_title: bite.sequence_title || '',
          category_title: category.category_title,
          category_icon: category.icon,
        });
      }
    }
  }

  return index;
}

// ==========================================
// BUILD CATEGORY DATA FOR BOTTOM SHEET
// ==========================================

interface CategoryWithLessons {
  category_id: string;
  category_title: string;
  icon: string;
  color_from: string;
  color_to: string;
  description: string;
  lessons: { lesson_id: string; lesson_title: string; bite_count: number }[];
}

function buildCategoryData(
  catalog: CourseCatalog,
  lessonMap: Map<string, LessonData>
): CategoryWithLessons[] {
  return catalog.categories.map((cat) => ({
    category_id: cat.category_id,
    category_title: cat.category_title,
    icon: cat.icon,
    color_from: cat.color_from,
    color_to: cat.color_to,
    description: cat.description,
    lessons: cat.lessons
      .filter((id) => lessonMap.has(id))
      .map((id) => {
        const lesson = lessonMap.get(id)!;
        return {
          lesson_id: lesson.lesson_id,
          lesson_title: lesson.lesson_title,
          bite_count: lesson.bites.length,
        };
      }),
  }));
}

// ==========================================
// BUILD SEQUENCES WITH BRIDGE CARDS
// ==========================================

interface SequenceGroup {
  lessonId: string;
  lessonTitle: string;
  sequenceTitle: string;
  bites: Bite[];
}

function buildSequencesWithBridges(
  catalog: CourseCatalog,
  lessonMap: Map<string, LessonData>
): SequenceGroup[] {
  const allSequences: SequenceGroup[] = [];

  const orderedLessons = catalog.learning_order
    .filter((id) => lessonMap.has(id))
    .map((id) => lessonMap.get(id)!);

  for (let lessonIdx = 0; lessonIdx < orderedLessons.length; lessonIdx++) {
    const lesson = orderedLessons[lessonIdx];
    // Add topic intro card at the beginning of the lesson
    allSequences.push({
      lessonId: lesson.lesson_id,
      lessonTitle: lesson.lesson_title,
      sequenceTitle: '__intro__',
      bites: [
        {
          bite_id: `intro_${lesson.lesson_id}`,
          type: 'topic_intro_card',
          title: lesson.lesson_title,
        },
      ],
    });

    const seqs = groupBitesBySequence(lesson.bites);

    for (const seq of seqs) {
      allSequences.push({
        lessonId: lesson.lesson_id,
        lessonTitle: lesson.lesson_title,
        sequenceTitle: seq.title,
        bites: seq.bites,
      });
    }

    // Add bridge card at the end of each lesson
    const nextLesson = orderedLessons[lessonIdx + 1];
    allSequences.push({
      lessonId: lesson.lesson_id,
      lessonTitle: lesson.lesson_title,
      sequenceTitle: '__bridge__',
      bites: [
        {
          bite_id: `bridge_${lesson.lesson_id}`,
          type: 'sequence_end_card',
          completed_title: lesson.lesson_title,
          next_lesson_title: nextLesson?.lesson_title || undefined,
          next_lesson_id: nextLesson?.lesson_id || undefined,
          title: `סיום: ${lesson.lesson_title}`,
        },
      ],
    });
  }

  return allSequences;
}

// ==========================================
// PAGE COMPONENT (Server Component)
// ==========================================

export default async function Home() {
  const catalog = loadCatalog();
  const lessonMap = loadLessons(catalog);
  const searchIndex = buildSearchIndex(catalog, lessonMap);
  const categories = buildCategoryData(catalog, lessonMap);
  const sequences = buildSequencesWithBridges(catalog, lessonMap);

  const totalBites = sequences
    .filter((s) => s.sequenceTitle !== '__bridge__' && s.sequenceTitle !== '__intro__')
    .reduce((acc, s) => acc + s.bites.length, 0);
  const totalLessons = lessonMap.size;

  return (
    <HomeClient
      sequences={sequences}
      searchIndex={searchIndex}
      categories={categories}
      totalBites={totalBites}
      totalLessons={totalLessons}
    />
  );
}
