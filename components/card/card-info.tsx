import MiCard from "./card";
import CardProfile from "./card-profile";
import CardMovements from "./card-movements";
import { ScrollView } from "react-native";

export default function CardInfo() {
  return (
    <ScrollView>
      <MiCard />
      <CardProfile />
      <CardMovements />
    </ScrollView>
  );
}
