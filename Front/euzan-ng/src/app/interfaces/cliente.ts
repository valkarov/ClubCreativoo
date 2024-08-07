export interface ClienteInterface {
    IdClient: number;
    Username: string;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    Province: string;
    Canton: string;
    District: string;
}

export class Cliente implements ClienteInterface{
    IdClient!: number;
    Username!: string;
    Password!: string;
    Email!: string;
    FirstName!: string;
    LastName!: string;
    Phone!: string;
    Province!: string;
    Canton!: string;
    District!: string;
}