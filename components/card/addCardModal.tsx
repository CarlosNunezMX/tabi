import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";

export default function AddCardModal({
  visible,
  onDimiss,
}: {
  visible: boolean;
  onDimiss: () => void;
}) {
  const theme = useTheme();
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Icon icon={"nfc-variant"} size={32} />
        <Dialog.Title style={{ textAlign: "center" }}>
          Acerca tu tarjeta
        </Dialog.Title>
        <Dialog.Content>
          <Text>
            Para leer o agregar una tarjeta, acerca tu tarjeta a tu dispositivo
            y mantiene hasta que esta ventana se cierre
          </Text>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onDimiss} textColor={theme.colors.error}>
            Cancelar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
