import { argv } from "process";
import { Chomsky } from "./src/engine";
import parserGLC from "./src/engine/utils/parseGLC";
import { IGLC, IRule, ITerminal } from "./src/types";

const formatGLC = (glc: IGLC, starter: string, terminals: ITerminal) => {
  const variables = [];
  const rules:string[][] = [];

  for (const v in glc) {
    variables.push(v);
    const arr = glc[v];
    arr.forEach(rule => {
      rules.push([v, rule]);
    });
  }

  return {
    glc: [
      [...variables],
      [...terminals],
      [...rules],
      starter
    ]
  }
}

const main = () => {
  // 1: get filePath argv[2]: node index.js (argv[2])
  let filePath;

  if (argv[2]) {
    filePath = argv[2];
  }else {
    console.error("Usar: ./chomsky [GLC]");
    return -1;
  }

  const [variables, terminals, rules, starter] = require(filePath).glc;

  // 2: formatando GLC em um objeto mais amigável pra se trabalhar
  /* Ex: 
  glc: {
    P: [ 'ABC', 'bCC' ],
    A: [ 'aAA', 'BB' ],
    B: [ '#' ],
    C: [ 'ABC', 'b' ]
  } 
  */
  const parsedGLC:IGLC = parserGLC(variables, rules);
  
  // 3: mount and run Chomsky engine
  const chomskyEngine = new Chomsky(parsedGLC);
  const nfc = chomskyEngine.run();

  const formatNfc = formatGLC(nfc, starter, terminals);
  console.log(JSON.stringify(formatNfc, null, 1));
  
  return 1;
};

main();
