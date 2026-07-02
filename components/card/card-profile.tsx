import { icons, profiles } from "@/constants/profiles";
import { useMiCard } from "@/context/MiCard";
import { useTranslation } from "react-i18next";
import { List, Surface } from "react-native-paper";

export default function CardProfile() {
  const { user, bpd, wallet } = useMiCard();
  const { t } = useTranslation();
  return (
    <Surface style={{ marginBottom: 16 }}>
      <List.Section title={t("card.profile")}>
        {bpd && (
          <List.Item
            title={t("card.tickets")}
            left={(props) => <List.Icon {...props} icon={"ticket"} />}
            description={`${bpd * 100} ${t("card.tickets")}`}
          />
        )}
        <List.Item
          title={t("card.balance")}
          description={`${wallet?.toFixed(2)} MXN`}
          left={(props) => <List.Icon {...props} icon={"cash"} />}
        />
        <List.Item
          title={t("card.profiles")}
          description={profiles[user!.profile]}
          left={(props) => <List.Icon {...props} icon={icons[user!.profile]} />}
        />
        <List.Item
          title={t("card.validAt")}
          description={user!.endDate.toLocaleString()}
          left={(props) => <List.Icon {...props} icon={"clock"} />}
        />
      </List.Section>
    </Surface>
  );
}
