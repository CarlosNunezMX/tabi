import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

export default function NoCard() {
  const { t } = useTranslation();
  return (
    <View style={styles.noCards}>
      <Icon source="credit-card" size={48} />
      <Text variant="bodyLarge">{t("card.noCard")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noCards: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
