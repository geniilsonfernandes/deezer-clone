import { View } from "react-native";
import { Gesture } from "react-native-gesture-handler";

export default function TabOneScreen() {
  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      // rippleOpacity.value = withTiming(0.2, { duration: 100 });
    })
    .onFinalize(() => {
      // rippleOpacity.value = withTiming(0, { duration: 300 });
    });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F0C13",
      }}
    ></View>
  );
}
