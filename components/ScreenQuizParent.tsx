'use client';

interface Props {
  initialAnswers?: any;
  onComplete: (answers: any) => void;
  onBack?: () => void;
}

export default function ScreenQuizParent({ onComplete }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">保護者向け診断質問</h2>
      <p className="text-gray-600 mb-6 text-center">お子様との日頃のコミュニケーションについてお答えください。</p>
      <button
        onClick={() => onComplete({})}
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        診断結果を見る
      </button>
    </div>
  );
}
