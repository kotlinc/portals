const zero = "+[]";

interface Obj {
    [key: string]: string | ((r: number) => void)
}

const nums: Obj = {
    "0": '',
    "1": '',
    "2": '',
    "3": '',
    "4": '',
    "5": '',
    "6": '',
    "7": '',
    "8": '',
    "9": '',
    make: (r: number) => {}
};

nums.make = (r: number) => Array.from({
    length: r
}, () => nums["1"]).join("+");

nums["0"] = "(+[])";

nums["1"] = "(+!![])";

nums["2"] = "(+!![]+ +!![])";

nums["3"] = `(+!![]+ +!![]+ +!![])`;

nums["4"] = `(+!![]+ +!![]+ +!![]+ +!![])`;

nums["5"] = `(+!![]+ +!![]+ +!![]+ +!![]+ +!![])`;

nums["6"] = "(+!![]+ +!![]+ +!![])*(+!![]+ +!![])";

nums["7"] = `(+!![]+ +!![]+ +!![])*(+!![]+ +!![])+ +!![]`;

nums["8"] = `(+!![]+ +!![])**(+!![]+ +!![]+ +!![])`;

nums["9"] = `(+!![]+ +!![]+ +!![])**(+!![]+ +!![])`;

const fromNumber = (c: number) => {
    if (c === 0) return zero;
    const n = Array.from(c as unknown as string);
    let m: string[] = [];
    n.forEach((r:string) => {
        m.push(`(${nums[r]}+[])`);
    });
    return ` +(${m.join(" +")})`;
};

const map: Obj = {
    a: '',
    b: '',
    o: '',
    e: '',
    c: '',
    t: '',
    " ": '',
    f: '',
    s: '',
    r: '',
    u: '',
    i: '',
    n: '',
    S: '',
    g: '',
    p: '',
    "\\": '',
    d: '',
    h: '',
    m: '',
    C: ''
};

const fromString = (r: string): string => r.split("").map((x: string) => {
    if (!(x in map)) {
        const n = x.charCodeAt(0);
        return `([]+[])[${fromString("constructor")}][${fromString("fromCharCode")}](${fromNumber(n)})`;
    }
    return map[x];
}).join("+");

map.a = `(![]+[])[${fromNumber(1)}]`;

map.b = `({}+[])[${fromNumber(2)}]`;

map.o = `({}+[])[${fromNumber(1)}]`;

map.e = `({}+[])[${fromNumber(4)}]`;

map.c = `({}+[])[${fromNumber(5)}]`;

map.t = `({}+[])[${fromNumber(6)}]`;

map[" "] = `({}+[])[${fromNumber(7)}]`;

map.f = `(![]+[])[${fromNumber(0)}]`;

map.s = `(![]+[])[${fromNumber(3)}]`;

map.r = `(!![]+[])[${fromNumber(1)}]`;

map.u = `(([][[]])+[])[${fromNumber(0)}]`;

map.i = `((+!![]/+[])+[])[${fromNumber(3)}]`;

map.n = `((+!![]/+[])+[])[${fromNumber(4)}]`;

map.S = `([]+([]+[])[${fromString("constructor")}])[${fromNumber(9)}]`;

map.g = `([]+([]+[])[${fromString("constructor")}])[${fromNumber(14)}]`;

map.p = `([]+(/-/)[${fromString("constructor")}])[${fromNumber(14)}]`;

map["\\"] = `(/\\\\/+[])[${fromNumber(1)}]`;

map.d = `(${fromNumber(13)})[${fromString("toString")}](${fromNumber(14)})`;

map.h = `(${fromNumber(17)})[${fromString("toString")}](${fromNumber(18)})`;

map.m = `(${fromNumber(22)})[${fromString("toString")}](${fromNumber(23)})`;

map.C = `((()=>{})[${fromString("constructor")}](${fromString("return escape")})()(${map["\\"]}))[${fromNumber(2)}]`;

const compile = (r: string) => `(()=>{})[${fromString("constructor")}](${fromString(r)})()`;

const fs = require("fs");

const inputFilePath = process.argv[2];

const outputFilePath = process.argv[3];

const codeString = fs.readFileSync(inputFilePath, "utf-8");

fs.writeFileSync(outputFilePath, `// Made with JSMess V1.0.0\n// Props to Frank Stokes for the bulk of the compiler code\n\n// Compiled code\n\n${compile(codeString)}\n\n// !ALTHOUGH IT MAY WORK, DO NOT USE IN PRODUCTION!`);