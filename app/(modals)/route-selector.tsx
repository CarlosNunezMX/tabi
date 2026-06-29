import Loading from "@/components/Loading";
import RouteList from "@/components/miruta/selector/routeList";
import ThemedView from "@/components/ThemedView";
import GapView from "@/components/views/GapView";
import { useMiRuta } from "@/context/MiRuta";
import { Route } from "@carlosnunezmx/basutei";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";

export default function RouteSelector() {
  const { loading, routes } = useMiRuta();
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState<Route[]>([]);

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
        placeholder="Busca alguna ruta..."
        value={value}
        onChangeText={(val) => setValue(val)}
      />

      <ScrollView>
        <GapView>
          <RouteList
            icon="train-variant"
            title="Mi Tren"
            routes={filtered.filter((route) => route.service === "MITREN")}
          />
          <RouteList
            icon="bus"
            title="Alimentadoras"
            routes={filtered.filter((route) => route.ruta.startsWith("A"))}
          />
          <RouteList
            icon="bus"
            title="Mi Transporte - Tren Lígero"
            routes={filtered.filter((route) => route.ruta.startsWith("R"))}
          />
          <RouteList
            icon="bus"
            title="Mi Macro Aeropuerto"
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
