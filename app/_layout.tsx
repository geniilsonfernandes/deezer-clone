import { Stack } from "expo-router";

import { FloatingPlayer } from "@/components/floating-player";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// TODO: VER COMO FUNCIONA ESSES GESTURES
// Gesture.Tap()
//  Gesture.Pinch();

export default function RootLayout() {
  const [loaded] = useFonts({});

  useEffect(() => {
    const setNavBar = async () => {
      try {
        if (Platform.OS === "android") {
          // await SplashScreen.preventAutoHideAsync();
          // enables edge-to-edge mode
          await NavigationBar.setPositionAsync("absolute");
          // transparent backgrounds to see through
          await NavigationBar.setBackgroundColorAsync("#ffffff00");
        }
      } catch (e) {
        console.warn("Error setting navigation bar:", e);
      } finally {
        if (loaded) {
          // await SplashScreen.hideAsync();
        }
      }
    };

    setNavBar();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, position: "relative" }}>
      {/* <BottomSheetModalProvide> */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#0F0C13",
          },
        }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <FloatingPlayer />
      <StatusBar style="auto" />
      {/* </BottomSheetModalProvide> */}
    </GestureHandlerRootView>
  );
}
