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

      const t = (clampedHeight - CLOSE_HEIGHT) / (OPEN_HEIGHT - CLOSE_HEIGHT);
      bottom.value = interpolate(
        t,
        [0, 1],
        [CLOSE_POSITION_BOTTOM, OPEN_POSITION_BOTTOM]
      );
      width.value = interpolate(t, [0, 1], [CLOSE_WIDTH, OPEN_WIDTH]);
    })
    .onEnd(() => {
      if (height.value > OPEN_HEIGHT / 2) {
        height.value = withTiming(OPEN_HEIGHT, {
          duration: ANIMATION_DURATION,
        });
        bottom.value = withTiming(OPEN_POSITION_BOTTOM, {
          duration: ANIMATION_DURATION,
        });
        width.value = withTiming(OPEN_WIDTH, { duration: ANIMATION_DURATION });
        isOpen.value = true;
      } else {
        height.value = withTiming(CLOSE_HEIGHT, {
          duration: ANIMATION_DURATION,
        });
        bottom.value = withTiming(CLOSE_POSITION_BOTTOM, {
          duration: ANIMATION_DURATION,
        });
        width.value = withTiming(CLOSE_WIDTH, { duration: ANIMATION_DURATION });
        isOpen.value = false;
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      bottom: bottom.value,
      width: width.value,
     
    };
  });

  return {
    panGesture,
    animatedStyle,
    height,
    progress: interpolate(height.value, [CLOSE_HEIGHT, OPEN_HEIGHT], [0, 100]),
  };
};
