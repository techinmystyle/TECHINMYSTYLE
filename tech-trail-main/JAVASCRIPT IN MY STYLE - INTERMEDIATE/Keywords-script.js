// Combined script for info banner and Monaco editor functionality

// First, create and insert the info banner
document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");

  // Function to get a random color for the info banner
  function getRandomColor() {
    const colors = [
      { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-500" },
      { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-500" },
      { bg: "bg-red-100", text: "text-red-600", border: "border-red-500" },
      { bg: "bg-yellow-100", text: "text-yellow-600", border: "border-yellow-500" },
      { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-500" },
      { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-500" },
      { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-500" },
      { bg: "bg-teal-100", text: "text-teal-600", border: "border-teal-500" }
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Get random color for info banner
  const randomColor = getRandomColor();

  // Create the info banner with random color
  const infoBanner = document.createElement("div");
  infoBanner.className = `${randomColor.bg} ${randomColor.text} py-3 px-4 md:py-4 md:px-6 border-l-4 ${randomColor.border} text-sm md:text-base`;
  infoBanner.innerHTML = `
<div class="flex items-start">
    <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <p>
        <span>The <code class="${randomColor.bg.replace('100', '50')} px-2 py-1 rounded mx-1 inline-block">Keywords (var, let, const, this, etc.)</code> in JavaScript are reserved words that have special meaning in the language, including variable declaration keywords like <code>var</code>, <code>let</code>, <code>const</code>, context keywords like <code>this</code>, and control flow keywords like <code>if</code>, <code>for</code>, <code>return</code>. They're commonly used for variable declarations, scope management, object context, control structures, or defining the fundamental building blocks and syntax of JavaScript programs.</span>
    </p>
</div>
  `;

  // Create editor main section
  const mainSection = document.createElement("main");
  mainSection.innerHTML = `
    <div class="editor-grid">
      <div class="editor-section">
        <div class="tabs">
          <button class="tab" data-tab="html">HTML</button>
          <button class="tab" data-tab="css">CSS</button>
          <button class="tab active" data-tab="js">JavaScript</button>
        </div>
        <div id="editor" class="code-editor"></div>
      </div>

      <div class="preview-section">
        <div class="preview-header">
          <span>Preview</span>
          <div class="window-controls">
            <div class="control red"></div>
            <div class="control yellow"></div>
            <div class="control green"></div>
          </div>
        </div>
        <iframe id="preview" title="Preview"></iframe>
      </div>
    </div>
  `;

  // Insert both elements
  mainContent.appendChild(infoBanner);
  mainContent.appendChild(mainSection);

  // Initialize the editor now that the elements are in the DOM
  initializeEditor();
});

// Monaco Editor setup
function initializeEditor() {
  require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });

  let editor;
  let currentLanguage = 'js';
const defaultCode = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JS Keywords Example</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="keyword-container">
    <h1>JS Keywords Demo</h1>
    <button id="runBtn">Run Example</button>
    <pre id="output"></pre>
  </div>
  <script src="script.js"></script>
</body>
</html>`,

  css: `body {
  font-family: Arial, sans-serif;
  background-color: #f0fdf4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.keyword-container {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 500px;
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #059669;
}

pre {
  background-color: #f9fafb;
  text-align: left;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  white-space: pre-wrap;
}`,

  js: `const runBtn = document.getElementById("runBtn");
const output = document.getElementById("output");

runBtn.addEventListener("click", () => {
  output.textContent = "";

  // var
  var x = 5;
  {
    var x = 10;
  }
  output.textContent += "var x after block: " + x + "\\n";

  // let
  let y = 20;
  {
    let y = 30;
    output.textContent += "let y inside block: " + y + "\\n";
  }
  output.textContent += "let y outside block: " + y + "\\n";

  // const
  const z = 50;
  output.textContent += "const z: " + z + "\\n";

  // this
  const obj = {
    name: "Keyword Demo",
    showName: function () {
      return this.name;
    }
  };
  output.textContent += "'this' inside object: " + obj.showName();
});`
};


  let code = { ...defaultCode };

  // Initialize Monaco Editor
  require(['vs/editor/editor.main'], function() {
    // Define custom theme
    monaco.editor.defineTheme('codeTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'regexp', foreground: 'D16969' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'namespace', foreground: '569CD6' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'struct', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0', fontStyle: 'bold' },
        { token: 'interface', foreground: '4EC9B0' },
        { token: 'enum', foreground: '4EC9B0' },
        { token: 'typeParameter', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'member', foreground: '9CDCFE' },
        { token: 'macro', foreground: 'BD63C5' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'parameter', foreground: '9CDCFE' },
        { token: 'property', foreground: '9CDCFE' },
        { token: 'label', foreground: '717171' }
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorLineNumber.foreground': '#858585',
        'editorCursor.foreground': '#A6A6A6',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
        'editorWhitespace.foreground': '#3A3D41'
      }
    });

    editor = monaco.editor.create(document.getElementById('editor'), {
      value: code[currentLanguage],
      language: currentLanguage,
      theme: 'codeTheme',
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: 'JetBrains Mono',
      padding: { top: 16 },
      smoothScrolling: true,
      cursorSmoothCaretAnimation: 'on',
      formatOnPaste: true,
      formatOnType: true,
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      tabSize: 2,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on'
    });

    editor.onDidChangeModelContent(() => {
      code[currentLanguage] = editor.getValue();
      updatePreview();
    });

    // Initial preview
    updatePreview();

    // Handle window resize
    window.addEventListener('resize', () => {
      editor.layout();
    });

    // Set up tab switching after editor is initialized
    setupTabSwitching();

    // Tab switching function
    function setupTabSwitching() {
      const tabs = document.querySelectorAll('.tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const language = tab.dataset.tab;
          if (language === currentLanguage) return;

          // Save current content
          code[currentLanguage] = editor.getValue();

          // Update active tab
          document.querySelector('.tab.active').classList.remove('active');
          tab.classList.add('active');

          // Update editor language and content
          currentLanguage = language;
          monaco.editor.setModelLanguage(editor.getModel(), language);
          editor.setValue(code[language]);

          // Focus editor after switching
          setTimeout(() => editor.focus(), 100);
        });
      });
    }
  });

  // Preview functionality
  function updatePreview() {
    const wrappedJS = `
      try {
        const originalConsole = console.log;
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        const originalConsoleInfo = console.info;

        console.log = function(...args) {
          window.parent.postMessage({ type: 'log', content: args.join(' ') }, '*');
          originalConsole.apply(console, args);
        };

        console.error = function(...args) {
          window.parent.postMessage({ type: 'error', content: args.join(' ') }, '*');
          originalConsoleError.apply(console, args);
        };

        console.warn = function(...args) {
          window.parent.postMessage({ type: 'warning', content: args.join(' ') }, '*');
          originalConsoleWarn.apply(console, args);
        };

        console.info = function(...args) {
          window.parent.postMessage({ type: 'info', content: args.join(' ') }, '*');
          originalConsoleInfo.apply(console, args);
        };

        ${code.js}
      } catch (error) {
        window.parent.postMessage({ type: 'error', content: error.message }, '*');
      }
    `;

    const preview = document.getElementById('preview');
    preview.srcdoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${wrappedJS}</script>
        </body>
      </html>
    `;
  }
}

// Navigation Toggle Function
function toggleNav() {
  const navMenu = document.getElementById('navMenu');
  const overlay = document.getElementById('overlay');

  navMenu.classList.toggle('open');
  overlay.classList.toggle('active');

  // Prevent body scrolling when nav is open
  if (navMenu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Console message handling
window.addEventListener('message', event => {
  if (event.data && typeof event.data === 'object') {
    const { type, content } = event.data;
    console[type.toLowerCase()](content);
  }
});

// Back button functionality
document.addEventListener("DOMContentLoaded", () => {
  // Back button functionality if it exists
  const backBtn = document.getElementById('BackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  }
});
