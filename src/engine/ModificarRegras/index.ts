import { IGLC } from "../../types";
import { copyStructured, isTerminal, getNewStateKey } from "../../utils";

const modificarRegras = (glc: IGLC): IGLC => {
  const copyGlc = copyStructured(glc);

  for (let s in copyGlc) {
    
    const arr = copyGlc[s];
    
    for (let rule of arr) {
      let splitedRule = rule.split("");
      if (splitedRule.length >= 2) {
        
        for (let el of splitedRule) {
          
          // A -> aA
          if (isTerminal(el)) {
            // A -> XA
            // X -> a

            let tKey = getNewStateKey(copyGlc, el);

            copyGlc[tKey] = [el];
            const filtered = copyGlc[s].filter(
              (el:string) => el !== splitedRule.join("")
            );
            splitedRule[splitedRule.indexOf(el)] = tKey;
            filtered.push(splitedRule.join(""));
            copyGlc[s] = filtered;
          }
        }
      }
    }
  }

  return copyGlc;
};

export default modificarRegras;
