export const DEVICE_TYPE: Readonly<Record<number, string>> = {
  1: "VALIDATOR",
  2: "RECHARGE_MACHINE",
  3: "ATTENTION_SERVICE",
  4: "PORTABLE_DEVICE",
  5: "SALES_POINT",
};

export type DeviceTypeValues = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];
export function deviceTypeToString(input: number): string {
  return DEVICE_TYPE[input] ?? DEVICE_TYPE[0]!;
}
