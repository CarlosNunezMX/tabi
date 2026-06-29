const EVENT_TYPES: Readonly<Record<number, string>> = {
  0: "NO_SPECIFIED",
  1: "DISTRIBUTION",
  4: "USAGE",
  6: "RECHARGE",
  7: "TRANSFER",
  8: "REFUND",
  14: "RETURN",
  20: "EMISSION",
};
export type EventsValues = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
export function eventTypeToString(input: number): string {
  return EVENT_TYPES[input] ?? EVENT_TYPES[0]!;
}
