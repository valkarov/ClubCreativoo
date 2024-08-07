export interface PreguntaInterface {
    IdQuestion: number;
    Question1: string;
    Answer: string;

}


export class Pregunta implements PreguntaInterface{
    IdQuestion!: number;
    Question1!: string;
    Answer!: string;
    
}
