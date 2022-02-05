import { IGLC, } from "../types";
import { removeRegrasLambda } from "./RemoveRegasLambda";
import { removerRegrasUnitarias } from "./RemoveRegrasUnitarias";


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
    }
}

export {
    Chomsky
}