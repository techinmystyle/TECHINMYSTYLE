// API Base URL - Update this to match your FastAPI endpoint
const API_BASE = "https://tech-trail-w2ap.onrender.com";

// Game State Management
class CSSLearningGame {
    constructor() {
        this.username = null;
        this.gameState = {
            exp: 0,
            completedTasks: new Set(),
            unlockedSolutions: new Set(),
            failedAttempts: {},
            theme: 'light',
            editorContent: {},
            htmlContent: {} // Store HTML content for each task
        };

        this.currentEditorMode = 'html'; // 'html' or 'css'

        this.tasks = {
            // BEGINNER TASKS (10 tasks - 10 EXP each)
            'beginner-1': {
                title: 'Basic CSS Selectors',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: Basic CSS Selectors</h4>
                    <p><strong>Instructions:</strong> Style the HTML elements with CSS:</p>
                    <ul>
                        <li>Make the h1 element color red</li>
                        <li>Make the paragraph color blue</li>
                        <li>Make the span element color green</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<h1>Main Heading</h1>
<p>This is a paragraph with a <span>highlighted word</span>.</p>`,
                solution: `h1 {
  color: red;
}

p {
  color: blue;
}

span {
  color: green;
}`,
                validate: (code) => {
                    const hasH1Red = /h1\s*\{[^}]*color\s*:\s*red/i.test(code);
                    const hasPBlue = /p\s*\{[^}]*color\s*:\s*blue/i.test(code);
                    const hasSpanGreen = /span\s*\{[^}]*color\s*:\s*green/i.test(code);
                    return hasH1Red && hasPBlue && hasSpanGreen;
                }
            },
            'beginner-2': {
                title: 'CSS Font Properties',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS Font Properties</h4>
                    <p><strong>Instructions:</strong> Apply font styling:</p>
                    <ul>
                        <li>Make the h1 font-size 24px</li>
                        <li>Make the h1 font-weight bold</li>
                        <li>Make the paragraph font-family Arial</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<h1>Styled Heading</h1>
<p>This paragraph should have Arial font.</p>`,
                solution: `h1 {
  font-size: 24px;
  font-weight: bold;
}

p {
  font-family: Arial;
}`,
                validate: (code) => {
                    const hasH1FontSize = /h1\s*\{[^}]*font-size\s*:\s*24px/i.test(code);
                    const hasH1FontWeight = /h1\s*\{[^}]*font-weight\s*:\s*bold/i.test(code);
                    const hasPFontFamily = /p\s*\{[^}]*font-family\s*:\s*arial/i.test(code);
                    return hasH1FontSize && hasH1FontWeight && hasPFontFamily;
                }
            },
            'beginner-3': {
                title: 'CSS Background Colors',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS Background Colors</h4>
                    <p><strong>Instructions:</strong> Apply background colors:</p>
                    <ul>
                        <li>Give the div a background-color of lightblue</li>
                        <li>Give the paragraph a background-color of lightyellow</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<div>
  <p>This paragraph is inside a div.</p>
</div>`,
                solution: `div {
  background-color: lightblue;
}

p {
  background-color: lightyellow;
}`,
                validate: (code) => {
                    const hasDivBg = /div\s*\{[^}]*background-color\s*:\s*lightblue/i.test(code);
                    const hasPBg = /p\s*\{[^}]*background-color\s*:\s*lightyellow/i.test(code);
                    return hasDivBg && hasPBg;
                }
            },
            'beginner-4': {
                title: 'CSS Text Alignment',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS Text Alignment</h4>
                    <p><strong>Instructions:</strong> Align text elements:</p>
                    <ul>
                        <li>Center align the h1 element</li>
                        <li>Right align the paragraph</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<h1>Centered Title</h1>
<p>This paragraph should be right-aligned.</p>`,
                solution: `h1 {
  text-align: center;
}

p {
  text-align: right;
}`,
                validate: (code) => {
                    const hasH1Center = /h1\s*\{[^}]*text-align\s*:\s*center/i.test(code);
                    const hasPRight = /p\s*\{[^}]*text-align\s*:\s*right/i.test(code);
                    return hasH1Center && hasPRight;
                }
            },
            'beginner-5': {
                title: 'CSS Margins',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS Margins</h4>
                    <p><strong>Instructions:</strong> Apply margins:</p>
                    <ul>
                        <li>Give the h1 a margin-top of 20px</li>
                        <li>Give the paragraph a margin-left of 30px</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<h1>Heading with Top Margin</h1>
<p>Paragraph with Left Margin</p>`,
                solution: `h1 {
  margin-top: 20px;
}

p {
  margin-left: 30px;
}`,
                validate: (code) => {
                    const hasH1MarginTop = /h1\s*\{[^}]*margin-top\s*:\s*20px/i.test(code);
                    const hasPMarginLeft = /p\s*\{[^}]*margin-left\s*:\s*30px/i.test(code);
                    return hasH1MarginTop && hasPMarginLeft;
                }
            },
            'beginner-6': {
                title: 'CSS Padding',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS Padding</h4>
                    <p><strong>Instructions:</strong> Apply padding:</p>
                    <ul>
                        <li>Give the div padding of 15px</li>
                        <li>Give the paragraph padding-top of 10px</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<div>
  <p>This paragraph is inside a padded div.</p>
</div>`,
                solution: `div {
  padding: 15px;
}

p {
  padding-top: 10px;
}`,
                validate: (code) => {
                    const hasDivPadding = /div\s*\{[^}]*padding\s*:\s*15px/i.test(code);
                    const hasPPaddingTop = /p\s*\{[^}]*padding-top\s*:\s*10px/i.test(code);
                    return hasDivPadding && hasPPaddingTop;
                }
            },
            'beginner-7': {
                title: 'CSS Borders',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS Borders</h4>
                    <p><strong>Instructions:</strong> Add borders:</p>
                    <ul>
                        <li>Give the box border: 2px solid black</li>
                        <li>Give the paragraph border-bottom: 1px solid red</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<div>
  <p>This paragraph has a bottom border.</p>
</div>`,
                solution: `div {
  border: 2px solid black;
}

p {
  border-bottom: 1px solid red;
}`,
                validate: (code) => {
                    const hasDivBorder = /div\s*\{[^}]*border\s*:\s*2px\s+solid\s+black/i.test(code);
                    const hasPBorderBottom = /p\s*\{[^}]*border-bottom\s*:\s*1px\s+solid\s+red/i.test(code);
                    return hasDivBorder && hasPBorderBottom;
                }
            },
            'beginner-8': {
                title: 'CSS Width and Height',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS Width and Height</h4>
                    <p><strong>Instructions:</strong> Set dimensions:</p>
                    <ul>
                        <li>Give the div width: 200px and height: 100px</li>
                        <li>Give the paragraph width: 150px</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<div>
  <p>This paragraph has a specific width.</p>
</div>`,
                solution: `div {
  width: 200px;
  height: 100px;
}

p {
  width: 150px;
}`,
                validate: (code) => {
                    const hasDivWidth = /div\s*\{[^}]*width\s*:\s*200px/i.test(code);
                    const hasDivHeight = /div\s*\{[^}]*height\s*:\s*100px/i.test(code);
                    const hasPWidth = /p\s*\{[^}]*width\s*:\s*150px/i.test(code);
                    return hasDivWidth && hasDivHeight && hasPWidth;
                }
            },
            'beginner-9': {
                title: 'CSS List Styling',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS List Styling</h4>
                    <p><strong>Instructions:</strong> Style the list:</p>
                    <ul>
                        <li>Remove bullets from ul (list-style-type: none)</li>
                        <li>Make li elements display: inline</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>`,
                solution: `ul {
  list-style-type: none;
}

li {
  display: inline;
}`,
                validate: (code) => {
                    const hasUlListStyle = /ul\s*\{[^}]*list-style-type\s*:\s*none/i.test(code);
                    const hasLiDisplay = /li\s*\{[^}]*display\s*:\s*inline/i.test(code);
                    return hasUlListStyle && hasLiDisplay;
                }
            },
            'beginner-10': {
                title: 'CSS Class Selectors',
                level: 'beginner',
                exp: 10,
                instructions: `
                    <h4>Task: CSS Class Selectors</h4>
                    <p><strong>Instructions:</strong> Style elements with classes:</p>
                    <ul>
                        <li>Make elements with class "highlight" background-color yellow</li>
                        <li>Make elements with class "large" font-size 18px</li>
                    </ul>
                    <p><strong>Reward:</strong> 10 EXP</p>
                `,
                htmlContent: `<p class="highlight">This paragraph is highlighted.</p>
<p class="large">This paragraph is large.</p>
<p class="highlight large">This paragraph is both.</p>`,
                solution: `.highlight {
  background-color: yellow;
}

.large {
  font-size: 18px;
}`,
                validate: (code) => {
                    const hasHighlightBg = /\.highlight\s*\{[^}]*background-color\s*:\s*yellow/i.test(code);
                    const hasLargeFontSize = /\.large\s*\{[^}]*font-size\s*:\s*18px/i.test(code);
                    return hasHighlightBg && hasLargeFontSize;
                }
            },
            // INTERMEDIATE TASKS (10 tasks - 20 EXP each)
            'intermediate-1': {
                title: 'CSS Flexbox Basics',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Flexbox Basics</h4>
                    <p><strong>Instructions:</strong> Create a flex container:</p>
                    <ul>
                        <li>Make the container display: flex</li>
                        <li>Set justify-content: center</li>
                        <li>Set align-items: center</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>`,
                solution: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
                validate: (code) => {
                    const hasContainerFlex = /\.container\s*\{[^}]*display\s*:\s*flex/i.test(code);
                    const hasJustify = /\.container\s*\{[^}]*justify-content\s*:\s*center/i.test(code);
                    const hasAlign = /\.container\s*\{[^}]*align-items\s*:\s*center/i.test(code);
                    return hasContainerFlex && hasJustify && hasAlign;
                }
            },
            'intermediate-2': {
                title: 'CSS Grid Layout',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Grid Layout</h4>
                    <p><strong>Instructions:</strong> Build a grid layout:</p>
                    <ul>
                        <li>Make the container display: grid</li>
                        <li>Define 3 equal columns</li>
                        <li>Give child items background lightgray and padding 10px</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>`,
                solution: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}`,
                validate: (code) => {
                    const hasContainerGrid = /\.grid-container\s*\{[^}]*display\s*:\s*grid/i.test(code);
                    const hasGridColumns = /\.grid-container\s*\{[^}]*grid-template-columns\s*:\s*1fr\s+1fr\s+1fr/i.test(code);
                    const hasGap = /\.grid-container\s*\{[^}]*gap\s*:\s*10px/i.test(code);
                    return hasContainerGrid && hasGridColumns && hasGap;
                }
            },
            'intermediate-3': {
                title: 'CSS Positioning',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Positioning</h4>
                    <p><strong>Instructions:</strong> Position elements:</p>
                    <ul>
                        <li>Make the container position: relative</li>
                        <li>Make the box position: absolute</li>
                        <li>Set top: 20px and right: 20px for the box</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="container">
  <p>This is the container content.</p>
  <div class="box">Positioned Box</div>
</div>`,
                solution: `.container {
  position: relative;
}

.box {
  position: absolute;
  top: 20px;
  right: 20px;
}`,
                validate: (code) => {
                    const hasContainerRelative = /\.container\s*\{[^}]*position\s*:\s*relative/i.test(code);
                    const hasBoxAbsolute = /\.box\s*\{[^}]*position\s*:\s*absolute/i.test(code);
                    const hasBoxTop = /\.box\s*\{[^}]*top\s*:\s*20px/i.test(code);
                    const hasBoxRight = /\.box\s*\{[^}]*right\s*:\s*20px/i.test(code);
                    return hasContainerRelative && hasBoxAbsolute && hasBoxTop && hasBoxRight;
                }
            },
            'intermediate-4': {
                title: 'CSS Hover Effects',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Hover Effects</h4>
                    <p><strong>Instructions:</strong> Add hover effects:</p>
                    <ul>
                        <li>Make buttons background blue (#3498db)</li>
                        <li>On hover, change background to green (#2ecc71)</li>
                        <li>Add transition duration of 0.3s for smooth effect</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<button class="btn">Hover Me</button>
<button class="btn">Another Button</button>`,
                solution: `.btn {
  background-color: blue;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: red;
}`,
                validate: (code) => {
                    const hasBtnBlue = /\.btn\s*\{[^}]*background-color\s*:\s*blue/i.test(code);
                    const hasTransition = /\.btn\s*\{[^}]*transition\s*:\s*background-color\s+0\.3s/i.test(code);
                    const hasBtnHoverRed = /\.btn:hover\s*\{[^}]*background-color\s*:\s*red/i.test(code);
                    return hasBtnBlue && hasTransition && hasBtnHoverRed;
                }
            },
            'intermediate-5': {
                title: 'CSS Responsive Design',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Responsive Design</h4>
                    <p><strong>Instructions:</strong> Create responsive layout:</p>
                    <ul>
                        <li>Make container width: 100% and max-width: 800px</li>
                        <li>Add media query for max-width: 600px</li>
                        <li>In media query, make container font-size: 14px</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="container">
  <h2>Responsive Container</h2>
  <p>This container adapts to screen size.</p>
</div>`,
                solution: `.container {
  width: 100%;
  max-width: 800px;
}

@media (max-width: 600px) {
  .container {
    font-size: 14px;
  }
}`,
                validate: (code) => {
                    const hasContainerWidth = /\.container\s*\{[^}]*width\s*:\s*100%/i.test(code);
                    const hasContainerMaxWidth = /\.container\s*\{[^}]*max-width\s*:\s*800px/i.test(code);
                    const hasMediaQuery = /@media\s*\(max-width\s*:\s*600px\)/i.test(code);
                    const hasMediaFontSize = /@media[\s\S]*\.container\s*\{[^}]*font-size\s*:\s*14px/i.test(code);
                    return hasContainerWidth && hasContainerMaxWidth && hasMediaQuery && hasMediaFontSize;
                }
            },
            'intermediate-6': {
                title: 'CSS Transforms',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Transforms</h4>
                    <p><strong>Instructions:</strong> Apply transforms:</p>
                    <ul>
                        <li>Make the box transform: rotate(45deg)</li>
                        <li>Make the box transform: scale(1.2) on hover</li>
                        <li>Add transition: transform 0.3s</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="ball">Bouncing Ball</div>`,
                solution: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.ball {
  animation: bounce 2s infinite;
}`,
                validate: (code) => {
                    const hasKeyframes = /@keyframes\s+bounce/i.test(code);
                    const hasTranslateY0 = /transform\s*:\s*translateY\(\s*0\s*\)/i.test(code);
                    const hasTranslateYNeg20 = /transform\s*:\s*translateY\(\s*-20px\s*\)/i.test(code);
                    const hasBallAnimation = /\.ball\s*\{[^}]*animation\s*:\s*bounce\s+2s\s+infinite/i.test(code);
                    return hasKeyframes && hasTranslateY0 && hasTranslateYNeg20 && hasBallAnimation;
                }
            },
            'intermediate-7': {
                title: 'CSS Shadows',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Transitions</h4>
                    <p><strong>Instructions:</strong> Add a smooth hover effect:</p>
                    <ul>
                        <li>Make button background blue (#3498db)</li>
                        <li>On hover, change background to green (#2ecc71)</li>
                        <li>Add transition duration of 0.3s for smooth effect</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="card"><h3>Shadowed Text</h3>
<p>This card has a shadow effect.</p>
</div>`,
                solution: `.card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.text {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}`,
                validate: (code) => {
                    const hasCardBoxShadow = /\.card\s*\{[^}]*box-shadow\s*:\s*0\s+4px\s+8px\s+rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.1\s*\)/i.test(code);
                    const hasTextShadow = /\.text\s*\{[^}]*text-shadow\s*:\s*2px\s+2px\s+4px\s+rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.3\s*\)/i.test(code);
                    return hasCardBoxShadow && hasTextShadow;
                }
            },
            'intermediate-8': {
                title: 'CSS Gradients',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Gradient Layout</h4>
                    <p><strong>Instructions:</strong> Use flexbox to center items:</p>
                    <ul>
                        <li>Make .container a flexbox</li>
                        <li>Center items horizontally and vertically</li>
                        <li>Give child divs width 100px, height 100px, background red</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="header"><h2>Gradient Header</h2></div>
<div class="circle">Radial Gradient</div>`,
                solution: `.header {
  background: linear-gradient(to right, blue, purple);
}

.circle {
  background: radial-gradient(circle, red, yellow);
}`,
                validate: (code) => {
                    const hasHeaderLinearGradient = /\.header\s*\{[^}]*background\s*:\s*linear-gradient\(\s*to\s+right\s*,\s*blue\s*,\s*purple\s*\)/i.test(code);
                    const hasCircleRadialGradient = /\.circle\s*\{[^}]*background\s*:\s*radial-gradient\(\s*circle\s*,\s*red\s*,\s*yellow\s*\)/i.test(code);
                    return hasHeaderLinearGradient && hasCircleRadialGradient;
                }
            },
            'intermediate-9': {
                title: 'CSS Animations',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Animation</h4>
                    <p><strong>Instructions:</strong> Animate a box:</p>
                    <ul>
                        <li>Create a keyframes "moveRight"</li>
                        <li>Animate .box from left: 0 to left: 200px</li>
                        <li>Duration: 2s infinite alternate</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="ball">Bouncing Ball</div>`,
                solution: `@keyframes moveRight {
  0% { left: 0; }
  100% { left: 200px; }
}

.ball {
  animation: moveRight 2s infinite alternate;
}`,
                validate: (code) => {
                    const hasKeyframes = /@keyframes\s+moveRight/i.test(code);
                    const hasLeft0 = /left\s*:\s*0;/i.test(code);
                    const hasLeft200 = /left\s*:\s*200px;/i.test(code);
                    const hasBallAnimation = /\.ball\s*\{[^}]*animation\s*:\s*moveRight\s+2s\s+infinite\s+alternate/i.test(code);
                    return hasKeyframes && hasLeft0 && hasLeft200 && hasBallAnimation;
                }
            },
            'intermediate-10': {
                title: 'CSS Variables',
                level: 'intermediate',
                exp: 20,
                instructions: `
                    <h4>Task: CSS Variable Usage</h4>
                    <p><strong>Instructions:</strong> Use CSS variables:</p>
                    <ul>
                        <li>Create primary and secondary color variables</li>
                        <li>Apply these variables to elements</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="primary">Primary Color</div>
<div class="secondary">Secondary Color</div>`,
                solution: `:root {
  --primary-color: #3498db;
  --secondary-color: #e74c3c;
}

.primary { background: var(--primary-color); }
.secondary { background: var(--secondary-color); }`,
                validate: (code) => {
                    const hasRootPrimary = /:root\s*\{[^}]*--primary-color/i.test(code);
                    const hasRootSecondary = /:root\s*\{[^}]*--secondary-color/i.test(code);
                    const hasPrimaryVar = /\.primary\s*\{[^}]*background\s*:\s*var\(\s*--primary-color\s*\)/i.test(code);
                    const hasSecondaryVar = /\.secondary\s*\{[^}]*background\s*:\s*var\(\s*--secondary-color\s*\)/i.test(code);
                    return hasRootPrimary && hasRootSecondary && hasPrimaryVar && hasSecondaryVar;
                }
            },
            // ADVANCED TASKS
            'advanced-1': {
                title: 'Advanced Flexbox Layout',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: Responsive Navbar</h4>
                    <p><strong>Instructions:</strong> Build a navbar:</p>
                    <ul>
                        <li>Use flexbox for horizontal layout</li>
                        <li>On screens smaller than 600px, stack vertically</li>
                        <li>Style links with padding and hover effect</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
                solution: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--primary-color);
}

.menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  margin-left: 1.5rem;
}

.menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}`,

                validate: (code) => {
                    const hasNavbarFlex = /\.navbar\s*\{[^}]*display\s*:\s*flex/i.test(code);
                    const hasMenuFlex = /\.menu\s*\{[^}]*display\s*:\s*flex/i.test(code);
                    const hasLinkHover = /\.menu\s*[^}]*a\s*:hover\s*\{[^}]*background-color\s*:\s*rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.2\s*\)/i.test(code);
                    return hasNavbarFlex && hasMenuFlex && hasLinkHover;
                }
            },
            'advanced-2': {
                title: 'Advanced Grid Layout',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: Card Layout with Grid</h4>
                    <p><strong>Instructions:</strong> Create card layout:</p>
                    <ul>
                        <li>Create a grid with 3 cards per row</li>
                        <li>Each card has shadow, padding, and border-radius</li>
                        <li>On small screens, make 1 card per row</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="dashboard">
  <aside class="sidebar">Sidebar Content</aside>
  <main class="content">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
  </main>
</div>`,
                solution: `.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}`,

                validate: (code) => {
                    const hasDashboardGrid = /\.dashboard\s*\{[^}]*display\s*:\s*grid/i.test(code);
                    const hasAutoFit = /\.dashboard\s*\{[^}]*grid-template-columns\s*:\s*repeat\(auto-fit,\s*minmax\(250px,\s*1fr\)\)/i.test(code);
                    const hasGap = /\.dashboard\s*\{[^}]*gap\s*:\s*20px/i.test(code);
                    const hasCardStyles = /\.card\s*\{[^}]*background\s*:\s*white/i.test(code);
                    return hasDashboardGrid && hasAutoFit && hasGap && hasCardStyles;
                }
            },
            'advanced-3': {
                title: 'Complex Animations',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: CSS Modal Popup</h4>
                    <p><strong>Instructions:</strong> Create a modal:</p>
                    <ul>
                        <li>Create a modal centered on screen</li>
                        <li>Use semi-transparent background overlay</li>
                        <li>Hide modal by default, show with a class .active</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<button class="open-modal-btn">Open Modal</button>
<div class="modal-overlay hidden">
  <div class="modal-content">
    <h2>Modal Title</h2>
    <p>This is a modal window.</p>
    <button class="close-modal-btn">Close</button>
  </div>
</div>`,

                solution: `.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}`,

                validate: (code) => {
                    const hasOverlayFixed = /\.modal-overlay\s*\{[^}]*position\s*:\s*fixed/i.test(code);
                    const hasOverlayBackground = /\.modal-overlay\s*\{[^}]*background-color\s*:\s*rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.5\s*\)/i.test(code);
                    const hasOverlayFlex = /\.modal-overlay\s*\{[^}]*display\s*:\s*flex/i.test(code);
                    const hasContentRadius = /\.modal-content\s*\{[^}]*border-radius\s*:\s*8px/i.test(code);
                    return hasOverlayFixed && hasOverlayBackground && hasOverlayFlex && hasContentRadius;
                }
            },
            'advanced-4': {
                title: 'CSS Custom Properties Advanced',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: Image Gallery with Flexbox</h4>
                    <p><strong>Instructions:</strong> Build a gallery:</p>
                    <ul>
                        <li>Arrange images in a row using flexbox</li>
                        <li>Wrap images to next line if space is small</li>
                        <li>Add hover effect to scale image slightly</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="gallery">
  <img src="image1.jpg" alt="Gallery Image 1">
  <img src="image2.jpg" alt="Gallery Image 2">
  <img src="image3.jpg" alt="Gallery Image 3">
</div>`,

                solution: `.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.gallery img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s;
}

.gallery img:hover {
  transform: scale(1.05);
}`,

                validate: (code) => {
                    const hasGalleryFlex = /\.gallery\s*\{[^}]*display\s*:\s*flex/i.test(code);
                    const hasFlexWrap = /\.gallery\s*\{[^}]*flex-wrap\s*:\s*wrap/i.test(code);
                    const hasGap = /\.gallery\s*\{[^}]*gap\s*:\s*15px/i.test(code);
                    const hasImageHover = /\.gallery\s*[^}]*img\s*:\s*hover\s*\{[^}]*transform\s*:\s*scale\(\s*1\.05\s*\)/i.test(code);
                    return hasGalleryFlex && hasFlexWrap && hasGap && hasImageHover;
                }
            },
            'advanced-5': {
                title: 'CSS Grid + Flexbox Combo',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: Sticky Header</h4>
                    <p><strong>Instructions:</strong> Make sticky header:</p>
                    <ul>
                        <li>Make header stick to top when scrolling</li>
                        <li>Add background color and box-shadow for visibility</li>
                        <li>Ensure content below is not overlapped</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<header class="sticky-header">
  <h1>Sticky Header</h1>
</header>
<main class="content">
  <section>Content Section 1</section>
  <section>Content Section 2</section>
  <section>Content Section 3</section>
</main>`,

                solution: `header.sticky-header {
  position: sticky;
  top: 0;
  background-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
}

.content {
  margin-top: 60px; /* Space for sticky header */
}`,

                validate: (code) => {
                    const hasHeaderSticky = /header\s*\.\s*sticky-header\s*\{[^}]*position\s*:\s*sticky/i.test(code);
                    const hasHeaderTop = /header\s*\.\s*sticky-header\s*\{[^}]*top\s*:\s*0/i.test(code);
                    const hasHeaderBackground = /header\s*\.\s*sticky-header\s*\{[^}]*background-color\s*:\s*var\(\s*--primary-color\s*\)/i.test(code);
                    const hasHeaderShadow = /header\s*\.\s*sticky-header\s*\{[^}]*box-shadow\s*:\s*0\s+2px\s+4px\s+rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.1\s*\)/i.test(code);
                    const hasContentMargin = /main\s*\.\s*content\s*\{[^}]*margin-top\s*:\s*60px/i.test(code);
                    return hasHeaderSticky && hasHeaderTop && hasHeaderBackground && hasHeaderShadow && hasContentMargin;
                }
            },
            'advanced-6': {
                title: 'CSS Clipping and Masking',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: CSS Tooltip</h4>
                    <p><strong>Instructions:</strong> Create tooltip:</p>
                    <ul>
                        <li>Create a tooltip that appears on hover</li>
                        <li>Position tooltip above the element</li>
                        <li>Add fade-in transition effect</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="tooltip-container">
  <span class="tooltip-trigger">Hover over me</span>
  <div class="tooltip">Tooltip content</div>
</div>`,

                solution: `.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--dark-color);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  white-space: nowrap;
}

.tooltip-trigger:hover + .tooltip {
  opacity: 1;
}`,

                validate: (code) => {
                    const hasContainerPosition = /\.tooltip-container\s*\{[^}]*position\s*:\s*relative/i.test(code);
                    const hasTooltipPosition = /\.tooltip\s*\{[^}]*position\s*:\s*absolute/i.test(code);
                    const hasTooltipTop = /\.tooltip\s*\{[^}]*top\s*:\s*-30px/i.test(code);
                    const hasTooltipTransform = /\.tooltip\s*\{[^}]*transform\s*:\s*translateX\(\s*-50%\s*\)/i.test(code);
                    const hasOpacityTransition = /\.tooltip\s*\{[^}]*transition\s*:\s*opacity\s+0\.3s/i.test(code);
                    const hasPointerEventsNone = /\.tooltip\s*\{[^}]*pointer-events\s*:\s*none/i.test(code);
                    return hasContainerPosition && hasTooltipPosition && hasTooltipTop && hasTooltipTransform && hasOpacityTransition && hasPointerEventsNone;
                }
            },
            'advanced-7': {
                title: 'CSS Filter Effects',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: CSS Progress Bar</h4>
                    <p><strong>Instructions:</strong> Build a progress bar:</p>
                    <ul>
                        <li>Create a progress bar container</li>
                        <li>Inner bar should animate width from 0 to 70%</li>
                        <li>Add transition effect for smooth fill</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="progress-bar-container">
  <div class="progress-fill"></div>
</div>`,

                solution: `.progress-bar-container {
  width: 100%;
  height: 20px;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  transition: width 0.5s ease;
}`,

                validate: (code) => {
                    const hasContainerWidth = /\.progress-bar-container\s*\{[^}]*width\s*:\s*100%/i.test(code);
                    const hasContainerHeight = /\.progress-bar-container\s*\{[^}]*height\s*:\s*20px/i.test(code);
                    const hasContainerRadius = /\.progress-bar-container\s*\{[^}]*border-radius\s*:\s*10px/i.test(code);
                    const hasFillHeight = /\.progress-fill\s*\{[^}]*height\s*:\s*100%/i.test(code);
                    const hasFillTransition = /\.progress-fill\s*\{[^}]*transition\s*:\s*width\s+0\.5s\s+ease/i.test(code);
                    return hasContainerWidth && hasContainerHeight && hasContainerRadius && hasFillHeight && hasFillTransition;
                }
            },
            'advanced-8': {
                title: 'CSS 3D Transforms',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: CSS Accordion</h4>
                    <p><strong>Instructions:</strong> Create accordion:</p>
                    <ul>
                        <li>Create collapsible panels using CSS only</li>
                        <li>Use hidden checkbox/input to toggle visibility</li>
                        <li>Add smooth max-height transition</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="accordion">
  <input type="checkbox" id="panel1" class="accordion-input">
  <label for="panel1" class="accordion-label">Panel 1</label>
  <div class="accordion-content">
    <p>Panel 1 content...</p>
  </div>
  
  <input type="checkbox" id="panel2" class="accordion-input">
  <label for="panel2" class="accordion-label">Panel 2</label>
  <div class="accordion-content">
    <p>Panel 2 content...</p>
  </div>
</div>`,

                solution: `/* Base styles */
.accordion {
  max-width: 600px;
  margin: 0 auto;
}

.accordion-input {
  display: none;
}

.accordion-label {
  display: block;
  padding: 15px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.accordion-label:hover {
  background: var(--accent-color);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: #f8f9fa;
  padding: 0 15px;
}`,

                validate: (code) => {
                    const hasInputHidden = /\.accordion-input\s*\{[^}]*display\s*:\s*none/i.test(code);
                    const hasLabelBlock = /\.accordion-label\s*\{[^}]*display\s*:\s*block/i.test(code);
                    const hasLabelPadding = /\.accordion-label\s*\{[^}]*padding\s*:\s*15px/i.test(code);
                    const hasLabelCursor = /\.accordion-label\s*\{[^}]*cursor\s*:\s*pointer/i.test(code);
                    const hasContentMaxHeight = /\.accordion-content\s*\{[^}]*max-height\s*:\s*0/i.test(code);
                    const hasContentTransition = /\.accordion-content\s*\{[^}]*transition\s*:\s*max-height\s+0\.3s\s+ease-out/i.test(code);
                    const hasContentOverflow = /\.accordion-content\s*\{[^}]*overflow\s*:\s*hidden/i.test(code);
                    return hasInputHidden && hasLabelBlock && hasLabelPadding && hasLabelCursor && hasContentMaxHeight && hasContentTransition && hasContentOverflow;
                }
            },
            'advanced-9': {
                title: 'CSS Scroll Animations',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: CSS Loader Animation</h4>
                    <p><strong>Instructions:</strong> Create a loader:</p>
                    <ul>
                        <li>Create a circular spinner loader</li>
                        <li>Use border and border-top with different colors</li>
                        <li>Animate rotation infinitely</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="loader"></div>`,

                solution: `.loader {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}`,

                validate: (code) => {
                    const hasLoaderSize = /\.loader\s*\{[^}]*width\s*:\s*40px/i.test(code);
                    const hasLoaderHeight = /\.loader\s*\{[^}]*height\s*:\s*40px/i.test(code);
                    const hasBorderTransparent = /\.loader\s*\{[^}]*border\s*:\s*4px\s+solid\s+transparent/i.test(code);
                    const hasBorderTop = /\.loader\s*\{[^}]*border-top\s*:\s*4px\s+solid\s+var\(\s*--primary-color\s*\)/i.test(code);
                    const hasBorderRadius = /\.loader\s*\{[^}]*border-radius\s*:\s*50%/i.test(code);
                    const hasAnimation = /\.loader\s*\{[^}]*animation\s*:\s*spin\s+1s\s+linear\s+infinite/i.test(code);
                    return hasLoaderSize && hasLoaderHeight && hasBorderTransparent && hasBorderTop && hasBorderRadius && hasAnimation;
                }
            },
            'advanced-10': {
                title: 'Complete CSS Layout System',
                level: 'advanced',
                exp: 30,
                instructions: `
                    <h4>Task: Parallax Scrolling</h4>
                    <p><strong>Instructions:</strong> Add parallax effect:</p>
                    <ul>
                        <li>Create a background image with background-attachment: fixed</li>
                        <li>Add overlay content that scrolls normally</li>
                        <li>Ensure parallax effect works smoothly on large screens</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="parallax-section">
  <div class="overlay-content">
    <h2>Parallax Section</h2>
    <p>This content will scroll normally while the background moves slower.</p>
  </div>
</div>`,

                solution: `.parallax-section {
  background-image: url('parallax-bg.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
}`,

                validate: (code) => {
                    const hasSectionBackgroundAttachment = /\.parallax-section\s*\{[^}]*background-attachment\s*:\s*fixed/i.test(code);
                    const hasSectionBackgroundSize = /\.parallax-section\s*\{[^}]*background-size\s*:\s*cover/i.test(code);
                    const hasSectionBackgroundPosition = /\.parallax-section\s*\{[^}]*background-position\s*:\s*center/i.test(code);
                    const hasSectionHeight = /\.parallax-section\s*\{[^}]*height\s*:\s*100vh/i.test(code);
                    const hasSectionDisplay = /\.parallax-section\s*\{[^}]*display\s*:\s*flex/i.test(code);
                    const hasSectionAlignItems = /\.parallax-section\s*\{[^}]*align-items\s*:\s*center/i.test(code);
                    const hasSectionJustifyContent = /\.parallax-section\s*\{[^}]*justify-content\s*:\s*center/i.test(code);
                    const hasSectionColor = /\.parallax-section\s*\{[^}]*color\s*:\s*white/i.test(code);
                    const hasSectionTextAlign = /\.parallax-section\s*\{[^}]*text-align\s*:\s*center/i.test(code);
                    const hasSectionPadding = /\.parallax-section\s*\{[^}]*padding\s*:\s*2rem/i.test(code);
                    return hasSectionBackgroundAttachment && hasSectionBackgroundSize && hasSectionBackgroundPosition && 
                           hasSectionHeight && hasSectionDisplay && hasSectionAlignItems && hasSectionJustifyContent &&
                           hasSectionColor && hasSectionTextAlign && hasSectionPadding;
                }
            }
        };
        
        this.currentTask = null;
        this.init();
    }

    async loadGameState() {
        try {
            // First, try to load from MongoDB
            const response = await fetch(`${API_BASE}/progress/${this.username}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log("Loaded progress from server:", data);
                
                // Convert server data to local game state
                const cssTasks = data.css || [];
                
                // Calculate EXP from completed tasks
                let calculatedExp = 0;
                cssTasks.forEach(taskId => {
                    if (this.tasks[taskId]) {
                        calculatedExp += this.tasks[taskId].exp;
                    }
                });
                
                this.gameState = {
                    exp: calculatedExp,
                    completedTasks: new Set(cssTasks),
                    unlockedSolutions: new Set(data.unlocked_solutions || []),
                    failedAttempts: data.failed_attempts || {},
                    theme: data.theme || 'light',
                    editorContent: data.editor_content || {},
                    htmlContent: data.html_content || {}
                };
                
                console.log(`Loaded ${cssTasks.length} completed tasks, Total EXP: ${calculatedExp}`);
            } else {
                throw new Error('Failed to load from server');
            }
        } catch (error) {
            console.error("Error loading from server, trying localStorage:", error);
            
            // Fallback to localStorage
            const saved = localStorage.getItem('cssLearningGame');
            if (saved) {
                try {
                    const parsedState = JSON.parse(saved);
                    this.gameState = {
                        exp: parsedState.exp || 0,
                        completedTasks: new Set(parsedState.completedTasks || []),
                        unlockedSolutions: new Set(parsedState.unlockedSolutions || []),
                        failedAttempts: parsedState.failedAttempts || {},
                        theme: parsedState.theme || 'light',
                        editorContent: parsedState.editorContent || {},
                        htmlContent: parsedState.htmlContent || {}
                    };
                    console.log("Loaded from localStorage as fallback");
                } catch (parseError) {
                    console.error("Error parsing localStorage data:", parseError);
                }
            }
        }
    }

    saveGameState() {
        const stateToSave = {
            username: this.username,
            course: "css",
            completedTasks: Array.from(this.gameState.completedTasks),
            unlockedSolutions: Array.from(this.gameState.unlockedSolutions),
            failedAttempts: this.gameState.failedAttempts,
            theme: this.gameState.theme,
            editorContent: this.gameState.editorContent,
            htmlContent: this.gameState.htmlContent
        };

        // Always save to localStorage first (immediate backup)
        localStorage.setItem('cssLearningGame', JSON.stringify(stateToSave));

        // Save to MongoDB
        try {
            const response = await fetch(`${API_BASE}/task/save-progress`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: this.username,
                    course: "css",
                    task_id: taskId
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Progress saved to server:", result);
            } else {
                throw new Error(`Server responded with ${response.status}`);
            }
        } catch (error) {
            console.error("Error saving to server:", error);
            // Task is still marked complete locally
        }
    }
    
    updateUI() {
        this.updateExpCounter();
        this.updateProgressBars();
        this.updateTaskCards();
        this.updateCertificateSection();
    }
    
    updateExpCounter() {
        document.getElementById('expCount').textContent = this.gameState.exp;
    }
    
    updateProgressBars() {
        const levels = ['beginner', 'intermediate', 'advanced'];
        
        levels.forEach(level => {
            const levelTasks = Object.keys(this.tasks).filter(taskId => 
                this.tasks[taskId].level === level
            );
            const completedCount = levelTasks.filter(taskId => 
                this.gameState.completedTasks.has(taskId)
            ).length;
            const totalCount = levelTasks.length;
            const percentage = (completedCount / totalCount) * 100;
            
            const progressText = document.getElementById(`${level}Progress`);
            const progressBar = document.getElementById(`${level}ProgressBar`);
            
            if (progressText) {
                progressText.textContent = `${completedCount}/${totalCount} Completed`;
            }
            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
            }
            
            // Update progress percentage display
            const progressPercentageElement = progressText?.parentElement?.querySelector('.progress-percentage');
            if (progressPercentageElement) {
                progressPercentageElement.textContent = `${Math.round(percentage)}%`;
            }
        });
    }
    
    updateTaskCards() {
        Object.keys(this.tasks).forEach(taskId => {
            const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
            if (taskCard) {
                const isCompleted = this.gameState.completedTasks.has(taskId);
                const startBtn = taskCard.querySelector('.task-start-btn span');
                
                if (isCompleted) {
                    taskCard.classList.add('completed');
                    if (startBtn) startBtn.textContent = 'Completed';
                } else {
                    taskCard.classList.remove('completed');
                    if (startBtn) startBtn.textContent = 'Start Task';
                }
            }
        });
    }
    
    updateCertificateSection() {
        const totalTasks = Object.keys(this.tasks).length;
        const completedCount = this.gameState.completedTasks.size;
        const isUnlocked = completedCount === totalTasks;
        
        const certificateStatus = document.getElementById('certificateStatus');
        const certificateOverlay = document.getElementById('certificateOverlay');
        const certificateActions = document.getElementById('certificateActions');
        
        if (isUnlocked) {
            certificateStatus.innerHTML = `
                <svg class="icon check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                All Tasks Completed!
            `;
            certificateOverlay.classList.add('hidden');
            certificateActions.classList.add('enabled');
        } else {
            certificateStatus.innerHTML = `
                <svg class="icon lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>${completedCount}/${totalTasks} Tasks Completed</span>
            `;
            certificateOverlay.classList.remove('hidden');
            certificateActions.classList.remove('enabled');
        }
    }
    
    openTaskModal(taskId) {
        this.currentTask = taskId;
        const task = this.tasks[taskId];
        
        // Update modal content
        document.getElementById('modalTitle').textContent = task.title;
        document.getElementById('taskInstructions').innerHTML = task.instructions;
        
        // Initialize HTML content for the task
        if (!this.gameState.htmlContent[taskId]) {
            this.gameState.htmlContent[taskId] = task.htmlContent;
        }
        
        // Start in CSS mode
        this.switchEditorMode('css');
        
        // Reset validation state
        this.resetValidationState();
        
        // Update solution button
        this.updateSolutionButton();
        
        // Show modal
        document.getElementById('taskModal').classList.add('active');
        document.body.style.overflow = '';
        
        // Update live preview
        this.updateLivePreview();
    }
    
    closeTaskModal() {
        document.getElementById('taskModal').classList.remove('active');
        document.body.style.overflow = '';
        this.currentTask = null;
    }
    
    resetValidationState() {
        const validateBtn = document.getElementById('validateCode');
        const submitBtn = document.getElementById('submitCode');
        const showSolutionBtn = document.getElementById('showSolution');
        const feedback = document.getElementById('validationFeedback');
        
        // Reset all buttons to enabled state
        if (validateBtn) {
            validateBtn.disabled = false;
        }
        
        if (submitBtn) {
            submitBtn.disabled = true;
        }
        
        if (showSolutionBtn) {
            showSolutionBtn.disabled = true;
        }
        
        // Hide feedback
        if (feedback) {
            feedback.style.display = 'none';
        }
    }
    
    switchEditorMode(mode) {
        this.currentEditorMode = mode;
        const htmlBtn = document.getElementById('htmlBtn');
        const cssBtn = document.getElementById('cssBtn');
        const editorTitle = document.getElementById('editorTitle');
        const codeEditor = document.getElementById('codeEditor');
        
        if (mode === 'html') {
            htmlBtn.classList.add('active');
            cssBtn.classList.remove('active');
            editorTitle.textContent = 'HTML Editor';
            codeEditor.placeholder = 'HTML code is predefined. Switch to CSS to write your styles.';
            codeEditor.readOnly = true;
            codeEditor.value = this.gameState.htmlContent[this.currentTask] || '';
        } else {
            cssBtn.classList.add('active');
            htmlBtn.classList.remove('active');
            editorTitle.textContent = 'CSS Editor';
            codeEditor.placeholder = 'Write your CSS code here...';
            codeEditor.readOnly = false;
            codeEditor.value = this.gameState.editorContent[this.currentTask] || '';
        }
        
        // Update live preview
        this.updateLivePreview();
    }
    
    updateLivePreview() {
        const htmlCode = this.gameState.htmlContent[this.currentTask] || this.tasks[this.currentTask].htmlContent;
        const cssCode = this.gameState.editorContent[this.currentTask] || '';
        const preview = document.getElementById('livePreview');
        
        const previewContent = `
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Preview</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                </style>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
            </body>
            </html>
        `;
        
        preview.srcdoc = previewContent;
    }
    
    validateCode() {
        if (!this.currentTask) {
            console.warn('No task is currently selected.');
            return;
        }

        const code = document.getElementById('codeEditor').value.trim();
        const task = this.tasks[this.currentTask];
        
        if (this.currentEditorMode === 'html') {
            this.showValidationFeedback('Please switch to CSS editor to write your CSS code.', 'error');
            return;
        }
        
        if (!code) {
            this.showValidationFeedback('Please write some CSS code first.', 'error');
            return;
        }
        
        const isValid = task.validate(code);
        
        if (isValid) {
            this.showValidationFeedback('Perfect! Your CSS code is correct. Click Submit to earn EXP!', 'success');
            if (document.getElementById('submitCode')) {
                document.getElementById('submitCode').disabled = false;
            }
        } else {
            // Track failed attempts
            const taskId = this.currentTask;
            this.gameState.failedAttempts[taskId] = (this.gameState.failedAttempts[taskId] || 0) + 1;
            this.saveGameState();
            
            this.showValidationFeedback('Your CSS doesn\'t match the expected output. Check the instructions and try again.', 'error');
            if (document.getElementById('submitCode')) {
                document.getElementById('submitCode').disabled = true;
            }
            
            // Update solution button
            this.updateSolutionButton();
        }
    }
    
    showValidationFeedback(message, type) {
        const feedback = document.getElementById('validationFeedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.className = `validation-feedback ${type}`;
            feedback.style.display = 'block';
        }
    }
    
    submitTask() {
        const taskId = this.currentTask;
        const task = this.tasks[taskId];
        
        // Check if task is already completed to prevent duplicate EXP
        if (this.gameState.completedTasks.has(taskId)) {
            console.warn('Task already completed, not adding duplicate EXP.');
            this.showTaskAnswer();
            return;
        }
        
        // Add to completed tasks and EXP
        this.gameState.completedTasks.add(taskId);
        this.gameState.exp += task.exp;
        delete this.gameState.editorContent[taskId];
        delete this.gameState.htmlContent[taskId];
        
        console.log(`Task ${taskId} completed. Added ${task.exp} EXP. Total EXP: ${this.gameState.exp}`);

        // Save state immediately
        this.saveGameState();
        this.updateUI();

        this.showTaskAnswer();
    }
    
    showTaskAnswer() {
        const task = this.tasks[this.currentTask];
        
        // Update the instructions to show the answer
        const instructionsDiv = document.getElementById('taskInstructions');
        if (instructionsDiv) {
            instructionsDiv.innerHTML = `
                <h4>🎉 Task Completed Successfully!</h4>
                <p>Congratulations! You earned ${task.exp} EXP!</p>
                <p><strong>Here's the correct CSS solution:</strong></p>
                <pre><code>${task.solution.replace(/</g, '&lt;')}</code></pre>
                <p><strong>Great job!</strong> You can now move on to the next task.</p>
            `;
        }
        
        // Disable all buttons since task is completed
        document.getElementById('validateCode').disabled = true;
        document.getElementById('submitCode').disabled = true;
        document.getElementById('showSolution').disabled = true;
        
        // Show completion message in feedback
        this.showValidationFeedback(`Congratulations! You earned ${task.exp} EXP!`, 'success');
        
        // Close modal after delay
        setTimeout(() => {
            this.closeTaskModal();
        }, 3000);
    }
    
    showSolution() {
        const taskId = this.currentTask;
        const task = this.tasks[taskId];
        const showSolutionBtn = document.getElementById('showSolution');

        // Deduct EXP only if the solution hasn't been unlocked yet
        if (!this.gameState.unlockedSolutions.has(taskId)) {
            let expPenalty = 20; // default for beginner
            if (task.level === 'intermediate') expPenalty = 40;
            if (task.level === 'advanced') expPenalty = 60;

            this.gameState.exp -= expPenalty; // Deduct EXP
            this.gameState.unlockedSolutions.add(taskId); // Mark solution as unlocked
            this.saveGameState(); // Save state after deduction
            this.updateExpCounter(); // Update EXP display
            this.showValidationFeedback(`Solution revealed! ${expPenalty} EXP deducted. Study the code and try to understand it.`, 'success');
        } else {
            this.showValidationFeedback('Solution already revealed. No further EXP deduction.', 'info');
        }
        
        // Switch to CSS mode and show solution in the editor
        this.switchEditorMode('css');
        document.getElementById('codeEditor').value = task.solution;
        this.gameState.editorContent[taskId] = task.solution;
        this.saveGameState(); // Save editor content
        
        // Update live preview
        this.updateLivePreview();
        
        // Disable the solution button after showing the solution
        if (showSolutionBtn) {
            showSolutionBtn.disabled = true;
            showSolutionBtn.textContent = 'Solution Shown';
        }
    }
    
    updateSolutionButton() {
        const taskId = this.currentTask;
        const task = this.tasks[taskId];
        const failedAttempts = this.gameState.failedAttempts[taskId] || 0;
        const isUnlocked = this.gameState.unlockedSolutions.has(taskId);
        
        // Calculate EXP penalty based on level
        let expPenalty = 20; // default for beginner
        if (task.level === 'intermediate') expPenalty = 40;
        if (task.level === 'advanced') expPenalty = 60;
        
        if (isUnlocked) {
            document.getElementById('showSolution').disabled = false;
            document.getElementById('showSolution').textContent = 'Show Solution';
        } else if (failedAttempts >= 2) {
            document.getElementById('showSolution').disabled = false;
            document.getElementById('showSolution').textContent = `Show Solution (-${expPenalty} EXP)`;
        } else {
            document.getElementById('showSolution').disabled = true;
            document.getElementById('showSolution').textContent = `Show Solution (${2 - failedAttempts} attempts left)`;
        }
    }
    
    downloadCertificate() {
        const userName = document.getElementById('userName').value.trim();
        
        if (!userName) {
            alert('Please enter your name to generate your certificate.');
            return;
        }

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                try {
                    // Set canvas size to match your certificate image
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    // Draw the certificate background image
                    ctx.drawImage(img, 0, 0);
                    
                    // Calculate positions based on your certificate layout
                    const centerX = canvas.width / 2;
                    
                    // USER NAME POSITIONING
                    ctx.fillStyle = '#2d3748';
                     ctx.font = 'bold 100px Montserrat Bold, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    
                    const nameY = canvas.height * 0.45;
                    ctx.fillText(userName, centerX, nameY);
                    
                    // CURRENT DATE POSITIONING
                    ctx.fillStyle = '#4a5568';
                    ctx.font = '65px Arial, sans-serif';
                    
                    const currentDate = new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    const dateY = canvas.height * 0.85;
                    ctx.fillText(currentDate, centerX, dateY);
                    
                    // Convert to blob and download
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `CSS_Certificate_${userName.replace(/\s+/g, '_')}.png`;
                            
                            document.body.appendChild(a);
                            a.click();
                            
                            setTimeout(() => {
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                            }, 100);
                        } else {
                            throw new Error('Failed to create certificate blob');
                        }
                    }, 'image/png', 1.0); // ✅ fixed MIME type
                } catch (error) {
                    console.error('Error processing certificate:', error);
                    alert('Error generating certificate. Please try again.');
                }
            };
            
            img.crossOrigin = 'anonymous';
            img.src = 'CSS-01.png';  // ✅ use exported PNG, not .ai
        } catch (error) {
            console.error('Error in downloadCertificate:', error);
            alert('Error generating certificate. Please try again.');
        }
    }
    
    // Add method to reset all game data (for debugging)
    resetGameData() {
        this.gameState = {
            exp: 0,
            completedTasks: new Set(),
            unlockedSolutions: new Set(),
            failedAttempts: {},
            theme: 'light',
            editorContent: {},
            htmlContent: {}
        };
        this.saveGameState();
        this.updateUI();
        console.log('Game data reset successfully');
    }
    
    // Add method to clear local storage (for debugging)
    clearLocalStorage() {
        localStorage.removeItem('cssLearningGame');
        console.log('Local storage cleared');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CSSLearningGame();
});

// Disable context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

document.addEventListener("contextmenu", (e) => e.preventDefault()); // Disable right click

document.onkeydown = function(e) {
  // Disable F12
  if (e.keyCode === 123) return false;

  // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
    return false;
  }

  // Disable Ctrl+U (View Source)
  if (e.ctrlKey && e.keyCode === 85) return false;

  // Disable Ctrl+S (Save Page)
  if (e.ctrlKey && e.keyCode === 83) return false;

  // Disable Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+P
  if (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 80)) {
    return false;
  }

  // Disable Ctrl+Shift+K (Firefox)
  
  if (e.ctrlKey && e.shiftKey && e.keyCode === 75) return false;
};

// Enhanced right-click protection
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}, true);

// Additional layer - disable selection
document.addEventListener("selectstart", function(e) {
    e.preventDefault();
    return false;
});

// Disable drag
document.addEventListener("dragstart", function(e) {
    e.preventDefault();
    return false;
});
