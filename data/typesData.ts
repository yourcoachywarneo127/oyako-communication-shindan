import { TypeCategory, TypeInfo } from '../types';

export const TYPES_DATA: Record<TypeCategory, TypeInfo> = {
  sun: {
    id: 'sun',
    name: '太陽タイプ',
    keyword: '反応・承認',
    color: '#E65100',
    bgLight: '#FFF3E0',
    description: '気持ちや反応が表に出やすく、周囲からの反応や「認めてもらえた」という感覚が力になりやすいタイプです。',
    recommended: 'まず、できていることや気持ちを見つけて言葉にする。',
    avoid: 'できていないところばかりを指摘する。'
  },
  moon: {
    id: 'moon',
    name: '月タイプ',
    keyword: '安心・共感',
    color: '#1A237E',
    bgLight: '#E8EAF6',
    description: '相手との関係性や、その場の安心感を大切にしやすいタイプです。「分かってもらえた」と感じると、少しずつ心を開きやすくなります。',
    recommended: '結論を急がず、まず気持ちを受け止める。',
    avoid: '正論で一気に結論へ持っていく。'
  },
  wind: {
    id: 'wind',
    name: '風タイプ',
    keyword: '言葉・テンポ',
    color: '#00695C',
    bgLight: '#E0F2F1',
    description: '話すこと、聞くこと、言葉のやり取りを通して気持ちや考えを整理しやすいタイプです。',
    recommended: '質問しながら、一緒に言葉にしていく。',
    avoid: '何も聞かずに一方的に結論を伝える。'
  },
  tree: {
    id: 'tree',
    name: '木タイプ',
    keyword: '思考・整理',
    color: '#2E7D32',
    bgLight: '#E8F5E9',
    description: '自分の中で考えを整理してから話したり、納得してから動いたりすることを大切にしやすいタイプです。',
    recommended: '考える時間を渡し、急かさない。',
    avoid: '「今すぐ答えて」「どうするの？」と連続して答えを迫る。'
  },
  fire: {
    id: 'fire',
    name: '火タイプ',
    keyword: '感覚・行動',
    color: '#C62828',
    bgLight: '#FFEBEE',
    description: '言葉だけではなく、感覚や行動、雰囲気などを通して気持ちを表現しやすいタイプです。',
    recommended: '言葉だけで解決しようとせず、一緒に動いたり体験したりする。',
    avoid: '「ちゃんと言葉で説明して」と無理に言語化を迫る。'
  },
  earth: {
    id: 'earth',
    name: '土タイプ',
    keyword: '受容・安定',
    color: '#4E342E',
    bgLight: '#EFEBE9',
    description: '急激な変化よりも、安心できる環境や自分のペースを大切にしやすいタイプです。',
    recommended: '急かさず、安心できる時間と選択肢を用意する。',
    avoid: '「早くして」「みんなはできているよ」と急かす・比較する。'
  }
};
