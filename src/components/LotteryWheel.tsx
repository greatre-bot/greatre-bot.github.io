import { useMemo, useState } from 'react';
import type { ResultProfile } from '../data/results';
import { assetPath } from '../utils/assets';
import { playBubbleSound, playPrizeSound, playSpinSound, playSplashSound } from '../utils/sound';

interface LotteryWheelProps {
  profile: ResultProfile;
  onProducts: () => void;
  onHome: () => void;
}

const prizes = [
  '谢谢惠顾',
  '谢谢惠顾',
  '谢谢惠顾',
  '3元补给券',
  '气泡水组合',
  '隐藏口味彩蛋',
];

export function LotteryWheel({ profile, onProducts, onHome }: LotteryWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);

  const prize = useMemo(
    () => (prizeIndex === null ? null : prizes[prizeIndex]),
    [prizeIndex],
  );

  const spin = () => {
    if (isSpinning) {
      return;
    }

    const random = Math.random();
    const nextIndex =
      random < 0.72 ? Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 3);
    const segment = 360 / prizes.length;
    const nextRotation = rotation + 1440 + (360 - nextIndex * segment) + 12;

    setIsSpinning(true);
    setPrizeIndex(null);
    setRotation(nextRotation);
    playSpinSound();

    window.setTimeout(() => {
      setPrizeIndex(nextIndex);
      setIsSpinning(false);
      playPrizeSound(nextIndex >= 3);
    }, 1800);
  };

  const isMiss = prize === '谢谢惠顾';

  return (
    <section className="lottery-screen">
      <div className="lottery-head">
        <img
          className="official-logo small"
          src={assetPath('assets/official/yuanqi-logo.png')}
          alt="元气森林"
        />
        <p className="eyebrow">元气补给抽奖</p>
        <h1>转一下，看看今天补给掉落什么。</h1>
        <p>你的推荐口味：{profile.drink}</p>
      </div>

      <div className="wheel-wrap">
        <div className="wheel-pointer" />
        <div
          className={`lottery-wheel ${isSpinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {prizes.map((item, index) => (
            <span key={`${item}-${index}`} className={`wheel-segment wheel-segment-${index}`}>
              {item}
            </span>
          ))}
          <div className="wheel-center">
            <img src={assetPath(profile.image)} alt="" />
          </div>
        </div>
      </div>

      <button className="primary-action" type="button" onClick={spin}>
        {isSpinning ? '元气加载中' : prize ? '再抽一次' : '开始抽奖'}
      </button>

      {prize ? (
        <div className={`prize-card ${isMiss ? 'is-miss' : ''}`}>
          <span>{isMiss ? '差一点' : '抽中'}</span>
          <strong>{prize}</strong>
          <p>
            {isMiss
              ? '这次没有掉落补给，但你的元气卡已经生成，可以继续逛逛元气森林货架。'
              : '可以继续逛一逛元气森林全系列，把今天的元气补给补满。'}
          </p>
        </div>
      ) : null}

      <div className="button-stack">
        <button
          className="secondary-action"
          type="button"
          onClick={() => {
            playSplashSound();
            onProducts();
          }}
        >
          探索元气森林全系列
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
