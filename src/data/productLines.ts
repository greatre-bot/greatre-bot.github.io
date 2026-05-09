export interface ProductLine {
  id: string;
  name: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  scene: string;
}

// 产品线广告页内容集中在这里，后续要换产品、换主推文案只改这个文件。
export const productLines: ProductLine[] = [
  {
    id: 'sparkling',
    name: '气泡水系列',
    tag: '0糖 0脂 0卡',
    title: '把水果清爽感，做成会冒泡的快乐。',
    description: '白桃、卡曼橘、荔枝等多口味覆盖学习、通勤、聚会场景，是本次 H5 的核心推荐货架。',
    image: 'assets/official/sparkling-lineup.png',
    badge: '主推爆品',
    scene: '便利店 / 校园快闪 / 包装二维码',
  },
  {
    id: 'alien',
    name: '外星人电解质水',
    tag: '运动补水',
    title: '流汗之后，给身体一个轻盈回弹。',
    description: '承接运动、健身、社团活动等场景，用补水需求连接功能饮品和年轻人的日常运动。',
    image: 'assets/official/alien-lime.png',
    badge: '运动场景',
    scene: '操场 / 健身房 / 校园赛事',
  },
  {
    id: 'ice-tea',
    name: '冰茶系列',
    tag: '清爽茶感',
    title: '用一口冰爽，打开下午的松弛时刻。',
    description: '适合午后、外卖、社交聚餐等高频即时消费场景，补足元气森林的茶饮货架。',
    image: 'assets/official/ice-tea.png',
    badge: '茶饮补给',
    scene: '午后便利店 / 聚餐搭配',
  },
  {
    id: 'milk-tea',
    name: '乳茶系列',
    tag: '轻甜满足',
    title: '想喝点甜，也可以更轻一点。',
    description: '面向奶茶爱好者的轻负担替代选择，把情绪价值和低负担表达放到同一个货架。',
    image: 'assets/official/milk-tea.png',
    badge: '情绪价值',
    scene: '宿舍 / 追剧 / 自习间隙',
  },
  {
    id: 'tea',
    name: '健康茶饮线',
    tag: '日常轻养',
    title: '从气泡快乐，延展到更长期的健康陪伴。',
    description: '用茶饮、养生水等产品补齐品牌心智，从即时快乐延伸到日常健康生活方式。',
    image: 'assets/official/tea-bottle.png',
    badge: '长期心智',
    scene: '办公室 / 自习室 / 日常随行',
  },
];
