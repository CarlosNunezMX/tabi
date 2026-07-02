import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Appbar } from "react-native-paper";

export default function SelectorAppbar() {
  const { t } = useTranslation();
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => router.back()} />
      <Appbar.Content title={t("miruta.modal.selection")} />
    </Appbar.Header>
  );
}
