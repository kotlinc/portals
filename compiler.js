// Props to Frank Stokes for this monstrosity

const zero = '+[]';
const one = '+!![]';

const number = n => {
    if (n === 0) return zero;
    return Array.from({length: n}, () => one).join(' + ');
}

const map = {};

const fromString = s =>s.split('').map(x => {
    if (!(x in map)) {
        const charCode = x.charCodeAt(0);
        return `([]+[])[${fromString('constructor')}][${fromString('fromCharCode')}](${number(charCode)})`;
    }
    return map[x];
}).join('+');

map.a = `(+{}+[])[${number(1)}]`;
map.b = `({}+[])[${number(2)}]`;
map.o = `({}+[])[${number(1)}]`;
map.e = `({}+[])[${number(4)}]`;
map.c = `({}+[])[${number(5)}]`;
map.t = `({}+[])[${number(6)}]`;
map[' '] = `({}+[])[${number(7)}]`;
map.f = `(![]+[])[${number(0)}]`;
map.s = `(![]+[])[${number(3)}]`;
map.r = `(!![]+[])[${number(1)}]`;
map.u = `(!![]+[])[${number(2)}]`;
map.i = `((+!![]/+[])+[])[${number(3)}]`;
map.n = `((+!![]/+[])+[])[${number(4)}]`;
map.S = `([]+([]+[])[${fromString('constructor')}])[${number(9)}]`;
map.g = `([]+([]+[])[${fromString('constructor')}])[${number(14)}]`;
map.p = `([]+(/-/)[${fromString('constructor')}])[${number(14)}]`;
map['\\'] = `(/\\\\/+[])[${number(1)}]`;
map.d = `(${number(13)})[${fromString('toString')}](${number(14)})`;
map.h = `(${number(17)})[${fromString('toString')}](${number(18)})`;
map.m = `(${number(22)})[${fromString('toString')}](${number(23)})`;
map.C = `((()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${map['\\']}))[${number(2)}]`;

const compile = code => `(()=>{})[${fromString('constructor')}](${fromString(code)})()`;

// My code

const fs = require('fs');
const inputFilePath = process.argv[2]; // Get the input file path from the command line arguments
const outputFilePath = process.argv[3]; // Get the output file path from the command line arguments

// Read the input file
const codeString = fs.readFileSync(inputFilePath, 'utf-8');

// Write result to the resultant file
fs.writeFileSync(outputFilePath, `// Made with JSMess V1.0.0\n// Props to Frank Stokes for the bulk of the compiler code\n\n// Compiled code\n\n${compile(codeString)}\n\n// !ALTHOUGH IT MAY WORK, DO NOT USE IN PRODUCTION!`);