import { CARD_EVENT_ICON } from "@/constants/card-event";
import { useMiCard } from "@/context/MiCard";
import { useTranslation } from "react-i18next";
import { Chip, List, Surface } from "react-native-paper";
import CardMovementDetails from "./card-movement-details";

export default function CardMovements() {
  const { t } = useTranslation();
  const { events } = useMiCard();
  return (
    <Surface style={{ marginBottom: 32 }}>
      <List.Section title={t("card.history")}>
        {events!.toReversed().map((event, i) => {
          return <CardMovementDetails key={i} event={event} />;
        })}
      </List.Section>
    </Surface>
  );
}
