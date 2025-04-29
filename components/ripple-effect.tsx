import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export function RippleEffect({children}: {
    children: React.ReactNode
}) {
  const rippleOpacity = useSharedValue(0);

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      rippleOpacity.value = withTiming(0.2, { duration: 100 });
    })
    .onFinalize(() => {
      rippleOpacity.value = withTiming(0, { duration: 300 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${rippleOpacity.value})`,
  }));

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFillObject, styles.ripple, animatedStyle]}
        />
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "white",
  },
  ripple: {
    position: "absolute",
  },
  content: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
