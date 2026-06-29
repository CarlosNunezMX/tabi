export class MiCardUtils {
  static toNumber(buff: number[]): number {
    return new DataView(new Uint8Array(buff).buffer).getUint32(0, true) / 100;
  }

  static parseDate(buff: number[]): Date {
    if (buff.length !== 4) return new Date(0);

    const num32 =
      (buff[0]! << 24) | (buff[1]! << 16) | (buff[2]! << 8) | buff[3]!;

    const yearOffset = (num32 >>> 25) & 0x7f; // 7 bits
    const month = (num32 >>> 21) & 0x0f; // 4 bits
    const day = (num32 >>> 16) & 0x1f; // 5 bits

    // --- HORA ---
    const hour = (num32 >>> 11) & 0x1f; // 5 bits
    const minute = (num32 >>> 5) & 0x3f; // 6 bits
    const second = (num32 & 0x1f) * 2; // 5 bits (multiplicados x2 por estándar MS-DOS)

    const finalYear = 1990 + yearOffset;
    const finalMonth = month - 1; // En JavaScript los meses son 0-11 (0=Enero, 1=Febrero)

    return new Date(finalYear, finalMonth, day, hour, minute, second);
  }

  static getUint24(view: DataView, offset: number, littleEndian: boolean) {
    const b1 = view.getUint8(offset);
    const b2 = view.getUint16(offset + 1, littleEndian);

    if (littleEndian) {
      return (b2 << 8) | b1;
    } else {
      return (b1 << 16) | b2;
    }
  }
}
