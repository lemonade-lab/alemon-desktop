// const vm = require('vm');
// const v8 = require('v8');

// // 这两个参数非常重要，保证字节码能够被运行。
// v8.setFlagsFromString('--no-lazy');
// v8.setFlagsFromString('--no-flush-bytecode');

// function encode(buf) {
//   // 这里可以做一些混淆逻辑，比如异或。
//   // return buf.map(b => b ^ 12345);
//   return buf;
// }

// exports.compile = function compile(code) {
//   const script = new vm.Script(code);
//   const raw = script.createCachedData();
//   return encode(raw);
// };
