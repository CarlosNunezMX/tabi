import { useDevice } from "@/context/device-context";
import { useMiRuta } from "@/context/MiRuta";
import MiRutaHandler from "@/lib/MiRuta";
import { useEffect } from "react";

export default function useRoutes() {
  const { setRoutes, setLoading } = useMiRuta();
  const { network } = useDevice();

  useEffect(() => {
    if (!network) return;
    MiRutaHandler.withClient(async (client) => {
      setLoading(true);
      const _routes = await client.getRoutes();
      setRoutes(_routes);
      setLoading(false);
    });
  }, [setRoutes, setLoading, network]);
}
