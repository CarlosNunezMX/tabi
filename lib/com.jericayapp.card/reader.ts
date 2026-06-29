import type { MiCardSession } from "./session";
import { User } from "./classes/user";
import { MiCardUtils } from "./classes/utils";
import { profileCodeToString } from "./constants/profile";
import { ServiceFile, type ServiceTypes } from "./classes/service";
import { TransitEventRecord } from "./classes/event";
import { eventTypeToString } from "./constants/eventType";
import { transportTypeToString } from "./constants/transportType";
import { deviceTypeToString } from "./constants/deviceType";
import { intToStateEnum } from "./constants/state";

export class MiCardReader {
  constructor(private session: MiCardSession) {}

  async selectApplication() {
    const command = [0x5a, 0x00, 0x40, 0x48];
    const [status] = await this.session.transceive(command);
    if (status !== 0) throw new Error("Card is not activated.");
  }

  async readWallet(): Promise<number> {
    const file = await this.session.readValue(0x9);
    return MiCardUtils.toNumber(file.data);
  }

  async readTickets(): Promise<number> {
    const file = await this.session.readValue(0x0f);
    return MiCardUtils.toNumber(file.data);
  }

  async readCredit(): Promise<number> {
    const file = await this.session.readValue(0x14);
    return MiCardUtils.toNumber(file.data);
  }

  async getServiceFile(type: ServiceTypes) {
    const query = type === "DEBIT" ? 0x08 : type === "CREDIT" ? 0x0b : 0x0e;
    const file = await this.session.readData(query);
    let buffer = new Uint8Array(file.data).buffer;
    const state = intToStateEnum(file.data[0]!);
    const week = file.data[1]!;
    const view = new DataView(buffer);
    const tripsPerWeek = view.getUint16(2, false);
    const useCount = view.getUint16(4, false);
    const lastUseRaw = Array.from(new Uint8Array(buffer.slice(7, 11)));
    const lastUsed = MiCardUtils.parseDate(lastUseRaw);
    console.log(file.data);
    console.log({
      lastUseRaw,
      lastUsed,
      useCount,
      tripsPerWeek,
      week,
      state,
    });
  }

  async getUserFile(): Promise<User> {
    const file = await this.session.readData(0x03);
    const buffer = new Uint8Array(file.data.slice(4));

    const view = new DataView(buffer.buffer);
    const profile = profileCodeToString(view.getUint8(0))!;
    const endDate = MiCardUtils.parseDate(Array.from(buffer.slice(1, 5)));

    return new User(profile, endDate);
  }

  async getEventFile() {
    const { data } = await this.session.readRecords(0x06);

    const lenght = Math.floor(data.length / 64);
    const events: TransitEventRecord[] = [];
    const view = new DataView(new Uint8Array(data).buffer);
    for (let i = 0; i < lenght; i++) {
      const offset = i * 64;
      const dateBytes = Array.from(data.slice(offset + 5, offset + 9));
      events.push(
        new TransitEventRecord(
          view.getUint16(offset, true),
          view.getUint8(offset + 2),
          view.getUint16(offset + 3, false),
          MiCardUtils.parseDate(dateBytes),
          view.getUint16(offset + 10, false),
          eventTypeToString(data[offset + 9]!),
          MiCardUtils.getUint24(view, offset + 12, false),
          view.getUint16(offset + 30, false),
          view.getUint16(offset + 32, false),
          transportTypeToString(view.getUint8(offset + 34)),
          view.getUint16(offset + 35),
          deviceTypeToString(view.getUint16(offset + 44)),
        ),
      );
    }
    return events;
  }
}
