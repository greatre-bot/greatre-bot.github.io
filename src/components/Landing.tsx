import { useState } from 'react';
import { assetPath } from '../utils/assets';

interface LandingProps {
  onStart: () => void;
}

const sparkTips = {
  peach: '白桃清甜，适合今晚回血。',
  citrus: '卡曼橘清爽，适合专注续航。',
  bottle: '轻轻碰一下，气泡就醒了。',
  splash: '把水花留给夏天，把负担留在身后。',
};

type SparkTip = keyof typeof sparkTips;

export function Landing({ onStart }: LandingProps) {
  const [activeTip, setActiveTip] = useState<SparkTip>('bottle');

  return (
    <section className="landing-screen">
      <BubbleField />

      <div className="landing-top">
        <img
          className="official-logo"
          src={assetPath('assets/official/yuanqi-logo.png')}
          alt="元气森林"
        />
        <span className="zero-sugar-pill">0糖 0脂 0卡</span>
      </div>

      <div className="hero-visual hero-visual-campaign">
        <button
          className="tap-asset tap-peach"
          type="button"
          onClick={() => setActiveTip('peach')}
          aria-label="白桃气泡"
        >
          <img src={assetPath('assets/official/peach.png')} alt="" />
        </button>
        <button
          className="tap-asset tap-citrus"
          type="button"
          onClick={() => setActiveTip('citrus')}
          aria-label="卡曼橘气泡"
        >
          <img src={assetPath('assets/official/lime.png')} alt="" />
        </button>
        <button
          className="tap-asset tap-splash"
          type="button"
          onClick={() => setActiveTip('splash')}
          aria-label="清爽水花"
        >
          <img src={assetPath('assets/official/water-splash-wide.png')} alt="" />
        </button>
        <button
          className="tap-asset tap-bottle"
          type="button"
          onClick={() => setActiveTip('bottle')}
          aria-label="元气气泡水"
        >
          <img src={assetPath('assets/official/sparkling-duo.png')} alt="" />
        </button>

        <div className="hero-copy-badge">
          <span>tap</span>
          <strong>{sparkTips[activeTip]}</strong>
        </div>

        <div className="poster-words" aria-hidden="true">
          <span>回血</span>
          <span>续航</span>
          <span>轻盈</span>
          <span>冒泡</span>
        </div>
      </div>

      <div className="landing-copy">
        <p className="eyebrow">进入元气补给站</p>
        <h1>今天，你是什么元气状态？</h1>
        <p>点一点瓶身和水果，唤醒气泡；再用 5 道题生成你的今日元气卡。</p>
      </div>

      <div className="campaign-note">
        <span>0糖</span>
        <span>0脂</span>
        <span>0卡</span>
        <strong>轻负担快乐补给中</strong>
      </div>

      <button className="primary-action" type="button" onClick={onStart}>
        开始测试
      </button>
    </section>
  );
}

function BubbleField() {
  return (
    <div className="bubble-field" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
