import v8 from 'v8';
import { LAMBDA, S } from '../const';
import { IGLC, stateType } from "../types";

export const copyStructured = (glc: IGLC) => {
    return v8.deserialize(v8.serialize(glc));
}

export const hasLAMBDA = (glc: IGLC): boolean => {
    for (let s in glc) {
        let arr = glc[s];
        for (let el of arr) {
            if (el === LAMBDA && s !== S) return true;
        }
    }
    return false;
};

export const removeRulesDuplicated = (glc: IGLC): IGLC => {
    const copyGlc = copyStructured(glc);
    for (let s in copyGlc) {
        let arr = copyGlc[s];
        
        copyGlc[s] = [...new Set(arr)];
    }

    return copyGlc
}

export const isTerminal = (l: string):boolean => {
    return l.toLowerCase() === l;
}

export const getNewStateKey = (glc: IGLC, combination: string, type: stateType): string => {
    // one alphabet for terminals, e.g: X -> a
    // one alphabet for NonTerminals, e.g: M: AB
    let alphabet: string;

    switch (type) {

        case stateType.TERMINAL:
            alphabet = 'XYZQ';
            // if the state with only one terminal derivation already exists 
            // return it
            for (let s in glc) {
                const arr = glc[s];
                if (arr.length === 1 && arr[0] === combination) return s;
            }
            break;

        case stateType.NON_TERMINAL:
            alphabet = 'MNIOPT';
            for (let s in glc) {
                const arr = glc[s];
                if (arr.length === 1 && arr[0] === combination) return s;
            }
            break;

    }

    // otherwise will return a new key from corresponding alphabet
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export default getNewStateKey;