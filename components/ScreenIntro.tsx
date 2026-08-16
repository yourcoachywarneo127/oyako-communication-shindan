import React from 'react';

export default function ScreenIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 text-center space-y-6">
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-wide">
          親子のコミュニケーションチェック
        </span>
        <h1 className="text-xl font-bold text-gray-900 leading-snug">
          親子コミュニケーションタイプ診断
        </h1>
      </div>

      <div className="py-2 px-4 bg-amber-50/60 rounded-2xl border border-amber-100/80">
        <p className="text-amber-900 font-medium text-sm leading-relaxed">
          「どうして、こんなに声をかけているのに伝わらないんだろう？」
        </p>
      </div>

      <div className="text-sm text-gray-600 leading-relaxed text-left space-y-3">
        <p>
          もしかすると、親子で“伝わりやすいコミュニケーション”が少し違うのかもしれません。
        </p>
        <p>
          この診断では、お子さんとあなた自身のコミュニケーション傾向をチェックします。どちらが正しい・間違っているという診断ではありません。
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-amber-200 transition-all text-base"
      >
        診断をはじめる
      </button>

      <p className="text-[11px] text-gray-400 text-center">
        ※医療・心理的診断を行うものではありません。
      </p>
    </div>
  );
}
