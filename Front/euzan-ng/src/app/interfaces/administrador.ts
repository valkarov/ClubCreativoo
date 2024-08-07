export interface AdministradorInterface {
    IdAdmin:number;
    Username: string;
    Password: string;
    FirstName: string;
    LastName: string;
}

export class Administrador implements AdministradorInterface{
    IdAdmin!: number;
    Username!: string;
    Password!: string;
    FirstName!: string;
    LastName!: string;

}
