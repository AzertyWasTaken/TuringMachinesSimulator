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

// DOM elements

const tm_code_el = document.getElementById("tm_code");
const line_numbers_el = document.getElementById("line_numbers");
const preset_select_el = document.getElementById("preset_select");
const speed_slider_el = document.getElementById("speed_slider");
const speed_label_el = document.getElementById("speed_label");

// State names

const states_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function state_name(n) {
    return states_alphabet[n];
}

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

            new_code += [state_name(st), String(sy), "->",
                symbol_rule[0], symbol_rule[1], symbol_rule[2]].join(" ") + "\n";
        }
        new_code += "\n";
    }
    return trim_trailing_newlines(new_code);
}
a = "abc"+"\n"+"\n"
console.log(a.slice(0, -16))
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
        cell.className = "cell" + (i == head ? " head" : "");
        cell.textContent = read_cell(i);
        tape_div.appendChild(cell);
    }

    document.getElementById("status").textContent =
    (halted ? "Halted, " : "") + `State: ${state}, Head: ${head}, Steps: ${steps}`;

    document.getElementById("run").disabled = halted;
}

window.addEventListener("resize", render_tape);

// Presets

const PRESETS = {
    increment: `A 0 -> 1 L B\nA 1 -> 1 L A\n\nB 0 -> 0 R Z`,
    decrement: `A 1 -> 0 R Z`,
    zero: `A 0 -> 0 R Z\nA 1 -> 0 R A`,
    double: `A 0 -> 0 R Z\nA 1 -> 0 R B\n
B 0 -> 0 R C\nB 1 -> 1 R B\n
C 1 -> 1 R C\nC 0 -> 1 R D\n
D 0 -> 1 L E\n
E 0 -> 0 L F\nE 1 -> 1 L E\n
F 0 -> 0 R A\nF 1 -> 1 L F`,
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

    rules = parse_rules(document.getElementById("tm_code").value);
    document.getElementById("run").disabled = false;
    render_tape();
    stop_run();
}

reset();