/**
 * 動畫配置檔案
 * 可以在這裡輕鬆客製化所有動畫參數
 *
 * 調整指南：
 * 1. speed: 動畫總時長（秒），數值越小動畫越快
 *    建議範圍：0.3 - 1.5
 *
 * 2. delay: 動畫開始前的延遲（秒）
 *    建議範圍：0 - 0.3
 *
 * 3. easing 參數：cubic-bezier 曲線，控制動畫的速度變化
 *    格式：[x1, y1, x2, y2]，每個值範圍通常是 -1 到 2
 *
 *    常用 easing 範例：
 *    - ease: [0.25, 0.1, 0.25, 1] (預設平滑)
 *    - ease-in: [0.42, 0, 1, 1] (慢速開始)
 *    - ease-out: [0, 0, 0.58, 1] (慢速結束)
 *    - ease-in-out: [0.42, 0, 0.58, 1] (慢速開始和結束)
 *    - bounce: [0.68, -0.55, 0.265, 1.55] (彈跳效果)
 *    - elastic: [0.68, -0.6, 0.32, 1.6] (彈性效果)
 *
 *    調整技巧：
 *    - y1, y2 < 0 或 > 1：會產生超越效果（overshoot）
 *    - y1, y2 接近 0-1：平滑過渡
 *    - x1, x2 控制加速/減速的時機
 */

export type CubicBezierEasing = [number, number, number, number];

export interface AnimationConfig {
  /** 動畫時長（秒），控制整個動畫的持續時間 */
  readonly speed: number;
  /** 動畫延遲（秒），動畫開始前的等待時間 */
  readonly delay: number;
  /** X/Y 軸移動動畫的 cubic-bezier 曲線，控制商品飛向購物車的路徑速度 */
  readonly xEasing: CubicBezierEasing;
  /** Y 軸動畫的 cubic-bezier 曲線（目前未使用，保留供未來擴展） */
  readonly yEasing: CubicBezierEasing;
  /** 縮放動畫的 cubic-bezier 曲線，控制商品縮小成圓形的速度變化 */
  readonly scaleEasing: CubicBezierEasing;
  /** 顏色動畫的 cubic-bezier 曲線（目前未使用，保留供未來擴展） */
  readonly colorEasing: CubicBezierEasing;
}

/**
 * 預設動畫配置
 * 可以根據需求修改這些值來客製化動畫效果
 *
 * 當前效果說明：
 * - xEasing: 帶有輕微超越效果的平滑移動
 * - scaleEasing: 快速縮小後稍微回彈的效果
 */
export const defaultAnimationConfig: AnimationConfig = {
  speed: 0.8, // 動畫持續 0.8 秒
  delay: 0.1, // 延遲 0.1 秒後開始
  xEasing: [0.59, -0.75, 0.91, 0.5], // 移動動畫：開始稍慢，中間加速，結束時有輕微超越
  yEasing: [0.15, 0.57, 0.9, 1.05], // Y 軸動畫（目前未使用）
  scaleEasing: [0.85, 0.06, 0.97, 1.01], // 縮放動畫：快速縮小，結束時有輕微回彈
  colorEasing: [0.05, 1.02, 0.97, 1.01], // 顏色動畫（目前未使用）
};

/**
 * 將 cubic-bezier 陣列轉換為 CSS cubic-bezier 字串
 */
export const cubicBezierToString = (easing: CubicBezierEasing): string => {
  return `cubic-bezier(${easing.join(", ")})`;
};
