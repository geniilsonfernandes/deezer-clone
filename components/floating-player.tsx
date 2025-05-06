import { useAnimatedBackgroundColor } from "@/hooks/useAnimatedBackgroundColor";
import {
  CLAMPS,
  CLOSE_HEIGHT,
  useFloatingPlayerAnimation,
} from "@/hooks/useFloatingPlayerAnimation";
import { ChevronLast, Heart, Pause, Play } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeInUp,
  FadeOutDown,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";

const musics = [
  {
    id: "1",
    title: "Last Nite",
    artist: "The Strokes",
    color: "#FF6B6B", // vermelho suave
  },
  {
    id: "2",
    title: "Reptilia",
    artist: "The Strokes",
    color: "#F7B801", // amarelo mostarda
  },
  {
    id: "3",
    title: "Knights of Cydonia",
    artist: "Muse",
    color: "#3B82F6", // azul vibrante
  },
  {
    id: "4",
    title: "Uprising",
    artist: "Muse",
    color: "#9333EA", // roxo forte
  },
  {
    id: "5",
    title: "Square Hammer",
    artist: "Ghost",
    color: "#10B981", // verde esmeralda
  },
  {
    id: "6",
    title: "Dance Macabre",
    artist: "Ghost",
    color: "#F43F5E", // rosa escuro
  },
  {
    id: "7",
    title: "Time Is Running Out",
    artist: "Muse",
    color: "#0EA5E9", // azul claro
  },
];

const FloatingPressable: React.FC<{
  children: React.ReactNode;
  onPress: () => void;
}> = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
      }}
      android_ripple={{ color: "#ffffff50", radius: 28 }}
    >
      {children}
    </Pressable>
  );
};

const Music: React.FC<{
  title: string;
  artist: string;
}> = ({ artist, title }) => {
  return (
    <Animated.View
      key={title} // chave única para disparar re-render e animações
      entering={FadeInUp.duration(300)}
      exiting={FadeOutDown.duration(300)}
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
        {title}
      </Text>
      <Text
        style={{
          color: "#fff",
          opacity: 0.7,
        }}
      >
        {artist}
      </Text>
    </Animated.View>
  );
};

export const FloatingPlayer = () => {
  const [play, setPlay] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [index, setIndex] = useState(0);

  const togglePlay = () => {
    setPlay(!play);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const nextMusic = () => {
    if (index === musics.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(Math.min(musics.length - 1, index + 1));
  };
  const { panGesture, animatedStyle, tapGesture, height } =
    useFloatingPlayerAnimation();
  // color transtion hook
  const backgroundColor = useAnimatedBackgroundColor(musics[index].color);

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
      <Animated.View style={[styles.player, animatedStyle, backgroundColor]}>
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,

              width: "100%",
              overflow: "hidden",
            },
            pressableAnimatedStyledPressable,
          ]}
        >
          <Pressable
            onPress={tapGesture}
            android_ripple={{ color: "#ffffff50" }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: CLOSE_HEIGHT,

              justifyContent: "space-between",
            }}
          >
            <FloatingPressable onPress={togglePlay}>
              {play ? <Play color="#fff" /> : <Pause color="#fff" />}
            </FloatingPressable>
            <Music title={musics[index].title} artist={musics[index].artist} />

            <FloatingPressable onPress={toggleFavorite}>
              <Heart color="#fff" fill={favorite ? "#fff" : "transparent"} />
            </FloatingPressable>
            <FloatingPressable onPress={nextMusic}>
              <ChevronLast color="#fff" />
            </FloatingPressable>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  player: {
    borderRadius: 16,
    position: "absolute",

    zIndex: 999,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    overflow: "hidden",
  },
});
