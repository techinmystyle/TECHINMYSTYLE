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

        this.currentEditorMode = 'css'; // 'html' or 'css'

        this.tasks = {
            // BEGINNER TASKS (10 tasks - 10 EXP each)
            'beginner-1': {
                title: 'Basic CSS Selectors',
                level: 'beginner',
                exp: 10,
                description: 'Learn to use element selectors to style HTML elements.',
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
                description: 'Learn to control font size, weight, and family.',
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
                description: 'Learn to apply background colors to elements.',
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
                description: 'Learn to align text in different ways.',
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
                description: 'Learn to add space around elements using margins.',
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
                description: 'Learn to add internal spacing using padding.',
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
                description: 'Learn to add borders around elements.',
                instructions: `
                    <h4>Task: CSS Borders</h4>
                    <p><strong>Instructions:</strong> Add borders:</p>
                    <ul>
                        <li>Give the div border: 2px solid black</li>
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
                description: 'Learn to control element dimensions.',
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
                description: 'Learn to style lists and list items.',
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
                description: 'Learn to use class selectors to target specific elements.',
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
                description: 'Learn the fundamentals of CSS Flexbox layout.',
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
                description: 'Learn to create layouts using CSS Grid.',
                instructions: `
                    <h4>Task: CSS Grid Layout</h4>
                    <p><strong>Instructions:</strong> Build a grid layout:</p>
                    <ul>
                        <li>Make the container display: grid</li>
                        <li>Define 3 equal columns with grid-template-columns: 1fr 1fr 1fr</li>
                        <li>Add gap: 10px between items</li>
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
                description: 'Learn different positioning methods.',
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
                description: 'Learn to create interactive hover effects.',
                instructions: `
                    <h4>Task: CSS Hover Effects</h4>
                    <p><strong>Instructions:</strong> Add hover effects:</p>
                    <ul>
                        <li>Make buttons background blue</li>
                        <li>On hover, change background to red</li>
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
                description: 'Learn to create responsive layouts with media queries.',
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
                    const hasMediaQuery = /@media\s*\([^)]*max-width\s*:\s*600px[^)]*\)/i.test(code);
                    const hasMediaFontSize = /@media[\s\S]*\.container\s*\{[^}]*font-size\s*:\s*14px/i.test(code);
                    return hasContainerWidth && hasContainerMaxWidth && hasMediaQuery && hasMediaFontSize;
                }
            },
            'intermediate-6': {
                title: 'CSS Animations',
                level: 'intermediate',
                exp: 20,
                description: 'Learn to create CSS keyframe animations.',
                instructions: `
                    <h4>Task: CSS Animations</h4>
                    <p><strong>Instructions:</strong> Create bouncing animation:</p>
                    <ul>
                        <li>Create @keyframes bounce animation</li>
                        <li>0% and 100%: transform: translateY(0)</li>
                        <li>50%: transform: translateY(-20px)</li>
                        <li>Apply animation to .ball: animation: bounce 2s infinite</li>
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
                description: 'Learn to add depth with box and text shadows.',
                instructions: `
                    <h4>Task: CSS Shadows</h4>
                    <p><strong>Instructions:</strong> Add shadow effects:</p>
                    <ul>
                        <li>Give .card box-shadow: 0 4px 8px rgba(0,0,0,0.1)</li>
                        <li>Give .text text-shadow: 2px 2px 4px rgba(0,0,0,0.3)</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="card">
  <h3 class="text">Shadowed Text</h3>
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
                description: 'Learn to create beautiful gradients.',
                instructions: `
                    <h4>Task: CSS Gradients</h4>
                    <p><strong>Instructions:</strong> Create gradient backgrounds:</p>
                    <ul>
                        <li>Give .header background: linear-gradient(to right, blue, purple)</li>
                        <li>Give .circle background: radial-gradient(circle, red, yellow)</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="header">
  <h2>Gradient Header</h2>
</div>
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
                title: 'CSS Transform',
                level: 'intermediate',
                exp: 20,
                description: 'Learn to transform elements with scale, rotate, and translate.',
                instructions: `
                    <h4>Task: CSS Transform</h4>
                    <p><strong>Instructions:</strong> Apply transforms:</p>
                    <ul>
                        <li>Make .box transform: scale(1.2) on hover</li>
                        <li>Make .rotate transform: rotate(45deg)</li>
                        <li>Add transition: transform 0.3s to .box</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="box">Hover to Scale</div>
<div class="rotate">Rotated Box</div>`,
                solution: `.box {
  transition: transform 0.3s;
}

.box:hover {
  transform: scale(1.2);
}

.rotate {
  transform: rotate(45deg);
}`,
                validate: (code) => {
                    const hasBoxTransition = /\.box\s*\{[^}]*transition\s*:\s*transform\s+0\.3s/i.test(code);
                    const hasBoxHoverScale = /\.box:hover\s*\{[^}]*transform\s*:\s*scale\(\s*1\.2\s*\)/i.test(code);
                    const hasRotateTransform = /\.rotate\s*\{[^}]*transform\s*:\s*rotate\(\s*45deg\s*\)/i.test(code);
                    return hasBoxTransition && hasBoxHoverScale && hasRotateTransform;
                }
            },
            'intermediate-10': {
                title: 'CSS Variables',
                level: 'intermediate',
                exp: 20,
                description: 'Learn to use CSS custom properties (variables).',
                instructions: `
                    <h4>Task: CSS Variables</h4>
                    <p><strong>Instructions:</strong> Use CSS custom properties:</p>
                    <ul>
                        <li>Define --primary-color: #3498db in :root</li>
                        <li>Define --secondary-color: #e74c3c in :root</li>
                        <li>Use var(--primary-color) for .primary background</li>
                        <li>Use var(--secondary-color) for .secondary background</li>
                    </ul>
                    <p><strong>Reward:</strong> 20 EXP</p>
                `,
                htmlContent: `<div class="primary">Primary Color</div>
<div class="secondary">Secondary Color</div>`,
                solution: `:root {
  --primary-color: #3498db;
  --secondary-color: #e74c3c;
}

.primary { 
  background: var(--primary-color); 
}

.secondary { 
  background: var(--secondary-color); 
}`,
                validate: (code) => {
                    const hasRootPrimary = /:root\s*\{[^}]*--primary-color/i.test(code);
                    const hasRootSecondary = /:root\s*\{[^}]*--secondary-color/i.test(code);
                    const hasPrimaryVar = /\.primary\s*\{[^}]*background\s*:\s*var\(\s*--primary-color\s*\)/i.test(code);
                    const hasSecondaryVar = /\.secondary\s*\{[^}]*background\s*:\s*var\(\s*--secondary-color\s*\)/i.test(code);
                    return hasRootPrimary && hasRootSecondary && hasPrimaryVar && hasSecondaryVar;
                }
            },
            // ADVANCED TASKS (10 tasks - 30 EXP each)
            'advanced-1': {
                title: 'Advanced Flexbox Layout',
                level: 'advanced',
                exp: 30,
                description: 'Create complex layouts with advanced Flexbox properties.',
                instructions: `
                    <h4>Task: Advanced Flexbox Layout</h4>
                    <p><strong>Instructions:</strong> Build a responsive navbar:</p>
                    <ul>
                        <li>Make .navbar display: flex with justify-content: space-between</li>
                        <li>Make .menu display: flex with list-style: none</li>
                        <li>Add hover effect: background-color: rgba(255, 255, 255, 0.2) for .menu a:hover</li>
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
  background-color: #333;
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
                    const hasLinkHover = /\.menu\s+a:hover\s*\{[^}]*background-color\s*:\s*rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.2\s*\)/i.test(code);
                    return hasNavbarFlex && hasMenuFlex && hasLinkHover;
                }
            },
            'advanced-2': {
                title: 'Advanced Grid Layout',
                level: 'advanced',
                exp: 30,
                description: 'Create responsive card layouts using CSS Grid.',
                instructions: `
                    <h4>Task: Advanced Grid Layout</h4>
                    <p><strong>Instructions:</strong> Create responsive card layout:</p>
                    <ul>
                        <li>Make .dashboard display: grid with grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))</li>
                        <li>Add gap: 20px and padding: 20px</li>
                        <li>Add hover effect: transform: translateY(-5px) for .card:hover</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="dashboard">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
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
                    const hasCardHover = /\.card:hover\s*\{[^}]*transform\s*:\s*translateY\(\s*-5px\s*\)/i.test(code);
                    return hasDashboardGrid && hasAutoFit && hasGap && hasCardHover;
                }
            },
            'advanced-3': {
                title: 'CSS Modal Popup',
                level: 'advanced',
                exp: 30,
                description: 'Create a modal popup using pure CSS.',
                instructions: `
                    <h4>Task: CSS Modal Popup</h4>
                    <p><strong>Instructions:</strong> Create a modal:</p>
                    <ul>
                        <li>Make .modal-overlay position: fixed with full screen coverage (top: 0, left: 0, width: 100%, height: 100%)</li>
                        <li>Set background-color: rgba(0, 0, 0, 0.5)</li>
                        <li>Use display: flex with justify-content: center and align-items: center</li>
                        <li>Style .modal-content with background: white, border-radius: 8px, padding: 20px</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<button class="open-modal-btn">Open Modal</button>
<div class="modal-overlay">
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
  display: flex;
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
                title: 'CSS Sticky Header',
                level: 'advanced',
                exp: 30,
                description: 'Create a sticky navigation header.',
                instructions: `
                    <h4>Task: CSS Sticky Header</h4>
                    <p><strong>Instructions:</strong> Make sticky header:</p>
                    <ul>
                        <li>Make .sticky-header position: sticky with top: 0</li>
                        <li>Add background-color: #333 and box-shadow: 0 2px 4px rgba(0,0,0,0.1)</li>
                        <li>Set z-index: 100</li>
                        <li>Give .content enough content to scroll and demonstrate stickiness</li>
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
                solution: `.sticky-header {
  position: sticky;
  top: 0;
  background-color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;
  color: white;
  padding: 1rem;
}

.content {
  height: 200vh;
  padding: 20px;
}

.content section {
  height: 300px;
  margin: 20px 0;
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}`,
                validate: (code) => {
                    const hasHeaderSticky = /\.sticky-header\s*\{[^}]*position\s*:\s*sticky/i.test(code);
                    const hasHeaderTop = /\.sticky-header\s*\{[^}]*top\s*:\s*0/i.test(code);
                    const hasHeaderShadow = /\.sticky-header\s*\{[^}]*box-shadow\s*:\s*0\s+2px\s+4px\s+rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.1\s*\)/i.test(code);
                    const hasZIndex = /\.sticky-header\s*\{[^}]*z-index\s*:\s*100/i.test(code);
                    return hasHeaderSticky && hasHeaderTop && hasHeaderShadow && hasZIndex;
                }
            },
            'advanced-5': {
                title: 'CSS Tooltip',
                level: 'advanced',
                exp: 30,
                description: 'Create interactive tooltips with pure CSS.',
                instructions: `
                    <h4>Task: CSS Tooltip</h4>
                    <p><strong>Instructions:</strong> Create tooltip:</p>
                    <ul>
                        <li>Make .tooltip-container position: relative</li>
                        <li>Style .tooltip with position: absolute, top: -30px, left: 50%</li>
                        <li>Use transform: translateX(-50%) to center tooltip</li>
                        <li>Add opacity: 0 by default, opacity: 1 on .tooltip-trigger:hover + .tooltip</li>
                        <li>Include transition: opacity 0.3s and pointer-events: none</li>
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
  background-color: #333;
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
                    const hasHoverEffect = /\.tooltip-trigger:hover\s*\+\s*\.tooltip\s*\{[^}]*opacity\s*:\s*1/i.test(code);
                    return hasContainerPosition && hasTooltipPosition && hasTooltipTop && hasTooltipTransform && hasOpacityTransition && hasPointerEventsNone && hasHoverEffect;
                }
            },
            'advanced-6': {
                title: 'CSS Progress Bar',
                level: 'advanced',
                exp: 30,
                description: 'Create animated progress bars.',
                instructions: `
                    <h4>Task: CSS Progress Bar</h4>
                    <p><strong>Instructions:</strong> Build a progress bar:</p>
                    <ul>
                        <li>Style .progress-bar-container with width: 100%, height: 20px, background-color: #eee, border-radius: 10px</li>
                        <li>Style .progress-fill with height: 100%, width: 75%, transition: width 0.5s ease</li>
                        <li>Add linear gradient background for .progress-fill</li>
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
  width: 75%;
  background: linear-gradient(to right, #3498db, #e74c3c);
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
            'advanced-7': {
                title: 'CSS Accordion',
                level: 'advanced',
                exp: 30,
                description: 'Create a collapsible accordion using CSS.',
                instructions: `
                    <h4>Task: CSS Accordion</h4>
                    <p><strong>Instructions:</strong> Create accordion:</p>
                    <ul>
                        <li>Hide .accordion-input with display: none</li>
                        <li>Style .accordion-label as display: block, padding: 15px, cursor: pointer</li>
                        <li>Set .accordion-content max-height: 0, overflow: hidden, transition: max-height 0.3s ease-out</li>
                        <li>Use :checked selector to expand content</li>
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
                solution: `.accordion {
  max-width: 600px;
  margin: 0 auto;
}

.accordion-input {
  display: none;
}

.accordion-label {
  display: block;
  padding: 15px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.accordion-label:hover {
  background: #2980b9;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: #f8f9fa;
  padding: 0 15px;
}

.accordion-input:checked + .accordion-label + .accordion-content {
  max-height: 200px;
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
            'advanced-8': {
                title: 'CSS Loader Animation',
                level: 'advanced',
                exp: 30,
                description: 'Create animated loading spinners.',
                instructions: `
                    <h4>Task: CSS Loader Animation</h4>
                    <p><strong>Instructions:</strong> Create a spinner loader:</p>
                    <ul>
                        <li>Style .loader with width: 40px, height: 40px</li>
                        <li>Add border: 4px solid transparent</li>
                        <li>Set border-top: 4px solid #3498db</li>
                        <li>Make it circular with border-radius: 50%</li>
                        <li>Create @keyframes spin and apply animation: spin 1s linear infinite</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="loader"></div>`,
                solution: `@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}`,
                validate: (code) => {
                    const hasSpinKeyframes = /@keyframes\s+spin/i.test(code);
                    const hasLoaderSize = /\.loader\s*\{[^}]*width\s*:\s*40px/i.test(code);
                    const hasLoaderHeight = /\.loader\s*\{[^}]*height\s*:\s*40px/i.test(code);
                    const hasBorderTransparent = /\.loader\s*\{[^}]*border\s*:\s*4px\s+solid\s+transparent/i.test(code);
                    const hasBorderTop = /\.loader\s*\{[^}]*border-top\s*:\s*4px\s+solid\s+#3498db/i.test(code);
                    const hasBorderRadius = /\.loader\s*\{[^}]*border-radius\s*:\s*50%/i.test(code);
                    const hasAnimation = /\.loader\s*\{[^}]*animation\s*:\s*spin\s+1s\s+linear\s+infinite/i.test(code);
                    return hasSpinKeyframes && hasLoaderSize && hasLoaderHeight && hasBorderTransparent && hasBorderTop && hasBorderRadius && hasAnimation;
                }
            },
            'advanced-9': {
                title: 'CSS 3D Transforms',
                level: 'advanced',
                exp: 30,
                description: 'Create 3D effects using CSS transforms.',
                instructions: `
                    <h4>Task: CSS 3D Transforms</h4>
                    <p><strong>Instructions:</strong> Create 3D card flip effect:</p>
                    <ul>
                        <li>Set .card-container perspective: 1000px</li>
                        <li>Style .card with transform-style: preserve-3d, transition: transform 0.6s</li>
                        <li>On hover, rotate .card with transform: rotateY(180deg)</li>
                        <li>Position .card-front and .card-back absolutely with backface-visibility: hidden</li>
                        <li>Rotate .card-back 180 degrees initially</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="card-container">
  <div class="card">
    <div class="card-front">Front</div>
    <div class="card-back">Back</div>
  </div>
</div>`,
                solution: `.card-container {
  perspective: 1000px;
}

.card {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card:hover {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.card-front {
  background: #3498db;
  color: white;
}

.card-back {
  background: #e74c3c;
  color: white;
  transform: rotateY(180deg);
}`,
                validate: (code) => {
                    const hasContainerPerspective = /\.card-container\s*\{[^}]*perspective\s*:\s*1000px/i.test(code);
                    const hasCardTransformStyle = /\.card\s*\{[^}]*transform-style\s*:\s*preserve-3d/i.test(code);
                    const hasCardTransition = /\.card\s*\{[^}]*transition\s*:\s*transform\s+0\.6s/i.test(code);
                    const hasCardHoverRotate = /\.card:hover\s*\{[^}]*transform\s*:\s*rotateY\(\s*180deg\s*\)/i.test(code);
                    const hasBackfaceVisibility = /backface-visibility\s*:\s*hidden/i.test(code);
                    return hasContainerPerspective && hasCardTransformStyle && hasCardTransition && hasCardHoverRotate && hasBackfaceVisibility;
                }
            },
            'advanced-10': {
                title: 'CSS Complex Animation',
                level: 'advanced',
                exp: 30,
                description: 'Create complex multi-step animations.',
                instructions: `
                    <h4>Task: CSS Complex Animation</h4>
                    <p><strong>Instructions:</strong> Create bouncing ball with trail:</p>
                    <ul>
                        <li>Create @keyframes bounce with multiple stages: scale, translate, and rotate</li>
                        <li>0%: transform: translateY(0) scale(1) rotate(0deg)</li>
                        <li>25%: transform: translateY(-100px) scale(1.2) rotate(90deg)</li>
                        <li>50%: transform: translateY(0) scale(0.8) rotate(180deg)</li>
                        <li>Apply animation: bounce 2s ease-in-out infinite to .bouncing-ball</li>
                    </ul>
                    <p><strong>Reward:</strong> 30 EXP</p>
                `,
                htmlContent: `<div class="bouncing-ball">⚽</div>`,
                solution: `@keyframes bounce {
  0% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  25% {
    transform: translateY(-100px) scale(1.2) rotate(90deg);
  }
  50% {
    transform: translateY(0) scale(0.8) rotate(180deg);
  }
  75% {
    transform: translateY(-50px) scale(1.1) rotate(270deg);
  }
  100% {
    transform: translateY(0) scale(1) rotate(360deg);
  }
}

.bouncing-ball {
  display: inline-block;
  font-size: 40px;
  animation: bounce 2s ease-in-out infinite;
}`,
                validate: (code) => {
                    const hasBounceKeyframes = /@keyframes\s+bounce/i.test(code);
                    const hasTranslateY0 = /transform\s*:\s*translateY\(\s*0\s*\)\s*scale\(\s*1\s*\)\s*rotate\(\s*0deg\s*\)/i.test(code);
                    const hasTranslateYNeg100 = /transform\s*:\s*translateY\(\s*-100px\s*\)\s*scale\(\s*1\.2\s*\)\s*rotate\(\s*90deg\s*\)/i.test(code);
                    const hasBallAnimation = /\.bouncing-ball\s*\{[^}]*animation\s*:\s*bounce\s+2s\s+ease-in-out\s+infinite/i.test(code);
                    return hasBounceKeyframes && hasTranslateY0 && hasTranslateYNeg100 && hasBallAnimation;
                }
            }
        };
        
        this.currentTask = null;
        this.init();
    }

    // Initialize the game
    async init() {
        // Get username from URL params, localStorage, or prompt user
        const urlParams = new URLSearchParams(window.location.search);
        this.username = urlParams.get('username') || 
                       localStorage.getItem('gameUsername') || 
                       prompt('Enter your username:') || 
                       'Guest';
        
        if (this.username && this.username !== 'Guest') {
            localStorage.setItem('gameUsername', this.username);
        }

        // Load game state first
        await this.loadGameState();
        
        // Generate task cards
        this.generateTaskCards();
        
        // Then set up event listeners
        this.setupEventListeners();
        
        // Update UI
        this.updateUI();
        
        console.log(`Game initialized for user: ${this.username}`);
    }

    // Generate task cards for each level
    generateTaskCards() {
        const levels = ['beginner', 'intermediate', 'advanced'];
        
        levels.forEach(level => {
            const tasksContainer = document.getElementById(`${level}Tasks`);
            if (!tasksContainer) return;

            const levelTasks = Object.keys(this.tasks).filter(taskId => 
                this.tasks[taskId].level === level
            );

            let cardsHTML = '';
            levelTasks.forEach(taskId => {
                const task = this.tasks[taskId];
                cardsHTML += this.createTaskCardHTML(taskId, task);
            });

            tasksContainer.innerHTML = cardsHTML;
        });
    }

    // Create HTML for a task card
    createTaskCardHTML(taskId, task) {
        return `
            <div class="task-card" data-task-id="${taskId}">
                <div class="task-glow"></div>
                <div class="task-header">
                    <div class="task-icon">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10,9 9,9 8,9"></polyline>
                        </svg>
                    </div>
                    <div class="task-info">
                        <h3 class="task-title">${task.title}</h3>
                        <p class="task-description">${task.description}</p>
                    </div>
                    <div class="task-exp">
                        <span class="exp-value">${task.exp}</span>
                        <span class="exp-unit">EXP</span>
                    </div>
                </div>
                <div class="task-footer">
                    <button class="task-start-btn" data-task-id="${taskId}">
                        <span>Start Task</span>
                    </button>
                    <div class="task-status">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        `;
    }

    // Set up all event listeners
    setupEventListeners() {
        // Task card click handlers - Use event delegation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.task-start-btn')) {
                const taskId = e.target.closest('.task-start-btn').dataset.taskId;
                
                // Check EXP requirement before opening task
                if (this.canAccessTask(taskId)) {
                    this.openTaskModal(taskId);
                } else {
                    const requiredExp = this.getRequiredExpForTask(taskId);
                    alert(`You need ${requiredExp} EXP to unlock this task. Current EXP: ${this.gameState.exp}`);
                }
            }
        });

        // Modal event listeners
        document.getElementById('closeModal')?.addEventListener('click', () => this.closeTaskModal());
        document.getElementById('validateCode')?.addEventListener('click', () => this.validateCode());
        document.getElementById('submitCode')?.addEventListener('click', () => this.submitTask());
        document.getElementById('showSolution')?.addEventListener('click', () => this.showSolution());
        document.getElementById('htmlBtn')?.addEventListener('click', () => this.switchEditorMode('html'));
        document.getElementById('cssBtn')?.addEventListener('click', () => this.switchEditorMode('css'));

        // Code editor event listener
        document.getElementById('codeEditor')?.addEventListener('input', (e) => {
            if (this.currentTask && this.currentEditorMode === 'css') {
                this.gameState.editorContent[this.currentTask] = e.target.value;
                this.updateLivePreview();
            }
        });

        // Certificate download
        document.getElementById('downloadCert')?.addEventListener('click', () => this.downloadCertificate());

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());

        // Back button
        document.getElementById('backBtn')?.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Toggle theme
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        this.gameState.theme = newTheme;
        this.saveGameState();
    }

    // Check if user can access a task based on EXP
    canAccessTask(taskId) {
        const task = this.tasks[taskId];
        if (!task) return false;
        
        // Beginner tasks are always accessible
        if (task.level === 'beginner') return true;
        
        const requiredExp = this.getRequiredExpForTask(taskId);
        return this.gameState.exp >= requiredExp;
    }

    // Get required EXP for a task
    getRequiredExpForTask(taskId) {
        const task = this.tasks[taskId];
        if (!task) return 0;
        
        // Define EXP requirements
        const expRequirements = {
            'beginner': 0,      // Always accessible
            'intermediate': 100, // Need 100 EXP (10 beginner tasks completed)
            'advanced': 300     // Need 300 EXP (all beginner + intermediate tasks)
        };
        
        return expRequirements[task.level] || 0;
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
                
                // Apply theme
                document.documentElement.setAttribute('data-theme', this.gameState.theme);
                
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
                    document.documentElement.setAttribute('data-theme', this.gameState.theme);
                    console.log("Loaded from localStorage as fallback");
                } catch (parseError) {
                    console.error("Error parsing localStorage data:", parseError);
                }
            }
        }
    }

    async saveGameState() {
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
                    task_id: this.currentTask || 'general'
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
        }
    }
    
    updateUI() {
        this.updateExpCounter();
        this.updateProgressBars();
        this.updateTaskCards();
        this.updateCertificateSection();
    }
    
    updateExpCounter() {
        const expElement = document.getElementById('expCount');
        if (expElement) {
            expElement.textContent = this.gameState.exp;
        }
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
                const canAccess = this.canAccessTask(taskId);
                const startBtn = taskCard.querySelector('.task-start-btn span');
                
                // Remove all state classes
                taskCard.classList.remove('completed', 'locked');
                
                if (isCompleted) {
                    taskCard.classList.add('completed');
                    if (startBtn) startBtn.textContent = 'Completed';
                } else if (!canAccess) {
                    taskCard.classList.add('locked');
                    const requiredExp = this.getRequiredExpForTask(taskId);
                    if (startBtn) startBtn.textContent = `Requires ${requiredExp} EXP`;
                } else {
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
        
        if (certificateStatus) {
            if (isUnlocked) {
                certificateStatus.innerHTML = `
                    <svg class="icon check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    All Tasks Completed!
                `;
                if (certificateOverlay) certificateOverlay.classList.add('hidden');
                if (certificateActions) certificateActions.classList.add('enabled');
            } else {
                certificateStatus.innerHTML = `
                    <svg class="icon lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <circle cx="12" cy="16" r="1"></circle>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>${completedCount}/${totalTasks} Tasks Completed</span>
                `;
                if (certificateOverlay) certificateOverlay.classList.remove('hidden');
                if (certificateActions) certificateActions.classList.remove('enabled');
            }
        }
    }
    
    openTaskModal(taskId) {
        this.currentTask = taskId;
        const task = this.tasks[taskId];
        
        // Update modal content
        const modalTitle = document.getElementById('modalTitle');
        const taskInstructions = document.getElementById('taskInstructions');
        
        if (modalTitle) modalTitle.textContent = task.title;
        if (taskInstructions) taskInstructions.innerHTML = task.instructions;
        
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
        const taskModal = document.getElementById('taskModal');
        if (taskModal) {
            taskModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Update live preview
        this.updateLivePreview();
    }
    
    closeTaskModal() {
        const taskModal = document.getElementById('taskModal');
        if (taskModal) {
            taskModal.classList.remove('active');
            document.body.style.overflow = '';
        }
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
            if (htmlBtn) htmlBtn.classList.add('active');
            if (cssBtn) cssBtn.classList.remove('active');
            if (editorTitle) editorTitle.textContent = 'HTML Editor';
            if (codeEditor) {
                codeEditor.placeholder = 'HTML code is predefined. Switch to CSS to write your styles.';
                codeEditor.readOnly = true;
                codeEditor.value = this.gameState.htmlContent[this.currentTask] || '';
            }
        } else {
            if (cssBtn) cssBtn.classList.add('active');
            if (htmlBtn) htmlBtn.classList.remove('active');
            if (editorTitle) editorTitle.textContent = 'CSS Editor';
            if (codeEditor) {
                codeEditor.placeholder = 'Write your CSS code here...';
                codeEditor.readOnly = false;
                codeEditor.value = this.gameState.editorContent[this.currentTask] || '';
            }
        }
        
        // Update live preview
        this.updateLivePreview();
    }
    
    updateLivePreview() {
        const htmlCode = this.gameState.htmlContent[this.currentTask] || this.tasks[this.currentTask].htmlContent;
        const cssCode = this.gameState.editorContent[this.currentTask] || '';
        const preview = document.getElementById('livePreview');
        
        if (preview) {
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
    }
    
    validateCode() {
        if (!this.currentTask) {
            console.warn('No task is currently selected.');
            return;
        }

        const codeEditor = document.getElementById('codeEditor');
        if (!codeEditor) return;

        const code = codeEditor.value.trim();
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
            const submitBtn = document.getElementById('submitCode');
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        } else {
            // Track failed attempts
            const taskId = this.currentTask;
            this.gameState.failedAttempts[taskId] = (this.gameState.failedAttempts[taskId] || 0) + 1;
            this.saveGameState();
            
            this.showValidationFeedback('Your CSS doesn\'t match the expected output. Check the instructions and try again.', 'error');
            const submitBtn = document.getElementById('submitCode');
            if (submitBtn) {
                submitBtn.disabled = true;
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
    
    async submitTask() {
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
        await this.saveGameState();
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
        const validateBtn = document.getElementById('validateCode');
        const submitBtn = document.getElementById('submitCode');
        const showSolutionBtn = document.getElementById('showSolution');
        
        if (validateBtn) validateBtn.disabled = true;
        if (submitBtn) submitBtn.disabled = true;
        if (showSolutionBtn) showSolutionBtn.disabled = true;
        
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
            let expPenalty = 5; // Fixed penalty for all levels
            if (task.level === 'intermediate') expPenalty = 10;
            if (task.level === 'advanced') expPenalty = 15;

            this.gameState.exp = Math.max(0, this.gameState.exp - expPenalty); // Deduct EXP but not below 0
            this.gameState.unlockedSolutions.add(taskId); // Mark solution as unlocked
            this.saveGameState(); // Save state after deduction
            this.updateExpCounter(); // Update EXP display
            this.showValidationFeedback(`Solution revealed! ${expPenalty} EXP deducted. Study the code and try to understand it.`, 'info');
        } else {
            this.showValidationFeedback('Solution already revealed. No further EXP deduction.', 'info');
        }
        
        // Switch to CSS mode and show solution in the editor
        this.switchEditorMode('css');
        const codeEditor = document.getElementById('codeEditor');
        if (codeEditor) {
            codeEditor.value = task.solution;
            this.gameState.editorContent[taskId] = task.solution;
            this.saveGameState(); // Save editor content
        }
        
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
        const showSolutionBtn = document.getElementById('showSolution');
        
        if (!showSolutionBtn) return;
        
        // Calculate EXP penalty based on level
        let expPenalty = 5;
        if (task.level === 'intermediate') expPenalty = 10;
        if (task.level === 'advanced') expPenalty = 15;
        
        if (isUnlocked) {
            showSolutionBtn.disabled = false;
            showSolutionBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Show Solution
            `;
        } else if (failedAttempts >= 2) {
            showSolutionBtn.disabled = false;
            showSolutionBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Show Solution (-${expPenalty} EXP)
            `;
        } else {
            showSolutionBtn.disabled = true;
            showSolutionBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Show Solution (${2 - failedAttempts} attempts left)
            `;
        }
    }
    
    downloadCertificate() {
        const userName = document.getElementById('userName')?.value.trim();
        
        if (!userName) {
            alert('Please enter your name to generate your certificate.');
            return;
        }

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Create a simple certificate design
            canvas.width = 800;
            canvas.height = 600;
            
            // Background
            ctx.fillStyle = '#f8f9ff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Border
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 8;
            ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
            
            // Inner border
            ctx.strokeStyle = '#2980b9';
            ctx.lineWidth = 2;
            ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
            
            // Title
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Certificate of Completion', canvas.width / 2, 120);
            
            // Subtitle
            ctx.font = '24px Arial';
            ctx.fillText('CSS Learning Game', canvas.width / 2, 160);
            
            // This certifies
            ctx.font = '20px Arial';
            ctx.fillText('This certifies that', canvas.width / 2, 220);
            
            // User name
            ctx.fillStyle = '#3498db';
            ctx.font = 'bold 36px Arial';
            ctx.fillText(userName, canvas.width / 2, 280);
            
            // Achievement text
            ctx.fillStyle = '#2c3e50';
            ctx.font = '20px Arial';
            ctx.fillText('has successfully completed all 30 tasks', canvas.width / 2, 340);
            ctx.fillText('in the CSS Learning Game', canvas.width / 2, 370);
            ctx.fillText('earning a total of 600 EXP', canvas.width / 2, 400);
            
            // Date
            ctx.font = '16px Arial';
            const currentDate = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            ctx.fillText(currentDate, canvas.width / 2, 480);
            
            // Signature line
            ctx.fillStyle = '#7f8c8d';
            ctx.font = '14px Arial';
            ctx.fillText('CSS in My Style - Learning Platform', canvas.width / 2, 520);
            
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
                    alert('Error generating certificate. Please try again.');
                }
            }, 'image/png', 1.0);
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

// ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Security measures
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
