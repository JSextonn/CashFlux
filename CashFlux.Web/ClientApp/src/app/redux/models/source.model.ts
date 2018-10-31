import { Storable } from "./storable";

export interface FluxSource extends Storable {
    name: string;
    category: string;
    timeCreated: Date;
}
