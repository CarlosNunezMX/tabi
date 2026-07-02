import {
  MiCardReader,
  MiCardSession,
  ServiceFile,
  TransitEventRecord,
  User,
} from "@carlosnunezmx/micard";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface MiCardContextProps {
  uid?: string;
  user?: User;
  events?: TransitEventRecord[];
  serviceBpd?: ServiceFile;
  isReading: boolean;
  error?: string;
  wallet?: number;
  bpd?: number;

  readCard(reader: MiCardReader): Promise<void>;
}

export const MiCardContext = createContext<MiCardContextProps | null>(null);

export function MiCardProvider({ children }: React.PropsWithChildren) {
  const [uid, setUid] = useState<string>();
  const [user, setUser] = useState<User>();
  const [events, setEvents] = useState<TransitEventRecord[]>([]);
  const [serviceBpd, setServiceBpd] = useState<ServiceFile>();
  const [wallet, setWallet] = useState<number>();
  const [bpd, setBpd] = useState<number>();
  const [error, setError] = useState<string>();
  const [isReading, setIsReading] = useState(false);

  const readCard = useCallback(async (reader: MiCardReader) => {
    try {
      setError(undefined);
      setIsReading(true);
      await reader.selectApplication();
      setUid(reader.getUid());
      setUser(await reader.getUserFile());
      setEvents(await reader.getEventFile());
      setWallet(await reader.readWallet());
      setBpd(await reader.readTickets());
      setServiceBpd(await reader.getServiceFile("TICKETS"));
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("Ocurrío un error al leer su tarjeta Mi Movilidad");
    } finally {
      setIsReading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      readCard,
      user,
      serviceBpd,
      isReading,
      error,
      bpd,
      events,
      uid,
      wallet,
    }),
    [user, isReading, error, bpd, events, uid, wallet, readCard, serviceBpd],
  );
  return (
    <MiCardContext.Provider value={value}>{children}</MiCardContext.Provider>
  );
}

export const useMiCard = () => {
  const ctx = useContext(MiCardContext);
  if (!ctx) throw new Error("useRoute debe usarse dentro de un MiCardProvider");
  return ctx;
};
