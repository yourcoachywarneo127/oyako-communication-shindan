import { Question } from '@/types';

export const CHILD_QUESTIONS: Question[] = [
  { id: 'cq1', text: '嬉しいことや楽しいことがあると、表情や態度に出やすい。', axis: 'reaction' },
  { id: 'cq2', text: '嫌なことがあると、顔や態度に出やすい。', axis: 'reaction' },
  { id: 'cq3', text: '誰かと話すことで、自分の気持ちが整理されることが多い。', axis: 'words' },
  { id: 'cq4', text: '自分の気持ちや考えを、言葉で説明するのは比較的得意だ。', axis: 'words' },
  { id: 'cq5', text: '信頼できる人がそばにいると、安心して話したり行動したりできる。', axis: 'safety' },
  { id: 'cq6', text: '相手の表情や雰囲気を気にして、自分の言動を変えることがある。', axis: 'safety' },
  { id: 'cq7', text: '何か言われたとき、すぐ答えるより一度自分の中で考えたい。', axis: 'thought' },
  { id: 'cq8', text: '自分の考えを頭の中で整理してから話すことが多い。', axis: 'thought' },
  { id: 'cq9', text: '「なんとなく嫌」「なんか好き」など、感覚で物事を判断することがある。', axis: 'sense' },
  { id: 'cq10', text: '急に答えを求められるより、自分のペースで考えたり動いたりしたい。', axis: 'pace' }
];

export const PARENT_QUESTIONS: Question[] = [
  { id: 'pq1', text: '嬉しいことや楽しいことがあると、表情や態度に出やすい。', axis: 'reaction' },
  { id: 'pq2', text: '嫌なことがあると、顔や態度に出やすい。', axis: 'reaction' },
  { id: 'pq3', text: '誰かと話すことで、自分の考えが整理されることが多い。', axis: 'words' },
  { id: 'pq4', text: '自分の考えや気持ちを、言葉で説明することが多い。', axis: 'words' },
  { id: 'pq5', text: '相手との関係性や、その場の雰囲気を大切にする。', axis: 'safety' },
  { id: 'pq6', text: '相手がどう感じるかを考えてから、自分の言葉を選ぶことが多い。', axis: 'safety' },
  { id: 'pq7', text: '何かを判断するとき、まず自分の中でじっくり考える。', axis: 'thought' },
  { id: 'pq8', text: '感情だけで判断せず、頭の中で整理してから行動することが多い。', axis: 'thought' },
  { id: 'pq9', text: '「理屈では説明できないけれど、なんとなくそう感じる」という感覚を大切にする。', axis: 'sense' },
  { id: 'pq10', text: '急いで結論を出すより、自分なりに考える時間がほしい。', axis: 'pace' }
];
