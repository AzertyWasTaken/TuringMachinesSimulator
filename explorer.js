import {NOTATIONS} from "./notations.js";

function clone(obj) {return structuredClone(obj);}

let notation = NOTATIONS.s;

function compare_objects(a, b) {
    if (a === b) {return true;}

    if (typeof a !== "object" || a === null ||
        typeof b !== "object" || b === null) {return false;}

    const key_a = Object.keys(a);
    const key_b = Object.keys(b);
    if (key_a.length !== key_b.length) {return false;}
    
    for (const k of key_a) {
        if (!key_b.includes(k) || !compare_objects(a[k], b[k])) {return false;}
    }
    return true;
}

// UI logic

function find_analysis(ord) {
    const analysis = notation.mls;
    for (const o in analysis) {
        if (compare_objects(ord, analysis[o])) {return o;}
    }
}

function create_node(ord, container) {
    const div = document.createElement("div");
    div.className = "node";

    const btn = document.createElement("button");
    btn.className = "ordinal_btn";
    btn.textContent = notation.str(clone(ord));

    div.appendChild(btn);
    container.appendChild(div);
    container.prepend(div);

    const analysis = find_analysis(ord);
    if (analysis) {
        const name = document.createElement("span");
        name.className = "ordinal_name";
        name.textContent = analysis;
        div.appendChild(name);
        container.prepend(name);
    }
    container.prepend(btn);

    if (notation.succ(ord)) {return;}

    let expansions = 0;
    btn.onclick = () => {
        const child = notation.exp(clone(ord), expansions);
        create_node(child, div);
        expansions++;
    };
}

const root = document.getElementById("root");
create_node("limit", root);

// Create buttons

const filters_el = document.getElementById("filters");

function create_button(text, not) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => {
        root.innerHTML = "";
        notation = NOTATIONS[not];
        create_node("limit", root);
    };
    filters_el.appendChild(btn);
}

create_button("Array", "s");
create_button("Hydra", "ss");
create_button("PrSS", "sss");
create_button("Shifted", "ssss");