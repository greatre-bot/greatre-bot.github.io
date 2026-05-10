import { useMemo, useState } from 'react';
import type { ResultProfile } from '../data/results';
import { assetPath } from '../utils/assets';
import { playBubbleSound, playSplashSound } from '../utils/sound';

interface EnergyCardProps {
  profile: ResultProfile;
  energyIndex: number;
  onLottery: () => void;
  onRetake: () => void;
}

const cardWidth = 1080;
const cardHeight = 1600;

function loadCardImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3,
) {
  const chars = Array.from(text);
  const lines: string[] = [];
  let line = '';

  chars.forEach((char) => {
    const next = `${line}${char}`;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = next;
    }
  });

  if (line) {
    lines.push(line);
  }

  lines.slice(0, maxLines).forEach((item, index) => {
    ctx.fillText(item, x, y + index * lineHeight);
  });
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
    playBubbleSound();
    try {
      await navigator.clipboard.writeText(shareText);
      setNotice('分享文案已复制，适合发到小红书/朋友圈。');
    } catch {
      setNotice('当前浏览器不支持自动复制，可在部署后接入分享组件。');
    }
  };

  const downloadEnergyCard = async () => {
    playSplashSound();
    setNotice('正在生成元气卡图片...');

    try {
      await document.fonts?.ready;

      const [logo, product] = await Promise.all([
        loadCardImage(assetPath('assets/official/yuanqi-logo.png')),
        loadCardImage(assetPath(profile.image)),
      ]);
      const canvas = document.createElement('canvas');
      canvas.width = cardWidth;
      canvas.height = cardHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context is unavailable.');
      }

      const bg = ctx.createLinearGradient(0, 0, cardWidth, cardHeight);
      bg.addColorStop(0, '#fff8fb');
      bg.addColorStop(0.5, '#fff1f6');
      bg.addColorStop(1, '#f7fff9');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cardWidth, cardHeight);

      [
        { x: 910, y: 130, r: 76, a: 0.35 },
        { x: 165, y: 310, r: 45, a: 0.45 },
        { x: 885, y: 760, r: 38, a: 0.4 },
        { x: 120, y: 900, r: 72, a: 0.25 },
        { x: 940, y: 1180, r: 28, a: 0.35 },
      ].forEach((bubble) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 122, 170, ${bubble.a})`;
        ctx.lineWidth = 8;
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.save();
      drawRoundRect(ctx, 72, 72, 260, 90, 10);
      ctx.clip();
      ctx.drawImage(logo, 72, 72, 260, 90);
      ctx.restore();

      ctx.fillStyle = '#25191d';
      ctx.font = '700 42px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillText('元气补给站', 72, 235);
      ctx.font = '600 34px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillStyle = profile.accent;
      ctx.fillText(`TYPE ${profile.code}`, 72, 290);

      ctx.fillStyle = '#25191d';
      ctx.font = '800 64px "Microsoft YaHei", "PingFang SC", sans-serif';
      drawWrappedText(ctx, profile.title, 72, 410, 560, 78, 2);
      ctx.font = '400 34px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillStyle = '#6b5660';
      drawWrappedText(ctx, profile.copy, 72, 590, 500, 48, 3);

      ctx.save();
      const productScale = Math.min(430 / product.width, 820 / product.height);
      const productWidth = product.width * productScale;
      const productHeight = product.height * productScale;
      const productX = 610;
      const productY = 285;
      ctx.shadowColor = 'rgba(92, 54, 66, 0.2)';
      ctx.shadowBlur = 36;
      ctx.shadowOffsetY = 26;
      ctx.drawImage(product, productX, productY, productWidth, productHeight);
      ctx.restore();

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(244, 123, 162, 0.18)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 18;
      drawRoundRect(ctx, 72, 1010, 936, 430, 42);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      ctx.fillStyle = '#25191d';
      ctx.font = '800 104px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillText(`${energyIndex}%`, 112, 1150);
      ctx.font = '500 32px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillStyle = '#90717d';
      ctx.fillText('今日元气指数', 390, 1132);

      ctx.font = '700 42px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillStyle = profile.accent;
      ctx.fillText(profile.drink, 112, 1245);

      let keywordX = 112;
      profile.keywords.forEach((keyword) => {
        ctx.font = '600 28px "Microsoft YaHei", "PingFang SC", sans-serif';
        const pillWidth = ctx.measureText(keyword).width + 58;
        ctx.fillStyle = 'rgba(255, 122, 170, 0.16)';
        drawRoundRect(ctx, keywordX, 1292, pillWidth, 58, 29);
        ctx.fill();
        ctx.fillStyle = '#533741';
        ctx.fillText(keyword, keywordX + 29, 1331);
        keywordX += pillWidth + 18;
      });

      ctx.font = '400 34px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillStyle = '#5b4650';
      drawWrappedText(ctx, profile.shareCopy, 112, 1395, 820, 48, 2);

      ctx.font = '500 26px "Microsoft YaHei", "PingFang SC", sans-serif';
      ctx.fillStyle = '#a18692';
      ctx.fillText('今天，你是什么元气状态？', 72, 1530);

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png', 0.96);
      });

      const link = document.createElement('a');
      link.download = `元气状态卡-${profile.shortTitle}.png`;
      link.href = blob ? URL.createObjectURL(blob) : canvas.toDataURL('image/png');
      link.click();

      if (blob) {
        window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      }

      setNotice('元气卡已生成并开始下载。');
    } catch {
      setNotice('当前浏览器暂时无法生成图片，请刷新后再试。');
    }
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
        <button
          className="secondary-action"
          type="button"
          onClick={() => {
            playBubbleSound();
            onRetake();
          }}
        >
          重新测试
        </button>
        <button className="secondary-action" type="button" onClick={copyShareText}>
          复制分享文案
        </button>
        <button className="ghost-action" type="button" onClick={downloadEnergyCard}>
          下载/保存元气卡
        </button>
        <button
          className="primary-action"
          type="button"
          onClick={() => {
            playSplashSound();
            onLottery();
          }}
        >
          抽取元气补给
        </button>
      </div>
    </section>
  );
}
