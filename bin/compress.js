#!/usr/bin/env node
// const shell = require('shelljs');
// const path = require('path');
// const arg = require('arg');

const { _compress } = require("../app");

const args = process.argv.slice(2);  // 去掉前两个参数
// const argsStr = args.join(' ');  // 将所有参数拼成字符串

// const sh = `pm2 start ${configFilePath} -- ${argsStr}`;
// console.log(sh);
// shell.exec(sh);
console.log(args);

const source = args[0]
const rate = args[1]
const dest = args[2]

_compress(source, dest, rate)