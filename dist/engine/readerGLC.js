"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readerGLC = void 0;
const readerGLC = (filePath) => {
    // 2: mount glc object
    let glc = require(filePath).glc;
    // 3: set variables, terminals, rules, starter
    const variables = glc[0];
    const terminals = glc[1];
    const rules = glc[2];
    const starter = glc[3];
    return [variables, terminals, rules, starter];
};
exports.readerGLC = readerGLC;
