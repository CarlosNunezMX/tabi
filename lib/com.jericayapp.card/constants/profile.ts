export const PROFILE_CODES: Readonly<Record<number, string>> = {
  0: "TARIFA_GENERAL",
  6: "DISCAPACITADO_VISUAL",
  7: "DISCAPACITADO_AUDITIVO",
  8: "MUJERES",
  9: "EMPLEADO",
  10: "DISCAPACITADO_ORAL",
  11: "NINO_5_12",
  12: "ESTUDIANTE",
  13: "MAESTRO",
  14: "ADULTO_MAYOR",
  15: "DISCAPACITADO",
  16: "SEGURIDAD",
  17: "ANIMAL_ASISTENCIA",
  21: "POLICIA",
  22: "VISITANTE_PROVEEDOR",
  23: "NEGOCIO",
  24: "BICICLETA",
  26: "SERVICIO_SOCIAL",
  27: "DISCAPACITADO_MENTAL",
  28: "DISCAPACITADO_MOTRIZ",
  29: "MENOR_0_5",
  30: "FAMILIAR",
  31: "LIMPIEZA",
  32: "SUPERVISOR",
};

export type ProfileValues = (typeof PROFILE_CODES)[keyof typeof PROFILE_CODES];

export function profileCodeToString(code: number): string {
  return PROFILE_CODES[code] ?? "DESCONOCIDO";
}
