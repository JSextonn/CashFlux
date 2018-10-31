import { Storable } from "./storable";

export interface CashFlux extends Storable {
    amount: number;
    profileId: string;
    sourceId: string;
    timeCreated: Date;
}
