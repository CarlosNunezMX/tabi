import ThemedView from "@/components/ThemedView";

import { MiRutaFooter } from "@/components/miruta/footer";
import { useMiRuta } from "@/context/MiRuta";
import { useEffect } from "react";
import MiRutaHandler from "@/lib/MiRuta";
import { RouteShape } from "@carlosnunezmx/basutei";
import MiRutaMap from "@/components/miruta/map";
import useRoutes from "@/hooks/useRoutes";

export default function MiRuta() {
  const { route, setLoading, setUnits, setShape } = useMiRuta();
  useRoutes();

  useEffect(() => {
    if (!route) return;
    MiRutaHandler.withClient(async (client) => {
      setLoading(true);
      const units = await client.getRouteUnits(route!.id);
      const shapes = await client.getRouteShape(route!.id);
      setUnits(units[0]);
      setShape(shapes as RouteShape);
      setLoading(false);
    });
  }, [route, setLoading, setUnits, setShape]);
  return (
    <ThemedView>
      <MiRutaMap />
      <MiRutaFooter />
    </ThemedView>
  );
}
