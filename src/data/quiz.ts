import type { EnergyType } from './results';

export interface QuizOption {
  code: 'A' | 'B' | 'C' | 'D';
  text: string;
  type: EnergyType;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

// 题目和选项都集中在这里，方便后续按课程汇报口径微调。
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '今天的你最像哪种状态？',
    options: [
      { code: 'A', text: '熬夜赶ddl，急需回血', type: 'night' },
      { code: 'B', text: '图书馆连坐，需要续航', type: 'study' },
      { code: 'C', text: '刚运动完，想清爽补给', type: 'sport' },
      { code: 'D', text: '和朋友出门，想要冒泡快乐', type: 'social' },
    ],
  },
  {
    id: 2,
    question: '你最需要哪种快乐？',
    options: [
      { code: 'A', text: '不增加负担的甜', type: 'night' },
      { code: 'B', text: '清爽不腻的陪伴', type: 'study' },
      { code: 'C', text: '运动后的轻盈恢复', type: 'sport' },
      { code: 'D', text: '拍照好看的社交饮品', type: 'social' },
    ],
  },
  {
    id: 3,
    question: '如果现在给你一瓶元气，你会带去哪里？',
    options: [
      { code: 'A', text: '宿舍书桌，陪我再冲一小时', type: 'night' },
      { code: 'B', text: '自习室座位，做今日固定搭子', type: 'study' },
      { code: 'C', text: '操场边，运动后清爽一下', type: 'sport' },
      { code: 'D', text: '和朋友的合照里，一起冒泡', type: 'social' },
    ],
  },
  {
    id: 4,
    question: '你选饮料时最在意什么？',
    options: [
      { code: 'A', text: '甜感刚刚好，喝完没有负担', type: 'night' },
      { code: 'B', text: '口味清爽，能陪我慢慢进入状态', type: 'study' },
      { code: 'C', text: '补水方便，运动后也轻盈', type: 'sport' },
      { code: 'D', text: '颜值在线，拿在手里很出片', type: 'social' },
    ],
  },
  {
    id: 5,
    question: '今天的元气补给关键词是？',
    options: [
      { code: 'A', text: '回血充电，今晚稳住', type: 'night' },
      { code: 'B', text: '专注续航，ddl别追我', type: 'study' },
      { code: 'C', text: '轻盈补水，状态回弹', type: 'sport' },
      { code: 'D', text: '快乐冒泡，分享满格', type: 'social' },
    ],
  },
];
