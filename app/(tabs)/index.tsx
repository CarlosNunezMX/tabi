import AddCardModal from "@/components/card/addCardModal";
import ThemedView from "@/components/ThemedView";
import { MiCardReader, MiCardSession } from "@/lib/com.jericayapp.card";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, Icon, Text } from "react-native-paper";

export default function HomeScreen() {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  useEffect(() => {
    if (visibleModal) {
      MiCardSession.withSession(async (session) => {
        const reader = new MiCardReader(session);
        await reader.selectApplication();
        await reader.getServiceFile("DEBIT");
        await reader.getServiceFile("TICKETS");
      });
    }
  }, [visibleModal]);
  return (
    <ThemedView>
      <FAB
        icon={"nfc-variant"}
        style={styles.fab}
        size="medium"
        onPress={() => setVisibleModal((state) => !state)}
      />

      <View style={styles.noCards}>
        <Icon source="credit-card" size={48} />
        <Text variant="bodyLarge">
          Vamos a ver cuanto saldo tiene tu tarjeta!
        </Text>
      </View>

      <AddCardModal
        visible={visibleModal}
        onDimiss={() => setVisibleModal((state) => !state)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  noCards: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
