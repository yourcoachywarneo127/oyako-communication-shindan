import React from 'react';
import { DiagnosisResult } from '../types';
import { TYPES_DATA } from '../data/typesData';
import { CTA_URL } from '../data/config';

export default function ScreenResult({ result }: { result: DiagnosisResult }) {
  const childInfo = TYPES_DATA[result.child.mainType];
  const parentInfo = TYPES_DATA[result.parent.mainType];

  return (
    <div className="space-y-6">
      {/* 診断完了表示 */}
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-4 text-center space-y-1">
        <div className="text-xs font-bold text-emerald-700">CHECK COMPLETE</div>
        <div className="text-base font-bold">親子のコミュニケーションタイプが判明しました!</div>
      </div>

      {/* お子さんのタイプ */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 space-y-4">
        <div className="text-xs font-bold text-amber-600">お子さんのタイプ</div>
        <div
          className="p-4 rounded-2xl text-white space-y-1 shadow-inner"
          style={{ backgroundColor: childInfo.color }}
        >
          <div className="text-xs opacity-90">{childInfo.keyword}</div>
          <div className="text-xl font-bold">{childInfo.name}</div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{childInfo.description}</p>
      </div>

      {/* 保護者様のタイプ */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 space-y-4">
        <div className="text-xs font-bold text-amber-600">あなた自身のタイプ</div>
        <div
          className="p-4 rounded-2xl text-white space-y-1 shadow-inner"
          style={{ backgroundColor: parentInfo.color }}
        >
          <div className="text-xs opacity-90">{parentInfo.keyword}</div>
          <div className="text-xl font-bold">{parentInfo.name}</div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{parentInfo.description}</p>
      </div>

      {/* 親子のコミュニケーションの違い */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 space-y-4">
        <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
          親子のコミュニケーションの違い
        </h3>
        <div className="space-y-3">
          {result.differences.map((diff, idx) => (
            <p key={idx} className="text-sm text-gray-700 leading-relaxed bg-amber-50/50 p-3 rounded-xl">
              {diff}
            </p>
          ))}
        </div>
      </div>

      {/* 声かけのアドバイス */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 space-y-4">
        <h3 className="text-base font-bold text-gray-900">今日から試したい関わり方</h3>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-700">おすすめの関わり</span>
            <p className="text-gray-800">{childInfo.recommended}</p>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl space-y-1">
            <span className="text-xs font-bold text-rose-700">現在は届きにくいかもしれない関わり</span>
            <p className="text-gray-800">{childInfo.avoid}</p>
          </div>
        </div>
      </div>

      {/* ポジティブなまとめ */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200/60 text-center space-y-3">
        <h4 className="text-base font-bold text-amber-900">違いは、間違いではありません。</h4>
        <p className="text-xs text-gray-700 leading-relaxed text-left">
          今回の診断で大切なのは、親子のどちらが正しいかを決めることではありません。お子さんには、お子さんなりの伝わり方があるかもしれない。まずは、その違いに気づくことから始めてみてください。
        </p>
      </div>

      {/* 無料勉強会CTA */}
      <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-amber-400 text-center space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-600">無料勉強会のご案内</span>
          <h3 className="text-base font-bold text-gray-900">
            もう一歩、親子の“すれ違い”を知りたい方へ
          </h3>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed text-left">
          この診断で分かるのは、親子それぞれのコミュニケーション傾向です。実際の親子のすれ違いには、言葉だけでは分からない小さなサインが隠れていることがあります。そのサインをどう見つけ、どう受け止め、どう“伴走”につなげるのか。無料勉強会で一緒に学んでみませんか？
        </p>
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-amber-200 transition-all text-base"
        >
          無料勉強会について見る
        </a>
      </div>

      {/* 注意書き */}
      <p className="text-[10px] text-gray-400 text-center leading-normal px-4">
        ※この診断は医学的・心理学的な診断を行うものではありません。親子のコミュニケーションを見直すための一つの視点としてご活用ください。
      </p>
    </div>
  );
}
