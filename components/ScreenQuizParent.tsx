'use client';

import React, { useState } from 'react';
import { AnswerValue } from '../types';
import { PARENT_QUESTIONS } from '../data/questions';
import ProgressBar from './ProgressBar';

interface Props {
  initialAnswers?: Record<number, AnswerValue>;
  onComplete: (answers: Record<number, AnswerValue>) => void;
  onBack?: () => void;
}

export default function ScreenQuizParent({ initialAnswers = {}, onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>(initialAnswers);

  const totalQuestions = PARENT_QUESTIONS.length;
  const currentQ = PARENT_QUESTIONS[currentIndex];
  const qNum = currentIndex + 1;

  const handleSelect = (val: AnswerValue) => {
    const newAns = { ...answers, [qNum]: val };
    setAnswers(newAns);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newAns);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100 space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-bold text-blue-600">STEP 2 / 2</div>
        <h2 className="text-lg font-bold text-gray-900">つぎに、保護者の方について</h2>
        <p className="text-xs text-gray-500">日頃のお子さんへの接し方やご自身の考えに近いものを選んでください。</p>
      </div>

      <ProgressBar current={qNum} total={totalQuestions} label={`あと${totalQuestions - qNum}問`} />

      <div className="py-4 space-y-3">
        <div className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full w-fit">
          Q{qNum}
        </div>
        <p className="text-base font-semibold text-gray-800 leading-relaxed min-h-[56px]">
          {currentQ.text}
        </p>
      </div>

      <div className="space-y-2.5">
        {[
          { label: 'とても当てはまる', val: 4 },
          { label: 'やや当てはまる', val: 3 },
          { label: 'あまり当てはまらない', val: 2 },
          { label: 'ほとんど当てはまらない', val: 1 }
        ].map((opt) => (
          <button
            key={opt.val}
            onClick={() => handleSelect(opt.val as AnswerValue)}
            className={`w-full py-3.5 px-4 rounded-xl text-sm font-medium text-left transition-all border ${
              answers[qNum] === opt.val
                ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                : 'bg-blue-50/30 text-gray-700 border-blue-200/60 hover:bg-blue-100/50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-2">
        {currentIndex > 0 ? (
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="text-xs text-gray-400 underline"
          >
            前の質問に戻る
          </button>
        ) : (
          onBack && (
            <button
              onClick={onBack}
              className="text-xs text-gray-400 underline"
            >
              子ども用の質問に戻る
            </button>
          )
        )}
      </div>
    </div>
  );
}
