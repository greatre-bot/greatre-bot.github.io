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

export const productLines: ProductLine[] = [
  {
    id: 'sparkling',
    name: '气泡水系列',
    tag: '0糖 0脂 0卡',
    title: '把水果清爽感，做成会冒泡的快乐。',
    description: '白桃、卡曼橘、荔枝、维C柠檬等口味，覆盖学习、通勤、聚会和运动后轻补给场景。',
    image: 'assets/official/sparkling-lineup.png',
    badge: '互动测试推荐主线',
    scene: '便利店 / 校园快闪 / 包装二维码',
  },
  {
    id: 'alien',
    name: '外星人电解质水',
    tag: '运动补水',
    title: '把流汗后的补给，做得更轻、更直接。',
    description: '适合操场、健身、骑行和户外活动，把运动后的“补回来”转化成更明确的场景记忆。',
    image: 'assets/official/alien-lime.png',
    badge: '运动场景线',
    scene: '操场 / 健身房 / 户外运动',
  },
  {
    id: 'tea',
    name: '茶饮系列',
    tag: '轻茶感',
    title: '不想喝甜的时候，换一口更安静的茶香。',
    description: '茶饮产品适合下午课间、办公桌和通勤路上，让“轻负担”从气泡水延展到更多日常选择。',
    image: 'assets/official/tea-bottle.png',
    badge: '日常陪伴线',
    scene: '课间 / 工位 / 通勤',
  },
  {
    id: 'ice-tea',
    name: '冰茶系列',
    tag: '清爽解腻',
    title: '饭后和夏天，都需要一点冰爽茶味。',
    description: '更强的饮用场景感，适合餐饮搭配、便利店冷柜和社交分享里的即时选择。',
    image: 'assets/official/ice-tea.png',
    badge: '餐饮搭配线',
    scene: '饭后 / 夏日 / 便利店冷柜',
  },
  {
    id: 'milk-tea',
    name: '乳茶系列',
    tag: '低负担甜感',
    title: '想要一点甜，也可以更轻一点。',
    description: '乳茶承接“想喝奶茶但不想太有负担”的心智，适合自习、追剧和下午茶场景。',
    image: 'assets/official/milk-tea.png',
    badge: '轻甜享受线',
    scene: '自习 / 追剧 / 下午茶',
  },
];
