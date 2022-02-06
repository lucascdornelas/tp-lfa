import { IGLC } from "../../types";
import {
  copyStructured,
  getNewStateKey,
  hasMultipleNonTerminalTransitions,
} from "../../utils";

export const substituirRegras = (glc: IGLC): IGLC => {
  const copyGlc = copyStructured(glc);

  for (let s in copyGlc) {
    const rules = glc[s];
    for (let index in rules) {
      const rule = rules[index];
      const splitedRule = rule.split("");
      if (splitedRule.length >= 3) {
        const lastTwo = splitedRule.slice(-2, splitedRule.length).join("");
        const rest = splitedRule.slice(0, splitedRule.length-2);

        const newKey = getNewStateKey(copyGlc, lastTwo);
        const filtered = copyGlc[s].filter(
          (el: string) => el !== splitedRule.join("")
        );

        const item = rest.join("") + newKey;
        filtered.push(item);
        copyGlc[newKey] = [lastTwo];
        copyGlc[s] = filtered;
      }
    }
  }

  if (hasMultipleNonTerminalTransitions(copyGlc)) {
    return substituirRegras(copyGlc);
  }

  return copyGlc;
};
