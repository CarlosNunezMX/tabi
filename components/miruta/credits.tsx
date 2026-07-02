import { useTranslation } from "react-i18next";
import { Dialog, Portal, Text } from "react-native-paper";

interface CreditsProps {
  visible: boolean;
  dismiss(): void;
}

export default function Credits({ dismiss, visible }: CreditsProps) {
  const { t } = useTranslation();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={dismiss}>
        <Dialog.Icon icon="license" />
        <Dialog.Title style={{ textAlign: "center" }}>
          {t("miruta.credits.title")}
        </Dialog.Title>
        <Dialog.Content style={{ gap: 8 }}>
          <Text>{t("miruta.credits.warn")}</Text>

          <Text>
            {t("miruta.credits.licenses")}github.com/CarlosNunezMX/basutei
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
