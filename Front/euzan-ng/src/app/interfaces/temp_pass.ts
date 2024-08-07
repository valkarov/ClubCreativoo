export interface TempPassInterface {
    Username:string;
    Email:string;
    Pin:number;
    State:string;
    NewPass:string;
}


export class TempPass implements TempPassInterface{
    Username!: string;
    Email!: string;
    Pin!: number;
    State!: string;
    NewPass!: string;


}