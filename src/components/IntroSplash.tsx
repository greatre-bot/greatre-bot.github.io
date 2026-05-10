import { assetPath } from '../utils/assets';

interface IntroSplashProps {
  exiting: boolean;
}

// 商业 Campaign 开场：两瓶气泡水碰杯，气泡散开后进入 H5。
export function IntroSplash({ exiting }: IntroSplashProps) {
  return (
    <div className={`intro-splash ${exiting ? 'is-exiting' : ''}`} aria-hidden="true">
      <img
        className="intro-logo"
        src={assetPath('assets/official/yuanqi-logo.png')}
        alt=""
      />

      <div className="intro-bottle-stage">
        <img
          className="intro-bottle intro-bottle-left"
          src={assetPath('assets/official/lime-bottle.png')}
          alt=""
        />
        <img
          className="intro-bottle intro-bottle-right"
          src={assetPath('assets/official/peach-bottle.png')}
          alt=""
        />
        <div className="intro-burst">
          <i className="intro-shockwave" />
          <i className="intro-liquid-arc intro-liquid-arc-a" />
          <i className="intro-liquid-arc intro-liquid-arc-b" />
          <i className="intro-liquid-arc intro-liquid-arc-c" />
          <img
            className="intro-splash-img intro-splash-img-a"
            src={assetPath('assets/official/water-splash-wide.png')}
            alt=""
          />
          <img
            className="intro-splash-img intro-splash-img-b"
            src={assetPath('assets/official/water-splash-tall.png')}
            alt=""
          />
          {Array.from({ length: 32 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
