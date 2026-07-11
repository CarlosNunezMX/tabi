import { useMiRuta } from "@/context/MiRuta";
import MiRutaHandler from "@/lib/MiRuta";
import { UnitSSE } from "@carlosnunezmx/basutei";
import Mapbox, {
  Camera,
  LineLayer,
  LocationPuck,
  MapView,
  PointAnnotation,
  ShapeSource,
} from "@rnmapbox/maps";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Icon, Surface, useTheme } from "react-native-paper";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN!);

export default function MiRutaMap() {
  const { shape, route, setUnits, units } = useMiRuta();
  const [es, setEs] = useState<UnitSSE>();
  const schema = useColorScheme();
  const { colors } = useTheme();

  useEffect(() => {
    if (!route) return;
    MiRutaHandler.withClient(async (client) => {
      const es = client.getRouteStream(route.id);
      console.log(es);
      setEs(es);
    });
  }, [setUnits, route]);

  useEffect(() => {
    if (!es) return;
    console.log(es);
    es.on("units", (units) => {
      setUnits((u) => ({ ...u, units: units }));
    });

    return es.destroy();
  }, [es, setUnits]);
  const style =
    schema === "dark"
      ? "mapbox://styles/mapbox/dark-v11"
      : "mapbox://styles/mapbox/standard";

  return (
    <MapView styleURL={style} style={{ flex: 1 }}>
      <Camera
        defaultSettings={{
          centerCoordinate: [-103.349, 20.6597],
          zoomLevel: 16 
        }}
        followZoomLevel={16} 
        followUserLocation 
      />
      <LocationPuck
        puckBearingEnabled
        puckBearing="course"
        pulsing={{ isEnabled: true }}
      />
      {shape && (
        <ShapeSource
          id="route-source"
          shape={{
            type: "Feature",
            properties: {},
            geometry: {
              type: "MultiLineString",
              coordinates: shape.lines.map((line) =>
                line.map(([lat, lon]) => [lon, lat]),
              ),
            },
          }}
        >
          <LineLayer
            id="route-layer"
            style={{
              lineColor: route?.color ?? colors.primary,
              lineWidth: 5,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        </ShapeSource>
      )}
      {units &&
        units.units.map((unit, i) => (
          <PointAnnotation
            coordinate={[unit.longitud, unit.latitud]}
            id={`pnt-${i}`}
            key={i.toString()}
          >
            <Surface
              style={{
                borderRadius: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon source={"bus"} size={32} />
            </Surface>
          </PointAnnotation>
        ))}
      )
    </MapView>
  );
}
