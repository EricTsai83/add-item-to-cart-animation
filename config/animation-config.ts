/**
 * Animation configuration file
 * speed: Animation duration (seconds), recommended 0.3-1.5
 * delay: Delay (seconds), recommended 0-0.3
 * easing: cubic-bezier curve [x1, y1, x2, y2]
 * pathType: Path type
 * pathHeight: Path height (pixels), recommended 50-300
 * rotation: Rotation angle (degrees), 0-360
 * blur: Blur effect intensity, 0-20
 * scale: Scale effect, true/false
 * fade: Fade out effect, true/false
 */

export type CubicBezierEasing = [number, number, number, number];

export type PathType = "straight" | "parabola" | "spiral" | "elastic";

export interface AnimationConfig {
  readonly speed: number;
  readonly delay: number;
  readonly xEasing: CubicBezierEasing;
  readonly yEasing: CubicBezierEasing;
  readonly scaleEasing: CubicBezierEasing;
  readonly pathType: PathType;
  readonly pathHeight: number;
  readonly rotation?: number;
  readonly blur?: number;
  readonly scale?: boolean;
  readonly fade?: boolean;
  readonly spiralTurns?: number;
}

export const animationConfigs = {
  original: {
    speed: 0.8,
    delay: 0.1,
    xEasing: [0.59, -0.75, 0.91, 0.5] as CubicBezierEasing,
    yEasing: [0.15, 0.57, 0.9, 1.05] as CubicBezierEasing,
    scaleEasing: [0.85, 0.06, 0.97, 1.01] as CubicBezierEasing,
    pathType: "straight" as PathType,
    pathHeight: 0,
    rotation: 800,
    blur: 0,
    scale: true,
    fade: false,
  },
  fast: {
    speed: 0.5,
    delay: 0.05,
    xEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    yEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    scaleEasing: [0.68, -0.55, 0.265, 1.55] as CubicBezierEasing,
    pathType: "straight" as PathType,
    pathHeight: 0,
    rotation: 180,
    blur: 0,
    scale: true,
    fade: false,
  },
  smooth: {
    speed: 1.0,
    delay: 0.1,
    xEasing: [0.25, 0.1, 0.25, 1] as CubicBezierEasing,
    yEasing: [0.25, 0.1, 0.25, 1] as CubicBezierEasing,
    scaleEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    pathType: "straight" as PathType,
    pathHeight: 0,
    rotation: 0,
    blur: 0,
    scale: true,
    fade: true,
  },
  bouncy: {
    speed: 0.9,
    delay: 0.1,
    xEasing: [0.68, -0.55, 0.265, 1.55] as CubicBezierEasing,
    yEasing: [0.68, -0.55, 0.265, 1.55] as CubicBezierEasing,
    scaleEasing: [0.68, -0.55, 0.265, 1.55] as CubicBezierEasing,
    pathType: "parabola" as PathType,
    pathHeight: 200,
    rotation: 720,
    blur: 0,
    scale: true,
    fade: false,
  },
  elegant: {
    speed: 1.2,
    delay: 0.15,
    xEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    yEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    scaleEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    pathType: "parabola" as PathType,
    pathHeight: 100,
    rotation: 180,
    blur: 0,
    scale: true,
    fade: false,
  },
  spiral: {
    speed: 1.1,
    delay: 0.1,
    xEasing: [0.25, 0.46, 0.45, 0.94] as CubicBezierEasing,
    yEasing: [0.25, 0.46, 0.45, 0.94] as CubicBezierEasing,
    scaleEasing: [0.68, -0.55, 0.265, 1.55] as CubicBezierEasing,
    pathType: "spiral" as PathType,
    pathHeight: 150,
    rotation: 1080,
    blur: 0,
    scale: true,
    fade: false,
    spiralTurns: 2,
  },
  elastic: {
    speed: 1.3,
    delay: 0.1,
    xEasing: [0.68, -0.6, 0.32, 1.6] as CubicBezierEasing,
    yEasing: [0.68, -0.6, 0.32, 1.6] as CubicBezierEasing,
    scaleEasing: [0.68, -0.6, 0.32, 1.6] as CubicBezierEasing,
    pathType: "elastic" as PathType,
    pathHeight: 180,
    rotation: 540,
    blur: 0,
    scale: true,
    fade: true,
  },
  magical: {
    speed: 1.2,
    delay: 0.15,
    xEasing: [0.25, 0.46, 0.45, 0.94] as CubicBezierEasing,
    yEasing: [0.55, 0.06, 0.68, 0.19] as CubicBezierEasing,
    scaleEasing: [0.68, -0.55, 0.265, 1.55] as CubicBezierEasing,
    pathType: "spiral" as PathType,
    pathHeight: 180,
    rotation: 1440,
    blur: 0,
    scale: true,
    fade: false,
    spiralTurns: 3,
  },
  minimal: {
    speed: 0.6,
    delay: 0.05,
    xEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    yEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    scaleEasing: [0.42, 0, 0.58, 1] as CubicBezierEasing,
    pathType: "straight" as PathType,
    pathHeight: 0,
    rotation: 0,
    blur: 0,
    scale: true,
    fade: false,
  },
} as const satisfies Record<string, AnimationConfig>;

export type ConfigName = keyof typeof animationConfigs;

export const configDisplayNames: Record<ConfigName, string> = {
  original: "Original",
  fast: "Fast",
  smooth: "Smooth",
  bouncy: "Bouncy",
  elegant: "Elegant",
  spiral: "Spiral",
  elastic: "Elastic",
  magical: "Magical",
  minimal: "Minimal",
};
