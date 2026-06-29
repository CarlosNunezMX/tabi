import { MiRutaClient } from "@carlosnunezmx/basutei";
import { fetch as expoFetch } from "expo/fetch";
export default class MiRutaHandler {
  static async withClient(fn: (client: MiRutaClient) => Promise<void>) {
    // @ts-ignore
    const client = await new MiRutaClient(expoFetch).auth();
    await fn(client);
  }
}
