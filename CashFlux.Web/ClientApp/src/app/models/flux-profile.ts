import { Flux } from "./flux";

export interface FluxProfile {
  id: string;
  name: string;
  fluxes: Flux[];
  timeCreated: Date;
}
