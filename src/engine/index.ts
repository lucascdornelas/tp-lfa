import { IGLC, } from "../types";
import { removeRegrasLambda } from "./RemoveRegasLambda";
import { removerRegrasUnitarias } from "./RemoveRegrasUnitarias";
import { removerRegrasInuteis } from "./RemoverVariaveisInuteis";
import modificarRegras from "./ModificarRegras";
import { substituirRegras } from "./SubstituirRegras";


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
        
        const glc4 = modificarRegras(glc3);
        console.log("4. modificar regras: ", glc4);

        const glc5 = substituirRegras(glc4);
        console.log("5. substitui regras: ", glc5);
    }
}

export {
    Chomsky
}