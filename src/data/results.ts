export type EnergyType = 'night' | 'study' | 'sport' | 'social';

export interface ResultProfile {
  type: EnergyType;
  code: 'A' | 'B' | 'C' | 'D';
  title: string;
  shortTitle: string;
  drink: string;
  keywords: [string, string, string];
  copy: string;
  shareCopy: string;
  accent: string;
  image: string;
}

export const energyOrder: EnergyType[] = ['night', 'study', 'sport', 'social'];

// 所有测试结果都聚焦元气森林气泡水系列，避免跳到其他产品线。
export const resultProfiles: Record<EnergyType, ResultProfile> = {
  night: {
    type: 'night',
    code: 'A',
    title: '熬夜回血型元气人',
    shortTitle: '熬夜回血型',
    drink: '白桃味气泡水',
    keywords: ['回血', '清爽', '轻负担快乐'],
    copy: '你不是没电了，只是需要一点会冒泡的元气。',
    shareCopy: '今晚也要把状态补回来，轻轻松松继续发光。',
    accent: '#ff7ca9',
    image: 'assets/official/peach-bottle.png',
  },
  study: {
    type: 'study',
    code: 'B',
    title: '学习续航型元气人',
    shortTitle: '学习续航型',
    drink: '卡曼橘味气泡水',
    keywords: ['专注', '续航', '清爽陪伴'],
    copy: '把压力留给 ddl，把清爽留给自己。',
    shareCopy: '专注不是硬撑，是给自己留一口清爽续航。',
    accent: '#f5a623',
    image: 'assets/official/kaman-orange-bottle.png',
  },
  sport: {
    type: 'sport',
    code: 'C',
    title: '运动轻盈型元气人',
    shortTitle: '运动轻盈型',
    drink: '维C柠檬味气泡水',
    keywords: ['轻盈', '清爽', '状态回弹'],
    copy: '流汗之后，也可以用一口气泡把状态拉回来。',
    shareCopy: '运动后的快乐，是清爽、轻盈和刚刚好的满足。',
    accent: '#7bdc8b',
    image: 'assets/official/lime-bottle.png',
  },
  social: {
    type: 'social',
    code: 'D',
    title: '社交冒泡型元气人',
    shortTitle: '社交冒泡型',
    drink: '荔枝味气泡水',
    keywords: ['分享', '聚会', '拍照好看'],
    copy: '你的快乐不只会冒泡，还会传染给朋友。',
    shareCopy: '今日快乐已冒泡，适合分享给同频朋友。',
    accent: '#ff9b72',
    image: 'assets/official/grapefruit-bottle.png',
  },
};
