// Initialize TM

const default_symbol = "0";
const default_state = "A";

let tape = {};
let head = 0;
let state = default_state;
let rules = {};

let last_move = "R";

let steps = 0;
let halted = false;
let running = false;
let runInterval = null;
let run_delay = 200;

let symbol_colors = {};
const palette = [
    "#FF6060",
    "#4080FF",
    "#60FF60",
    "#FFFF40",
    "#FF60FF",
    "#60E0FF",
];

let history = [];
const memory = 256;

// DOM elements

const tm_code_el = document.getElementById("tm_code");
const line_numbers_el = document.getElementById("line_numbers");
const preset_select_el = document.getElementById("preset_select");
const speed_slider_el = document.getElementById("speed_slider");
const speed_label_el = document.getElementById("speed_label");
const run_el = document.getElementById("run");

// State names

const states_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols_alphabet = "0123456789";

function state_name(n) {return states_alphabet[n];}
function symbol_name(n) {return symbols_alphabet[n];}

// Line numbers

function update_line_numbers() {
    const lines = tm_code_el.value.split("\n").length;
    line_numbers_el.innerHTML = "";
    
    for (let i = 1; i <= lines; i++) {
        const div = document.createElement("div");
        div.textContent = i;
        line_numbers_el.appendChild(div);
    }
}

tm_code_el.addEventListener("input", update_line_numbers);
tm_code_el.addEventListener("scroll", () => {
    line_numbers_el.scrollTop = tm_code_el.scrollTop;
});

update_line_numbers();

// Parse TM code

function object_length(object) {
    return Object.keys(object).length;
}

function assign_symbol_color(symbol) {
    if (symbol != default_symbol && !(symbol in symbol_colors)) {
        symbol_colors[symbol] = palette[object_length(symbol_colors) % palette.length];
    }
}

function parse_rules(code) {
    let new_rules = [];
    const lines = code.split("\n");

    for (const line of lines) {
        if (!line.trim() || line.slice(0, 2) == "//") {continue;}
        
        const [left, right] = line.split("->");
        if (!right) {continue;}

        const [state, read] = left.trim().split(/\s+/);
        const [write, move, next] = right.trim().split(/\s+/);

        if (!new_rules[state]) {new_rules[state] = {};}
        if (!new_rules[state][read]) {new_rules[state][read] = {};}
        const rule = new_rules[state][read];

        rule.write = write;
        rule.move = move;
        rule.next = next;

        assign_symbol_color(write);
    }
    return new_rules;
}

// Import TM

function trim_trailing_newlines(str) {
    return str.replace(/\n+$/, "");
}

function is_rule_defined(rule) {
    for (const char of rule) {
        if (char == "-") {return false;}
    }
    return true;
}

function parse_standard_format(code) {
    let new_code = "";
    const state_rules = code.split("_");

    for (st = 0; st < state_rules.length; st++) {
        const state_rule = state_rules[st];
        const symbol_rules = state_rule.match(/.{1,3}/g);

        for (sy = 0; sy < symbol_rules.length; sy++) {
            const symbol_rule = symbol_rules[sy];
            if (!is_rule_defined(symbol_rule)) {continue;}

            new_code += [state_name(st), symbol_name(sy), "->",
                symbol_rule[0], symbol_rule[1], symbol_rule[2]].join(" ") + "\n";
        }
        new_code += "\n";
    }
    return trim_trailing_newlines(new_code);
}

function import_tm() {
    const input = document.getElementById("standard_format").value;
    tm_code_el.value = parse_standard_format(input);
    update_line_numbers();
}

// Tape helpers

function read_cell(pos) {
    return tape[pos] ?? default_symbol;
}

function read_rules(state, symbol) {
    return (rules[state] ?? {})[symbol];
}

// Render tape

function render_tape() {
    const tape_div = document.getElementById("tape");
    tape_div.innerHTML = "";

    const cell_width = 32 + 4;
    const visible_cells = Math.floor(tape_div.offsetWidth / cell_width)
    const half = Math.floor(visible_cells / 2)

    for (let i = head - half; i <= head + half; i++) {
        const cell = document.createElement("div");
        const symbol = read_cell(i);

        cell.className = "cell" + (i == head ? " head" : "");
        cell.textContent = symbol;
        cell.style.color = i == head ? "#FFFFFF" : (symbol_colors[symbol] ??= "#FFFFFF");
        tape_div.appendChild(cell);
    }

    document.getElementById("status").textContent =
    (halted ? "Halted, " : "") + `State: ${state}, Head: ${head}, Steps: ${steps}`;

    run_el.disabled = halted;
}

window.addEventListener("resize", render_tape);

// Presets

const PRESETS = {
    increment: `// Input must be a string of 1s.\n\n
A 0 -> 1 L B\nA 1 -> 1 L A\n
B 0 -> 0 R Z`,
    decrement: `// Input must be a string of 1s.\n\n
A 1 -> 0 R Z`,
    zero: `// Input must be a string of 1s.\n\n
A 0 -> 0 R Z\nA 1 -> 0 R A`,
    double: `// Input must be a string of 1s.\n\n
A 0 -> 0 R Z\nA 1 -> 0 R B\n
B 0 -> 0 R C\nB 1 -> 1 R B\n
C 1 -> 1 R C\nC 0 -> 1 R D\n
D 0 -> 1 L E\n
E 0 -> 0 L F\nE 1 -> 1 L E\n
F 0 -> 0 R A\nF 1 -> 1 L F`,
    addition: `// Input must be two strings of 1s separated by a 0.\n\n
A 1 -> 0 R B\n
B 0 -> 1 L C\nB 1 -> 1 R B\n
C 0 -> 0 R Z\nC 1 -> 1 L C`,
    multiplication: `// Input must be two strings of 1s separated by a 0.\n\n
A 0 -> 0 R J\nA 1 -> 0 R B\n
B 0 -> 0 R C\nB 1 -> 1 R B\n
C 0 -> 0 L G\nC 1 -> 1 R D\n
D 0 -> 0 R E\nD 1 -> 2 R D\n
E 0 -> 1 L F\nE 1 -> 1 R E\n
F 0 -> 0 L G\nF 1 -> 1 L F\n
G 0 -> 0 L I\nG 1 -> 1 L G\nG 2 -> 1 R H\n
H 0 -> 0 R E\nH 1 -> 1 R H\n
I 0 -> 0 R A\nI 1 -> 1 L I\n
J 0 -> 0 R Z\nJ 1 -> 0 R J`,
    bb3: `// Input must be empty.\n\n
A 0 -> 1 R B\nA 1 -> 1 R Z\n
B 0 -> 1 L B\nB 1 -> 0 R C\n
C 0 -> 1 L C\nC 1 -> 1 L A`,
    bb4: `// Input must be empty.\n\n
A 0 -> 1 R B\nA 1 -> 1 L B\n
B 0 -> 1 L A\nB 1 -> 0 L C\n
C 0 -> 1 R Z\nC 1 -> 1 L D\n
D 0 -> 1 R D\nD 1 -> 0 R A`,
    bb5: `// Input must be emptyt.\n\n
A 0 -> 1 R B\nA 1 -> 1 L C\n
B 0 -> 1 R C\nB 1 -> 1 R B\n
C 0 -> 1 R D\nC 1 -> 0 L E\n
D 0 -> 1 L A\nD 1 -> 1 L D\n
E 0 -> 1 R Z\nE 1 -> 0 L A`,
};

preset_select_el.addEventListener("change", () => {
    const key = preset_select_el.value;
    if (!key) {return;}
    tm_code_el.value = PRESETS[key];
    update_line_numbers();
});

// Execute TM

function move_head(move) {
    if (move == "L") {
        head--;
        last_move = "L";
    } else if (move == "R") {
        head++;
        last_move = "R";
    } else if (move == "P") {
        move_head(last_move);
    } else if (move == "T") {
        move_head(last_move == "R" ? "L" : "R");
    }
}

function step() {
    if (halted) {return;}

    history.push({"tape": {...tape}, "head": head, "state": state, "halted": halted});
    if (history.length > memory) {history.shift();}

    const symbol = read_cell(head);
    let rule = read_rules(state, symbol);

    if (!rule || !rule.write || !rule.move || !rule.next) {
        halted = true;
        render_tape();
        stop_run();
        return;
    }

    tape[head] = rule.write;
    move_head(rule.move);
    state = rule.next;

    steps++;
    render_tape();
}

// Run and pause

function start_run() {
    if (halted) return;
    running = true;
    document.getElementById("run").textContent = "Pause";
    runInterval = setInterval(step, run_delay);
}


function stop_run() {
    running = false;
    clearInterval(runInterval);
    document.getElementById("run").textContent = "Run";
}

function toggle_run() {
    if (running) {
        stop_run();
    } else {
        start_run();
    }
}

// Undo step

function undo() {
    if (history.length <= 0) return;
    const prev = history.pop();
    tape = {...prev.tape};
    head = prev.head;
    state = prev.state;
    halted = prev.halted;
    render_tape();
}

// Speed control

speed_slider_el.addEventListener("input", () => {
    run_delay = Number(speed_slider_el.value);
    speed_label_el.textContent = `Speed: ${run_delay}ms`;
    if (running) {
        stop_run();
        start_run();
    }
});

// Reset TM

function reset() {
    tape = {};
    const input = document.getElementById("tape_input").value;
    for (let i = 0; i < input.length; i++) {
        tape[i] = input[i];
    }

    head = 0;
    state = document.getElementById("start_state").value || default_state;

    steps = 0;
    halted = false;

    last_move = "R";

    symbol_colors = {};

    rules = parse_rules(document.getElementById("tm_code").value);
    render_tape();
    stop_run();
}

reset();