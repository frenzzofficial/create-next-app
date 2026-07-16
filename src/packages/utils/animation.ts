import {
  ANIMATION_NAME,
  ANIMATION_TYPE,
  type AnimationDirection,
  type AnimationName,
  type AnimationType,
} from "../configs/animation.config";

export const FindAnimation = (
  type: AnimationType,
  direction: AnimationDirection = "none",
): AnimationName => {
  switch (type) {
    case ANIMATION_TYPE.FADE:
      return ANIMATION_NAME.FADE_IN;

    case ANIMATION_TYPE.SCALE:
      return ANIMATION_NAME.SCALE_IN;

    case ANIMATION_TYPE.ZOOM:
      return ANIMATION_NAME.ZOOM_IN;

    case ANIMATION_TYPE.ROTATE:
      return ANIMATION_NAME.ROTATE_IN;

    case ANIMATION_TYPE.FLIP:
      return ANIMATION_NAME.FLIP_X;

    case ANIMATION_TYPE.BOUNCE:
      return ANIMATION_NAME.BOUNCE_IN;

    case ANIMATION_TYPE.BLUR:
      return ANIMATION_NAME.BLUR_IN;

    case ANIMATION_TYPE.SLIDE:
      switch (direction) {
        case "left":
          return ANIMATION_NAME.SLIDE_IN_LEFT;

        case "right":
          return ANIMATION_NAME.SLIDE_IN_RIGHT;

        case "top":
          return ANIMATION_NAME.SLIDE_IN_TOP;

        case "bottom":
          return ANIMATION_NAME.SLIDE_IN_BOTTOM;

        default:
          return ANIMATION_NAME.NONE;
      }

    default:
      return ANIMATION_NAME.NONE;
  }
};
