import { Route, RouteShape, RouteUnit } from "@carlosnunezmx/basutei";
import { createContext, useContext, useMemo, useState } from "react";

interface MiRutaContextProps {
  route?: Route;
  units?: RouteUnit;
  routes: Route[];
  loading: boolean;
  shape?: RouteShape;

  setRoutes(routes: Route[]): void;
  setLoading(loading: boolean): void;
  setRoute(route: Route): void;
  setUnits(route: RouteUnit): void;
  setUnits(fn: (units: RouteUnit) => RouteUnit): void;
  setShape(shape: RouteShape): void;
}

const MiRutaContext = createContext<MiRutaContextProps | null>(null);
export function MiRutaProvider({ children }: React.PropsWithChildren) {
  const [route, setRoute] = useState<Route>();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [units, setUnits] = useState<RouteUnit>();
  const [shape, setShape] = useState<RouteShape>();
  const [loading, setLoading] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      routes,
      setRoutes,
      route,
      units,
      setRoute,
      setUnits,
      loading,
      setLoading,
      shape,
      setShape,
    }),
    [route, units, loading, shape],
  );

  return (
    <MiRutaContext.Provider value={value}>{children}</MiRutaContext.Provider>
  );
}

export const useMiRuta = () => {
  const ctx = useContext(MiRutaContext);
  if (!ctx) throw new Error("useRoute debe usarse dentro de un MiRutaProvider");
  return ctx;
};
