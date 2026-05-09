import type { PropsWithChildren } from 'react';

// 桌面端用手机框模拟扫码后的真实 H5；手机端会自动铺满屏幕。
export function PhoneFrame({ children }: PropsWithChildren) {
  return (
    <div className="phone-frame">
      <div className="phone-chrome" aria-hidden="true">
        <span className="phone-time">10:10</span>
        <span className="phone-notch" />
        <span className="phone-signal">5G</span>
      </div>
      <div className="phone-screen">{children}</div>
    </div>
  );
}
