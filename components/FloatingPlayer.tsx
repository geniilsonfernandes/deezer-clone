import {
    CLOSE_HEIGHT,
    OPEN_HEIGHT,
    useFloatingPlayerAnimation,
} from "@/hooks/useFloatingPlayerAnimation";
import { ChevronLast, Heart, Play } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

export const FloatingPlayer = () => {
  const { panGesture, animatedStyle, height } = useFloatingPlayerAnimation();

  const animatedStyleD = useAnimatedStyle(() => {
    return {
      opacity: interpolate(height.value, [CLOSE_HEIGHT/3, OPEN_HEIGHT/3], [1, 0]),
      transform: [
        {
          translateY: interpolate(
            height.value,
            [CLOSE_HEIGHT, OPEN_HEIGHT],
            [0, 64]
          ),
        },
      ]
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.player, animatedStyle]}>
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              height: 64,
              width: "100%",
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            },
            animatedStyleD,
          ]}
        >
          <Play color="#fff" />
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Heathens
            </Text>
            <Text
              style={{
                color: "#fff",
                opacity: 0.7,
              }}
            >
              Twenty One Pilots - Heathens
            </Text>
          </View>

          <Heart color="#fff" />
          <ChevronLast color="#fff" />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  player: {
    backgroundColor: "#315F38",
    borderRadius: 16,
    position: "absolute",

    zIndex: 999,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    overflow: "hidden",
  },
});
