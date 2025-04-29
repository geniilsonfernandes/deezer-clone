import { tabBarButton, TabBarIcon, tabBarLabel, styles as tabStyles } from "@/components/tab";
import { BRAND } from "@/styles/theme";
import { Tabs } from "expo-router";
import { Compass, Heart, Home, Search } from "lucide-react-native";
import React from "react";







export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        animation: "fade",
        tabBarActiveTintColor: BRAND[100],
        tabBarHideOnKeyboard: true,
        tabBarStyle: tabStyles.tabBar,
        tabBarLabel: tabBarLabel,
        tabBarButton: tabBarButton,
        tabBarIconStyle: {
          marginTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused}>
              <Home color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused}>
              <Compass color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused}>
              <Heart color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused}>
              <Search color={color} />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}
