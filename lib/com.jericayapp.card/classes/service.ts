import type { STATE } from "../constants/state";
export type ServiceTypes = "DEBIT" | "CREDIT" | "TICKETS";
export class ServiceFile {
  constructor(
    public type: ServiceTypes,
    public state: STATE,
    public lastWeekUsed: number,
    /**
     * Contador de los viajes que ha realizado el usuario cada
     * día de la semana. Este contador nunca debe superar los valores
     * definidos en MaxViajesDíaSemana. En el caso del producto de BPD,
     * no se debe sumar un viaje si el uso del producto es considerado un transbordo
     */
    public TripsPerDayOfWeek: number,
    /**
     * Número total de usos realizados con el producto.
     * Un viaje puede incluir varios usos según el producto.
     * El producto de BPD contabiliza los transbordos como usos 42
     * del producto, sin embargo no se debitan viajes en un transbordo.
     */
    public TripsTookToday: number,
    /**
     * Fecha y hora del instante en que se realizó la última
     * validación del producto, utilizado para control del transbordo
     * solo para validaciones
     */
    public lastUsage: Date,
    /**
     * Código de identificación de la entidad en que se realizó
     * la última validación del producto, utilizado para control
     * del transbordo solo para validaciones
     */
    public lastUsageEntityId: number,
    /**
     * Ruta o Estación en que se realizó la última validación
     * del producto, utilizado para control del transbordo solo
     * para validaciones
     */
    public lastUsageRouteId: number,
    /**
     * Ruta o Estación en que se realizó la última validación
     * del producto, utilizado para control del transbordo solo
     * para validacione
     */
    public lastUsageDeviceId: number,
  ) {}
}
