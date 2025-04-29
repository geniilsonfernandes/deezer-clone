import { CompassIcon } from "@/components/svg/compass-icon";
import { HeartIcon } from "@/components/svg/heart-icon";
import { HouseIcon } from "@/components/svg/house-icon";
import { SearchIcon } from "@/components/svg/search-icon";
import {
  tabBarButton,
  TabBarIcon,
  tabBarLabel,
  styles as tabStyles,
} from "@/components/tab";
import { BRAND } from "@/styles/theme";
import { Tabs } from "expo-router";
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
              <HouseIcon color={color} fill={focused ? color : undefined} />
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
              <CompassIcon color={color} fill={focused ? color : undefined} />
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
              <HeartIcon color={color} fill={focused ? color : undefined} />
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
              <SearchIcon color={color} fill={focused ? color : undefined} />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}
