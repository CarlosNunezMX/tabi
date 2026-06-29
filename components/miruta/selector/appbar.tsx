import { router } from "expo-router";
import { Appbar } from "react-native-paper";

export default function SelectorAppbar() {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => router.back()} />
      <Appbar.Content title="Seleccione una ruta" />
    </Appbar.Header>
  );
}
