import { FluxProfile } from "./flux-profile";
import { FluxSource } from "./source";

export interface User {
  id: string;
  email:string;
  firstName: string;
  lastName: string;
  profiles: FluxProfile[];
  sources: FluxSource[];
  timeCreated: Date;
}
