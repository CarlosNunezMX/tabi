import type { DeviceTypeValues } from "../constants/deviceType";
import type { EventsValues } from "../constants/eventType";
import type { TransportValues } from "../constants/transportType";

export class TransitEventRecord {
  constructor(
    public productId: number, // 2 bytes - Identifies the product used (wallet, student pass, credit)
    public productPointer: number, // 1 byte - Internal pointer to the product contract file

    public companyId: number, // 2 bytes - Identifies the carrier company (SITEUR, bus alliance)

    public timestamp: Date, // 4 bytes - Compressed timestamp (MS-DOS/SFINX format)
    public amount: number, // 2 bytes - Amount deducted in cents (950 = $9.50 MXN)

    public type: EventsValues, // 1 byte - Event type (issuance, recharge, validation, refund)
    public tripNumber: number, // 3 bytes - Consecutive event number in the card's lifetime
    public deviceId: number, // 2 bytes - Validator/device ID (economical number)

    public locationId: number, // 2 bytes - Station or point-of-sale ID
    public transportType: TransportValues, // 1 byte - Technical variant of the transport mode
    public referenceId: number, // 2 bytes - Additional reference for internal grouping

    public deviceType: DeviceTypeValues,
  ) {}
}
