import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function TermsAcceptance() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(true);
  const handleDimiss = () => setVisible(false);
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Icon icon={"hand-back-right"} />
        <Dialog.Title style={{ textAlign: "center" }}>
          {t("terms.title")}
        </Dialog.Title>
        <Dialog.ScrollArea style={{ maxHeight: 200 }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingVertical: 8,
            }}
          >
            <Text>{t("terms.body.0") + "\n"}</Text>
            <Text>{t("terms.body.1") + "\n"}</Text>
            <Text>{t("terms.body.2") + "\n"}</Text>
            <Text>{t("terms.body.3") + "\n"}</Text>
            <Text>{t("terms.body.4") + "\n"}</Text>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={handleDimiss}>{t("terms.acceptance")}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
