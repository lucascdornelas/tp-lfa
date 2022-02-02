import { argv } from "process";
import { Chomsky } from "./engine";

const main = () => {
  // 1: get filePath argv[2]: node index.js (argv[2])
  let filePath;

  if (argv[2]) {
    filePath = argv[2];
  }else {
    console.error("Error: filePath is missing");
    return -1;
  }

  // 2: mount glc object
  const [variables, terminals, rules, starter] = require(filePath).glc;

  // console.log("variables: ", variables);
  // console.log("terminals: ", terminals);
  // console.log("rules: ", rules);
  // console.log("starter: ", starter);

  // 3: mount and run Chomsky engine
  const chomskyEngine = new Chomsky(variables, terminals, rules, starter);
  chomskyEngine.run()  
};

main();
