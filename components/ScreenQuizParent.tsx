'use client';

interface Props {
  onComplete: (answers: Record) => void;
}

export default function ScreenQuizParent({ onComplete }: Props) {
  return (
    
      保護者向け診断質問
      お子様との日頃のコミュニケーションについてお答えください。
       onComplete({})}
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        診断結果を見る
      
    
  );
}
