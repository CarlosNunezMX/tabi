import {
  ActivityIndicator,
  Chip,
  List,
  Surface,
  TouchableRipple,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { useMiRuta } from "@/context/MiRuta";
import { useTranslation } from "react-i18next";
export function MiRutaFooter() {
  const { route, loading, units } = useMiRuta();
  const { t } = useTranslation();
  return (
    <Surface style={styles.surface}>
      <TouchableRipple
        onPress={() => router.push("/(modals)/route-selector")}
        rippleColor={"rgba(255, 255, 255, .72)"}
      >
        <List.Item
          title={route ? route.ruta : t("miruta.selection")}
          description={t("miruta.data")}
          right={(props) =>
            loading ? (
              <ActivityIndicator {...props} />
            ) : (
              units && (
                <Chip icon={"bus"}>
                  {units.units.length === 0
                    ? t("miruta.noUnits")
                    : units.units.length === 1
                      ? "1 " + t("miruta.unit")
                      : units.units.length + " " + t("miruta.units")}
                </Chip>
              )
            )
          }
          left={(props) => (
            <List.Icon
              {...props}
              color={route ? route.color : undefined}
              icon={
                route && route.service === "MITREN" ? "train-variant" : "bus"
              }
            />
          )}
        ></List.Item>
      </TouchableRipple>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 4,
    margin: 16,
    borderRadius: 16,
  },
});
