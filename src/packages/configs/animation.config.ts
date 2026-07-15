// ─── Animation Direction ───────────────────────────────────────────────────────────────
export const ANIMATION_DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
  NONE: "none",
} as const;

export type AnimationDirectionType = (typeof ANIMATION_DIRECTION)[keyof typeof ANIMATION_DIRECTION];

export const ANIMATION_NAMES = {
  left: "slideInLeft",
  right: "slideInRight",
  top: "slideInTop",
  bottom: "slideInBottom",
} as const;

export type AnimationNameType = (typeof ANIMATION_NAMES)[keyof typeof ANIMATION_NAMES];
