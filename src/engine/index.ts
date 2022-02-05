import { IGLC, } from "../types";
import { removeRegrasLambda } from "./RemoveRegasLambda";
import { removerRegrasUnitarias } from "./RemoveRegrasUnitarias";
import { removerRegrasInuteis } from "./RemoverVariaveisInuteis";
import substituteTerminals from "./SubstituiTerminais";


class Chomsky {
    glc: IGLC;
    
    constructor(glc: IGLC) {
        this.glc = glc;
    }

    /**
     * run
     */
    public run() {
        const glc1 = removeRegrasLambda(this.glc);
        console.log("1. remove regras lambda: ", glc1);
        
        const glc2 = removerRegrasUnitarias(glc1);
        console.log("2. remove regras unitarias: ", glc2);

        const glc3 = removerRegrasInuteis(glc2);
        console.log("3. remove regras inuteis: ", glc3);
        
        // const glc4 = substituteTerminals(glc2);
        // console.log("4. substitui terminal: ", glc4);
    }
}

export {
    Chomsky
}