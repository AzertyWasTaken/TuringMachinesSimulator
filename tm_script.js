// Initialize TM

const default_symbol = "0";
const default_state = "A";

let running = false;
let mode = "simulator";

let runInterval = null;
let run_delay = 200;

let explore_symbol_color = "#C09090";
let undefined_symbol_color = "#E0B0B0";
let explore_symbol_pos = {};

let symbol_colors = {};
let state_colors = {};

let tm = {
    "tape": {},
    "head": 0,
    "state": default_state,
    "rules": {},
    "last_move": "R",

    "steps": 0,
    "halted": false,
}

let canvas = {
    "cell_size": 4,
    "enabled": false,
    "row": 0,

    "dragging": false,
    "pos_x": 0,
    "pos_y": 0,
    "last_x": 0,
    "last_y": 0,

    "rendering": false,
}

const scroll_speed = 128;

const palette = [
    "#FF4040",
    "#FFC040",
    "#40A0FF",
    "#80FF40",
    "#C040FF",
    "#40FFE0",
    "#C0C040",
    "#FF40E0",
];

let history = [];
const memory = 65536;

// DOM elements

function el(id) {
    return document.getElementById(id);
}

const canvas_ctx = el("canvas").getContext("2d");
canvas_ctx.willReadFrequently = true;

// Basic helpers

function adjust_brightness(hex, factor) {
    hex = hex.replace(/^#/, "");

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    r = Math.min(255, Math.max(0, Math.round(r * factor)));
    g = Math.min(255, Math.max(0, Math.round(g * factor)));
    b = Math.min(255, Math.max(0, Math.round(b * factor)));

    return (
        "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0")
    ).toUpperCase();
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function button(btn, f) {
    document.getElementById(btn).addEventListener("click", f);
}

const DEF_TM = copy(tm);

// State names

const states_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols_alphabet = "0123456789";

function state_name(n) {return states_alphabet[n];}
function symbol_name(n) {return symbols_alphabet[n];}

function object_length(object) {
    return Object.keys(object).length;
}

// Line numbers

function update_line_numbers() {
    const lines = el("tm_code").value.split("\n").length;
    el("line_numbers").innerHTML = "";
    
    for (let i = 1; i <= lines; i++) {
        const div = document.createElement("div");
        div.textContent = i;
        el("line_numbers").appendChild(div);
    }
}

el("tm_code").addEventListener("input", update_line_numbers);
el("tm_code").addEventListener("scroll", () => {
    el("line_numbers").scrollTop = el("tm_code").scrollTop;
});

update_line_numbers();

// Parse TM code

function assign_symbol_color(symbol) {
    if (symbol != default_symbol && !(symbol in symbol_colors)) {
        symbol_colors[symbol] = palette[object_length(symbol_colors) % palette.length];
        explore_symbol_pos[symbol] = object_length(symbol_colors);
    }
}

function assign_state_color(state) {
    if (!(state in state_colors)) {
        state_colors[state] = palette[object_length(state_colors) % palette.length];
    }
}

function parse_rules(code) {
    symbol_colors = {};
    state_colors = {};
    explore_symbol_pos = {};

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

        assign_symbol_color(read);
        assign_state_color(state);
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

    for (let st = 0; st < state_rules.length; st++) {
        const state_rule = state_rules[st];
        const symbol_rules = state_rule.match(/.{1,3}/g);
        if (!symbol_rules) {return "";}

        for (let sy = 0; sy < symbol_rules.length; sy++) {
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
    el("tm_code").value = parse_standard_format(input);
    update_line_numbers();
}

button("import", import_tm)

// Tape helpers

function read_cell(pos) {
    return tm.tape[pos] ?? default_symbol;
}

function read_rules(state, symbol) {
    return (tm.rules[state] ?? {})[symbol];
}

// Render tape

function render_tape() {
    if (mode != "simulator") {return;}
    el("tape").innerHTML = "";

    const cell_width = 32 + 4;
    const visible_cells = Math.floor(el("tape").offsetWidth / cell_width)
    const half = Math.floor(visible_cells / 2)

    for (let i = tm.head - half; i <= tm.head + half; i++) {
        const cell = document.createElement("div");
        const symbol = read_cell(i);

        cell.className = "cell" + (i == tm.head ? " head" : "");
        cell.textContent = symbol;
        cell.style.color = i == tm.head ? "#FFFFFF" : symbol_colors[symbol] ?? "#FFFFFF";
        el("tape").appendChild(cell);
    }

    document.getElementById("status").textContent =
    (tm.halted ? "Halted, " : "") + `State: ${tm.state}, Head: ${tm.head}, Steps: ${tm.steps}`;

    document.getElementById("toggle_run").disabled = tm.halted;
}

render_tape();

window.addEventListener("resize", render_tape);

// Presets

import {PRESETS} from "./presets.js";

el("preset_select").addEventListener("change", () => {
    const key = el("preset_select").value;
    if (!key) {return;}
    el("tm_code").value = PRESETS[key];
    update_line_numbers();
});

// Execute TM

function move_head(move) {
    if (move == "L") {
        tm.head--;
        tm.last_move = "L";
    } else if (move == "R") {
        tm.head++;
        tm.last_move = "R";
    } else if (move == "P") {
        move_head(tm.last_move);
    } else if (move == "T") {
        move_head(tm.last_move == "R" ? "L" : "R");
    }
}

function step() {
    if (tm.halted) {return;}

    history.push({"tape": copy(tm.tape), "head": tm.head,
        "state": tm.state, "halted": tm.halted});
    if (history.length > memory) {history.shift();}

    const symbol = read_cell(tm.head);
    let rule = read_rules(tm.state, symbol);

    if (!rule || !rule.write || !rule.move || !rule.next) {
        tm.halted = true;
        render_tape();
        stop_run();
        return;
    }

    tm.tape[tm.head] = rule.write;
    move_head(rule.move);
    tm.state = rule.next;

    tm.steps++;
    render_tape();
}

button("step", step);

// Run and pause

function start_run() {
    if (tm.halted) return;
    running = true;
    document.getElementById("toggle_run").textContent = "Pause";
    runInterval = setInterval(step, run_delay);
}


function stop_run() {
    running = false;
    clearInterval(runInterval);
    document.getElementById("toggle_run").textContent = "Run";
}

function toggle_run() {
    if (running) {
        stop_run();
    } else {
        start_run();
    }
}

button("toggle_run", toggle_run);

// Undo step

function undo() {
    if (history.length <= 0) return;
    const prev = history.pop();
    tm.tape = copy(prev.tape);
    tm.head = prev.head;
    tm.state = prev.state;
    tm.halted = prev.halted;
    render_tape();
}

button("undo", undo);

// Speed control

el("speed_slider").addEventListener("input", () => {
    run_delay = Number(el("speed_slider").value);
    el("speed_label").textContent = `Speed: ${run_delay}ms`;
    if (running) {
        stop_run();
        start_run();
    }
});

// Zoom control

el("zoom_slider").addEventListener("input", () => {
    canvas.cell_size = Number(el("zoom_slider").value);
    el("zoom_label").textContent = `Zoom: ${canvas.cell_size}px`;
    draw_explore_canvas();
});

// Reset TM

function reset() {
    tm = copy(DEF_TM);

    const input = document.getElementById("tape_input").value;
    for (let i = 0; i < input.length; i++) {
        tm.tape[i] = input[i];
    }

    tm.state = document.getElementById("start_state").value || default_state;
    history = [];
    
    tm.rules = parse_rules(document.getElementById("tm_code").value);
    render_tape();
    stop_run();
}

reset();

button("reset", reset);

// Draw explore canvas

function draw_pixel(x, y, size) {
    canvas_ctx.fillRect(x * size, y * size, size, size);
}

function draw_row(step) {
    const width_cells = Math.floor(el("canvas").width / canvas.cell_size);
    const half = Math.floor(width_cells / 2);
    const offset = Math.floor(canvas.pos_x);

    for (let x = 0; x < width_cells; x++) {
        const tape_pos = x - half + offset;

        if (tape_pos == step.head) {
            canvas_ctx.fillStyle = state_colors[step.state] ?
            state_colors[step.state] : "#FFFFFF";
            draw_pixel(x, canvas.row, canvas.cell_size);

        } else {
            const symbol = step.tape[tape_pos] ?? default_symbol;

            if (symbol != default_symbol) {
                const color = explore_symbol_pos[symbol];
                canvas_ctx.fillStyle = color ? adjust_brightness(explore_symbol_color,
                    color / object_length(explore_symbol_pos)) : undefined_symbol_color;

                draw_pixel(x, canvas.row, canvas.cell_size);
            }
        }
    }
    canvas.row++;
}

function draw_explore_canvas() {
    if (!canvas_ctx || !canvas.enabled || canvas.rendering) {return;}
    canvas.rendering = true;

    canvas_ctx.clearRect(0, 0, el("canvas").width, el("canvas").height);
    canvas.row = 0;

    const start_step = Math.floor(canvas.pos_y);
    const rows_count = Math.floor(el("canvas").height / canvas.cell_size);

    for (let i = Math.min(start_step, history.length);
    i < Math.min(start_step + rows_count, memory); i++) {
        if (object_length(history) <= i) {step();}
        if (i >= start_step && history[i]) {draw_row(history[i]);}
    }

    canvas.rendering = false;
}

el("canvas").addEventListener("wheel", e => {
    e.preventDefault();

    canvas.pos_y += Math.sign(e.deltaY) * scroll_speed / canvas.cell_size;
    canvas.pos_y = Math.max(0, canvas.pos_y);

    draw_explore_canvas();
})

el("canvas").addEventListener("mousedown", e => {
    canvas.dragging = true;
    canvas.last_x = e.clientX;
    canvas.last_y = e.clientY;
});

window.addEventListener("mouseup", () => {
    canvas.dragging = false;
});

window.addEventListener("mousemove", e => {
    if (!canvas.dragging) {return;}

    const dx = e.clientX - canvas.last_x;
    const dy = e.clientY - canvas.last_y;

    canvas.pos_x -= dx / canvas.cell_size;
    canvas.pos_y = Math.max(canvas.pos_y - dy  / canvas.cell_size, 0);

    canvas.last_x = e.clientX;
    canvas.last_y = e.clientY;

    draw_explore_canvas();
});

function explore() {
    reset();
    
    canvas.pos_x = 0;
    canvas.pos_y = 0;

    canvas.enabled = true;
    draw_explore_canvas();
}

button("explore", explore);

// Toggle simulator and explorer

function open_simulator() {
    mode = "simulator";
    el("explorer").style.display = "none";
    el("simulator").style.display = "";
    reset();
    render_tape();
}

function open_explorer() {
    mode = "explorer";
    el("explorer").style.display = "";
    el("simulator").style.display = "none";
}

button("open_simulator", open_simulator);
button("open_explorer", open_explorer);

open_simulator();