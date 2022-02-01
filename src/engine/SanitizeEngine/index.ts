import { IRule, IStarter, ITerminal, IVariable } from "../../types";

class SanitizeEngine {
    variables: IVariable[];
    terminals: ITerminal[];
    rules: IRule[];
    starter: IStarter;

    constructor(variables: IVariable[], terminals: ITerminal[], rules: IRule[], starter: IStarter) {
        this.variables = variables;
        this.terminals = terminals;
        this.rules = rules;
        this.starter = starter;
    }

    /**
     * sanitize
     */
    public sanitize() {
        const rulesSanitize: IRule[] = this.rules;
        const variablesSanitize: IVariable[] = this.variables;

        // todo: implement method

        return[rulesSanitize, variablesSanitize];
    }

};


export {
    SanitizeEngine
}