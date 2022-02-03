import { IGLC, IRule, IVariable } from "../../types";

const parserGLC = (variables: IVariable[], rules: IRule[]) => {
    let GLCFormatted:IGLC = {};

    variables.forEach(variable => {
        GLCFormatted[variable] = [];
        rules.forEach(rule => {
            if(rule[0] === variable){
                GLCFormatted[variable].push(rule[1]);
            }
        });
    });

    return GLCFormatted;
}

export default parserGLC