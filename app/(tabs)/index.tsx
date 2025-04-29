import { Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F0C13",
      }}
    >
      <Text
        style={{
          color: "#fff",
        }}
      >
        Home
      </Text>
    </View>
  );
}
