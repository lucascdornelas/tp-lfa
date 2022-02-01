import { IRule, IStarter, ITerminal, IVariable } from "../types";
import { SanitizeEngine } from "./SanitizeEngine";


class Chomsky {
    variables: IVariable[];
    terminals: ITerminal[];
    rules: IRule[];
    starter: IStarter;

    sanitizeEngine: SanitizeEngine;
    
    constructor(variables: IVariable[], terminals: ITerminal[], rules: IRule[], starter: IStarter) {
        this.variables = variables;
        this.terminals = terminals;
        this.rules = rules;
        this.starter = starter;

        this.sanitizeEngine = new SanitizeEngine(variables, terminals, rules, starter);
    }

    private changeRules(sanitizeRules: IRule[], sanitizeVariables: IVariable[]) {
        const changedRules: IRule[] = sanitizeRules;
        const changedVariables: IVariable[] = sanitizeVariables;

        // todo: implement method

        return[changedRules, changedVariables];
    }

    private createAnswer(variables: IVariable[], terminals: ITerminal[], rules: IRule[], starter: IStarter) {
        let answer: any;
        let newVariables: any;

        // todo: implement method

        return [answer, newVariables]
    }

    /**
     * run
     */
    public run() {
        const [sRules, sVariables] = this.sanitizeEngine.sanitize();

        const [changedRules, changedVariables] = this.changeRules(sRules, sVariables);

        const [answer, newVariables] = this.createAnswer(changedVariables, this.terminals, changedRules, this.starter);

        return [newVariables, this.terminals, answer, this.starter];

    }
}