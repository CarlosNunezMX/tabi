import { View } from "react-native";
import ThemedView from "./ThemedView";
import { ActivityIndicator, Text } from "react-native-paper";

export default function Loading() {
  return (
    <ThemedView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <ActivityIndicator size={"large"} />
        <Text>Buscando en el Himalaya...</Text>
      </View>
    </ThemedView>
  );
}
