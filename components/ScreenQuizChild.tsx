import React, { useState } from 'react';
import { AnswerValue } from '@/types';
import { CHILD_QUESTIONS } from '@/data/questions';
import ProgressBar from './ProgressBar';

export default function ScreenQuizChild({
  initialAnswers,
  onComplete
}: {
  initialAnswers: Record<number, AnswerValue>;
  onComplete: (answers: Record<number, AnswerValue>) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>(initialAnswers);
  const [errorMsg, setErrorMsg] = useState('');

  const currentQ = CHILD_QUESTIONS[currentIndex];
  const qNum = currentIndex + 1;

  const handleSelect = (val: AnswerValue) => {
    setErrorMsg('');
    const newAns = { ...answers, [qNum]: val };
    setAnswers(newAns);

    if (currentIndex < CHILD_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newAns);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 space-y-6">
      <div className="space-y-1">
        <div className="text-xs font-bold text-amber-600">STEP 1 / 2</div>
        <h2 className="text-lg font-bold text-gray-900">まずは、お子さんについて</h2>
        <p className="text-xs text-gray-500">普段のお子さんの様子に、いちばん近いものを選んでください。</p>
      </div>

      <ProgressBar current={qNum} total={10} label={`あと${10 - qNum}問`} />

      <div className="py-4 space-y-3">
        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full w-fit">
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
                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                : 'bg-amber-50/30 text-gray-700 border-amber-200/60 hover:bg-amber-100/50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {errorMsg && <p className="text-xs text-rose-500 text-center font-medium">{errorMsg}</p>}

      {currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="text-xs text-gray-400 underline block mx-auto pt-2"
        >
          前の質問に戻る
        </button>
      )}
    </div>
  );
}
