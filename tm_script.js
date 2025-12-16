// Initialize TM

const default_symbol = 0;
const default_state = "A";

let tape = {};
let head = 0;
let state = default_state;
let rules = {};

let steps = 0;
let halted = false;
let running = false;
let runInterval = null;
let run_delay = 200;

// DOM elements

const tm_code_el = document.getElementById("tm_code");
const line_numbers_el = document.getElementById("line_numbers");
const preset_select_el = document.getElementById("preset_select");

// Parse TM code

function parse_rules(code) {
    let new_rules = [];
    const lines = code.split("\n");

    for (const line of lines) {
        if (!line.trim()) continue;
        
        const [left, right] = line.split("->");
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
    if (rule.move == "L") {head--;}
    else if (rule.move == "R") {head++;}
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

const speed_slider = document.getElementById("speed_slider");
const speed_label = document.getElementById("speed_label");

speed_slider.addEventListener("input", () => {
    run_delay = Number(speed_slider.value);
    speed_label.textContent = `Speed: ${run_delay}ms`;
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

    rules = parse_rules(document.getElementById("tm_code").value);
    document.getElementById("run").disabled = false;
    render_tape();
    stop_run();
}

reset();