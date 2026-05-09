import { useMemo, useState } from 'react';
import type { ResultProfile } from '../data/results';
import { assetPath } from '../utils/assets';

interface EnergyCardProps {
  profile: ResultProfile;
  energyIndex: number;
  onLottery: () => void;
  onRetake: () => void;
}

export function EnergyCard({
  profile,
  energyIndex,
  onLottery,
  onRetake,
}: EnergyCardProps) {
  const [notice, setNotice] = useState('');

  const shareText = useMemo(
    () =>
      `今天我是「${profile.title}」，元气指数 ${energyIndex}%。${profile.shareCopy} 推荐补给：${profile.drink}。#元气补给站#`,
    [energyIndex, profile],
  );

  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setNotice('分享文案已复制，适合发到小红书/朋友圈。');
    } catch {
      setNotice('当前浏览器不支持自动复制，可在部署后接入分享组件。');
    }
  };

  const mockDownload = () => {
    setNotice('已预留保存卡片入口，后续可接入图片生成。');
  };

  return (
    <section className="card-screen">
      <p className="eyebrow">我的元气状态卡</p>

      <div className={`share-card share-card-${profile.type}`}>
        <div className="share-card-top">
          <img
            className="official-logo small"
            src={assetPath('assets/official/yuanqi-logo.png')}
            alt="元气森林"
          />
          <span className="share-type">TYPE {profile.code}</span>
        </div>

        <div className="share-card-main">
          <p>今天我是</p>
          <h1>{profile.title}</h1>
          <div className="energy-index">
            <span>{energyIndex}%</span>
            <small>今日元气指数</small>
          </div>
        </div>

        <img className="share-product" src={assetPath(profile.image)} alt="" />

        <div className="share-card-detail">
          <div>
            <span>推荐饮品</span>
            <strong>{profile.drink}</strong>
          </div>
          <div className="keyword-row">
            {profile.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
          <p>{profile.shareCopy}</p>
        </div>
      </div>

      {notice ? <p className="notice-text">{notice}</p> : null}

      <div className="button-grid">
        <button className="secondary-action" type="button" onClick={onRetake}>
          重新测试
        </button>
        <button className="secondary-action" type="button" onClick={copyShareText}>
          复制分享文案
        </button>
        <button className="ghost-action" type="button" onClick={mockDownload}>
          下载/保存元气卡
        </button>
        <button className="primary-action" type="button" onClick={onLottery}>
          抽取元气补给
        </button>
      </div>
    </section>
  );
}
