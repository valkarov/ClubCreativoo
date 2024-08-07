export interface RoleInterface {
    Username:string;
    Type:string;
}


export class Role implements RoleInterface{
    Username!: string;
    Type!: string;

}
