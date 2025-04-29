import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const OPEN_HEIGHT = Dimensions.get("screen").height;
export const CLOSE_HEIGHT = 64;

export const CLAMPS = {
  START: CLOSE_HEIGHT,
  END: OPEN_HEIGHT,
  BIG: {
    START: CLOSE_HEIGHT / 4,
    END: OPEN_HEIGHT / 4,
  },
};
const OPEN_WIDTH = Dimensions.get("screen").width;
const CLOSE_WIDTH = Dimensions.get("screen").width - 16;
const OPEN_POSITION_BOTTOM = 0;
const CLOSE_POSITION_BOTTOM = 110;
const ANIMATION_DURATION = 800;

export const useFloatingPlayerAnimation = () => {
  const isOpen = useSharedValue(false);
  const height = useSharedValue(CLOSE_HEIGHT);
  const startHeight = useSharedValue(CLOSE_HEIGHT);
  const bottom = useSharedValue(CLOSE_POSITION_BOTTOM);
  const width = useSharedValue(CLOSE_WIDTH);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startHeight.value = height.value;
    })
    .onUpdate((event) => {
      const newHeight = startHeight.value - event.translationY;
      const clampedHeight = Math.min(
        Math.max(CLOSE_HEIGHT, newHeight),
        OPEN_HEIGHT
      );
      height.value = clampedHeight;
      bottom.value = interpolate(
        clampedHeight,
        [CLOSE_HEIGHT, OPEN_HEIGHT],
        [CLOSE_POSITION_BOTTOM, OPEN_POSITION_BOTTOM]
      );
      width.value = interpolate(
        clampedHeight,
        [CLOSE_HEIGHT, OPEN_HEIGHT],
        [CLOSE_WIDTH, OPEN_WIDTH]
      );
    })
    .onEnd(() => {
      const shouldOpen = height.value > OPEN_HEIGHT / 2;

      height.value = withTiming(shouldOpen ? OPEN_HEIGHT : CLOSE_HEIGHT, {
        duration: ANIMATION_DURATION,
      });
      bottom.value = withTiming(
        shouldOpen ? OPEN_POSITION_BOTTOM : CLOSE_POSITION_BOTTOM,
        {
          duration: ANIMATION_DURATION,
        }
      );
      width.value = withTiming(shouldOpen ? OPEN_WIDTH : CLOSE_WIDTH, {
        duration: ANIMATION_DURATION,
      });
      isOpen.value = shouldOpen;
    });

  const tapGesture = () => {
    const shouldOpen = !isOpen.value;

    height.value = withTiming(shouldOpen ? OPEN_HEIGHT : CLOSE_HEIGHT, {
      duration: ANIMATION_DURATION,
    });
    bottom.value = withTiming(
      shouldOpen ? OPEN_POSITION_BOTTOM : CLOSE_POSITION_BOTTOM,
      {
        duration: ANIMATION_DURATION,
      }
    );
    width.value = withTiming(shouldOpen ? OPEN_WIDTH : CLOSE_WIDTH, {
      duration: ANIMATION_DURATION,
    });
    isOpen.value = shouldOpen;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      bottom: bottom.value,
      width: width.value,
    };
  });

  return {
    panGesture,
    tapGesture,
    animatedStyle,
    height,
  };
};
