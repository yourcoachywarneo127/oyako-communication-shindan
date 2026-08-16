import { TypeCategory } from '@/types';

// 各質問回答（1〜4点）の重み付けテーブル
export const QUESTION_WEIGHTS: Record<number, Record<TypeCategory, number>> = {
  1: { sun: 1.0, moon: 0.2, wind: 0.4, tree: 0.0, fire: 0.8, earth: 0.0 },
  2: { sun: 0.9, moon: 0.3, wind: 0.2, tree: 0.1, fire: 0.7, earth: 0.0 },
  3: { sun: 0.4, moon: 0.3, wind: 1.0, tree: 0.1, fire: 0.2, earth: 0.0 },
  4: { sun: 0.3, moon: 0.2, wind: 1.0, tree: 0.4, fire: 0.1, earth: 0.0 },
  5: { sun: 0.2, moon: 1.0, wind: 0.2, tree: 0.2, fire: 0.1, earth: 0.8 },
  6: { sun: 0.1, moon: 1.0, wind: 0.3, tree: 0.3, fire: 0.0, earth: 0.6 },
  7: { sun: 0.0, moon: 0.3, wind: 0.0, tree: 1.0, fire: 0.0, earth: 0.7 },
  8: { sun: 0.0, moon: 0.2, wind: 0.2, tree: 1.0, fire: 0.0, earth: 0.5 },
  9: { sun: 0.6, moon: 0.1, wind: 0.1, tree: 0.0, fire: 1.0, earth: 0.2 },
  10: { sun: 0.0, moon: 0.4, wind: 0.0, tree: 0.6, fire: 0.3, earth: 1.0 }
};
