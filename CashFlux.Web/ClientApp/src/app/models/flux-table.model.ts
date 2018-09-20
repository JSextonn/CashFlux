/**
 * Denormalized model for flux data handling as a whole.
 */
export interface FluxTableModel {
    id: string;
    amount: number;
    source: string;
    category: string;
    timeCreated: Date;
}
