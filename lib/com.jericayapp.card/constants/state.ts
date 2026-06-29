export const STATE: Readonly<Record<number, string>> = {
  0: "INNACTIVE",
  1: "ACTIVE",
  2: "SUSPENDED",
};
export type STATE = (typeof STATE)[keyof typeof STATE];

export function intToStateEnum(int: number): STATE {
  return STATE[int] ?? STATE[0]!;
}
