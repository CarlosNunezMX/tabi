import { View } from "react-native";
interface GapViewProps extends React.PropsWithChildren {
  gap?: number;
}

export default function GapView({ children, gap }: GapViewProps = { gap: 16 }) {
  return <View style={{ gap }}>{children}</View>;
}
