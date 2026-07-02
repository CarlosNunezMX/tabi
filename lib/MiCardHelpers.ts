import { TransitEventRecord } from "@carlosnunezmx/micard";

export default function ParseRoute(event: TransitEventRecord): string {
  if (event.transportType === "URBAN_BUS") {
    const bus = event.locationId.toString();
    if (bus.length % 2) return `${bus.slice(0, 1)}/${bus.slice(2, 1)}`;
  }
}
