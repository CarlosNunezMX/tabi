import nfcManager, { NfcTech, type TagEvent } from "react-native-nfc-manager";
import { FileOutput } from "./classes/fileOutput";

export class MiCardSession {
  tag: TagEvent | null = null;
  async isSupported(): Promise<boolean> {
    return (await nfcManager.isEnabled()) && (await nfcManager.isSupported());
  }
  async open() {
    await nfcManager.requestTechnology(NfcTech.IsoDep);
    this.tag = await nfcManager.getTag();
  }

  async transceive(data: number[]): Promise<number[]> {
    return nfcManager.transceive(data);
  }
  async close() {
    await nfcManager.cancelTechnologyRequest();
  }

  async readData(file: number): Promise<FileOutput> {
    let command = [0xbd, file, 0, 0, 0, 0, 0, 0];
    const buffer: number[] = [];

    while (true) {
      const response = await nfcManager.isoDepHandler.transceive(command);
      const status = response[0];
      buffer.push(...response.slice(1));
      if (status === 0) break;
      else if (status === 175) {
        command = [175];
        continue;
      }
      throw new Error(
        `Error al leer el archivo 0x${file}. Status DESFire: ${status}`,
      );
    }

    return new FileOutput(file, buffer);
  }
  async readRecords(record: number): Promise<FileOutput> {
    let command = [187, record, 0, 0, 0, 0, 0, 0];

    let buffer: number[] = [];
    while (true) {
      const response = await nfcManager.isoDepHandler.transceive(command);
      const status = response[0];

      buffer.push(...response.slice(1));

      if (status === 0) break;
      else if (status === 175) {
        command = [175];
        continue;
      }

      throw new Error(
        `Error al leer el archivo 0x${record}. Status DESFire: ${status}`,
      );
    }
    return new FileOutput(record, buffer);
  }

  async readValue(query: number): Promise<FileOutput> {
    const command = [0x6c, query];
    const response = await nfcManager.isoDepHandler.transceive(command);
    const status = response[0];
    if (status !== 0)
      throw new Error(
        `Error al leer el archivo 0x${query}. Status DESFire: ${status}`,
      );

    return new FileOutput(query, response.slice(1));
  }
  static async withSession(fn: (session: MiCardSession) => Promise<void>) {
    const session = new MiCardSession();
    try {
      await session.open();
      return await fn(session);
    } finally {
      await session.close();
    }
  }
}
