import { IGLC, stateType } from "../../types";
import getNewStateKey, { copyStructured, isTerminal } from "../../utils";

const substituteTerminals = (glc: IGLC): IGLC => {
  const copyGlc = copyStructured(glc);
  for (let s in copyGlc) {
    const arr = copyGlc[s];
    for (let state of arr) {
      let splitedState = state.split("");
      if (splitedState.length > 1) {
        for (let el of splitedState) {
          // for S -> aA like transitions
          if (isTerminal(el)) {
            // get new /already used , key from grammar
            // delete S -> aA
            // add S -> XA
            // add X -> a
            let tKey = getNewStateKey(glc, el, stateType.TERMINAL);
            copyGlc[tKey] = [el];
            const filtered = copyGlc[s].filter(
              (el:string) => el !== splitedState.join("")
            );
            splitedState[splitedState.indexOf(el)] = tKey;
            filtered.push(splitedState.join(""));
            copyGlc[s] = filtered;
          }
        }
      }
    }
  }

  return copyGlc;
};

export default substituteTerminals;
