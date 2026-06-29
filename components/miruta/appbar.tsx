import { useState } from "react";
import { Appbar } from "react-native-paper";
import Credits from "./credits";

export default function MiRutaAppbar() {
  const [creditsVisible, setCreditsVisible] = useState(false);
  return (
    <Appbar.Header>
      <Appbar.Content title="Mi Ruta" />
      <Appbar.Action
        icon="alert-circle"
        onPress={() => setCreditsVisible((state) => !state)}
      />
      <Credits
        visible={creditsVisible}
        dismiss={() => setCreditsVisible((state) => !state)}
      />
    </Appbar.Header>
  );
}
