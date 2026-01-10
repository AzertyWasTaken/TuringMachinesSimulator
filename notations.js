function print(...args) {
    console.log(...args);
}

// Convert to string

function number_to_string(ord) {
    if (ord == "Limit") return "Limit";
    return String(ord);
}

function array_to_string(ord) {
    if (ord == "Limit") return "Limit";
    return "[" + ord.join(" ") + "]";
}

// Booleans

function is_limit(ord) {return ord == "Limit";}
function is_succ_number(ord) {return !is_limit(ord);}
function is_succ_array(ord) {return ord.length == 0 || ord.at(-1) == 0;}

// Number



// Arrays

function clone(obj) {return structuredClone(obj);}

function limit_sss(n) {
    let res = [];
    for (let i = 0; i < n; i++) {res.push(i);}
    return res;
}

function limit_ssss(n) {
    let res = [];
    for (let i = 0; i < n; i++) {
        res.push(0);
        for (let j = 0; j < i; j++) {res.push(1);}
    }
    return res;
}

// Ordinal notations

function exp_s(ord, n) {return n;}

function exp_ss(ord, n) {
    if (is_limit(ord)) {return [n];}

    const head = ord.pop() - 1;
    for (let i = 0; i < n; i++) {ord.push(head);}

    return ord;
}

function exp_sss(ord, n) {
    if (is_limit(ord)) {return limit_sss(n);}

    const head = ord.pop() - 1;
    let search = ord.length - 1;
    while (ord[search] > head) {search--;}

    const part = ord.slice(search);
    for (let i = 0; i < n; i++) {ord = ord.concat(part);}

    return ord;
}

function exp_ssss(ord, n) {
    if (is_limit(ord)) {return limit_ssss(n);}

    let head_search = ord.length - 1;
    let head = 0;
    while (ord[head_search] == 1) {
        head++;
        head_search--;
    }
    head--;
    ord.splice(head_search);

    let search = ord.length - 1;
    let counter = 0;
    while (ord[search] == 1 || counter > head) {
        counter = ord[search] == 0 ? 0 : counter + 1;
        search--;
    }

    const part = ord.slice(search);
    for (let i = 0; i < n; i++) {ord = ord.concat(part);}

    return ord;
}

export const NOTATIONS = {
    "s": {
        "exp": exp_s,
        "succ": is_succ_number,
        "str": number_to_string,
    },

    "ss": {
        "exp": exp_ss,
        "succ": is_succ_array,
        "str": array_to_string,
    },

    "sss": {
        "exp": exp_sss,
        "succ": is_succ_array,
        "str": array_to_string,
    },

    "ssss": {
        "exp": exp_ssss,
        "succ": is_succ_array,
        "str": array_to_string,
    },
};