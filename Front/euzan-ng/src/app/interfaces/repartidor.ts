export interface RepartidorInterface {
    IdDeliveryPerson: number;
    Username: string;
    Password: string;
    Firstname: string;
    Lastname: string;
    State: string;
    Province: string;
    Canton: string;
    District: string;
    Phone: string;
    Email:string;
}

export class Repartidor implements RepartidorInterface{
    IdDeliveryPerson!: number;
    Username!: string;
    Password!: string;
    Firstname!: string;
    Lastname!: string;
    State!: string;
    Province!: string;
    Canton!: string;
    District!: string;
    Phone!: string;
    Email!:string;
}
