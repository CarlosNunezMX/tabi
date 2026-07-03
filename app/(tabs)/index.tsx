import AddCardModal from "@/components/card/read-card";
import CardInfo from "@/components/card/card-info";
import ReadError from "@/components/card/read-error";
import ThemedView from "@/components/ThemedView";
import { useMiCard } from "@/context/MiCard";
import { MiCardReader, MiCardSession } from "@carlosnunezmx/micard";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import NoCard from "@/components/card/no-card";
import { useDevice } from "@/context/device-context";
import { HasNotComponent } from "@/components/has-not-component";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { nfc, loadNfc } = useDevice();
  const { t } = useTranslation();
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const { isReading, readCard, error, uid } = useMiCard();
  useEffect(() => {
    if (visibleModal && !isReading) {
      MiCardSession.withSession(async (session) => {
        await readCard(new MiCardReader(session));
        setVisibleModal(false);
      });
    }
  }, [visibleModal, isReading, readCard]);

  if (!nfc)
    return (
      <HasNotComponent
        icon="nfc-variant-off"
        description={t("card.no_nfc_body")}
        title={t("card.no_nfc_title")}
        tryAgain={loadNfc}
      />
    );

  return (
    <ThemedView useInsets usePaddingHorizontal>
      {error && <ReadError />}
      {!error && uid && !visibleModal && <CardInfo />}
      {!uid && <NoCard />}
      <FAB
        icon={"nfc-variant"}
        style={styles.fab}
        size="medium"
        onPress={() => setVisibleModal((state) => !state)}
      />

      <AddCardModal visible={visibleModal} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
