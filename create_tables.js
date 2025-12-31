import {CHAMPIONS} from "./champions_list.js";

const functions = {
    "BB": ["Busy Beaver", new Set()],
    "BBi": ["Instructions-Limited Busy Beaver", new Set("bbi")],
    "BBu": ["Uniform-Action Busy Beaver", new Set()],

    "BLB": ["Blanking Busy Beaver", new Set()],
    "BLBi": ["Instructions-Limited Blanking Busy Beaver", new Set("bbi")],

    "BBt": ["Semi-Infinite Tape Busy Beaver", new Set()],
    "BBti": ["Instructions-Limited Semi-Infinite Tape Busy Beaver", new Set("bbi")],

    "TT": ["Terminating Turmite", new Set()],
    "TTi": ["Instructions-Limited Terminating Turmite", new Set("bbi")],
    "TTu": ["Uniform-Action Terminating Turmite", new Set()],

    "TLT": ["Blanking Terminating Turmite", new Set()],
    "TLTi": ["Instructions-Limited Blanking Terminating Turmite", new Set("bbi")],
    
    "TTt": ["Semi-Infinite Tape Terminating Turmite", new Set()],
    "TTti": ["Instructions-Limited Semi-Infinite Tape Terminating Turmite", new Set("bbi")],
};

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

// Render tables

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
        table.innerHTML = create_HTML(fname, rows);
        tables_el.appendChild(table);
    }
}

create_table();