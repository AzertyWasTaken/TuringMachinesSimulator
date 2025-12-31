export const PRESETS = {
    "increment": `// Input must be a string of 1s.\n\n
A 0 -> 1 L B\nA 1 -> 1 L A\n
B 0 -> 0 R Z`,

    "decrement": `// Input must be a string of 1s.\n\n
A 1 -> 0 R Z`,

    "zero": `// Input must be a string of 1s.\n\n
A 0 -> 0 R Z\nA 1 -> 0 R A`,

    "double": `// Input must be a string of 1s.\n\n
A 0 -> 0 R Z\nA 1 -> 0 R B\n
B 0 -> 0 R C\nB 1 -> 1 R B\n
C 1 -> 1 R C\nC 0 -> 1 R D\n
D 0 -> 1 L E\n
E 0 -> 0 L F\nE 1 -> 1 L E\n
F 0 -> 0 R A\nF 1 -> 1 L F`,

    "addition": `// Input must be two strings of 1s separated by a 0.\n\n
A 1 -> 0 R B\n
B 0 -> 1 L C\nB 1 -> 1 R B\n
C 0 -> 0 R Z\nC 1 -> 1 L C`,

    "multiplication": `// Input must be two strings of 1s separated by a 0.\n\n
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

    "bb3": `// Input must be empty.\n\n
A 0 -> 1 R B\nA 1 -> 1 R Z\n
B 0 -> 1 L B\nB 1 -> 0 R C\n
C 0 -> 1 L C\nC 1 -> 1 L A`,

    "bb4": `// Input must be empty.\n\n
A 0 -> 1 R B\nA 1 -> 1 L B\n
B 0 -> 1 L A\nB 1 -> 0 L C\n
C 0 -> 1 R Z\nC 1 -> 1 L D\n
D 0 -> 1 R D\nD 1 -> 0 R A`,

    "bb5": `// Input must be emptyt.\n\n
A 0 -> 1 R B\nA 1 -> 1 L C\n
B 0 -> 1 R C\nB 1 -> 1 R B\n
C 0 -> 1 R D\nC 1 -> 0 L E\n
D 0 -> 1 L A\nD 1 -> 1 L D\n
E 0 -> 1 R Z\nE 1 -> 0 L A`,
}

/* Double bouncer
A 0 -> 0 L D
A 1 -> 2 L B
A 2 -> 2 R A

B 0 -> 2 R C
B 2 -> 2 L B

C 2 -> 2 R A

D 0 -> 0 R Z
D 2 -> 1 L D
*/