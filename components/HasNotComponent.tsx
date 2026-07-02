import { StyleSheet, View } from "react-native";
import { Button, Icon, IconButton, Surface, Text } from "react-native-paper";
import ThemedView from "./ThemedView";
import { useTranslation } from "react-i18next";

interface HasNotComponentProps {
  icon: string;
  tryAgain?: () => void;
  title: string;
  description: string;
}
export function HasNotComponent({
  description,
  icon,
  title,
  tryAgain,
}: HasNotComponentProps) {
  const { t } = useTranslation();
  return (
    <ThemedView>
      <Surface style={styles.surface}>
        <Icon source={icon} size={64} />
        <View>
          <Text variant="titleLarge">{title}</Text>
          <Text>{description}</Text>
        </View>

        {tryAgain && <Button>{t("common.tryAgain")}</Button>}
      </Surface>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: 16,
    margin: 16,
    gap: 8,
  },
});
