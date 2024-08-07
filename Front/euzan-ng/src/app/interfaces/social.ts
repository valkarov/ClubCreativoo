export interface SocialInterface {
    Username:string;
    Type:string;
    Link:string;
}


export class Social implements SocialInterface{
    Username!: string;
    Type!: string;
    Link!:string;
}


export interface SocialTypeInterface {
    type:string;
}


export class SocialType implements SocialTypeInterface{
    type!: string;

}
