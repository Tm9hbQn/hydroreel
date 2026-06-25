import fs from 'fs';
import path from 'path';
import QuizClient from '@/components/quiz/QuizClient';

export default async function QuizPage() {
  const filePath = path.join(process.cwd(), 'content_data', 'qa_bank', 'master_qa_bank.json');
  let questions = [];
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      questions = data.questions || [];
    }
  } catch (error) {
    console.error("Failed to load questions:", error);
  }

  return <QuizClient allQuestions={questions} />;
}
