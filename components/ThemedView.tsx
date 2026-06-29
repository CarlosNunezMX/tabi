import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface ThemedViewProps {
  useInsets?: boolean;
  usePaddingHorizontal?: boolean;
}
export default function ThemedView({
  children,
  useInsets,
  usePaddingHorizontal,
}: React.PropsWithChildren & ThemedViewProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        paddingTop: useInsets ? insets.top : 0,
        paddingHorizontal: usePaddingHorizontal ? 10 : 0,
        gap: 8,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}
