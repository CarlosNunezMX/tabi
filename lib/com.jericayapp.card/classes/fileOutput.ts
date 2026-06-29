export class FileOutput {
  constructor(
    public file: number,
    public data: number[],
  ) {}

  toString(): string {
    return (
      this.data
        // @ts-ignore
        .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
        .join(" ")
    );
  }
}
