import { LAMBDA, S } from "../const";
import { IGLC, IRule, IStarter, ITerminal, IVariable } from "../types";
import { copyStructured, hasLAMBDA, removeRulesDuplicated } from "../utils";
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

    
        for (let i = 0; i < s.length; i++) {
            if (s[i] === nullState) idxs.push(i);
        }
    
        for (let i = 0; i < idxs.length; i++) {
            const newS = s.filter((el, j) => j !== idxs[i]);
            res.push(newS.join(''));
        }

    
        const lastS = [...s];
        for (let i = 0; i < idxs.length; i++) {
            delete lastS[idxs[i]];
        }
    
        lastS.filter(el => el);
        res.push(lastS.join(''));

    
        return res;
    };

    private updateNullRules = (grammar: IGLC, nullState: string): IGLC => {

        let glc = copyStructured(grammar);

        for (let s in glc) {
    
            let arr = glc[s];
            for (let i = 0; i < arr.length; i++) {
    
                const state = arr[i];
                let splitedState = state.split('');
                
    
                if (splitedState.includes(nullState)) {
    
                    if (splitedState.length === 1) {
                        // A -> B, A != P (P pode ter #)
                        // B -> #
                        if (s !== S) {
                            glc[s].push(LAMBDA);
                        }
                    }
    
                    if (splitedState.length === 2) {
                        // S -> Aa ====> S -> Aa | a
                        // A -> # 

                        // A -> BB ====> S -> BB | B | #
                        // B -> # 
                        const state = splitedState.filter((el: string) => el !== nullState);

                        switch (state.length) {
                            case 1:
                                glc[s].push(state.join(''));
                                break;
                            case 0:
                                glc[s].push(splitedState[0]);
                                break;
                        }
                    }
    
                    if (splitedState.length > 2) {
                        let count = 0;
                        splitedState.map((el: string) => { if (el === nullState) count++; });
    
                        if (count === 1) {
                            const state = splitedState.filter((el: string) => el !== nullState);
                                glc[s].push(state.join(''));
                        }
    
                        else {
                            const newCombinations: Array<string> = this.makeCombinations(splitedState, nullState);
                            glc[s] = [...glc[s], ...newCombinations];
                        }
    
                    }
    
                }
    
            }
    
        }

        glc = removeRulesDuplicated(glc);

    
        if (hasLAMBDA(glc)) {
            return this.removeRegrasLambda(glc);
        }

    
        return glc;
    };

    private removeRegrasLambda(glc: IGLC) {
        let glcCopy = copyStructured(glc);
        for (let s in glcCopy) {

            
            let arr = glcCopy[s];

            
            for (let i = 0; i < arr.length; i++) {
                
                if (arr[i] === LAMBDA) {
                    glcCopy[s] = glcCopy[s].filter((el: string) => el !== LAMBDA);
                    return this.updateNullRules(glcCopy, s);
                }

            }

        }

        return glcCopy;
    }

    /**
     * run
     */
    public run() {
        const glc1 = this.removeRegrasLambda(this.glc);

        console.log("1. remove regras lambda: ", glc1);
    }
}

export {
    Chomsky
}