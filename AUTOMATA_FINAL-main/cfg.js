// Context Free Grammar definitions
const cfg = `
S → aA | bA
A → aB | bB
B → aB | bB | C
C → aD | bE
D → aD | F
E → bE | F
F → G | H | aaI | bbI
G → baG | I
H → abH | I
I → aaJ | bbJ
J → aJ | bJ | ε
`;

const cfg_large = `
S → 11A | 00A
A → 11A | 00A | B
B → 1C | 0C
C → 1D | 0D
D → 1E | 0E
E → 101F | 111F | 00F | 11F
F → 1F | G
G → 01H
H → 1H | I
I → 00J
J → 1J | 0J | K
K → 11 | 00 | 111 | 000
`;

// Helper function to check if a string can be derived from the grammar
function validateCFG(input) {
    // Implementation will be added in script.js
    return false;
} 