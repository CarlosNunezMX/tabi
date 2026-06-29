import { View } from "react-native";

export default function GapView({ children }: React.PropsWithChildren) {
  return <View style={{ gap: 16 }}>{children}</View>;
}
