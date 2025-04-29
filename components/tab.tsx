import { BRAND, GRAY } from "@/styles/theme";
import { BottomTabBarButtonProps, LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Pressable, StyleSheet, Text, View } from "react-native";


export const tabBarLabel = ({
  children,
  focused,
  color,
  position,
}: {
  focused: boolean;
  color: string;
  position: LabelPosition;
  children: string;
}) => (
  <Text
    style={[
      styles.tabLabel,
      {
        fontWeight: focused ? "bold" : "normal",
        color: focused ? "#fff" : GRAY[500],
      },
    ]}
  >
    {children}
  </Text>
);

export const tabBarButton = (props: BottomTabBarButtonProps) => (
  <Pressable {...props} android_ripple={null} style={styles.tabButton}>
    {props.children}
  </Pressable>
);

type TabBarIconProps = {
  focused: boolean;
  children: React.ReactNode;
};

export const TabBarIcon = ({ focused, children }: TabBarIconProps) => (
  <View
    style={[
      styles.tabIconContainer,
      { backgroundColor: focused ? BRAND[900] : GRAY[900] },
    ]}
  >
    {children}
  </View>
);

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: GRAY[900],
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 8,
    height: 100,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 12,
    textAlign: "center",
  },
});
