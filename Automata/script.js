// Initialize Viz.js with proper API
let viz;
document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Create a new Viz instance
    viz = new Viz();
    console.log('Viz.js initialized successfully');

    // Add DFA selector
    const dfaSelector = document.createElement('select');
    dfaSelector.id = 'dfaSelector';
    dfaSelector.innerHTML = `
      <option value="dfa">1st Regex</option>
      <option value="dfa_large">2nd Regex</option>
    `;
    document.querySelector('.input-group').insertBefore(dfaSelector, document.querySelector('.input-group button'));

    // Define regex titles
    const regexTitles = {
      dfa: "(aa+ab+ba+bb)(a+b)*(aa*+bb*)((ba)*+(ab)*+(aa)+(bb))(aa+bb)(a+b)*",
      dfa_large: "(11+00)(11+00)*(1+0)(11+00+01+10)((101+111))1*011*00(0+1)*((11+00)+(111+000))"
    };

    // Add event listener for DFA selection change
    dfaSelector.addEventListener('change', async () => {
      // Clear any previous results
      document.getElementById("result").textContent = "";
      document.getElementById("inputStr").value = "";
      // Update regex title
      document.getElementById("regex-title").textContent = regexTitles[dfaSelector.value];
      // Update all visualizations
      await renderGraph();
      await renderCFGGraph("", document.getElementById('dfaSelector').value === 'dfa_large' ? cfg_large : cfg);
      await renderPDAGraph("", document.getElementById('dfaSelector').value === 'dfa_large' ? pda_large : pda);
    });

    // Initial render of all visualizations
    document.getElementById("regex-title").textContent = regexTitles.dfa;
    await renderGraph();
    await renderCFGGraph("", cfg);
    await renderPDAGraph("", pda);
  } catch (error) {
    console.error('Failed to initialize Viz.js:', error);
    document.getElementById('graph').innerHTML = 'Error: Failed to initialize graph visualization. Please check console for details.';
  }
});

// Test graph to verify Viz.js is working
const testGraph = `
  digraph {
    rankdir=LR;
    node [shape=circle];
    A -> B [label="test"];
  }
`;

// Verify Viz.js is working by rendering a test graph
viz.renderString(testGraph)
  .then(svg => {
    console.log('Viz.js test render successful');
  })
  .catch(error => {
    console.error('Viz.js test render failed:', error);
    document.getElementById('graph').innerHTML = 'Error: Graph visualization is not working properly';
  });

async function renderGraph(currentState = null) {
  try {
    const selectedDFA = document.getElementById('dfaSelector').value;
    const currentDFA = selectedDFA === 'dfa_large' ? dfa_large : dfa;

    const dot = `
      digraph {
        rankdir=LR;
        node [shape=circle, style=filled, fillcolor=lightgray];

        ${currentDFA.states.map(s => {
          const shape = currentDFA.accept.includes(s) ? 'doublecircle' : 'circle';
          const color = s === currentState ? 'orange' : (currentDFA.accept.includes(s) ? 'lightgreen' : 'lightgray');
          return `"${s}" [shape=${shape}, fillcolor=${color}]`;
        }).join('\n')}

        ${Object.entries(currentDFA.transitions).flatMap(([from, trans]) =>
          Object.entries(trans).map(([sym, to]) =>
            `"${from}" -> "${to}" [label="${sym}"]`
          )
        ).join('\n')}
      }
    `;

    if (!viz) {
      throw new Error('Viz.js not initialized');
    }

    const svg = await viz.renderString(dot);
    document.getElementById('graph').innerHTML = svg;
    console.log('Graph rendered successfully');
  } catch (error) {
    console.error('Error rendering graph:', error);
    document.getElementById('graph').innerHTML = `Error rendering graph: ${error.message}. Please check console for details.`;
  }
}

async function simulate() {
  const selectedDFA = document.getElementById('dfaSelector').value;
  const currentDFA = selectedDFA === 'dfa_large' ? dfa_large : dfa;
  const input = document.getElementById("inputStr").value.trim();
  
  // Validate input based on selected DFA
  const validInputPattern = selectedDFA === 'dfa_large' ? /^[01]*$/ : /^[ab]*$/;
  if (!validInputPattern.test(input)) {
    document.getElementById("result").textContent = selectedDFA === 'dfa_large' 
      ? "❌ Invalid input (only 0/1 allowed)" 
      : "❌ Invalid input (only a/b allowed)";
    return;
  }

  let currentState = currentDFA.start;
  await renderGraph(currentState);
  document.getElementById("result").textContent = "⏳ Simulating...";

  for (let symbol of input) {
    await new Promise(r => setTimeout(r, 600));
    const nextState = currentDFA.transitions[currentState]?.[symbol];
    if (!nextState) {
      document.getElementById("result").textContent = `❌ Rejected at '${symbol}'`;
      await renderGraph(null);
      return;
    }
    currentState = nextState;
    await renderGraph(currentState);
  }

  await new Promise(r => setTimeout(r, 600));
  const accepted = currentDFA.accept.includes(currentState);
  document.getElementById("result").textContent = accepted
    ? `✅ Accepted (ended at ${currentState})`
    : `❌ Rejected (ended at ${currentState})`;
}

async function renderPDAGraph(input = "", currentPDA = pda) {
  try {
    if (!currentPDA || !currentPDA.states) {
      throw new Error('Invalid PDA configuration');
    }

    const dot = `
      digraph {
        rankdir=LR;
        node [shape=circle, style=filled, fillcolor=lightgray];
        
        ${currentPDA.states.map(s => {
          if (!s) return ''; // Skip undefined states
          const isReadState = typeof s === 'string' && s.includes('read');
          const isStartOrEnd = s === currentPDA.start || (currentPDA.accept && currentPDA.accept.includes(s));
          const shape = isReadState ? 'diamond' : 'circle';
          const color = s === currentPDA.start ? 'lightgreen' : 
                       (currentPDA.accept && currentPDA.accept.includes(s)) ? 'lightgreen' : 'lightgray';
          return `"${s}" [shape=${shape}, fillcolor=${color}]`;
        }).filter(Boolean).join('\n')}

        ${Object.entries(currentPDA.transitions || {}).flatMap(([from, trans]) =>
          Object.entries(trans || {}).map(([sym, to]) =>
            `"${from}" -> "${to}" [label="${sym}"]`
          )
        ).join('\n')}
      }
    `;

    if (!viz) {
      throw new Error('Viz.js not initialized');
    }

    const svg = await viz.renderString(dot);
    document.getElementById('pda-graph').innerHTML = svg;
    console.log('PDA Graph rendered successfully');
  } catch (error) {
    console.error('Error rendering PDA graph:', error);
    document.getElementById('pda-graph').innerHTML = `Error rendering PDA graph: ${error.message}. Please check console for details.`;
  }
}
  