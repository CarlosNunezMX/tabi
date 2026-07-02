import { useMiCard } from "@/context/MiCard";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
export default function MiCard() {
  const { uid } = useMiCard();
  return (
    <View style={styles.cardView}>
      <View style={styles.cardImageContainer}>
        <CardImage src={require("@/assets/images/micard/agave.webp")} />
        <CardImage src={require("@/assets/images/micard/catedral.webp")} />
      </View>
      <View style={styles.logoView}>
        <Image source={require("@/assets/images/micard/logo_jalisco.png")} />
      </View>
      <View style={styles.cardImageContainer}>
        <CardImage src={require("@/assets/images/micard/ciudad.webp")} />
        <CardImage src={require("@/assets/images/micard/mariachi.webp")} />
      </View>
      <View style={styles.cardUidContainer}>
        <Text style={{ fontWeight: "bold", color: "#fff" }}>{uid}</Text>
      </View>
    </View>
  );
}

const CardImage = ({ src }: { src: ImageSourcePropType }) => (
  <Image source={src} style={styles.cardImage} width={96} height={96} />
);

const styles = StyleSheet.create({
  logoView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008399",
    width: 128,
  },
  cardUidContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    bottom: 15,
  },
  cardImage: {
    maxWidth: 128,
    borderRadius: 8,
  },
  cardImageContainer: {
    paddingVertical: 8,
    alignItems: "center",
    flex: 1,
    display: "flex",
    gap: 8,
    flexDirection: "column",
  },
  cardView: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 5,
    gap: 8,
    flexDirection: "row",
    marginBottom: 16,
  },
});
