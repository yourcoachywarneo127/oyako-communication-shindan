export type AnswerValue = 1 | 2 | 3 | 4;

export type AxisType = 'reaction' | 'words' | 'safety' | 'thought' | 'sense' | 'pace';

export type TypeCategory = 'sun' | 'moon' | 'wind' | 'tree' | 'fire' | 'earth';

export interface Question {
  id: string;
  text: string;
  axis: AxisType;
}

export interface TypeInfo {
  id: TypeCategory;
  name: string;
  keyword: string;
  color: string; // Tailwindクラスまたはカラーコード
  bgLight: string;
  description: string;
  recommended: string;
  avoid: string;
}

export interface AxisScore {
  reaction: number;
  words: number;
  safety: number;
  thought: number;
  sense: number;
  pace: number;
}

export interface TypeScore {
  sun: number;
  moon: number;
  wind: number;
  tree: number;
  fire: number;
  earth: number;
}

export interface IndividualResult {
  mainType: TypeCategory;
  subType: TypeCategory;
  isClose: boolean; // 1位と2位の差が小さい場合フラグ
  axisScores: AxisScore;
  typeScores: TypeScore;
}

export interface DiagnosisResult {
  child: IndividualResult;
  parent: IndividualResult;
  differences: string[];
}
