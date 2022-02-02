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

    private containRuleLambda(rule: IRule, rulesWithLambda: IRule[]) {
        // "asdada".includes()
        // rule[1].forEach(symbol => {
        //     return rulesWithLambda.includes(symbol)
        // });

        return undefined;
    }

    private removeLambda() {
        const rulesWithLambda:IRule[] = [];
        this.rules.forEach(rule => {
            if(rule[1] === "#"){
                rulesWithLambda.push(rule[0]);
            }
        });

        const rulesWithLambdaCopy:IRule[] = [...rulesWithLambda];
        while (true) {
            const lengthLambdaOld = rulesWithLambdaCopy.length;
            this.rules.forEach(rule => {
                if(this.containRuleLambda(rule, rulesWithLambdaCopy))
                return undefined;
            });
        }


        console.log("rules with lambda: ", rulesWithLambda);

    }

    /**
     * sanitize
     */
    public sanitize() {
        const rulesSanitize: IRule[] = this.rules;
        const variablesSanitize: IVariable[] = this.variables;

        // todo: implement method
        this.removeLambda();

        return[rulesSanitize, variablesSanitize];
    }

};


export {
    SanitizeEngine
}