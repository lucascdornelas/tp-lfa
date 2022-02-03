import { argv } from "process";
import { Chomsky } from "./engine";
import parserGLC from "./engine/utils/parseGLC";
import { IGLC } from "./types";

const main = () => {
  // 1: get filePath argv[2]: node index.js (argv[2])
  let filePath;

  if (argv[2]) {
    filePath = argv[2];
  }else {
    console.error("Error: filePath is missing");
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
  chomskyEngine.run() 
  
  return 1;
};

main();
