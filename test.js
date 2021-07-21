var fs = require('fs');


const parse = require('./parser').parse;
var data = fs.readFileSync('./test.md', 'utf8');


console.log('\n'+data+'\n\n');
console.log(parse(data));