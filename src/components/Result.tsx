import type { ResultProfile } from '../data/results';
import { assetPath } from '../utils/assets';
import { playBubbleSound, playSplashSound } from '../utils/sound';

interface ResultProps {
  profile: ResultProfile;
  energyIndex: number;
  onCreateCard: () => void;
  onRetake: () => void;
}

// 结果页：把测试结果转化为饮品推荐和可分享的情绪价值。
export function Result({
  profile,
  energyIndex,
  onCreateCard,
  onRetake,
}: ResultProps) {
  return (
    <section className={`result-screen result-${profile.type}`}>
      <div className="bubble-field result-bubbles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <p className="eyebrow">你的今日状态已生成</p>
      <div className="result-hero">
        <div className="result-ring" aria-hidden="true">
          <span>{energyIndex}%</span>
          <small>元气指数</small>
        </div>
        <div>
          <p className="result-code">TYPE {profile.code}</p>
          <h1>{profile.title}</h1>
          <p>{profile.copy}</p>
        </div>
      </div>

      <div className="recommend-panel">
        <img className="product-shot" src={assetPath(profile.image)} alt={profile.drink} />
        <div>
          <span className="panel-label">推荐补给</span>
          <h2>{profile.drink}</h2>
          <div className="keyword-row">
            {profile.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="button-stack">
        <button
          className="primary-action"
          type="button"
          onClick={() => {
            playSplashSound();
            onCreateCard();
          }}
        >
          生成元气状态卡
        </button>
        <button
          className="ghost-action"
          type="button"
          onClick={() => {
            playBubbleSound();
            onRetake();
          }}
        >
          重新测试
        </button>
      </div>
    </section>
  );
}
