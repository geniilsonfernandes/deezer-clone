import { useEffect, useRef } from "react";
import {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export function useAnimatedBackgroundColor(toColor: string, duration = 500) {
  const progress = useSharedValue(0);
  const colors = useSharedValue<[string, string]>([toColor, toColor]);
  const prevColor = useRef(toColor);

  useEffect(() => {
    if (toColor !== prevColor.current) {
      colors.value = [prevColor.current, toColor];
      progress.value = 0;
      progress.value = withTiming(1, { duration });
      prevColor.current = toColor;
    }
  }, [toColor]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      colors.value
    );

    return { backgroundColor };
  });

  return animatedStyle;
}
