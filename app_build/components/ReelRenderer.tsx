"use client";
import React from 'react';
import PrincipleCard from './blocks/PrincipleCard';
import ClinicalCaseCard from './blocks/ClinicalCaseCard';
import CompareCard from './blocks/CompareCard';
import FlashcardCarousel from './blocks/FlashcardCarousel';
import InteractiveCheck from './blocks/InteractiveCheck';
import SequenceEndCard from './blocks/SequenceEndCard';

interface Props {
  bite: any;
}

export default function ReelRenderer({ bite }: Props) {
  switch (bite.type) {
    case 'principle_card':
      return <PrincipleCard bite={bite} />;
    case 'clinical_case_card':
      return <ClinicalCaseCard bite={bite} />;
    case 'compare_card':
      const compareBite = {
        ...bite,
        compare_a: { label: bite.comparison?.side_a?.title, text: bite.comparison?.side_a?.content },
        compare_b: { label: bite.comparison?.side_b?.title, text: bite.comparison?.side_b?.content }
      };
      return <CompareCard bite={compareBite} />;
    case 'flashcard_carousel':
      return <FlashcardCarousel bite={bite} />;
    case 'interactive_check':
      const checkBite = {
        ...bite,
        question: bite.content,
        correct_index: bite.correct_answer_index,
        explanation: bite.clinical_highlight
      };
      return <InteractiveCheck bite={checkBite} />;
    case 'sequence_end_card':
      return (
        <SequenceEndCard
          completedTitle={bite.completed_title || bite.title || ''}
          nextLessonTitle={bite.next_lesson_title}
          nextLessonId={bite.next_lesson_id}
          onContinue={bite.onContinue}
          onGoHome={bite.onGoHome}
        />
      );
    default:
      return (
        <div className="flex items-center justify-center h-full text-white">
          <p>Unknown bite type: {bite.type}</p>
        </div>
      );
  }
}

