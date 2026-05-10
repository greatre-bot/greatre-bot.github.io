import { useState } from 'react';
import { productLines } from '../data/productLines';
import type { ResultProfile } from '../data/results';
import { assetPath } from '../utils/assets';
import { playBubbleSound, playSplashSound } from '../utils/sound';

interface ProductShowcaseProps {
  profile: ResultProfile;
  onBack: () => void;
  onHome: () => void;
}

export function ProductShowcase({ profile, onBack, onHome }: ProductShowcaseProps) {
  const [activeId, setActiveId] = useState(productLines[0].id);
  const activeLine =
    productLines.find((line) => line.id === activeId) ?? productLines[0];

  const selectLine = (lineId: string) => {
    setActiveId(lineId);
    playBubbleSound();
  };

  return (
    <section className="product-screen">
      <div className="product-hero">
        <img
          className="official-logo small"
          src={assetPath('assets/official/yuanqi-logo.png')}
          alt="元气森林"
        />
        <p className="eyebrow">你的补给货架</p>
        <h1>从一瓶推荐，逛到元气森林全系列。</h1>
        <p>当前推荐：{profile.drink}。继续探索不同场景下的元气补给选择。</p>
      </div>

      <div className="product-tabs" aria-label="产品线切换">
        {productLines.map((line) => (
          <button
            className={line.id === activeLine.id ? 'active' : ''}
            type="button"
            key={line.id}
            onClick={() => selectLine(line.id)}
          >
            {line.name}
          </button>
        ))}
      </div>

      <article className={`product-ad product-ad-${activeLine.id}`}>
        <span className="product-badge">{activeLine.badge}</span>
        <img src={assetPath(activeLine.image)} alt={activeLine.name} />
        <div className="product-copy">
          <p>{activeLine.tag}</p>
          <h2>{activeLine.title}</h2>
          <span>{activeLine.description}</span>
        </div>
      </article>

      <div className="scene-strip">
        <span>触点场景</span>
        <strong>{activeLine.scene}</strong>
      </div>

      <div className="ad-card-grid">
        {productLines.map((line) => (
          <button
            className={line.id === activeLine.id ? 'active' : ''}
            type="button"
            key={line.id}
            onClick={() => selectLine(line.id)}
          >
            <img src={assetPath(line.image)} alt="" />
            <span>{line.name}</span>
          </button>
        ))}
      </div>

      <div className="button-stack">
        <button
          className="primary-action"
          type="button"
          onClick={() => {
            playSplashSound();
            onBack();
          }}
        >
          回到抽奖
        </button>
        <button
          className="ghost-action"
          type="button"
          onClick={() => {
            playBubbleSound();
            onHome();
          }}
        >
          返回首页
        </button>
      </div>
    </section>
  );
}
