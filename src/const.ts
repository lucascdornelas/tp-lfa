// some constants
export const LAMBDA: string = '#';
export const S: string = 'P';
export const S0: string = '$';


export enum stateType {
    TERMINAL,
    NON_TERMINAL
}

export interface CFG {
    [key: string]: Array<string>
}