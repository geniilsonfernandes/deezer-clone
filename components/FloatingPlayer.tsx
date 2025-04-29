import { useAnimatedBackgroundColor } from "@/hooks/useAnimatedBackgroundColor";
import {
  CLAMPS,
  useFloatingPlayerAnimation,
} from "@/hooks/useFloatingPlayerAnimation";
import { ChevronLast, Heart, Play } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export const FloatingPlayer = () => {
  const { panGesture, animatedStyle, tapGesture, height } =
    useFloatingPlayerAnimation();
  // color transtion hook
  const backgroundColor = useAnimatedBackgroundColor("#315F38");

  const pressableAnimatedStyledPressable = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        height.value,
        [CLAMPS.BIG.START, CLAMPS.BIG.END],
        [1, 0]
      ),
      transform: [
        {
          translateY: interpolate(
            height.value,
            [CLAMPS.START, CLAMPS.END],
            [0, 64]
          ),
        },
      ],
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

              width: "100%",

              overflow: "hidden",
            },
            pressableAnimatedStyledPressable,
            backgroundColor,
          ]}
        >
          <Pressable
            onPress={tapGesture}
            android_ripple={{ color: "#ffffff50" }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 64,
              paddingHorizontal: 16,
              justifyContent: "space-between",
              gap: 16,
            }}
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
          </Pressable>
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
