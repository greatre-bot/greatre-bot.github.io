import { useState } from 'react';
import type { ResultProfile } from '../data/results';
import { assetPath } from '../utils/assets';

interface CouponProps {
  profile: ResultProfile;
  onProducts: () => void;
  onHome: () => void;
}

export function Coupon({ profile, onProducts, onHome }: CouponProps) {
  const [notice, setNotice] = useState('');

  return (
    <section className="coupon-screen">
      <p className="eyebrow">元气补给券</p>
      <h1>你的专属补给已生成</h1>

      <div className="coupon-ticket">
        <span className="ticket-label">今日推荐</span>
        <img className="coupon-product" src={assetPath(profile.image)} alt="" />
        <strong>3元元气补给券</strong>
        <p>推荐兑换：{profile.drink}</p>
      </div>

      <div className="trial-ticket">
        <span>线下触点</span>
        <strong>校园快闪试饮券</strong>
        <p>领取后可进入产品货架，继续浏览气泡水、外星人、冰茶、乳茶等产品线。</p>
      </div>

      {notice ? <p className="notice-text">{notice}</p> : null}

      <div className="button-stack">
        <button className="primary-action" type="button" onClick={onProducts}>
          探索元气产品线
        </button>
        <button
          className="secondary-action"
          type="button"
          onClick={() => setNotice('已模拟跳转：附近便利店 / 校园快闪点位。')}
        >
          前往附近便利店
        </button>
        <button className="ghost-action" type="button" onClick={onHome}>
          返回首页
        </button>
      </div>
    </section>
  );
}
