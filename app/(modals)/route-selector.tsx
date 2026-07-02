import Loading from "@/components/Loading";
import RouteList from "@/components/miruta/selector/routeList";
import ThemedView from "@/components/ThemedView";
import GapView from "@/components/views/GapView";
import { useMiRuta } from "@/context/MiRuta";
import MiRutaHandler from "@/lib/MiRuta";
import { Route } from "@carlosnunezmx/basutei";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";

export default function RouteSelector() {
  const { t } = useTranslation();
  const { loading, routes, setRoutes } = useMiRuta();
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState<Route[]>([]);

  useEffect(() => {
    if (routes.length !== 0) return;
    MiRutaHandler.withClient(async (client) =>
      setRoutes(await client.getRoutes()),
    );
  }, [routes, setRoutes]);
  useEffect(() => {
    if (loading) return;
    if (!value) setFiltered(routes);
    setFiltered(
      routes.filter((route) =>
        route.ruta.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  }, [routes, loading, value]);

  if (loading) return <Loading />;
  return (
    <ThemedView usePaddingHorizontal>
      <Searchbar
        placeholder={t("miruta.modal.search")}
        value={value}
        onChangeText={(val) => setValue(val)}
      />

      <ScrollView>
        <GapView>
          <RouteList
            icon="train-variant"
            title={t("miruta.modal.mi_tren")}
            routes={filtered.filter((route) => route.service === "MITREN")}
          />
          <RouteList
            icon="bus"
            title={t("miruta.modal.feeders")}
            routes={filtered.filter((route) => route.ruta.startsWith("A"))}
          />
          <RouteList
            icon="bus"
            title={t("miruta.modal.train_routes")}
            routes={filtered.filter((route) => route.ruta.startsWith("R"))}
          />
          <RouteList
            icon="bus"
            title={t("miruta.modal.airport")}
            routes={filtered
              .filter((route) => route.service === "MMA")
              .concat(
                filtered.find((route) => route.ruta.startsWith("LOP")) ?? [],
              )}
          />
        </GapView>
      </ScrollView>
    </ThemedView>
  );
}
