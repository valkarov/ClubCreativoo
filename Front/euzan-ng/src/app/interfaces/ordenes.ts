export interface OrdenesInterface {
    IdOrder: number,
    Address: string,
    State: string,
    IdDeliveryPerson: string,
    IdClient: string
}

export class Ordenes implements OrdenesInterface {
    IdOrder!: number;
    Address!: string;
    State!: string;
    IdDeliveryPerson!: string;
    IdClient!: string;
}