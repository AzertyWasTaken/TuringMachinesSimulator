import {CHAMPIONS} from "./champions_list.js";

const sets = [
    ["Turing Machine", "bb"],
    ["Terminating Turmite", "tt"],
    ["Instructions-Limited", "bbi"],
    ["States & Symbols", "ss"],
    ["Uniform-Action", "bbu"]
];

const functions = {
    "BB": ["Busy Beaver", ["bb", "ss"]],
    "BBi": ["Instructions-Limited Busy Beaver", ["bb", "bbi"]],
    "BBu": ["Uniform-Action Busy Beaver", ["bb", "bbu"]],

    "BLB": ["Blanking Busy Beaver", ["bb", "ss"]],
    "BLBi": ["Instructions-Limited Blanking Busy Beaver", ["bb", "bbi"]],
    "BLBu": ["Uniform-Action Blanking Busy Beaver", ["bb", "bbu"]],

    "BBt": ["Semi-Infinite Tape Busy Beaver", ["bb", "ss"]],
    "BBti": ["Instructions-Limited Semi-Infinite Tape Busy Beaver", ["bb", "bbi"]],
    "BBtu": ["Uniform-Action Semi-Infinite Tape Busy Beaver", ["bb", "bbu"]],

    "TT": ["Terminating Turmite", ["tt", "ss"]],
    "TTi": ["Instructions-Limited Terminating Turmite", ["tt", "bbi"]],
    "TTu": ["Uniform-Action Terminating Turmite", ["tt", "bbu"]],

    "TLT": ["Blanking Terminating Turmite", ["tt", "ss"]],
    "TLTi": ["Instructions-Limited Blanking Terminating Turmite", ["tt", "bbi"]],
    "TLTu": ["Uniform-Action Blanking Terminating Turmite", ["tt", "bbu"]],

    "TTt": ["Semi-Infinite Tape Terminating Turmite", ["tt", "ss"]],
    "TTti": ["Instructions-Limited Semi-Infinite Tape Terminating Turmite", ["tt", "bbi"]],
    "TTtu": ["Uniform-Action Semi-Infinite Tape Terminating Turmite", ["tt", "bbu"]],
};

// Create groups

const groups = {};

for (const key in CHAMPIONS) {
    const match = key.match(/^([A-Za-z0-9_]+)\(([^)]+)\)$/);
    if (!match) continue;

    const [, name, args_str] = match;
    const args = args_str.split(",").map(Number);

    groups[name] ??= {
        "arity": args.length,
        "rows": [],
    };

    groups[name].rows.push({
        "args": args,
        "value": CHAMPIONS[key][0],
        "champion": CHAMPIONS[key][1],
    });
}

// Create buttons

const filters_el = document.getElementById("filters");

function create_button(text, set) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => {
        document.querySelectorAll("table").forEach(t => {
                const array = t.dataset.function.split(",");
                t.style.display = (!set || array.includes(set)) ? "" : "none";
            }
        );
    };
    filters_el.appendChild(btn);
}

create_button("All", null);

sets.forEach(info => {
    create_button(info[0], info[1]);
});

// Create tables

function row(str) {return `<td><code>${str}</code></td>`;}

function create_HTML(fname, rows) {
    return `
    <caption>${functions[fname][0]}</caption>

    <thead>
    <tr><th>Domain</th><th>Value</th><th>Champion</th></tr>
    </thead>

    <tbody>
    ${rows.map(r => `<tr>
    ${row(`${fname}(${r.args.map(a => `${a}`).join(",")})`)}
    ${row(r.value)}
    ${row(r.champion)}
    </tr>`).join("")}
    </tbody>
    `;
}

const tables_el = document.getElementById("tables");

function create_table() {
    for (const fname of Object.keys(groups).sort()) {
        const {arity, rows} = groups[fname];

        rows.sort((a, b) => {
            for (let i = arity - 1; i >= 0; i--) {
                if (a.args[i] !== b.args[i]) {
                    return a.args[i] - b.args[i];
                }
            }
            return 0;
        });

        const table = document.createElement("table");
        table.dataset.function = functions[fname][1];
        table.innerHTML = create_HTML(fname, rows);
        tables_el.appendChild(table);
    }
}

create_table();