import {NOTATIONS} from "./notations.js";

let notation = NOTATIONS.s;

// UI logic

function clone(obj) {return structuredClone(obj);}

function create_node(ord, container) {
    const div = document.createElement("div");
    div.className = "node";

    const btn = document.createElement("button");
    btn.className = "ordinal";
    btn.textContent = notation.str(ord);
    
    div.appendChild(btn);
    container.appendChild(div);

    container.prepend(div);
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
create_node("Limit", root);

// Create buttons

const filters_el = document.getElementById("filters");

function create_button(text, not) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => {
        root.innerHTML = "";
        create_node("Limit", root);
        notation = NOTATIONS[not];
    };
    filters_el.appendChild(btn);
}

create_button("Number", "s");
create_button("Worm", "ss");
create_button("PrSS", "sss");
create_button("Shifted", "ssss");