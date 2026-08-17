'use client';

import Header from '../components/Header';
import ScreenIntro from '../components/ScreenIntro';
import ScreenQuizChild from '../components/ScreenQuizChild';
import ScreenQuizParent from '../components/ScreenQuizParent';
import ScreenResult from '../components/ScreenResult';

export default function Home() {
  const [step, setStep] = useState<'intro' | 'child' | 'parent' | 'result'>('intro');
  const [childAnswers, setChildAnswers] = useState<Record<number, AnswerValue>>({});
  const [parentAnswers, setParentAnswers] = useState<Record<number, AnswerValue>>({});
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  // 初回読み込み時にsessionStorageから回答状態を復元
  useEffect(() => {
    const savedChild = sessionStorage.getItem('childAnswers');
    const savedParent = sessionStorage.getItem('parentAnswers');
    if (savedChild) setChildAnswers(JSON.parse(savedChild));
    if (savedParent) setParentAnswers(JSON.parse(savedParent));
  }, []);

  const handleChildComplete = (answers: Record<number, AnswerValue>) => {
    setChildAnswers(answers);
    sessionStorage.setItem('childAnswers', JSON.stringify(answers));
    setStep('parent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleParentComplete = (answers: Record<number, AnswerValue>) => {
    setParentAnswers(answers);
    sessionStorage.setItem('parentAnswers', JSON.stringify(answers));

    // 診断計算の実行
    const childRes = calculateIndividualResult(childAnswers);
    const parentRes = calculateIndividualResult(answers);
    const diffs = compareParentAndChild(childRes, parentRes);

    setResult({
      child: childRes,
      parent: parentRes,
      differences: diffs
    });

    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-amber-50/30 text-gray-800 font-sans antialiased pb-12">
      <Header />
      <main className="max-w-md mx-auto px-4 pt-4">
        {step === 'intro' && <ScreenIntro onStart={() => setStep('child')} />}
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
