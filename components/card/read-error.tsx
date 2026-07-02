import { useMiCard } from "@/context/MiCard";
import { StyleSheet } from "react-native";
import { Icon, Surface, Text, useTheme } from "react-native-paper";
import GapView from "../views/GapView";

export default function ReadError() {
  const { error } = useMiCard();
  const { colors } = useTheme();
  return (
    <Surface
      style={{
        backgroundColor: colors.errorContainer,
        ...styles.errorContainer,
      }}
    >
      <GapView gap={8}>
        <Icon source={"nfc-variant-off"} size={64} />
        <Text variant="headlineSmall" style={styles.title}>
          Error al leer su tarjeta!
        </Text>
        <Text style={{ fontWeight: "700" }}>
          Se ha detectado un error al leer su tarjeta: {"\n"}
          <Text>{error ?? "Error desconocido!\n"}</Text>
        </Text>
        <Text>Pruebe intentar de nuevo en unos instantes...</Text>
      </GapView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    borderRadius: 8,
    padding: 16,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
