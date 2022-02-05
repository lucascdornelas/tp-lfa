import { IGLC } from "../../types";
import { copyStructured, isTerminal, removeRulesDuplicated } from "../../utils";

// se algum estado derivar outro não terminal retorne true
const temUmEstadoTerminal = (glc: IGLC):boolean => {
    for (let s in glc) {
        const arr = glc[s];
        for (let state of arr) {
            const splited = state.split('');
            if (splited.length === 1 && !isTerminal(splited[0])) {
                return true;
            }
        }

    }
    return false;
}

export const removerRegrasUnitarias = (glc: IGLC): IGLC => {
  const glcCopy = copyStructured(glc);

  // P -> P 
  for (let v in glcCopy) {
    const arr = glcCopy[v];
    if (arr.includes(v)) glcCopy[v] = glcCopy[v].filter((el:string) => el !== v);
  }

  for (let v in glcCopy) {
    const arr = glcCopy[v];
    for (let state of arr) {
      const splitedState = state.split("");

      
      // P -> A
      if (splitedState.length === 1 && !isTerminal(splitedState[0])) {
        // substitua com tudo o que A deriva e remova A da transição S
        const substitute = glcCopy[splitedState[0]];
        glcCopy[v] = glcCopy[v].filter((el:string) => el !== splitedState[0]);
        glcCopy[v] = [...glcCopy[v], ...substitute];
      }
    }
  }

  // verifique as transições de um estado e atualize
  if (temUmEstadoTerminal(glcCopy)) {
    return removerRegrasUnitarias(glcCopy);
  }

  return removeRulesDuplicated(glcCopy);
};
