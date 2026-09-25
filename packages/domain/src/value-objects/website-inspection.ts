/** Resultado bruto da inspeção de um site, produzido por um WebsiteInspector. */
export interface WebsiteInspection {
  reachable: boolean;
  httpStatus: number | null;
  finalUrl: string | null;
  usesHttps: boolean;
  hasViewportMeta: boolean;
}
