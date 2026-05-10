# 元气森林「元气补给站」互动H5

元气森林整合营销传播 Campaign H5 案例。它不是普通品牌官网，而是一个用于承接抖音、小红书、校园快闪、包装二维码等流量的互动接触点：用户扫码进入 H5，完成“元气状态测试”，生成专属元气类型、饮品推荐、分享卡片，并进入抽奖转盘和产品线广告页。

## 技术栈

- React + Vite + TypeScript
- 纯 CSS 响应式样式
- 静态前端，无真实登录、无真实交易、无个人信息收集

## 本地运行

```bash
npm install
npm run dev
```

运行后打开终端显示的本地地址，例如 `http://localhost:5173/`。手机和电脑在同一局域网时，也可以用 Vite 输出的 Network 地址扫码预览。

## 打包检查

```bash
npm run build
npm run preview
```

打包产物会生成在 `dist/` 目录。

## GitHub Pages 部署

项目已包含 `.github/workflows/deploy.yml`。推送到 GitHub 的 `main` 分支后，在仓库设置里打开：

1. `Settings` → `Pages`
2. `Build and deployment` 选择 `GitHub Actions`
3. 再次推送或手动运行 `Deploy to GitHub Pages`

工作流默认把 Vite 的 `base` 设置为 `/${仓库名}/`，适合 `https://用户名.github.io/仓库名/` 这种项目页。

## 修改 Vite base 路径

`vite.config.ts` 已经写成：

```ts
base: process.env.VITE_BASE_PATH ?? '/'
```

常见情况：

- 本地开发：不需要设置，默认 `/`
- GitHub Pages 项目页：`VITE_BASE_PATH=/仓库名/`
- 用户主页仓库或自定义域名：改成 `/`

如果你的仓库名是 `yuanqi-h5`，GitHub Actions 中可以保持：

```yml
VITE_BASE_PATH: /${{ github.event.repository.name }}/
```

也可以手动改成：

```yml
VITE_BASE_PATH: /yuanqi-h5/
```

## 目录结构

```text
src/
  App.tsx
  main.tsx
  styles/
    global.css
  components/
    PhoneFrame.tsx
    Landing.tsx
    Quiz.tsx
    Result.tsx
    EnergyCard.tsx
    LotteryWheel.tsx
    ProductShowcase.tsx
  data/
    quiz.ts
    results.ts
  utils/
    scoring.ts
```

## 后续修改入口

- 修改测试题：`src/data/quiz.ts`
- 修改结果文案、推荐饮品、关键词：`src/data/results.ts`
- 修改全系列产品货架：`src/data/productLines.ts`
- 修改计分规则：`src/utils/scoring.ts`
- 修改整体视觉：`src/styles/global.css`
- 修改背景音乐和音效：`src/utils/sound.ts`

## 交互说明

“下载/保存元气卡”会在浏览器端生成 PNG 图片，不上传数据。背景音乐文件位于 `public/assets/audio/i-like-it.mp3`，首次点击后启动；按钮、答题和抽奖音效由 Web Audio 在本地合成，可用右上角声音按钮关闭。“抽奖转盘”为静态前端概率演示，不触发真实交易，也不会收集手机号、姓名等隐私信息。后续如需上线真实权益，可接入抽奖接口或优惠券系统。
