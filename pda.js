// Pushdown Automaton definitions
const pda = {
    states: ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'],
    inputAlphabet: ['a', 'b'],
    stackAlphabet: ['Z', 'A', 'B'],
    startState: 'q0',
    startStackSymbol: 'Z',
    acceptStates: ['q10'],
    transitions: {
        'q0': {
            'a': [['q1', 'A']],
            'b': [['q2', 'B']]
        },
        'q1': {
            'a': [['q3', 'A']],
            'b': [['q4', 'B']]
        },
        'q2': {
            'a': [['q5', 'A']],
            'b': [['q6', 'B']]
        }
        // Additional transitions will be implemented in script.js
    }
};

const pda_large = {
    states: ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'],
    inputAlphabet: ['0', '1'],
    stackAlphabet: ['Z', 'A', 'B'],
    startState: 'q0',
    startStackSymbol: 'Z',
    acceptStates: ['q10'],
    transitions: {
        'q0': {
            '0': [['q1', 'A']],
            '1': [['q2', 'B']]
        },
        'q1': {
            '0': [['q3', 'A']],
            '1': [['q4', 'B']]
        },
        'q2': {
            '0': [['q5', 'A']],
            '1': [['q6', 'B']]
        },
        'q3': {
            '0': [['q7', 'A']],
            '1': [['q8', 'B']]
        },
        'q4': {
            '0': [['q8', 'A']],
            '1': [['q7', 'B']]
        },
        'q5': {
            '0': [['q9', 'A']],
            '1': [['q10', 'B']]
        },
        'q6': {
            '0': [['q10', 'A']],
            '1': [['q9', 'B']]
        }
    }
};

// Helper function to check if a string is accepted by the PDA
function validatePDA(input) {
    // Implementation will be added in script.js
    return false;
} 