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

    // Add zoom controls for DFA
    const dfaZoomControls = document.createElement('div');
    dfaZoomControls.className = 'zoom-controls';
    dfaZoomControls.innerHTML = `
      <button onclick="zoomIn('graph')" style="color: black;">+</button>
      <button onclick="zoomOut('graph')" style="color: black;">-</button>
      <button onclick="resetZoom('graph')" style="color: black;">Reset</button>
    `;
    document.querySelector('#graph').parentElement.insertBefore(dfaZoomControls, document.querySelector('#graph'));

    // Add zoom controls for PDA
    const pdaZoomControls = document.createElement('div');
    pdaZoomControls.className = 'zoom-controls';
    pdaZoomControls.innerHTML = `
      <button onclick="zoomIn('pda-graph')" style="color: black;">+</button>
      <button onclick="zoomOut('pda-graph')" style="color: black;">-</button>
      <button onclick="resetZoom('pda-graph')" style="color: black;">Reset</button>
    `;
    document.querySelector('#pda-graph').parentElement.insertBefore(pdaZoomControls, document.querySelector('#pda-graph'));

    // Define regex titles
    const regexTitles = {
      dfa: "(aa+ab+ba+bb)(a+b)*(aa*+bb*)((ba)*+(ab)*+(aa)+(bb))(aa+bb)(a+b)*",
      dfa_large: "(11+00)(11+00)*(1+0)(11+00+01+10)((101+111)+(00+11))1*011*00(0+1)*((11+00)+(111+000))"
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

    // Initialize zoom for both graphs
    initializeZoom('graph');
    initializeZoom('pda-graph');
  } catch (error) {
    console.error('Failed to initialize Viz.js:', error);
    document.getElementById('graph').innerHTML = 'Error: Failed to initialize graph visualization. Please check console for details.';
  }
});

// Zoom functionality
const zoomLevels = {
  'graph': 1,
  'pda-graph': 1
};
const offsets = {
  'graph': { x: 0, y: 0 },
  'pda-graph': { x: 0, y: 0 }
};
const ZOOM_STEP = 0.1;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.5;

function initializeZoom(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Add mouse wheel zoom
  element.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    zoomLevels[elementId] = Math.min(Math.max(zoomLevels[elementId] + delta, MIN_ZOOM), MAX_ZOOM);
    updateZoom(elementId);
  });

  // Add pan functionality
  let isPanning = false;
  let startPoint = { x: 0, y: 0 };

  element.addEventListener('mousedown', (e) => {
    isPanning = true;
    startPoint = { x: e.clientX, y: e.clientY };
    element.style.cursor = 'grabbing';
  });

  element.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    const dx = e.clientX - startPoint.x;
    const dy = e.clientY - startPoint.y;
    
    offsets[elementId].x += dx;
    offsets[elementId].y += dy;
    
    startPoint = { x: e.clientX, y: e.clientY };
    updatePan(elementId);
  });

  element.addEventListener('mouseup', () => {
    isPanning = false;
    element.style.cursor = 'grab';
  });

  element.addEventListener('mouseleave', () => {
    isPanning = false;
    element.style.cursor = 'grab';
  });

  // Set initial cursor style
  element.style.cursor = 'grab';
}

function updateZoom(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const svg = element.querySelector('svg');
  if (!svg) return;

  svg.style.transform = `scale(${zoomLevels[elementId]}) translate(${offsets[elementId].x}px, ${offsets[elementId].y}px)`;
  svg.style.transformOrigin = 'center';
}

function updatePan(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const svg = element.querySelector('svg');
  if (!svg) return;

  svg.style.transform = `scale(${zoomLevels[elementId]}) translate(${offsets[elementId].x}px, ${offsets[elementId].y}px)`;
}

function zoomIn(elementId) {
  zoomLevels[elementId] = Math.min(zoomLevels[elementId] + ZOOM_STEP, MAX_ZOOM);
  updateZoom(elementId);
}

function zoomOut(elementId) {
  zoomLevels[elementId] = Math.max(zoomLevels[elementId] - ZOOM_STEP, MIN_ZOOM);
  updateZoom(elementId);
}

function resetZoom(elementId) {
  zoomLevels[elementId] = 1;
  offsets[elementId] = { x: 0, y: 0 };
  updateZoom(elementId);
}

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
    const dot = `
      digraph {
        rankdir=LR;
        node [shape=circle, style=filled, fillcolor=lightgray];
        
        ${currentPDA.states.map(s => {
          const isReadState = s.includes('read');
          const isStartOrEnd = s === currentPDA.startState || currentPDA.acceptStates.includes(s);
          const shape = isReadState ? 'diamond' : 'circle';
          const color = s === currentPDA.startState ? 'lightgreen' : 
                       currentPDA.acceptStates.includes(s) ? 'lightgreen' : 'lightgray';
          return `"${s}" [shape=${shape}, fillcolor=${color}]`;
        }).join('\n')}

        ${Object.entries(currentPDA.transitions).flatMap(([from, trans]) =>
          Object.entries(trans).map(([sym, moves]) =>
            moves.map(([to, stackSym]) =>
              `"${from}" -> "${to}" [label="${sym},${stackSym}"]`
            ).join('\n')
          ).join('\n')
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

async function renderCFGGraph(input = "", currentCFG = cfg) {
  try {
    // Convert the plain text CFG to DOT format
    const lines = currentCFG.trim().split('\n');
    const dot = `
      digraph {
        rankdir=TB;
        node [shape=box, style=filled, fillcolor=lightgray];
        
        ${lines.map(line => {
          const [lhs, rhs] = line.split('→').map(s => s.trim());
          const productions = rhs.split('|').map(p => p.trim());
          return productions.map(p => `"${lhs}" -> "${p}"`).join('\n');
        }).join('\n')}
      }
    `;

    if (!viz) {
      throw new Error('Viz.js not initialized');
    }

    const svg = await viz.renderString(dot);
    document.getElementById('cfg-graph').innerHTML = svg;
    console.log('CFG Graph rendered successfully');
  } catch (error) {
    console.error('Error rendering CFG graph:', error);
    document.getElementById('cfg-graph').innerHTML = `Error rendering CFG graph: ${error.message}. Please check console for details.`;
  }
}
  