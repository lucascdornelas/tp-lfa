import { IGLC } from "../../types";
import { copyStructured, isTerminal } from "../../utils";

const geraTerminalDiretamente = (v: string, glc: IGLC) => {
  const arr = glc[v];

  for (let i = 0; i < arr.length; i++) {
    const r = arr[i];

    if ((r.length === 1 && isTerminal(r)) || r === "") {
      return true;
    }
  }

  return false;
};

const geraTerminalIndiretamente = (rules: any, glcS: IGLC): boolean => {
  let retorno = false;
  rules.forEach((rule: string) => {
    for (const v in glcS) {
      if (rule.includes(v)) {
        for (let i = 0; i < glcS[v].length; i++) {
          const ruleReplaceByV = rule.replace(v, glcS[v][i]);
          if (isTerminal(ruleReplaceByV)) {
            retorno = true;
          }
        }
      }
    }
  });

  return retorno;
};

export const removerRegrasInuteis = (glc: IGLC): IGLC => {
  const glcCopy = copyStructured(glc);
//   const glcCopy: IGLC = {
//     S: ["aS", "A", "C"],
//     A: ["a"],
//     B: ["aaD"],
//     C: ["aCD"],
//     D: ["bD", ""],
//   };
  const glcReturn: IGLC = {};

  // 1ª etapa: verificar se gera um terminal diretamente
  for (const v in glcCopy) {
    if (geraTerminalDiretamente(v, glcCopy)) {
      glcReturn[v] = [...glcCopy[v]];
    }
  }

  // 2ª etapa: verificar se gera um terminal indiretamente
  for (const v in glcCopy) {
    if (!glcReturn[v]) {
      if (geraTerminalIndiretamente(glcCopy[v], glcReturn)) {
        glcReturn[v] = [...glcCopy[v]];
      }
    }
  }

  // 3ª etapa: remove os regras de variável removida.
  for(const v in glcCopy){
    if(!glcReturn[v]){
        for(const s in glcReturn){
            let arr = glcReturn[s];
            const newArr = [];
            for(let i = 0; i < arr.length; i++){
                const rule = arr[i];
                if(!rule.includes(v)){
                    newArr.push(rule);
                }
            }

            glcReturn[s] = [...newArr];
        }
    }
  }

  return glcReturn;
};
