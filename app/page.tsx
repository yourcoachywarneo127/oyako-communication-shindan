'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ScreenIntro from '../components/ScreenIntro';
import ScreenQuizChild from '../components/ScreenQuizChild';
import ScreenQuizParent from '../components/ScreenQuizParent';
import ScreenResult from '../components/ScreenResult';

export type AnswerValue = any;

export interface DiagnosisResult {
  child: any;
  parent: any;
  differences: any;
  [key: string]: any;
}

// 簡易計算処理（null safeなオブジェクトを返す）
function calculateIndividualResult(answers: Record<number, any>) {
  if (!answers) return {};
  return {
    rawAnswers: answers,
    totalCount: Object.keys(answers).length,
  };
}

function compareParentAndChild(childRes: any, parentRes: any) {
  return {
    matchRate: 100,
    details: [],
  };
}

export default function Home() {
  const [step, setStep] = useState<'intro' | 'child' | 'parent' | 'result'>('intro');
  const [childAnswers, setChildAnswers] = useState<Record<number, AnswerValue>>({});
  const [parentAnswers, setParentAnswers] = useState<Record<number, AnswerValue>>({});
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  // 初回読み込み時にsessionStorageから回答状態を復元
  useEffect(() => {
    try {
      const savedChild = sessionStorage.getItem('childAnswers');
      const savedParent = sessionStorage.getItem('parentAnswers');
      if (savedChild) setChildAnswers(JSON.parse(savedChild));
      if (savedParent) setParentAnswers(JSON.parse(savedParent));
    } catch (e) {
      console.error('sessionStorage parse error:', e);
    }
  }, []);

  // 診断を新規リセットして開始
  const handleStart = () => {
    sessionStorage.removeItem('childAnswers');
    sessionStorage.removeItem('parentAnswers');
    setChildAnswers({});
    setParentAnswers({});
    setResult(null);
    setStep('child');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChildComplete = (answers: Record<number, AnswerValue>) => {
    setChildAnswers(answers);
    try {
      sessionStorage.setItem('childAnswers', JSON.stringify(answers));
    } catch (e) {
      console.error('sessionStorage error:', e);
    }
    setStep('parent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleParentComplete = (answers: Record<number, AnswerValue>) => {
    setParentAnswers(answers);
    try {
      sessionStorage.setItem('parentAnswers', JSON.stringify(answers));
    } catch (e) {
      console.error('sessionStorage error:', e);
    }

    // sessionStorageから直接最新の子ども回答を取得（State空対策）
    let latestChildAnswers = childAnswers;
    try {
      const savedChild = sessionStorage.getItem('childAnswers');
      if (savedChild) {
        latestChildAnswers = JSON.parse(savedChild);
      }
    } catch (e) {
      console.error('Failed to read child answers:', e);
    }

    // 診断計算の実行
    const childRes = calculateIndividualResult(latestChildAnswers);
    const parentRes = calculateIndividualResult(answers);
    const diffs = compareParentAndChild(childRes, parentRes);

    setResult({
      child: childRes,
      parent: parentRes,
      differences: diffs,
    });

    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-amber-50/30 text-gray-800 font-sans antialiased pb-12">
      <Header />
      <main className="max-w-md mx-auto px-4 pt-4">
        {step === 'intro' && <ScreenIntro onStart={handleStart} />}
        {step === 'child' && (
          <ScreenQuizChild
            initialAnswers={childAnswers}
            onComplete={handleChildComplete}
          />
        )}
        {step === 'parent' && (
          <ScreenQuizParent
            initialAnswers={parentAnswers}
            onComplete={handleParentComplete}
            onBack={() => setStep('child')}
          />
        )}
        {step === 'result' && result && <ScreenResult result={result} />}
      </main>
    </div>
  );
}
