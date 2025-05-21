// CFG Validation
async function validateCFG() {
    const selectedDFA = document.getElementById('dfaSelector').value;
    const currentDFA = selectedDFA === 'dfa_large' ? dfa_large : dfa;
    const currentCFG = selectedDFA === 'dfa_large' ? cfg_large : cfg;
    const input = document.getElementById("inputStr").value.trim();
    
    // Validate input based on selected DFA
    const validInputPattern = selectedDFA === 'dfa_large' ? /^[01]*$/ : /^[ab]*$/;
    if (!validInputPattern.test(input)) {
        document.getElementById("result").textContent = selectedDFA === 'dfa_large' 
            ? "❌ Invalid input (only 0/1 allowed)" 
            : "❌ Invalid input (only a/b allowed)";
        return;
    }

    document.getElementById("result").textContent = "⏳ Validating CFG...";
    
    // First check if the string is accepted by the DFA
    let currentState = currentDFA.start;
    for (let symbol of input) {
        const nextState = currentDFA.transitions[currentState]?.[symbol];
        if (!nextState) {
            document.getElementById("result").textContent = `❌ CFG Rejected (string not accepted by DFA)`;
            return;
        }
        currentState = nextState;
    }
    
    // If we reach here, the string is accepted by the DFA
    const accepted = currentDFA.accept.includes(currentState);
    document.getElementById("result").textContent = accepted
        ? `✅ CFG Accepted (string accepted by DFA)`
        : `❌ CFG Rejected (string not accepted by DFA)`;
    
    // Update CFG visualization
    await renderCFGGraph(input, currentCFG);
}

// PDA Validation
async function validatePDA() {
    const selectedDFA = document.getElementById('dfaSelector').value;
    const currentDFA = selectedDFA === 'dfa_large' ? dfa_large : dfa;
    const currentPDA = selectedDFA === 'dfa_large' ? pda_large : pda;
    const input = document.getElementById("inputStr").value.trim();
    
    // Validate input based on selected DFA
    const validInputPattern = selectedDFA === 'dfa_large' ? /^[01]*$/ : /^[ab]*$/;
    if (!validInputPattern.test(input)) {
        document.getElementById("result").textContent = selectedDFA === 'dfa_large' 
            ? "❌ Invalid input (only 0/1 allowed)" 
            : "❌ Invalid input (only a/b allowed)";
        return;
    }

    document.getElementById("result").textContent = "⏳ Validating PDA...";
    
    // First check if the string is accepted by the DFA
    let currentState = currentDFA.start;
    for (let symbol of input) {
        const nextState = currentDFA.transitions[currentState]?.[symbol];
        if (!nextState) {
            document.getElementById("result").textContent = `❌ PDA Rejected (string not accepted by DFA)`;
            return;
        }
        currentState = nextState;
    }
    
    // If we reach here, the string is accepted by the DFA
    const accepted = currentDFA.accept.includes(currentState);
    document.getElementById("result").textContent = accepted
        ? `✅ PDA Accepted (string accepted by DFA)`
        : `❌ PDA Rejected (string not accepted by DFA)`;
    
    // Update PDA visualization
    await renderPDAGraph(input, currentPDA);
}

// Helper function to validate string against CFG
async function validateCFGString(input, cfg) {
    // This function is no longer needed as we're using DFA validation
    return false;
}

// Helper function to validate string against PDA
async function validatePDAString(input, pda) {
    // This function is no longer needed as we're using DFA validation
    return false;
}

// Render CFG visualization
async function renderCFGGraph(input, cfg) {
    try {
        const dot = `
            digraph {
                rankdir=TB;
                node [shape=box, style=filled, fillcolor=lightgray];
                
                // Add CFG visualization nodes and edges
                ${Object.entries(cfg.productions).map(([nonTerminal, productions]) => 
                    productions.map(prod => 
                        `"${nonTerminal}" -> "${prod.replace(/[01ab]/g, '') || 'ε'}" [label="${prod}"]`
                    ).join('\n')
                ).join('\n')}
            }
        `;

        if (!viz) {
            throw new Error('Viz.js not initialized');
        }

        const svg = await viz.renderString(dot);
        document.getElementById('cfg-graph').innerHTML = svg;
    } catch (error) {
        console.error('Error rendering CFG graph:', error);
        document.getElementById('cfg-graph').innerHTML = `Error rendering CFG graph: ${error.message}`;
    }
}

// Render PDA visualization
async function renderPDAGraph(input, pda) {
    try {
        const dot = `
            digraph {
                rankdir=LR;
                node [shape=circle, style=filled, fillcolor=lightgray];
                
                // Add PDA visualization nodes and edges
                ${Object.entries(pda.transitions).map(([state, transitions]) =>
                    Object.entries(transitions).map(([symbol, moves]) =>
                        moves.map(([nextState, stackSymbol]) =>
                            `"${state}" -> "${nextState}" [label="${symbol},${stackSymbol}"]`
                        ).join('\n')
                    ).join('\n')
                ).join('\n')}

                // Highlight accepting states
                ${pda.acceptStates.map(state => 
                    `"${state}" [shape=doublecircle, fillcolor=lightgreen]`
                ).join('\n')}
            }
        `;

        if (!viz) {
            throw new Error('Viz.js not initialized');
        }

        const svg = await viz.renderString(dot);
        document.getElementById('pda-graph').innerHTML = svg;
    } catch (error) {
        console.error('Error rendering PDA graph:', error);
        document.getElementById('pda-graph').innerHTML = `Error rendering PDA graph: ${error.message}`;
    }
} 