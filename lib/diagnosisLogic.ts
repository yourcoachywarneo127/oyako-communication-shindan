import { AnswerValue, AxisScore, DiagnosisResult, IndividualResult, TypeCategory, TypeScore } from '@/types';
import { QUESTION_WEIGHTS } from '@/data/weights';
import { TYPES_DATA } from '@/data/typesData';

/**
 * 回答配列（10問分）から6軸スコアおよび6タイプスコアを算出
 */
export function calculateIndividualResult(answers: Record<number, AnswerValue>): IndividualResult {
  const typeScores: TypeScore = { sun: 0, moon: 0, wind: 0, tree: 0, fire: 0, earth: 0 };
  const axisScores: AxisScore = { reaction: 0, words: 0, safety: 0, thought: 0, sense: 0, pace: 0 };

  // 1. 各問の回答スコア（1〜4）を元にタイプスコアを加算
  Object.entries(answers).forEach(([qIdxStr, val]) => {
    const qIdx = parseInt(qIdxStr, 10);
    const weights = QUESTION_WEIGHTS[qIdx];
    
    if (weights) {
      (Object.keys(weights) as TypeCategory[]).forEach((type) => {
        typeScores[type] += val * weights[type];
      });
    }

    // 軸スコアの加算
    if (qIdx === 1 || qIdx === 2) axisScores.reaction += val;
    if (qIdx === 3 || qIdx === 4) axisScores.words += val;
    if (qIdx === 5 || qIdx === 6) axisScores.safety += val;
    if (qIdx === 7 || qIdx === 8) axisScores.thought += val;
    if (qIdx === 9) axisScores.sense += val * 2;
    if (qIdx === 10) axisScores.pace += val * 2;
  });

  // 2. 6軸スコアを0〜100に正規化（8点満点を100基準に換算）
  (Object.keys(axisScores) as (keyof AxisScore)[]).forEach((axis) => {
    axisScores[axis] = Math.round((axisScores[axis] / 8) * 100);
  });

  // 3. タイプスコア順にソート
  const sortedTypes = (Object.keys(typeScores) as TypeCategory[]).sort(
    (a, b) => typeScores[b] - typeScores[a]
  );

  const mainType = sortedTypes[0];
  const subType = sortedTypes[1];
  
  // 1位と2位の差が極めて小さいか判定
  const diff = typeScores[mainType] - typeScores[subType];
  const isClose = diff < 1.5;

  return {
    mainType,
    subType,
    isClose,
    axisScores,
    typeScores
  };
}

/**
 * 親子の診断結果から「すれ違いの違い」を抽出する比較ロジック
 */
export function compareParentAndChild(
  childResult: IndividualResult,
  parentResult: IndividualResult
): string[] {
  const differences: string[] = [];
  const childInfo = TYPES_DATA[childResult.mainType];
  const parentInfo = TYPES_DATA[parentResult.mainType];

  if (childResult.mainType === parentResult.mainType) {
    differences.push(
      `おふたりとも「${childInfo.name}」の傾向が強く、基本的な感覚を共有しやすい関係です。`
    );
    differences.push(
      `ただし、同じタイプだからこそ「自分が平気なことは子どもも平気だろう」と無意識に思い込んでしまう点には注意が必要です。`
    );
  } else {
    differences.push(
      `お子さんは「${childInfo.keyword}」を大切にする【${childInfo.name}】の傾向が強く表れています。`
    );
    differences.push(
      `保護者様は「${parentInfo.keyword}」を大切にする【${parentInfo.name}】の傾向が強く表れています。`
    );
    differences.push(
      `【すれ違いのヒント】お子さんは『${childInfo.recommended}』と感じる関わりで安心しやすいのに対し、保護者様は効率や納得感を先に求めやすい違いがあるかもしれません。`
    );
  }

  return differences;
}
