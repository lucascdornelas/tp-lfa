import v8 from "v8";
import { LAMBDA, S } from "../const";
import { IGLC } from "../types";

export const copyStructured = (glc: IGLC) => {
  return v8.deserialize(v8.serialize(glc));
};

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

  return copyGlc;
};

export const isTerminal = (l: string): boolean => {
  return l.toLowerCase() === l;
};

const getVariables = (glc: IGLC) => {
    const variables = [];
    for (const v in glc) {
        variables.push(v);
    }
    return variables;
}

export const getNewStateKey = (glc: IGLC, combination: string): string => {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // nova proxima chave
  let t = "";
  const variables = getVariables(glc);
  for (let i = 0; i < alphabet.length; i++) {
      const v = alphabet[i];
      if(!variables.includes(v)){
        t = v;
        i = alphabet.length;
      }
  }

  // se a regra com apenas uma derivação terminal
  for (let s in glc) {
    const arr = glc[s];
    if (arr.length === 1 && arr[0] === combination) t = s;
  }

  return t;
};

export const getNewTerminal = (glc: IGLC) => {
  const alphabet = "ABCDEFGHIJK";
  const splitedAlphabet = alphabet.split("");

  const terminals = Object.keys(glc);

  for (const s in splitedAlphabet) {
    if (!terminals.includes(s)) {
      return s;
    }
  }

  return splitedAlphabet[0];
};

export const hasMultipleNonTerminalTransitions = (glc: IGLC): boolean => {
    for (let s in glc) {
        const arr = glc[s];
        for (let state of arr) {
            let splitedState = state.split('');
            if (splitedState.length > 2) return true;
        }
    }
    return false;
};