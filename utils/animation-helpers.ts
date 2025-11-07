import type { AnimationConfig } from "@/config/animation-config";

type PathKeyframes = {
  readonly x: readonly number[];
  readonly y: readonly number[];
  readonly times: readonly number[];
};

/**
 * Generate keyframes for spiral path
 */
const generateSpiralPath = (
  distanceX: number,
  distanceY: number,
  pathHeight: number,
  keyframeCount: number,
  spiralTurns: number,
): PathKeyframes => {
  const x = [0] as number[];
  const y = [0] as number[];
  const times = [0] as number[];

  for (let i = 1; i <= keyframeCount; i++) {
    const progress = i / keyframeCount;
    const angle = progress * spiralTurns * Math.PI * 2;
    const radius = pathHeight * (1 - progress);

    x.push(distanceX * progress + Math.cos(angle) * radius);
    y.push(distanceY * progress + Math.sin(angle) * radius);
    times.push(progress);
  }

  return { x, y, times };
};

/**
 * Generate keyframes for elastic path
 */
const generateElasticPath = (
  distanceX: number,
  distanceY: number,
  pathHeight: number,
  keyframeCount: number,
): PathKeyframes => {
  const x = [0] as number[];
  const y = [0] as number[];
  const times = [0] as number[];

  for (let i = 1; i <= keyframeCount; i++) {
    const progress = i / keyframeCount;
    const elasticFactor = 1 - Math.pow(1 - progress, 3);
    const elasticBounce =
      Math.sin(progress * Math.PI * 4) * pathHeight * (1 - progress);

    x.push(distanceX * elasticFactor);
    y.push(distanceY * elasticFactor + elasticBounce);
    times.push(progress);
  }

  return { x, y, times };
};

/**
 * Generate keyframes for custom path
 */
export const generatePathKeyframes = (
  pathType: AnimationConfig["pathType"],
  distanceX: number,
  distanceY: number,
  pathHeight: number,
  keyframeCount: number,
  spiralTurns: number,
): PathKeyframes | null => {
  if (pathType === "spiral") {
    return generateSpiralPath(
      distanceX,
      distanceY,
      pathHeight,
      keyframeCount,
      spiralTurns,
    );
  }

  if (pathType === "elastic") {
    return generateElasticPath(distanceX, distanceY, pathHeight, keyframeCount);
  }

  return null;
};

/**
 * Calculate Y-axis animation values for parabola path
 */
export const calculateParabolaYAnimation = (
  distanceY: number,
  pathHeight: number,
): readonly number[] => {
  return [
    0,
    distanceY * 0.5 - (distanceY >= 0 ? pathHeight : -pathHeight),
    distanceY,
  ];
};

/**
 * Calculate rotation direction
 */
export const calculateRotationDirection = (distanceX: number): number => {
  return distanceX < 0 ? -1 : 1;
};
