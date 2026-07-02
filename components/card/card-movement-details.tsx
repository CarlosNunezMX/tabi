import { CARD_EVENT_ICON } from "@/constants/card-event";
import { ROUTE_ICONS } from "@/constants/route-icon";
import { TransitEventRecord } from "@carlosnunezmx/micard";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Chip, List } from "react-native-paper";

export default function CardMovementDetails({
  event,
}: {
  event: TransitEventRecord;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handlePress = () => setOpen((val) => !val);
  return (
    <List.Accordion
      expanded={open}
      onPress={handlePress}
      left={(props) => (
        <List.Icon {...props} icon={CARD_EVENT_ICON[event.type]} />
      )}
      right={(props) => (
        <Chip {...props}>
          {event.type === "RECHARGE"
            ? "+ "
            : event.type !== "NO_SPECIFIED"
              ? "- "
              : ""}
          {event.productPointer === "TICKETS"
            ? event.amount
            : (event.amount / 100).toFixed(2)}{" "}
          {event.productPointer === "TICKETS"
            ? t("card.bpd_trip")
            : t("card.debit_trip")}
        </Chip>
      )}
      title={t(`card.eventTypes.${event.type}`)}
    >
      <List.Item
        title={t("common.date")}
        description={event.timestamp.toLocaleString()}
        left={(props) => <List.Icon {...props} icon={"calendar"} />}
      />
      <List.Item
        title={t("common.route")}
        description={t(`card.trip_transport_type.${event.transportType}`)}
        left={(props) => (
          <List.Icon {...props} icon={ROUTE_ICONS[event.transportType]} />
        )}
      />
    </List.Accordion>
  );
}
