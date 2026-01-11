function print(...args) {
    console.log(...args);
}

const limit = "limit"

// Convert to string

function number_to_string(ord) {
    if (ord == limit) {return "Limit";}
    return String(ord);
}

function array_to_string(ord) {
    if (ord == limit) {return "Limit";}
    return "[" + ord.join(" ") + "]";
}

function is_array_number(a) {
    if (typeof a != "object") {return false;}
    for (const item of a) {
        if (item.length > 0) {return false;}
    }
    return true;
}

function nest_to_number(ord) {
    if (typeof ord != "object") {return ord;}
    for (const index in ord) {
        if (is_array_number(ord[index])) {
            ord[index] = ord[index].length;
        } else {
            ord[index] = nest_to_number(ord[index]);
        }
    }
    return ord;
}

function nest_join(ord) {
    if (typeof ord == "object") {
        let str = ""
        for (const item of ord) {str += nest_join(item) + " ";}
        str = "[" + str.slice(0, -1) + "]"
        return str;

    } else {
        return String(ord);
    }
}

function nest_to_string(ord) {
    if (ord == limit) {return "Limit";}
    return nest_join(nest_to_number(ord));
}

// Booleans

function is_succ_number(ord) {return ord != limit;}
function is_succ_array(ord) {return ord.length == 0 || ord.at(-1) > 0;}
function is_succ_sequence(ord) {return ord.length == 0 || ord.at(-1) == 0;}
function is_succ_nest(ord) {return ord.length == 0 || ord.at(-1).length == 0;}

// Number

function find_item(a, f) {
    let p = a.length - 1;
    while (p >= 0 && f(a[p])) {p--;}
    return p;
}

// Arrays

function clone(obj) {return structuredClone(obj);}

function fill(a, n, v) {
    for (let i = 0; i < n; i++) {
        let value = (typeof v == "function") ? v(i) : v;
        if (typeof value != "object") {value = [value];}

        for (const item of value) {
            a.push(clone(item));
        }
    }
    return a;
}

function get_nested(a, index) {
    let array = a;
    for (const i of index) {
        array = array[i >= 0 ? i : array.length + i];
    }
    return array;
}

// Ordinal notations

function exp_s(ord, n) {
    if (ord == limit) {return fill([1], n, 0);}

    const non_zero = find_item(ord, (i) => i == 0);
    ord[non_zero]--;
    ord[non_zero + 1] = n;
    
    while (ord.length > 0 && ord[0] == 0) {ord.shift();}
    return ord;
}

function exp_ss(ord, n) {
    if (ord == limit) {ord = [];
        for (let i = 0; i < n; i++) {ord = [ord]}
        return ord;}

    let root = ord;
    while (root.at(-1).at(-1).length > 0) {root = root.at(-1);}

    const head = root.at(-1);
    head.pop();

    fill(root, n, [head]);
    return ord;
}

function exp_sss(ord, n) {
    if (ord == limit) {return fill([], n, (i) => i);}

    const head = ord.pop();
    const bad_root = find_item(ord, (i) => i >= head);

    const bad_part = ord.slice(bad_root);
    return fill(ord, n, bad_part);
}

function exp_ssss(ord, n) {
    if (ord == limit) {return fill([], n, (i) =>
        fill([0], i, 1));}

    const last_number_root = find_item(ord, (i) => i == 1);
    const last_number = ord.length - last_number_root - 1;
    ord.splice(last_number_root);

    let bad_root = ord.length - 1;
    let counter = 0;
    while (ord[bad_root] == 1 || counter >= last_number) {
        counter = ord[bad_root] == 0 ? 0 : counter + 1;
        bad_root--;
    }

    const bad_part = ord.slice(bad_root);
    return fill(ord, n, bad_part);
}

export const NOTATIONS = {
    "s": {
        "exp": exp_s,
        "succ": is_succ_array,
        "str": array_to_string,
        "mls": {
            "ω": [1,0],
            "ω^2": [1,0,0],
            "ω^ω": limit,
        },
    },

    "ss": {
        "exp": exp_ss,
        "succ": is_succ_nest,
        "str": nest_to_string,
        "mls": {
            "ω": [[[]]],
            "ω^2": [[[],[]]],
            "ω^ω": [[[[]]]],
            "ε0": limit,
        },
    },

    "sss": {
        "exp": exp_sss,
        "succ": is_succ_sequence,
        "str": array_to_string,
        "mls": {
            "ω": [0,1],
            "ω^2": [0,1,1],
            "ω^ω": [0,1,2],
            "ε0": limit,
        },
    },

    "ssss": {
        "exp": exp_ssss,
        "succ": is_succ_sequence,
        "str": array_to_string,
        "mls": {
            "ω": [0,0,1],
            "ω^2": [0,0,1,0,1],
            "ω^ω": [0,0,1,0,1,1],
            "ε0": limit,
        },
    },
};