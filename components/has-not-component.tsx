import { StyleSheet, View } from "react-native";
import { Button, Icon, IconButton, Surface, Text } from "react-native-paper";
import ThemedView from "./ThemedView";
import { useTranslation } from "react-i18next";
import GapView from "./views/GapView";

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
    <ThemedView useInsets usePaddingHorizontal>
      <Surface style={styles.surface}>
        <GapView gap={16}>
          <Icon source={icon} size={64} />
          <View>
            <Text variant="titleLarge">{title}</Text>
            <Text>{description}</Text>
          </View>

          {tryAgain && (
            <Button
              mode="contained"
              icon={(props) => <Icon {...props} source={"reload"} />}
            >
              {t("common.tryAgain")}
            </Button>
          )}
        </GapView>
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
