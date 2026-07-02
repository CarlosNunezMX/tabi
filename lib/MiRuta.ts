import { MiRutaClient } from "@carlosnunezmx/basutei";
import EventSource from "react-native-sse";
export default class MiRutaHandler {
  static async withClient(fn: (client: MiRutaClient) => Promise<void>) {
    // @ts-ignore
    const client = await new MiRutaClient(EventSource).auth();
    await fn(client);
  }
}
