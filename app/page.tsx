'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ScreenIntro from '../components/ScreenIntro';
import ScreenQuizChild from '../components/ScreenQuizChild';
import ScreenQuizParent from '../components/ScreenQuizParent';
import ScreenResult from '../components/ScreenResult';
import { DiagnosisResult, AnswerValue, TypeCategory, IndividualResult } from '../types';

// 回答データからタイプおよび各スコア情報を算出する処理
function calculateIndividualResult(answers: Record<number, AnswerValue>): IndividualResult {
  const answerEntries = answers ? Object.entries(answers) : [];
  
  // 回答スコアの合計を算出
  const totalScore = answerEntries.reduce((sum, [_, val]) => {
    return sum + (typeof val === 'number' ? val : 0);
  }, 0);

  // 平均点数を算出 (1〜4の範囲)
  const count = answerEntries.length || 1;
  const avgScore = totalScore / count;

  // typesData.ts に存在する正確なタイプキーを判定
  let mainType: TypeCategory = 'sun';
  if (avgScore >= 3.5) {
    mainType = 'sun';
  } else if (avgScore >= 3.0) {
    mainType = 'fire';
  } else if (avgScore >= 2.5) {
    mainType = 'wind';
  } else if (avgScore >= 2.0) {
    mainType = 'tree';
  } else if (avgScore >= 1.5) {
    mainType = 'moon';
  } else {
    mainType = 'earth';
  }

  return {
    mainType,
    subType: 'moon' as TypeCategory,
    isClose: false,
    axisScores: {
      reaction: totalScore,
      words: 0,
      safety: 0,
      thought: 0,
      axis1: totalScore,
      axis2: 0,
    },
    typeScores: {
      sun: 0,
      moon: 0,
      wind: 0,
      tree: 0,
      fire: 0,
      earth: 0,
    },
    rawAnswers: answers || {},
  } as unknown as IndividualResult;
}

// 親子のタイプ比較・すれ違いポイントの生成処理
function compareParentAndChild(childType: string, parentType: string): string[] {
  if (childType === parentType) {
    return [
      '親子で感覚や考え方のベースが非常に似ています。',
      'お互いの気持ちを理解しやすい反面、意見がぶつかった際には長引きやすい傾向があります。'
    ];
  }

  return [
    'お子さんの捉え方と保護者の捉え方に少しアプローチの違いが見られます。',
    '保護者側が「良かれと思って」伝えた言葉が、お子さんには意図と異なるニュアンスで伝わっている可能性があります。',
    'まずは感情の違いを否定せず、「相手からはどう見えているか」を一歩引いて観察してみることがスムーズな対話の第一歩になります。'
  ];
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

    // sessionStorageから直接最新の子ども回答を取得（State遅延対策）
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
    const diffs = compareParentAndChild(childRes.mainType, parentRes.mainType);

    setResult({
      child: childRes,
      parent: parentRes,
      differences: diffs,
    });

    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-gray-800 font-sans antialiased pb-12 flex flex-col justify-between">
      <Header />
      <main className="w-full max-w-md mx-auto px-4 pt-2 pb-8 flex-1 flex flex-col justify-center">
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
