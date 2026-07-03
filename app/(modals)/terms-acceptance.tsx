import ThemedView from "@/components/ThemedView";
import GapView from "@/components/views/GapView";
import { useDevice } from "@/context/device-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Divider, Icon, Surface, Text } from "react-native-paper";

export default function TermsAcceptance() {
  const { t } = useTranslation();
  const { acceptTerms } = useDevice();
  return (
    <ThemedView useInsets usePaddingHorizontal>
      <GapView gap={8}>
        <Icon source={"handshake"} size={64} />
        <Text variant="headlineSmall">{t("terms.title")}</Text>

        <Divider />
        <Surface style={{ padding: 16, marginVertical: 16 }}>
          <Text>{t("terms.body.0") + "\n"}</Text>
          <Text>{t("terms.body.1") + "\n"}</Text>
          <Text>{t("terms.body.2") + "\n"}</Text>
          <Text>{t("terms.body.3") + "\n"}</Text>
          <Text>{t("terms.body.4") + "\n"}</Text>
        </Surface>
      </GapView>
      <Button onPress={acceptTerms} mode="contained">
        {t("terms.acceptance")}
      </Button>
    </ThemedView>
  );
}
