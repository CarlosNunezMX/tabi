import { useMiRuta } from "@/context/MiRuta";
import { Route } from "@carlosnunezmx/basutei";
import { router } from "expo-router";
import { useState } from "react";
import { List, Surface } from "react-native-paper";

interface RouteListProps {
  routes: Route[];
  icon: string;
  title: string;
}

export default function RouteList({ routes, title, icon }: RouteListProps) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const handlePress = () => setExpanded(!expanded);
  const { setRoute } = useMiRuta();
  const handleClick = (item: Route) => {
    setRoute(item);
    router.back();
  };
  return (
    <Surface>
      <List.Accordion
        left={(props) => <List.Icon {...props} icon={icon} />}
        expanded={expanded}
        onPress={handlePress}
        title={title}
      >
        {routes.map((item) => (
          <List.Item
            key={item.id}
            onPress={() => handleClick(item)}
            title={item.ruta}
            left={(props) => (
              <List.Icon {...props} color={item.color} icon={icon} />
            )}
          />
        ))}
      </List.Accordion>
    </Surface>
  );
}
