import { IGLC, } from "../types";
import { RemoveRegrasLambda } from "./RemoveRegasLambda";


class Chomsky {
    glc: IGLC;
    fase1: RemoveRegrasLambda;
    
    constructor(glc: IGLC) {
        this.glc = glc;

        this.fase1 = new RemoveRegrasLambda();
    }

    /**
     * run
     */
    public run() {
        const glc1 = this.fase1.removeRegrasLambda(this.glc);

        console.log("1. remove regras lambda: ", glc1);
    }
}

export {
    Chomsky
}