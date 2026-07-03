import ThemedView from "@/components/ThemedView";

import { MiRutaFooter } from "@/components/miruta/footer";
import { useMiRuta } from "@/context/MiRuta";
import { useEffect } from "react";
import MiRutaHandler from "@/lib/MiRuta";
import { RouteShape } from "@carlosnunezmx/basutei";
import MiRutaMap from "@/components/miruta/map";
import useRoutes from "@/hooks/useRoutes";
import { useDevice } from "@/context/device-context";
import { HasNotComponent } from "@/components/has-not-component";

export default function MiRuta() {
  const { location, network, loadLocation } = useDevice();
  const { route, setLoading, setUnits, setShape } = useMiRuta();
  useRoutes();

  useEffect(() => {
    if (!route || !network) return;
    MiRutaHandler.withClient(async (client) => {
      setLoading(true);
      const units = await client.getRouteUnits(route!.id);
      const shapes = await client.getRouteShape(route!.id);
      setUnits(units[0]);
      setShape(shapes as RouteShape);
      setLoading(false);
    });
  }, [route, setLoading, setUnits, setShape, network]);

  if (!network)
    return (
      <HasNotComponent
        icon="wifi-strength-off"
        title="No network enabled!"
        description="Enable network"
      />
    );

  if (!location)
    return (
      <HasNotComponent
        icon="map-marker-off"
        title="No hay permiso para la ubicación"
        description="Por favor active la ubicación o de permisos para acceder a ella."
        tryAgain={loadLocation}
      />
    );

  return (
    <ThemedView>
      <MiRutaMap />
      <MiRutaFooter />
    </ThemedView>
  );
}
