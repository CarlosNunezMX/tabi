import { useTranslation } from "react-i18next";
import { Dialog, Portal, Text } from "react-native-paper";

export default function AddCardModal({ visible }: { visible: boolean }) {
  const { t } = useTranslation();
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Icon icon={"nfc-variant"} size={32} />
        <Dialog.Title style={{ textAlign: "center" }}>
          {t("card.modal.title")}
        </Dialog.Title>
        <Dialog.Content>
          <Text>{t("card.modal.body")}</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
