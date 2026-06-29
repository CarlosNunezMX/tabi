export const TRANSPORT_TYPE: Readonly<Record<number, string>> = {
  0: "NO_SPECIIFED",
  1: "URBAN_BUS",
  3: "TRAIN",
  29: "SITREN",
  31: "MI_MACRO_FEEDER",
  33: "MI_MACRO",
};

export type TransportValues =
  (typeof TRANSPORT_TYPE)[keyof typeof TRANSPORT_TYPE];
export function transportTypeToString(input: number): string {
  return TRANSPORT_TYPE[input] ?? TRANSPORT_TYPE[0]!;
}
