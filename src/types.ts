type IVariable = string;
type ITerminal = string[];
type IRule = string;
type IStarter = string;

type IGLC = {
    [key: string]: Array<string>
}

enum stateType {
    TERMINAL,
    NON_TERMINAL
}

export {
    IVariable, ITerminal, IRule, IStarter, IGLC, stateType
}