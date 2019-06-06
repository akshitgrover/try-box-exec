"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Setting default ENVs
*/
function env() {
    if (!process.env.NODE_PORT) {
        process.env.NODE_PORT = '3000';
    }
}
exports.default = env;
