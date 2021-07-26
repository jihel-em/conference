var fs = require('fs');

const evaluate = require('./visitor').evaluate;
var data = fs.readFileSync('./test.md', 'utf8');

console.log('\n' + data + '\n\n');
console.log(evaluate(data));