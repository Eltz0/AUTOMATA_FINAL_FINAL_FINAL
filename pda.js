// Pushdown Automaton definitions
const pda = {
    states: [
        "start", "read0", "read1", "read2", "read3", "read4", "read5", 
        "read6", "read7", "read8", "accept", "reject"
    ],
    inputAlphabet: ['a', 'b'],
    stackAlphabet: ['Z'],
    startState: 'start',
    startStackSymbol: 'Z',
    acceptStates: ['accept'],
    rejectStates: ['reject'],
    transitions: {
        'start': {
            'ε': [['read0', 'Z']]
        },
        'read0': {
            'a': [['read1', 'Z']],
            'b': [['read1', 'Z']]
        },
        'read1': {
            'a': [['read2', 'Z']],
            'b': [['read2', 'Z']]
        },
        'read2': {
            'a': [['read4', 'Z']],
            'b': [['read3', 'Z']]
        },
        'read3': {
            'a': [['read5', 'Z']],
            'b': [['read3', 'Z']]
        },
        'read4': {
            'a': [['read5', 'Z']],
            'b': [['read6', 'Z']]
        },
        'read5': {
            'a': [['read7', 'Z']],
            'b': [['read5', 'Z']]
        },
        'read6': {
            'a': [['read7', 'Z']],
            'b': [['read8', 'Z']]
        },
        'read7': {
            'a': [['read8', 'Z']],
            'b': [['read7', 'Z']],
            'ε': [['accept', 'Z']]
        },
        'read8': {
            'a': [['read8', 'Z']],
            'b': [['read7', 'Z']],
            'ε': [['accept', 'Z']]
        }
    }
};

const pda_large = {
    states: [
        "start", "read0", "read1", "read2", "read3", "read4", "read5", "read6", "read7", "read8", "read9",
        "read10", "read11", "read12", "read13", "read14", "read15", "read16", "read17", "read18", "read19",
        "read20", "read21", "read22", "read23", "read24", "read25", "read26", "read27", "read28", "read29",
        "read30", "read31", "read32", "read33", "read34", "read35", "read36", "read37", "read38", "read39",
        "read40", "read41", "read42", "read43", "read44", "read45", "read46", "read47", "read48", "read49",
        "read50", "read51", "read52", "read53", "read54", "read55", "read56", "read57", "read58", "reject", "accept"
    ],
    inputAlphabet: ['0', '1'],
    stackAlphabet: ['Z'],
    startState: 'start',
    startStackSymbol: 'Z',
    acceptStates: ['accept'],
    rejectStates: ['reject'],
    transitions: {
        'start': {
            'ε': [['read0', 'Z']]
        },
        'read0': {
            '1': [['read2', 'Z']],
            '0': [['read1', 'Z']]
        },
        'read1': {
            '1': [['reject', 'Z']],
            '0': [['read3', 'Z']]
        },
        'read2': {
            '1': [['read3', 'Z']],
            '0': [['reject', 'Z']]
        },
        'read3': {
            '1': [['read4', 'Z']],
            '0': [['read5', 'Z']]
        },
        'read4': {
            '1': [['read6', 'Z']],
            '0': [['read7', 'Z']]
        },
        'read5': {
            '1': [['read7', 'Z']],
            '0': [['read6', 'Z']]
        },
        'read6': {
            '1': [['read8', 'Z']],
            '0': [['read9', 'Z']]
        },
        'read7': {
            '1': [['read10', 'Z']],
            '0': [['read10', 'Z']]
        },
        'read8': {
            '1': [['read11', 'Z']],
            '0': [['read36', 'Z']]
        },
        'read9': {
            '1': [['read35', 'Z']],
            '0': [['read21', 'Z']]
        },
        'read10': {
            '1': [['read13', 'Z']],
            '0': [['read12', 'Z']]
        },
        'read11': {
            '1': [['read14', 'Z']],
            '0': [['read15', 'Z']]
        },
        'read12': {
            '1': [['reject', 'Z']],
            '0': [['read16', 'Z']]
        },
        'read13': {
            '1': [['read16', 'Z']],
            '0': [['read17', 'Z']]
        },
        'read14': {
            '1': [['read18', 'Z']],
            '0': [['read34', 'Z']]
        },
        'read15': {
            '1': [['read32', 'Z']],
            '0': [['read21', 'Z']]
        },
        'read16': {
            '1': [['read16', 'Z']],
            '0': [['read20', 'Z']]
        },
        'read17': {
            '1': [['read16', 'Z']],
            '0': [['reject', 'Z']]
        },
        'read18': {
            '1': [['read14', 'Z']],
            '0': [['read19', 'Z']]
        },
        'read19': {
            '1': [['read31', 'Z']],
            '0': [['read21', 'Z']]
        },
        'read20': {
            '1': [['read52', 'Z']],
            '0': [['reject', 'Z']]
        },
        'read21': {
            '1': [['read8', 'Z']],
            '0': [['read22', 'Z']]
        },
        'read22': {
            '1': [['read32', 'Z']],
            '0': [['read23', 'Z']]
        },
        'read23': {
            '1': [['read24', 'Z']],
            '0': [['read22', 'Z']]
        },
        'read24': {
            '1': [['read25', 'Z']],
            '0': [['read33', 'Z']]
        },
        'read25': {
            '1': [['read26', 'Z']],
            '0': [['read27', 'Z']]
        },
        'read26': {
            '1': [['read28', 'Z']],
            '0': [['read29', 'Z']]
        },
        'read27': {
            '1': [['read32', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read28': {
            '1': [['read26', 'Z']],
            '0': [['read30', 'Z']]
        },
        'read29': {
            '1': [['read38', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read30': {
            '1': [['read31', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read31': {
            '1': [['read42', 'Z']],
            '0': [['read41', 'Z']]
        },
        'read32': {
            '1': [['read39', 'Z']],
            '0': [['read37', 'Z']]
        },
        'read33': {
            '1': [['read10', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read34': {
            '1': [['read38', 'Z']],
            '0': [['read39', 'Z']]
        },
        'read35': {
            '1': [['read39', 'Z']],
            '0': [['read40', 'Z']]
        },
        'read36': {
            '1': [['read10', 'Z']],
            '0': [['read39', 'Z']]
        },
        'read37': {
            '1': [['read48', 'Z']],
            '0': [['read12', 'Z']]
        },
        'read38': {
            '1': [['read43', 'Z']],
            '0': [['read53', 'Z']]
        },
        'read39': {
            '1': [['read44', 'Z']],
            '0': [['read45', 'Z']]
        },
        'read40': {
            '1': [['read44', 'Z']],
            '0': [['read12', 'Z']]
        },
        'read41': {
            '1': [['read48', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read42': {
            '1': [['read48', 'Z']],
            '0': [['read51', 'Z']]
        },
        'read43': {
            '1': [['read50', 'Z']],
            '0': [['read46', 'Z']]
        },
        'read44': {
            '1': [['read16', 'Z']],
            '0': [['read47', 'Z']]
        },
        'read45': {
            '1': [['read52', 'Z']],
            '0': [['read16', 'Z']]
        },
        'read46': {
            '1': [['read16', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read47': {
            '1': [['read50', 'Z']],
            '0': [['reject', 'Z']]
        },
        'read48': {
            '1': [['read50', 'Z']],
            '0': [['read49', 'Z']]
        },
        'read49': {
            '1': [['read50', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read50': {
            '1': [['read50', 'Z']],
            '0': [['read51', 'Z']]
        },
        'read51': {
            '1': [['read52', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read52': {
            '1': [['read52', 'Z']],
            '0': [['read53', 'Z']]
        },
        'read53': {
            '1': [['reject', 'Z']],
            '0': [['read54', 'Z']]
        },
        'read54': {
            '1': [['read56', 'Z']],
            '0': [['read55', 'Z']]
        },
        'read55': {
            '1': [['read56', 'Z']],
            '0': [['read58', 'Z']]
        },
        'read56': {
            '1': [['read57', 'Z']],
            '0': [['read55', 'Z']]
        },
        'read57': {
            '1': [['read57', 'Z']],
            '0': [['read55', 'Z']],
            'ε': [['accept', 'Z']]
        },
        'read58': {
            '1': [['read56', 'Z']],
            '0': [['read58', 'Z']],
            'ε': [['accept', 'Z']]
        }
    }
};

// Helper function to check if a string is accepted by the PDA
function validatePDA(input) {
    // Implementation will be added in script.js
    return false;
} 