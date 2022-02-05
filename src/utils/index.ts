import v8 from 'v8';
import { LAMBDA, S } from '../const';
import { IGLC } from "../types";

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