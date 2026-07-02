import { ProfileValues } from "@/lib/com.jericayapp.card";

export const profiles: Record<ProfileValues, string> = {
  TARIFA_GENERAL: "Tarifa general",
  DISCAPACITADO_VISUAL: "Persona con discapacidad visual",
  DISCAPACITADO_AUDITIVO: "Persona con discapacidad auditiva",
  MUJERES: "Mujeres",
  EMPLEADO: "Empleado",
  DISCAPACITADO_ORAL: "Persona con discapacidad oral",
  NINO_5_12: "Niño de 5 a 12 años",
  ESTUDIANTE: "Estudiante",
  MAESTRO: "Maestro",
  ADULTO_MAYOR: "Adulto mayor",
  DISCAPACITADO: "Persona con discapacidad",
  SEGURIDAD: "Seguridad",
  ANIMAL_ASISTENCIA: "Animal de asistencia",
  POLICIA: "Policía",
  VISITANTE_PROVEEDOR: "Visitante / Proveedor",
  NEGOCIO: "Negocio",
  BICICLETA: "Bicicleta",
  SERVICIO_SOCIAL: "Servicio social",
  DISCAPACITADO_MENTAL: "Persona con discapacidad mental",
  DISCAPACITADO_MOTRIZ: "Persona con discapacidad motriz",
  MENOR_0_5: "Menor de 0 a 5 años",
  FAMILIAR: "Familiar",
  LIMPIEZA: "Limpieza",
  SUPERVISOR: "Supervisor",
};

export const icons: Record<ProfileValues, string> = {
  ESTUDIANTE: "school",
  DISCAPACITADO_MOTRIZ: "wheelchair-accessibility",
  MENOR_0_5: "baby-carriage",
  NINO_5_12: "account-child",
  POLICIA: "police-badge",
  NEGOCIO: "business-center",
};
