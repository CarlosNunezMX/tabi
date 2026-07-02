import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MiRutaProvider } from "@/context/MiRuta";
import { MiCardProvider } from "@/context/MiCard";
import DeviceProvider from "@/context/device-context";
export default function Providers({ children }: React.PropsWithChildren) {
  const schema = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    schema === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };
  return (
    <DeviceProvider>
      <PaperProvider theme={paperTheme}>
        <MiCardProvider>
          <MiRutaProvider>
            <SafeAreaProvider>{children}</SafeAreaProvider>
          </MiRutaProvider>
        </MiCardProvider>
      </PaperProvider>
    </DeviceProvider>
  );
}
