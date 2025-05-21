// Context Free Grammar definitions
const cfg = {
    startSymbol: 'S',
    productions: {
        'S': ['A', 'B', 'C', 'D', 'E'],
        'A': ['aa', 'ab', 'ba', 'bb'],
        'B': ['aB', 'bB', ''],
        'C': ['aa*', 'bb*'],
        'D': ['baD', 'abD', 'aa', 'bb', ''],
        'E': ['aa', 'bb'],
        'F': ['aF', 'bF', '']
    }
};

const cfg_large = {
    startSymbol: 'S',
    productions: {
        'S': ['0A', '1B'],
        'A': ['0C', '1D'],
        'B': ['0D', '1C'],
        'C': ['0E', '1F'],
        'D': ['0F', '1E'],
        'E': ['0G', '1H'],
        'F': ['0H', '1G'],
        'G': ['0I', '1J'],
        'H': ['0J', '1I'],
        'I': ['0K', '1L'],
        'J': ['0L', '1K'],
        'K': ['0M', '1N'],
        'L': ['0N', '1M'],
        'M': ['0O', '1P'],
        'N': ['0P', '1O'],
        'O': ['0Q', '1R'],
        'P': ['0R', '1Q'],
        'Q': ['0S', '1T'],
        'R': ['0T', '1S'],
        'S': ['0U', '1V'],
        'T': ['0V', '1U'],
        'U': ['0W', '1X'],
        'V': ['0X', '1W'],
        'W': ['0Y', '1Z'],
        'X': ['0Z', '1Y'],
        'Y': ['0', '1'],
        'Z': ['0', '1']
    }
};

// Helper function to check if a string can be derived from the grammar
function validateCFG(input) {
    // Implementation will be added in script.js
    return false;
} 