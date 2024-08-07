export interface ProvinciaInterface {
    Name: string;
}

export class Province implements ProvinciaInterface{
    Name!:string
}

export interface DistritoInterface {
    Name: string;
    Canton: string;
}

export class Distrito implements DistritoInterface{
    Name!: string;
    Canton!: string;
}


export interface CantonInterface {
    Name: string;
    Province: string;
}

export class Canton implements CantonInterface{
    Name!: string;
    Province!: string;
}