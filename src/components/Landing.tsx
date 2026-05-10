import { useState } from 'react';
import { assetPath } from '../utils/assets';
import { playBubbleSound, playSplashSound } from '../utils/sound';

interface LandingProps {
  onStart: () => void;
}

type ActiveElement = 'bottle' | 'peach' | 'citrus' | 'splash';

export function Landing({ onStart }: LandingProps) {
  const [activeElement, setActiveElement] = useState<ActiveElement>('bottle');

  const activateElement = (element: ActiveElement) => {
    setActiveElement(element);
    if (element === 'splash' || element === 'bottle') {
      playSplashSound();
      return;
    }

    playBubbleSound();
  };

  const handleStart = () => {
    playSplashSound();
    onStart();
  };

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

      <div className={`hero-visual hero-visual-campaign active-${activeElement}`}>
        <div className="liquid-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <button
          className="tap-asset tap-peach"
          type="button"
          onClick={() => activateElement('peach')}
          aria-label="白桃气泡"
        >
          <img src={assetPath('assets/official/peach.png')} alt="" />
        </button>
        <button
          className="tap-asset tap-citrus"
          type="button"
          onClick={() => activateElement('citrus')}
          aria-label="卡曼橘气泡"
        >
          <img src={assetPath('assets/official/lime.png')} alt="" />
        </button>
        <button
          className="tap-asset tap-splash"
          type="button"
          onClick={() => activateElement('splash')}
          aria-label="清爽水花"
        >
          <img src={assetPath('assets/official/water-splash-wide.png')} alt="" />
        </button>
        <button
          className="tap-asset tap-bottle"
          type="button"
          onClick={() => activateElement('bottle')}
          aria-label="元气气泡水"
        >
          <img src={assetPath('assets/official/sparkling-duo.png')} alt="" />
        </button>

        <div className="spark-response" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="poster-words" aria-hidden="true">
          <span>0糖</span>
          <span>轻盈</span>
          <span>清爽</span>
          <span>冒泡</span>
        </div>
      </div>

      <div className="landing-copy">
        <p className="eyebrow">元气补给站</p>
        <h1>今天，你是什么元气状态？</h1>
        <p>点击瓶身、水果与水花，唤醒气泡动效；再用 5 道题生成今日元气卡。</p>
      </div>

      <div className="campaign-note">
        <span>0糖</span>
        <span>0脂</span>
        <span>0卡</span>
        <strong>轻负担快乐补给中</strong>
      </div>

      <button className="primary-action" type="button" onClick={handleStart}>
        开始测试
      </button>
    </section>
  );
}

function BubbleField() {
  return (
    <div className="bubble-field" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
