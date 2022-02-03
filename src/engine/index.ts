import { LAMBDA, S } from "../const";
import { IGLC, IRule, IStarter, ITerminal, IVariable } from "../types";
import { copyStructured, hasLAMBDA } from "../utils";
// import { SanitizeEngine } from "./SanitizeEngine";


class Chomsky {
    glc: IGLC;

    // sanitizeEngine: SanitizeEngine;
    
    constructor(glc: IGLC) {
        this.glc = glc;
    }

    private makeCombinations = (s: Array<string>, nullState: string): Array<string> => {

        const res: string[] = [];
        const idxs: number[] = [];

        console.log("0: ",res);
    
        for (let i = 0; i < s.length; i++) {
            if (s[i] === nullState) idxs.push(i);
        }
    
        for (let i = 0; i < idxs.length; i++) {
            const newS = s.filter((el, j) => j !== idxs[i]);
            res.push(newS.join(''));
        }

        console.log("1: ",res);
    
        const lastS = [...s];
        for (let i = 0; i < idxs.length; i++) {
            delete lastS[idxs[i]];
        }
    
        lastS.filter(el => el);
        res.push(lastS.join(''));

        console.log("3: ",res);
    
        return res;
    };

    private updateNull = (grammar: IGLC, nullState: string): IGLC => {

        let glc = copyStructured(grammar);

        for (let s in glc) {
    
            let arr = glc[s];
            for (let i = 0; i < arr.length; i++) {
    
                const state = arr[i];
                let splitedState = state.split('');
    
                if (splitedState.includes(nullState)) {
    
                    if (splitedState.length === 1) {
                        // S -> A and A -> LAMBDA
                        if (s === S) console.log(`\x1b[33m \n ${S} -> ${LAMBDA} will not be included in next table! \x1b[0m`);
                        // A -> C and C -> LAMBDA, will add A -> LAMBDA
                        else glc[s].push(LAMBDA);
                    }
    
                    // S -> Aa and A -> LAMBDA, will add S -> a
                    if (splitedState.length === 2) {
                        const state = splitedState.filter((el: string) => el !== nullState);
                        if(state.length){
                            glc[s].push(state.join(''));
                        }
                    }
    
                    if (splitedState.length > 2) {
                        let count = 0;
                        splitedState.map((el: string) => { if (el === nullState) count++; });
    
                        // S -> ACC || S -> CAC || S -> CCA and A -> LAMBDA
                        // will add S -> CC for all cases
                        if (count === 1) {
                            const state = splitedState.filter((el: string) => el !== nullState);
                            if(state.length){
                                glc[s].push(state.join(''));
                            }
                        }
    
                        // S -> ABA and A -> LAMBDA, will add S -> AB | BA | B
                        else {
                            const newCombinations: Array<string> = this.makeCombinations(splitedState, nullState);
                            glc[s] = [...glc[s], ...newCombinations];
                        }
    
                    }
    
                }
    
            }
    
        }
    
        if (hasLAMBDA(glc)) {
            return this.removeRegrasLambda(glc);
        }

        console.log("removeNulls: ", glc);
    
        return glc;
    };

    private removeRegrasLambda(glc: IGLC) {
        let glcCopy = copyStructured(glc);
        for (let s in glcCopy) {

            
            let arr = glcCopy[s];
            for (let i = 0; i < arr.length; i++) {
                
                if (arr[i] === LAMBDA) {
                    glcCopy[s] = glcCopy[s].filter((el: string) => el !== LAMBDA);
                    return this.updateNull(glcCopy, s);
                }

            }

        }

        return glcCopy;
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
        const glc1 = this.removeRegrasLambda(this.glc);

        console.log(glc1);

    }
}

export {
    Chomsky
}