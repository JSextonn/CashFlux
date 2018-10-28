import { Storable } from './storable';

export interface FluxProfile extends Storable {
  name: string;
  timeCreated: Date;
}
