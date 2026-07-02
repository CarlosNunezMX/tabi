import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { addNetworkStateListener } from "expo-network";
import { requestForegroundPermissionsAsync } from "expo-location";
import { MiCardSession } from "@carlosnunezmx/micard";

interface DeviceContextProps {
  network: boolean;
  nfc: boolean;
  loadNfc: () => Promise<void>;
  loadLocation: () => Promise<void>;
  location: boolean;
}

export const DeviceContext = createContext<DeviceContextProps | null>(null);
export default function DeviceProvider({ children }: React.PropsWithChildren) {
  const [network, setNetwork] = useState<boolean>(true);
  const [nfc, setNfc] = useState<boolean>(true);
  const [location, setLocation] = useState<boolean>(true);

  const loadLocation = useCallback(async () => {
    let { status } = await requestForegroundPermissionsAsync();
    setLocation(status === "granted");
  }, [setLocation]);

  const loadNfc = useCallback(async () => {
    const session = new MiCardSession();
    setNfc(await session.isSupported());
  }, [setNfc]);

  useEffect(() => {
    // add network listener
    const sub = addNetworkStateListener((event) => {
      setNetwork(!!event.isConnected);
    });
    loadLocation();
    loadNfc();

    // clean up
    return sub.remove();
  }, [setNetwork, loadLocation, loadNfc]);

  const value = useMemo(
    () => ({
      nfc,
      network,
      location,
      loadLocation,
      loadNfc,
    }),
    [nfc, network, location, loadLocation, loadNfc],
  );

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

export function useDevice() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useRoute debe usarse dentro de un DeviceProvider");
  return ctx;
}
