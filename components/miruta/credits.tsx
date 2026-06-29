import { Dialog, Portal, Text } from "react-native-paper";

interface CreditsProps {
  visible: boolean;
  dismiss(): void;
}

export default function Credits({ dismiss, visible }: CreditsProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={dismiss}>
        <Dialog.Icon icon="license" />
        <Dialog.Title style={{ textAlign: "center" }}>Creditos</Dialog.Title>
        <Dialog.Content style={{ gap: 8 }}>
          <Text>
            Datos obtenidos de la plataforma oficial de SITEUR, sin afiliación
            con esta ultima, consulte las fuentes oficiales en
            miruta.siteur.gob.mx
          </Text>

          <Text>
            Para la comunicación con Mi Ruta se usa un modúlo de código abierto
            con Licencía GPLv3, de consulta abierta en Github
            (CarlosNunezMX/basutei)
          </Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
