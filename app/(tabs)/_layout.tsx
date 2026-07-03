import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";

import TabBar from "@/components/TabBar";
import { Icon } from "react-native-paper";
import MiRutaAppbar from "@/components/miruta/appbar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Mi Pasaje",
          tabBarIcon: ({ color }) => (
            <Icon source="nfc-variant" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="miruta"
        options={{
          header: () => <MiRutaAppbar />,
          title: "Mi Ruta",
          tabBarIcon: ({ color }) => (
            <Icon source="bus" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
