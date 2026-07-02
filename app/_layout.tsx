import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "@/i18n";
import Providers from "@/components/Providers";
import SelectorAppbar from "@/components/miruta/selector/appbar";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/route-selector"
          options={{
            header: () => <SelectorAppbar />,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </Providers>
  );
}
