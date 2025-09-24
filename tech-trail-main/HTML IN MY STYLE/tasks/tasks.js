// API Base URL - Update this to match your FastAPI endpoint
const API_BASE = "https://tech-trail-w2ap.onrender.com";

// Game State Management
class HTMLLearningGame {
  constructor() {
    this.username = null;
    this.gameState = {
      exp: 0,
      completedTasks: new Set(),
      unlockedSolutions: new Set(),
      failedAttempts: {},
      theme: 'light',
      editorContent: {}
    };

    this.tasks = {
      // BEGINNER TASKS (10 tasks - 10 EXP each)
      'beginner-1': {
        title: 'Basic HTML Structure',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Create Basic HTML Structure</h4>
          <p><strong>Instructions:</strong> Create a basic HTML document with the following elements:</p>
          <ul>
            <li>An <code>h1</code> heading with the text "Welcome to HTML"</li>
            <li>A paragraph with the text "This is my first HTML page"</li>
            <li>Another paragraph with the text "I'm learning HTML step by step"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<h1>Welcome to HTML</h1>
<p>This is my first HTML page</p>
<p>I'm learning HTML step by step</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<h1>welcome to html</h1> <p>this is my first html page</p> <p>i'm learning html step by step</p>`;
          return normalized === expected;
        }
      },

      'beginner-2': {
        title: 'HTML Headings',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Create HTML Headings</h4>
          <p><strong>Instructions:</strong> Create the following heading structure:</p>
          <ul>
            <li>An <code>h1</code> heading with "Main Title"</li>
            <li>An <code>h2</code> heading with "Subtitle"</li>
            <li>An <code>h3</code> heading with "Section Title"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<h1>Main Title</h1>
<h2>Subtitle</h2>
<h3>Section Title</h3>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<h1>main title</h1> <h2>subtitle</h2> <h3>section title</h3>`;
          return normalized === expected;
        }
      },

      'beginner-3': {
        title: 'Text Formatting',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Text Formatting</h4>
          <p><strong>Instructions:</strong> Create the following formatted text:</p>
          <ul>
            <li>A paragraph with <code>strong</code> text "Important text"</li>
            <li>A paragraph with <code>em</code> text "Emphasized text"</li>
            <li>A paragraph with <code>mark</code> text "Highlighted text"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<p><strong>Important text</strong></p>
<p><em>Emphasized text</em></p>
<p><mark>Highlighted text</mark></p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p><strong>important text</strong></p> <p><em>emphasized text</em></p> <p><mark>highlighted text</mark></p>`;
          return normalized === expected;
        }
      },

      'beginner-4': {
        title: 'Line Breaks and Horizontal Rules',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Line Breaks and Horizontal Rules</h4>
          <p><strong>Instructions:</strong> Create the following structure:</p>
          <ul>
            <li>A paragraph with "First line" followed by a line break and "Second line"</li>
            <li>A horizontal rule</li>
            <li>Another paragraph with "After the rule"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<p>First line<br>Second line</p>
<hr>
<p>After the rule</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>first line<br>second line</p> <hr> <p>after the rule</p>`;
          return normalized === expected;
        }
      },

      'beginner-5': {
        title: 'HTML Comments',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: HTML Comments</h4>
          <p><strong>Instructions:</strong> Create the following:</p>
          <ul>
            <li>A comment with text "This is a comment"</li>
            <li>A paragraph with "Visible text"</li>
            <li>Another comment with text "Another comment"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<!-- This is a comment -->
<p>Visible text</p>
<!-- Another comment -->`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<!-- this is a comment --> <p>visible text</p> <!-- another comment -->`;
          return normalized === expected;
        }
      },

      'beginner-6': {
        title: 'Basic Div Elements',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Basic Div Elements</h4>
          <p><strong>Instructions:</strong> Create the following structure:</p>
          <ul>
            <li>A div containing an h2 with "Section 1"</li>
            <li>A div containing a paragraph with "Content for section 1"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<div>
  <h2>Section 1</h2>
</div>
<div>
  <p>Content for section 1</p>
</div>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<div> <h2>section 1</h2> </div> <div> <p>content for section 1</p> </div>`;
          return normalized === expected;
        }
      },

      'beginner-7': {
        title: 'Span Elements',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Span Elements</h4>
          <p><strong>Instructions:</strong> Create a paragraph with:</p>
          <ul>
            <li>Text "This is a paragraph with a "</li>
            <li>A span containing "highlighted word"</li>
            <li>Text " in the middle."</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<p>This is a paragraph with a <span>highlighted word</span> in the middle.</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>this is a paragraph with a <span>highlighted word</span> in the middle.</p>`;
          return normalized === expected;
        }
      },

      'beginner-8': {
        title: 'Preformatted Text',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Preformatted Text</h4>
          <p><strong>Instructions:</strong> Create a pre element with the following code:</p>
          <pre>function hello() {
    console.log("Hello World");
}</pre>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<pre>function hello() {
    console.log("Hello World");
}</pre>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<pre>function hello() { console.log("hello world"); }</pre>`;
          return normalized === expected;
        }
      },

      'beginner-9': {
        title: 'Blockquotes',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Blockquotes</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A blockquote with the text "The best way to learn HTML is by practicing."</li>
            <li>A paragraph with "- Anonymous"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<blockquote>The best way to learn HTML is by practicing.</blockquote>
<p>- Anonymous</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<blockquote>the best way to learn html is by practicing.</blockquote> <p>- anonymous</p>`;
          return normalized === expected;
        }
      },

      'beginner-10': {
        title: 'Address Element',
        level: 'beginner',
        exp: 10,
        instructions: `
          <h4>Task: Address Element</h4>
          <p><strong>Instructions:</strong> Create an address element with:</p>
          <ul>
            <li>Text "Contact us at:"</li>
            <li>Line break</li>
            <li>Text "123 Web Street, HTML City"</li>
          </ul>
          <p><strong>Reward:</strong> 10 EXP</p>
        `,
        solution: `<address>Contact us at:<br>123 Web Street, HTML City</address>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<address>contact us at:<br>123 web street, html city</address>`;
          return normalized === expected;
        }
      },

      // INTERMEDIATE TASKS (10 tasks - 20 EXP each)
      'intermediate-1': {
        title: 'Unordered Lists',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Unordered Lists</h4>
          <p><strong>Instructions:</strong> Create an unordered list with:</p>
          <ul>
            <li>List item "HTML"</li>
            <li>List item "CSS"</li>
            <li>List item "JavaScript"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<ul> <li>html</li> <li>css</li> <li>javascript</li> </ul>`;
          return normalized === expected;
        }
      },

      'intermediate-2': {
        title: 'Ordered Lists',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Ordered Lists</h4>
          <p><strong>Instructions:</strong> Create an ordered list with:</p>
          <ol>
            <li>List item "Learn HTML"</li>
            <li>List item "Learn CSS"</li>
            <li>List item "Learn JavaScript"</li>
          </ol>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<ol>
  <li>Learn HTML</li>
  <li>Learn CSS</li>
  <li>Learn JavaScript</li>
</ol>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<ol> <li>learn html</li> <li>learn css</li> <li>learn javascript</li> </ol>`;
          return normalized === expected;
        }
      },

      'intermediate-3': {
        title: 'Basic Links',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Basic Links</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A link to "https://www.google.com" with text "Google"</li>
            <li>A link to "https://www.github.com" with text "GitHub"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<a href="https://www.google.com">Google</a>
<a href="https://www.github.com">GitHub</a>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<a href="https://www.google.com">google</a> <a href="https://www.github.com">github</a>`;
          return normalized === expected;
        }
      },

      'intermediate-4': {
        title: 'Images',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Add Images</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>An image with src "image.jpg" and alt text "Sample Image"</li>
            <li>A paragraph with "This is a sample image"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<img src="image.jpg" alt="Sample Image">
<p>This is a sample image</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<img src="image.jpg" alt="sample image"> <p>this is a sample image</p>`;
          return normalized === expected;
        }
      },

      'intermediate-5': {
        title: 'Nested Lists',
        level: 'intermediate',
        exp: 20,
                instructions: `
          <h4>Task: Create Nested Lists</h4>
          <p><strong>Instructions:</strong> Create an unordered list with:</p>
          <ul>
            <li>"Frontend" with nested list containing "HTML" and "CSS"</li>
            <li>"Backend" with nested list containing "Node.js" and "Python"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<ul> <li>frontend <ul> <li>html</li> <li>css</li> </ul> </li> <li>backend <ul> <li>node.js</li> <li>python</li> </ul> </li> </ul>`;
          return normalized === expected;
        }
      },

      'intermediate-6': {
        title: 'Tables Basic',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Basic Table</h4>
          <p><strong>Instructions:</strong> Create a table with:</p>
          <ul>
            <li>Header row with "Name" and "Age"</li>
            <li>Data row with "John" and "25"</li>
            <li>Data row with "Jane" and "30"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>30</td>
  </tr>
</table>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<table> <tr> <th>name</th> <th>age</th> </tr> <tr> <td>john</td> <td>25</td> </tr> <tr> <td>jane</td> <td>30</td> </tr> </table>`;
          return normalized === expected;
        }
      },

      'intermediate-7': {
        title: 'Description Lists',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Create Description Lists</h4>
          <p><strong>Instructions:</strong> Create a description list with:</p>
          <ul>
            <li>Term "HTML" with description "HyperText Markup Language"</li>
            <li>Term "CSS" with description "Cascading Style Sheets"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<dl> <dt>html</dt> <dd>hypertext markup language</dd> <dt>css</dt> <dd>cascading style sheets</dd> </dl>`;
          return normalized === expected;
        }
      },

      'intermediate-8': {
        title: 'Abbreviations and Acronyms',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Abbreviations and Acronyms</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A paragraph with "I love <abbr title="HyperText Markup Language">HTML</abbr>"</li>
            <li>A paragraph with "And <abbr title="Cascading Style Sheets">CSS</abbr> too"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<p>I love <abbr title="HyperText Markup Language">HTML</abbr></p>
<p>And <abbr title="Cascading Style Sheets">CSS</abbr> too</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>i love <abbr title="hypertext markup language">html</abbr></p> <p>and <abbr title="cascading style sheets">css</abbr> too</p>`;
          return normalized === expected;
        }
      },

      'intermediate-9': {
        title: 'Code and Keyboard Elements',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Code and Keyboard Elements</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A paragraph with "Use <code>console.log()</code> to debug"</li>
            <li>A paragraph with "Press <kbd>Ctrl+S</kbd> to save"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<p>Use <code>console.log()</code> to debug</p>
<p>Press <kbd>Ctrl+S</kbd> to save</p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>use <code>console.log()</code> to debug</p> <p>press <kbd>ctrl+s</kbd> to save</p>`;
          return normalized === expected;
        }
      },

      'intermediate-10': {
        title: 'Time and Date Elements',
        level: 'intermediate',
        exp: 20,
        instructions: `
          <h4>Task: Time and Date Elements</h4>
          <p><strong>Instructions:</strong> Create:</p>
          <ul>
            <li>A paragraph with "Published on <time datetime="2024-01-15">January 15, 2024</time>"</li>
            <li>A paragraph with "Updated <time datetime="2024-02-01">February 1, 2024</time>"</li>
          </ul>
          <p><strong>Reward:</strong> 20 EXP</p>
        `,
        solution: `<p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
<p>Updated <time datetime="2024-02-01">February 1, 2024</time></p>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<p>published on <time datetime="2024-01-15">january 15, 2024</time></p> <p>updated <time datetime="2024-02-01">february 1, 2024</time></p>`;
          return normalized === expected;
        }
      },

      // ADVANCED TASKS (10 tasks - 30 EXP each)
      'advanced-1': {
        title: 'Contact Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Create a Contact Form</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Text input for "Name" with placeholder "Your full name"</li>
            <li>Email input for "Email" with placeholder "your@email.com"</li>
            <li>Textarea for "Message" with placeholder "Your message here..."</li>
            <li>Submit button with text "Send Message"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <input type="text" placeholder="Your full name">
  <input type="email" placeholder="your@email.com">
  <textarea placeholder="Your message here..."></textarea>
  <button type="submit">Send Message</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <input type="text" placeholder="your full name"> <input type="email" placeholder="your@email.com"> <textarea placeholder="your message here..."></textarea> <button type="submit">send message</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-2': {
        title: 'Registration Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Create Registration Form</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Text input for username with placeholder "Username"</li>
            <li>Password input with placeholder "Password"</li>
            <li>Date input for birth date</li>
            <li>Submit button with text "Register"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <input type="text" placeholder="Username">
  <input type="password" placeholder="Password">
  <input type="date">
  <button type="submit">Register</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <input type="text" placeholder="username"> <input type="password" placeholder="password"> <input type="date"> <button type="submit">register</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-3': {
        title: 'Survey Form with Radio Buttons',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Survey Form with Radio Buttons</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "How satisfied are you?"</li>
            <li>Radio button with value "very-satisfied" and label "Very Satisfied"</li>
            <li>Radio button with value "satisfied" and label "Satisfied"</li>
            <li>Radio button with value "neutral" and label "Neutral"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>How satisfied are you?</label>
  <input type="radio" name="satisfaction" value="very-satisfied">
  <label>Very Satisfied</label>
  <input type="radio" name="satisfaction" value="satisfied">
  <label>Satisfied</label>
  <input type="radio" name="satisfaction" value="neutral">
  <label>Neutral</label>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>how satisfied are you?</label> <input type="radio" name="satisfaction" value="very-satisfied"> <label>very satisfied</label> <input type="radio" name="satisfaction" value="satisfied"> <label>satisfied</label> <input type="radio" name="satisfaction" value="neutral"> <label>neutral</label> </form>`;
          return normalized === expected;
        }
      },

      'advanced-4': {
        title: 'Checkbox Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Checkbox Form</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "Select your skills:"</li>
            <li>Checkbox with value "html" and label "HTML"</li>
            <li>Checkbox with value "css" and label "CSS"</li>
            <li>Checkbox with value "js" and label "JavaScript"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>Select your skills:</label>
  <input type="checkbox" value="html">
  <label>HTML</label>
  <input type="checkbox" value="css">
  <label>CSS</label>
  <input type="checkbox" value="js">
  <label>JavaScript</label>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>select your skills:</label> <input type="checkbox" value="html"> <label>html</label> <input type="checkbox" value="css"> <label>css</label> <input type="checkbox" value="js"> <label>javascript</label> </form>`;
          return normalized === expected;
        }
      },

      'advanced-5': {
        title: 'Select Dropdown',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Select Dropdown</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "Choose your country:"</li>
            <li>Select dropdown with options: "USA", "Canada", "UK", "Australia"</li>
            <li>Submit button with text "Submit"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>Choose your country:</label>
  <select>
    <option>USA</option>
    <option>Canada</option>
    <option>UK</option>
    <option>Australia</option>
  </select>
  <button type="submit">Submit</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>choose your country:</label> <select> <option>usa</option> <option>canada</option> <option>uk</option> <option>australia</option> </select> <button type="submit">submit</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-6': {
        title: 'File Upload Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: File Upload Form</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "Upload your resume:"</li>
            <li>File input that accepts ".pdf,.doc,.docx" files</li>
            <li>Submit button with text "Upload"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>Upload your resume:</label>
  <input type="file" accept=".pdf,.doc,.docx">
  <button type="submit">Upload</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
                    const expected = `<form> <label>upload your resume:</label> <input type="file" accept=".pdf,.doc,.docx"> <button type="submit">upload</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-7': {
        title: 'Form with Fieldset',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Form with Fieldset</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Fieldset with legend "Personal Information"</li>
            <li>Text input with placeholder "First Name"</li>
            <li>Text input with placeholder "Last Name"</li>
            <li>Email input with placeholder "Email"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <fieldset>
    <legend>Personal Information</legend>
    <input type="text" placeholder="First Name">
    <input type="text" placeholder="Last Name">
    <input type="email" placeholder="Email">
  </fieldset>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <fieldset> <legend>personal information</legend> <input type="text" placeholder="first name"> <input type="text" placeholder="last name"> <input type="email" placeholder="email"></fieldset> </form>`;
          return normalized === expected;
        }
      },

      'advanced-8': {
        title: 'Number and Range Inputs',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Number and Range Inputs</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Label "Age:"</li>
            <li>Number input with min="18" max="100"</li>
            <li>Label "Experience (years):"</li>
            <li>Range input with min="0" max="20"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <label>Age:</label>
  <input type="number" min="18" max="100">
  <label>Experience (years):</label>
  <input type="range" min="0" max="20">
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <label>age:</label> <input type="number" min="18" max="100"> <label>experience (years):</label> <input type="range" min="0" max="20"></form>`;
          return normalized === expected;
        }
      },

      'advanced-9': {
        title: 'Search and URL Inputs',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Search and URL Inputs</h4>
          <p><strong>Instructions:</strong> Create a form with:</p>
          <ul>
            <li>Search input with placeholder "Search..."</li>
            <li>URL input with placeholder "https://example.com"</li>
            <li>Submit button with text "Go"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <input type="search" placeholder="Search...">
  <input type="url" placeholder="https://example.com">
  <button type="submit">Go</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <input type="search" placeholder="search..."> <input type="url" placeholder="https://example.com"> <button type="submit">go</button> </form>`;
          return normalized === expected;
        }
      },

      'advanced-10': {
        title: 'Complete Registration Form',
        level: 'advanced',
        exp: 30,
        instructions: `
          <h4>Task: Complete Registration Form</h4>
          <p><strong>Instructions:</strong> Create a comprehensive form with:</p>
          <ul>
            <li>Text input for "Full Name"</li>
            <li>Email input for "Email"</li>
            <li>Password input for "Password"</li>
            <li>Select for "Country" with options: "USA", "Canada", "UK"</li>
            <li>Checkbox with label "I agree to terms"</li>
            <li>Submit button with text "Register"</li>
          </ul>
          <p><strong>Reward:</strong> 30 EXP</p>
        `,
        solution: `<form>
  <input type="text" placeholder="Full Name">
  <input type="email" placeholder="Email">
  <input type="password" placeholder="Password">
  <select>
    <option>USA</option>
    <option>Canada</option>
    <option>UK</option>
  </select>
  <input type="checkbox">
  <label>I agree to terms</label>
  <button type="submit">Register</button>
</form>`,
        validate: (code) => {
          const normalized = code.toLowerCase().replace(/\s+/g, ' ').trim();
          const expected = `<form> <input type="text" placeholder="full name"> <input type="email" placeholder="email"> <input type="password" placeholder="password"> <select> <option>usa</option> <option>canada</option> <option>uk</option> </select> <input type="checkbox"> <label>i agree to terms</label> <button type="submit">register</button> </form>`;
          return normalized === expected;
        }
      }
    };
    
    this.currentTask = null;
    this.init();
  }
  
  async init() {
    // Check if user is logged in first
    this.username = localStorage.getItem("username");
    if (!this.username) {
      alert("Please log in first to access the course!");
      window.location.href = "../../login.html"; // Adjust path as needed
      return;
    }

    await this.loadGameState();
    this.setupEventListeners();
    this.generateTaskCards();
    this.updateUI();
    this.updateTheme();
    this.renderCertificateTemplate(); // Render the SVG template on load
  }
  
  // Generate task cards dynamically
  generateTaskCards() {
    const levels = ['beginner', 'intermediate', 'advanced'];
    
    levels.forEach(level => {
      const container = document.getElementById(`${level}Tasks`);
      if (!container) return;
      
      const levelTasks = Object.entries(this.tasks).filter(([taskId, task]) => 
        task.level === level
      );
      
      levelTasks.forEach(([taskId, task]) => {
        const taskCard = this.createTaskCard(taskId, task);
        container.appendChild(taskCard);
      });
    });
  }
  
  createTaskCard(taskId, task) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.taskId = taskId;
    
    const icons = {
      'beginner': '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
      'intermediate': '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>',
      'advanced': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline>'
    };
    
    taskCard.innerHTML = `
      <div class="task-glow"></div>
      <div class="task-header">
        <div class="task-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${icons[task.level]}
          </svg>
        </div>
        <div class="task-info">
          <h3 class="task-title">${task.title}</h3>
          <p class="task-description">${this.getTaskDescription(taskId)}</p>
        </div>
        <div class="task-exp">
          <span class="exp-value">+${task.exp}</span>
          <span class="exp-unit">EXP</span>
        </div>
      </div>
      <div class="task-footer">
        <button class="btn btn-primary task-start-btn">
          <span>Start Task</span>
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        <div class="task-status">
          <svg class="icon check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
    `;
    
    return taskCard;
  }
  
  getTaskDescription(taskId) {
    const descriptions = {
      'beginner-1': 'Create your first HTML document with headings and paragraphs',
      'beginner-2': 'Learn to structure content with different heading levels',
      'beginner-3': 'Apply text formatting with strong, em, and mark elements',
      'beginner-4': 'Use line breaks and horizontal rules for content separation',
      'beginner-5': 'Add comments to document your HTML code',
      'beginner-6': 'Organize content using div container elements',
      'beginner-7': 'Apply inline styling with span elements',
      'beginner-8': 'Display preformatted text and code snippets',
      'beginner-9': 'Create quotations using blockquote elements',
      'beginner-10': 'Add contact information with address elements',
      'intermediate-1': 'Create bullet point lists with unordered lists',
      'intermediate-2': 'Create numbered lists with ordered lists',
      'intermediate-3': 'Add navigation with hyperlinks',
      'intermediate-4': 'Embed images with proper alt text',
      'intermediate-5': 'Create complex nested list structures',
      'intermediate-6': 'Display tabular data with table elements',
      'intermediate-7': 'Define terms and descriptions with definition lists',
      'intermediate-8': 'Add abbreviations with explanatory tooltips',
      'intermediate-9': 'Display code snippets and keyboard shortcuts',
      'intermediate-10': 'Add semantic time and date information',
      'advanced-1': 'Build a complete contact form with validation',
      'advanced-2': 'Create user registration with secure inputs',
      'advanced-3': 'Design surveys with radio button selections',
      'advanced-4': 'Allow multiple selections with checkboxes',
      'advanced-5': 'Provide options with dropdown menus',
      'advanced-6': 'Enable file uploads with input restrictions',
      'advanced-7': 'Group form elements with fieldsets',
      'advanced-8': 'Collect numeric data with specialized inputs',
      'advanced-9': 'Create search and URL input fields',
      'advanced-10': 'Build a comprehensive registration system'
    };
    
    return descriptions[taskId] || 'Complete this HTML task to earn EXP';
  }
  
  // FIXED: Load game state from MongoDB with fallback to localStorage
  async loadGameState() {
    try {
      // First, try to load from MongoDB
      const response = await fetch(`${API_BASE}/progress/${this.username}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Loaded progress from server:", data);
        
        // Convert server data to local game state
        const htmlTasks = data.html || [];
        
        // Calculate EXP from completed tasks
        let calculatedExp = 0;
        htmlTasks.forEach(taskId => {
          if (this.tasks[taskId]) {
            calculatedExp += this.tasks[taskId].exp;
          }
        });
        
        this.gameState = {
          exp: calculatedExp,
          completedTasks: new Set(htmlTasks),
          unlockedSolutions: new Set(data.unlocked_solutions || []),
          failedAttempts: data.failed_attempts || {},
          theme: data.theme || 'light',
          editorContent: data.editor_content || {}
        };
        
        console.log(`Loaded ${htmlTasks.length} completed tasks, Total EXP: ${calculatedExp}`);
      } else {
        throw new Error('Failed to load from server');
      }
    } catch (error) {
      console.error("Error loading from server, trying localStorage:", error);
      
      // Fallback to localStorage
      const saved = localStorage.getItem('htmlLearningGame');
      if (saved) {
        try {
          const parsedState = JSON.parse(saved);
          this.gameState = {
            exp: parsedState.exp || 0,
            completedTasks: new Set(parsedState.completedTasks || []),
            unlockedSolutions: new Set(parsedState.unlockedSolutions || []),
            failedAttempts: parsedState.failedAttempts || {},
            theme: parsedState.theme || 'light',
            editorContent: parsedState.editorContent || {}
          };
          console.log("Loaded from localStorage as fallback");
        } catch (parseError) {
          console.error("Error parsing localStorage data:", parseError);
        }
      }
    }
  }

  // FIXED: Save game state to both MongoDB and localStorage
  async saveGameState() {
    const stateToSave = {
      username: this.username,
      course: "html",
      completedTasks: Array.from(this.gameState.completedTasks),
      unlockedSolutions: Array.from(this.gameState.unlockedSolutions),
      failedAttempts: this.gameState.failedAttempts,
      theme: this.gameState.theme,
      editorContent: this.gameState.editorContent
    };

    // Always save to localStorage first (immediate backup)
    localStorage.setItem('htmlLearningGame', JSON.stringify(stateToSave));

    // Save to MongoDB
    try {
      const response = await fetch(`${API_BASE}/task/save-progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stateToSave)
      });

      if (response.ok) {
        const result = await response.json();
                console.log("Progress saved to server:", result);
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving to server:", error);
      // Data is still saved locally, so user can continue
    }
  }
  
  // Event Listeners
  setupEventListeners() {
    // Back button
    document.getElementById('backBtn').addEventListener('click', () => {
      window.location.href = '../index.html';
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Task start buttons (delegated event listener)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.task-start-btn')) {
        const taskCard = e.target.closest('.task-card');
        const taskId = taskCard.dataset.taskId;
        if (!this.gameState.completedTasks.has(taskId)) {
          this.openTaskModal(taskId);
        }
      }
    });
    
    // Modal close
    document.getElementById('closeModal').addEventListener('click', () => {
      this.closeTaskModal();
    });
    
    // Modal overlay click
    document.getElementById('taskModal').addEventListener('click', (e) => {
      if (e.target.id === 'taskModal') {
        this.closeTaskModal();
      }
    });
    
    // Code editor
    document.getElementById('codeEditor').addEventListener('input', (e) => {
      if (this.currentTask) {
        this.gameState.editorContent[this.currentTask] = e.target.value;
        this.saveGameState();
        this.updateLivePreview();
      }
    });
    
    // Validation and submission
    const validateCodeBtn = document.getElementById('validateCode');
    if (validateCodeBtn) {
        validateCodeBtn.addEventListener('click', () => {
            this.validateCode();
        });
    }

    const submitCodeBtn = document.getElementById('submitCode');
    if (submitCodeBtn) {
        submitCodeBtn.addEventListener('click', () => {
            this.submitTask();
        });
    }

    const showSolutionBtn = document.getElementById('showSolution');
    if (showSolutionBtn) {
        showSolutionBtn.addEventListener('click', () => {
            this.showSolution();
        });
    }
    
    // Certificate download
    document.getElementById('downloadCertificate').addEventListener('click', () => {
      this.downloadCertificate();
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeTaskModal();
      }
    });
  }
  
  // Theme Management
  toggleTheme() {
    this.gameState.theme = this.gameState.theme === 'light' ? 'dark' : 'light';
    this.updateTheme();
    this.saveGameState();
  }
  
  updateTheme() {
    document.documentElement.setAttribute('data-theme', this.gameState.theme);
  }
  
  // UI Updates
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
  
  // Task Modal Management
  openTaskModal(taskId) {
    this.currentTask = taskId;
    const task = this.tasks[taskId];
    
    // Update modal content
    document.getElementById('modalTitle').textContent = task.title;
    document.getElementById('taskInstructions').innerHTML = task.instructions;
    
    // Load saved editor content or set default
    const savedContent = this.gameState.editorContent[taskId] || '';
    document.getElementById('codeEditor').value = savedContent;
    
    // Reset validation state
    this.resetValidationState();
    
    // Update solution button state
    this.updateSolutionButton();
    
    // Show modal
    document.getElementById('taskModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update live preview
    this.updateLivePreview();
  }
  
  closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    document.body.style.overflow = '';
    this.currentTask = null;
  }
  
  // Reset all button states and feedback
  resetValidationState() {
    const validateBtn = document.getElementById('validateCode');
    const submitBtn = document.getElementById('submitCode');
    const showSolutionBtn = document.getElementById('showSolution');
    const feedback = document.getElementById('validationFeedback');
    
    // Reset all buttons to enabled state
    if (validateBtn) {
      validateBtn.disabled = false;
      validateBtn.textContent = 'Validate';
    }
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submit';
    }
    
    if (showSolutionBtn) {
      showSolutionBtn.disabled = true;
    }
    
    // Hide feedback
    if (feedback) {
      feedback.style.display = 'none';
      feedback.className = 'validation-feedback';
      feedback.textContent = '';
    }
  }
  
  updateSolutionButton() {
    const showSolutionBtn = document.getElementById('showSolution');
    if (!showSolutionBtn) return;

    const taskId = this.currentTask;
    const failedAttempts = this.gameState.failedAttempts[taskId] || 0;
    const isUnlocked = this.gameState.unlockedSolutions.has(taskId);
    
    // Determine EXP deduction based on task level
    let expDeduction = 0;
    if (this.tasks[taskId]) {
      if (this.tasks[taskId].level === 'beginner') expDeduction = 5;
      else if (this.tasks[taskId].level === 'intermediate') expDeduction = 10;
      else if (this.tasks[taskId].level === 'advanced') expDeduction = 15;
    }

    if (isUnlocked) {
      showSolutionBtn.disabled = false;
      showSolutionBtn.textContent = 'Show Solution';
    } else if (failedAttempts >= 2) {
      showSolutionBtn.disabled = false;
      showSolutionBtn.textContent = `Show Solution (-${expDeduction} EXP)`;
    } else {
      showSolutionBtn.disabled = true;
      showSolutionBtn.textContent = `Show Solution (${2 - failedAttempts} attempts left)`;
    }
  }
  
  // Code Validation and Submission
  validateCode() {
    if (!this.currentTask) {
      console.warn('No task is currently selected.');
      return;
    }

    const code = document.getElementById('codeEditor').value.trim();
    const task = this.tasks[this.currentTask];
    const submitBtn = document.getElementById('submitCode');
    
    if (!code) {
      this.showValidationFeedback('Please write some HTML code first.', 'error');
      return;
    }
    
    const isValid = task.validate(code);
    
    if (isValid) {
      this.showValidationFeedback('Perfect! Your HTML code is correct. Click Submit to earn EXP!', 'success');
      if (submitBtn) submitBtn.disabled = false;
    } else {
      // Track failed attempts
      const taskId = this.currentTask;
      this.gameState.failedAttempts[taskId] = (this.gameState.failedAttempts[taskId] || 0) + 1;
      this.saveGameState();
      
      this.showValidationFeedback('Your HTML doesn\'t match the expected output. Check the instructions and try again.', 'error');
      if (submitBtn) submitBtn.disabled = true;
      
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
      
      // Scroll to feedback for better visibility
      feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  
  // FIXED: Submit Task Completion with proper MongoDB sync
  async submitTask() {
    const taskId = this.currentTask;
    const task = this.tasks[taskId];
    
    // Check if task is already completed to prevent duplicate EXP
    if (this.gameState.completedTasks.has(taskId)) {
      console.warn('Task already completed, not adding EXP again');
      this.showTaskAnswer();
      return;
    }
    
    // Add to completed tasks and EXP
    this.gameState.completedTasks.add(taskId);
    this.gameState.exp += task.exp;
    delete this.gameState.editorContent[taskId];
    
    console.log(`Task ${taskId} completed. Added ${task.exp} EXP. Total EXP: ${this.gameState.exp}`);

    // Save state immediately
    await this.saveGameState();
    this.updateUI();

    // Send completion to MongoDB via individual task completion API
    try {
      const response = await fetch(`${API_BASE}/task/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          course: "html",
          task_id: taskId
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Task completion confirmed by server:", data);
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      console.error("Error confirming task completion with server:", error);
      // Task is still marked complete locally
    }

    this.showTaskAnswer();
  }
  
  // Show the answer after task completion
  showTaskAnswer() {
    const task = this.tasks[this.currentTask];
    
    // Update the instructions to show the answer
    const instructionsDiv = document.getElementById('taskInstructions');
    if (instructionsDiv) {
      instructionsDiv.innerHTML = `
        <h4>🎉 Task Completed Successfully!</h4>
        <p><strong>Congratulations!</strong> You earned ${task.exp} EXP!</p>
        <p><strong>Here's the correct answer:</strong></p>
        <pre><code>${task.solution.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
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
    const isAlreadyUnlocked = this.gameState.unlockedSolutions.has(taskId);
    
    let expDeduction = 0;
    if (this.tasks[taskId]) {
      if (this.tasks[taskId].level === 'beginner') expDeduction = 5;
      else if (this.tasks[taskId].level === 'intermediate') expDeduction = 10;
      else if (this.tasks[taskId].level === 'advanced') expDeduction = 15;
    }

    if (!isAlreadyUnlocked) {
      // Deduct EXP
      this.gameState.exp = Math.max(0, this.gameState.exp - expDeduction);
      this.gameState.unlockedSolutions.add(taskId);
      this.updateExpCounter();
    }
    
    // Show solution in editor
    document.getElementById('codeEditor').value = task.solution;
    this.gameState.editorContent[taskId] = task.solution;
    this.saveGameState();
    
    // Update live preview
    this.updateLivePreview();
    
    // Update button
    this.updateSolutionButton();
    
    // Show feedback
    if (!isAlreadyUnlocked) {
      this.showValidationFeedback(`Solution revealed! ${expDeduction} EXP deducted. Study the code and try to understand it.`, 'error');
    } else {
            this.showValidationFeedback('Here\'s the solution again. Study it carefully!', 'success');
    }
  }
  
  updateLivePreview() {
    const code = document.getElementById('codeEditor').value;
    const preview = document.getElementById('livePreview');
    
    const previewContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1, h2, h3 { color: #e34c26; }
          a { color: #f16529; text-decoration: none; }
          a:hover { text-decoration: underline; }
          ul { padding-left: 20px; }
          form { max-width: 400px; }
          input, textarea, button, select {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
          }
          button {
            background: #e34c26;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: bold;
          }
          button:hover { background: #d63916; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${code}
      </body>
      </html>
    `;
    
    preview.srcdoc = previewContent;
  }
  
  // Certificate Generation
  async renderCertificateTemplate() {
    const certificateTemplateContainer = document.getElementById('certificateTemplate');
    if (!certificateTemplateContainer) return;

    // The XML SVG code from the user's clipboard
    const svgCode = `
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1086.2 794.8">
        <defs>
          <style>
            .cls-1 { fill: #e35d26; }
            .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10, .cls-11, .cls-12 { stroke-miterlimit: 10; }
            .cls-1, .cls-2, .cls-3, .cls-11, .cls-12 { stroke: #083e5c; }
            .cls-2, .cls-13, .cls-11 { fill: #fae4c4; }
            .cls-14, .cls-15 { letter-spacing: -.02em; }
            .cls-3, .cls-11 { stroke-width: 1.6px; }
            .cls-3, .cls-16, .cls-15 { fill: #e15c26; }
            .cls-17, .cls-18 { fill: #053c59; }
            .cls-19 { letter-spacing: .1em; }
            .cls-19, .cls-4, .cls-20, .cls-5, .cls-6, .cls-21, .cls-22, .cls-23, .cls-18, .cls-7, .cls-24, .cls-8, .cls-25, .cls-9, .cls-26, .cls-27, .cls-16, .cls-28, .cls-29, .cls-15 { isolation: isolate; }
            .cls-19, .cls-20, .cls-6, .cls-21, .cls-18, .cls-7, .cls-9, .cls-26, .cls-16, .cls-28, .cls-29, .cls-15 { font-family: Arial-BoldMT, Arial; font-weight: 700; }
            .cls-19, .cls-22, .cls-24, .cls-25, .cls-27, .cls-28, .cls-29 { fill: #231f20; }
            .cls-19, .cls-28, .cls-29 { font-size: 15.9px; }
            .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9 { stroke-width: .5px; }
            .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10 { fill: none; }
            .cls-4, .cls-5, .cls-22, .cls-24, .cls-8, .cls-25 { font-family: ArialMT, Arial; }
            .cls-4, .cls-5, .cls-18, .cls-24, .cls-25 { font-size: 31.8px; }
            .cls-4, .cls-24 { letter-spacing: -.02em; }
            .cls-20, .cls-6, .cls-21, .cls-7, .cls-9, .cls-26 { font-size: 63.6px; }
            .cls-20, .cls-21, .cls-30, .cls-26 { fill: #e25626; }
            .cls-20, .cls-9 { letter-spacing: .06em; }
            .cls-31 { fill: #faf1dd; }
            .cls-5, .cls-25 { letter-spacing: .1em; }
            .cls-32 { fill: #fff; }
            .cls-33 { fill: #083e5b; }
            .cls-6, .cls-21 { letter-spacing: .2em; }
            .cls-6, .cls-7, .cls-9 { stroke: #e15726; }
            .cls-34 { fill: #f0662a; }
            .cls-35 { fill: #f9e1bc; }
            .cls-36 { fill: #083e5c; }
            .cls-22, .cls-8 { letter-spacing: .1em; }
            .cls-22, .cls-8, .cls-16, .cls-15 { font-size: 21.2px; }
            .cls-37 { fill: #e35e26; }
            .cls-18, .cls-29 { letter-spacing: .1em; }
            .cls-38 { fill: #063d5c; }
            .cls-7, .cls-26 { letter-spacing: .2em; }
            .cls-39 { opacity: .3; }
            .cls-40 { fill: #ebebeb; }
            .cls-10 { stroke-width: 2.6px; }
            .cls-27 { opacity: .8; }
            .cls-28 { letter-spacing: .08em; }
            .cls-41 { fill: #083f5c; }
            .cls-12 { fill: #e55e26; }
          </style>
        </defs>
        <polygon class="cls-30" points="396.8 0 76.3 363.9 0 451.5 0 0 396.8 0"/>
        <polygon class="cls-30" points="617.4 794.8 998.9 355.1 1086 257 1086 794.8 617.4 794.8"/>
        <polygon class="cls-34" points="601.6 .2 0 659.9 0 449.3 394.4 .1 601.6 .2"/>
        <polygon class="cls-34" points="1086.2 258 617.5 794.8 419.8 794.8 1085.4 61.9 1086.2 258"/>
        <polygon class="cls-40" points="1084 62.2 419.4 794.6 0 659.9 596.8 5.3 1084 62.2"/>
        <polygon class="cls-40" points="1085 62.9 596.6 5.4 601.6 .2 1085.5 .2 1085 62.9"/>
        <polygon class="cls-40" points="0 794.8 419.3 794.8 461.9 748.1 0 659.9 0 794.8"/>
        <rect class="cls-32" x="50.2" y="60.5" width="984.1" height="673.7"/>
        <g class="cls-23">
          <text class="cls-26" transform="translate(299.9 146.4)"><tspan x="0" y="0">CE</tspan></text>
          <text class="cls-7" transform="translate(299.9 146.4)"><tspan x="0" y="0">CE</tspan></text>
          <text class="cls-26" transform="translate(400.6 146.4)"><tspan x="0" y="0">R</tspan></text>
          <text class="cls-7" transform="translate(400.6 146.4)"><tspan x="0" y="0">R</tspan></text>
          <text class="cls-21" transform="translate(451.4 146.4)"><tspan x="0" y="0">TIFIC</tspan></text>
          <text class="cls-6" transform="translate(451.4 146.4)"><tspan x="0" y="0">TIFIC</tspan></text>
          <text class="cls-20" transform="translate(660.6 146.4)"><tspan x="0" y="0">A</tspan></text>
          <text class="cls-9" transform="translate(660.6 146.4)"><tspan x="0" y="0">A</tspan></text>
          <text class="cls-21" transform="translate(711.3 146.4)"><tspan x="0" y="0">TE</tspan></text>
          <text class="cls-6" transform="translate(711.3 146.4)"><tspan x="0" y="0">TE</tspan></text>
        </g>
        <g class="cls-23">
          <text class="cls-25" transform="translate(357.6 218.2)"><tspan x="0" y="0">Of </tspan></text>
          <text class="cls-5" transform="translate(357.6 218.2)"><tspan x="0" y="0">Of </tspan></text>
          <text class="cls-24" transform="translate(415.1 218.2)"><tspan x="0" y="0">T</tspan></text>
          <text class="cls-4" transform="translate(415.1 218.2)"><tspan x="0" y="0">T</tspan></text>
          <text class="cls-25" transform="translate(436.3 218.2)"><tspan x="0" y="0">ask </tspan></text>
          <text class="cls-5" transform="translate(436.3 218.2)"><tspan x="0" y="0">ask </tspan></text>
          <text class="cls-25" transform="translate(513.6 218.2)"><tspan x="0" y="0">C</tspan></text>
          <text class="cls-5" transform="translate(513.6 218.2)"><tspan x="0" y="0">C</tspan></text>
          <text class="cls-25" transform="translate(539.3 218.2)"><tspan x="0" y="0">ompletion</tspan></text>
          <text class="cls-5" transform="translate(539.3 218.2)"><tspan x="0" y="0">ompletion</tspan></text>
        </g>
        <g class="cls-23">
          <text class="cls-22" transform="translate(449.6 277.6)"><tspan x="0" y="0">is p</tspan></text>
          <text class="cls-8" transform="translate(449.6 277.6)"><tspan x="0" y="0">is p</tspan></text>
          <text class="cls-22" transform="translate(491.6 277.6)"><tspan x="0" y="0">r</tspan></text>
          <text class="cls-8" transform="translate(491.6 277.6)"><tspan x="0" y="0">r</tspan></text>
          <text class="cls-22" transform="translate(501.5 277.6)"><tspan x="0" y="0">ese</tspan></text>
          <text class="cls-8" transform="translate(501.5 277.6)"><tspan x="0" y="0">ese</tspan></text>
          <text class="cls-22" transform="translate(540.9 277.6)"><tspan x="0" y="0">n</tspan></text>
          <text class="cls-8" transform="translate(540.9 277.6)"><tspan x="0" y="0">n</tspan></text>
          <text class="cls-22" transform="translate(555.1 277.6)"><tspan x="0" y="0">t</tspan></text>
          <text class="cls-8" transform="translate(555.1 277.6)"><tspan x="0" y="0">t</tspan></text>
          <text class="cls-22" transform="translate(565.3 277.6)"><tspan x="0" y="0">ed </tspan></text>
          <text class="cls-8" transform="translate(565.3 277.6)"><tspan x="0" y="0">ed </tspan></text>
          <text class="cls-22" transform="translate(601.6 277.6)"><tspan x="0" y="0">t</tspan></text>
          <text class="cls-8" transform="translate(601.6 277.6)"><tspan x="0" y="0">t</tspan></text>
          <text class="cls-22" transform="translate(611.8 277.6)"><tspan x="0" y="0">o :</tspan></text>
          <text class="cls-8" transform="translate(611.8 277.6)"><tspan x="0" y="0">o :</tspan></text>
        </g>
        <g class="cls-39">
          <rect class="cls-31" x="861.1" y="548.4" width="173.3" height="185.9"/>
          <g>
            <rect class="cls-11" x="926.1" y="576.1" width="51.6" height="32.8" rx="5.2" ry="5.2"/>
            <rect class="cls-33" x="930.5" y="582.6" width="42.7" height="19.8" rx="5.2" ry="5.2"/>
            <ellipse class="cls-35" cx="961.7" cy="592.5" rx="5.4" ry="5.8"/>
            <ellipse class="cls-35" cx="940.9" cy="592.5" rx="5.4" ry="5.8"/>
            <polygon class="cls-17" points="923 613.2 923.2 612.9 923.5 612.7 923.8 612.4 923.9 612.2 924.3 611.9 924.6 611.7 924.8 611.5 925 611.2 925.4 611 925.7 610.9 926.1 610.7 926.2 610.5 926.7 610.3 927.3 610.1 927.6 609.9 928.3 609.6 928.6 609.4 974.8 609.3 975.2 609.5 975.8 609.7 976.3 609.9 976.6 610.1 976.8 610.2 977 610.5 977.4 610.6 977.6 610.8 977.9 611 978.3 611.2 978.6 611.5 978.9 611.9 979.3 612.1 979.5 612.3 979.7 612.7 979.9 613 980.3 613.4 980.3 615 979.3 615 978.5 615.2 977.4 615.4 976.3 615.6 975.3 615.8 974.3 616 973.4 616.2 972.4 616.4 971.5 616.6 970.5 616.8 969.8 617 969 617.2 968.1 617.4 967.2 617.7 966.3 617.8 965.8 618 965.2 618.2 964.4 618.4 963.8 618.6 963.2 618.8 962.7 619 962.1 619.2 961.7 619.4 961.2 619.6 960.8 619.8 960.2 620 959.8 620.2 959.4 620.4 959 620.6 958.6 620.8 958.3 621 957.9 621.2 957.5 621.4 957.1 621.6 956.8 621.8 956.5 622 956.2 622.2 955.9 622.4 955.6 622.6 955.2 622.8 955 623 954.8 623.2 954.5 623.4 954.2 623.6 954 623.8 953.8 624 953.6 624.2 953.4 624.4 953.2 624.5 953 624.7 952.9 624.9 952.7 625.2 952.5 625.3 952.3 625.7 952.1 626.1 951.9 626.6 951.7 626.8 951 626.8 951 626.5 950.8 626.3 950.5 625.8 950.2 625.4 949.9 624.9 949.4 624.5 948.9 624 948.6 623.7 948.2 623.4 947.8 623.1 947.5 622.7 946.9 622.3 946.3 621.9 945.4 621.5 944.8 621.1 944.2 620.7 943.3 620.2 942.4 619.8 941.9 619.6 941.3 619.3 940.9 619.1 940.3 618.9 939.7 618.7 939 618.5 938.3 618.2 937.4 618 936.7 617.8 936 617.7 935.1 617.4 934.3 617.2 933.4 617 932.4 616.9 931.6 616.6 930.6 616.4 929.7 616.3 928.6 616.1 927.8 615.8 926.7 615.6 925.7 615.5 924.7 615.3 923.8 615.1 923 615 923 613.2"/>
            <polygon class="cls-17" points="979.5 613.6 980.1 613.6 980.5 613.4 981 613.1 981.5 612.9 982 612.7 982.5 612.5 982.9 612.2 983.4 612 983.8 611.9 984.1 611.9 984.6 612.1 984.8 612.3 985 612.7 985 613.2 985 615.5 983.5 616.5 983.4 613.8 983.2 614 982.9 614 982.4 614.3 982 614.5 981.5 614.7 981 614.9 980.3 615.3 979.5 615.3 979.5 613.5 979.5 613.6"/>
            <polygon class="cls-17" points="924.5 613.5 923.9 613.5 923.3 613.3 922.7 612.9 922.2 612.7 921.5 612.4 920.9 612.2 920.4 611.9 919.8 611.7 919.3 611.5 918.9 611.5 918.2 611.5 917.9 611.9 917.9 612.5 917.9 613.1 917.9 615.6 919.4 616.5 919.4 614.3 920 614 920.3 614.3 921 614.5 921.5 614.7 922.2 615 922.7 615.3 923.6 615.6 924.6 615.6 924.6 613.4 924.5 613.5"/>
            <g>
              <polygon class="cls-2" points="951.9 627 952.1 626.8 952.3 626.4 952.5 626 952.7 625.7 952.9 625.5 953 625.3 953.2 625.1 953.4 624.9 953.6 624.7 953.8 624.5 953.9 624.3 954.1 624.1 954.3 623.9 954.5 623.8 954.8 623.6 955 623.4 955.3 623.2 955.6 623 955.8 622.8 956.1 622.6 956.3 622.4 956.6 622.2 957 622 957.3 621.8 957.5 621.6 957.9 621.5 958.3 621.3 958.6 621.1 959 620.9 959.4 620.7 959.8 620.5 960.2 620.3 960.8 620.1 961.1 619.9 961.7 619.7 962.2 619.5 962.8 619.4 963.3 619.2 963.9 619 964.4 618.8 964.9 618.6 965.7 618.4 966.4 618.2 967.1 618 967.8 617.8 968.7 617.6 969.4 617.4 970.3 617.2 971.2 617 972.1 616.9 972.8 616.7 973.9 616.5 974.8 616.3 975.7 616.1 976.6 615.9 977.5 615.7 978.6 615.5 979.5 615.3 980.3 615.1 981 614.9 981.7 614.7 982.2 614.6 982.7 614.4 982.9 614.4 982.9 616.1 982.4 616.3 981.8 616.5 981.3 616.7 980.8 616.9 980.4 617.1 979.9 617.2 979.3 617.4 978.8 617.6 978.3 617.8 977.9 618 977.5 618.2 977 618.4 976.5 618.6 975.9 618.8 975.4 619 975 619.2 974.5 619.3 974.1 619.5 973.6 619.7 973 619.9 972.5 620.1 972.1 620.3 971.6 620.5 971.1 620.7 970.5 620.9 970.1 621.1 969.6 621.3 969.1 621.5 968.7 621.7 968.2 621.8 967.6 622.1 967.1 622.2 966.7 622.4 966.2 622.6 965.7 622.8 965.1 623 964.7 623.2 964.2 623.4 963.8 623.6 963.3 623.8 962.8 624 962.2 624.2 961.9 624.4 961.3 624.5 961 624.7 960.4 624.9 959.9 625.1 959.5 625.3 959 625.5 958.5 625.7 958.1 625.9 957.5 626.1 957 626.3 956.7 626.4 955.9 626.4 955.6 626.6 955.4 626.8 955.2 627 954.8 627.2 954.5 627.4 953.9 627.6 953.8 627.8 953.4 627.8 952.9 628 952.5 628.1 951.3 628.2 951.4 627.3 951.8 627.2 951.9 627"/>
              <polygon class="cls-2" points="950.8 627 950.6 626.8 950.4 626.4 950.2 626 950 625.7 949.8 625.5 949.7 625.3 949.5 625.1 949.3 624.9 949.1 624.7 948.9 624.5 948.8 624.3 948.6 624.1 948.4 623.9 948.2 623.8 947.9 623.6 947.7 623.4 947.4 623.2 947.1 623 946.9 622.8 946.6 622.6 946.4 622.4 946.1 622.2 945.7 622 945.4 621.8 945.2 621.6 944.8 621.5 944.4 621.3 944.1 621.1 943.7 620.9 943.3 620.7 942.9 620.5 942.5 620.3 941.9 620.1 941.6 619.9 941 619.7 940.5 619.5 939.9 619.4 939.4 619.2 938.8 619 938.3 618.8 937.8 618.6 937 618.4 936.3 618.2 935.6 618 934.9 617.8 934 617.6 933.3 617.4 932.4 617.2 931.5 617 930.6 616.9 929.9 616.7 928.8 616.5 927.9 616.3 927 616.1 926.1 615.9 925.2 615.7 924.1 615.5 923.2 615.3 922.4 615.1 921.7 614.9 921 614.7 920.5 614.6 920 614.4 919.8 614.4 919.8 616.1 920.3 616.3 920.9 616.5 921.4 616.7 921.9 616.9 922.3 617.1 922.8 617.2 923.4 617.4 923.9 617.6 924.4 617.8 924.8 618 925.2 618.2 925.7 618.4 926.2 618.6 926.8 618.8 927.3 619 927.7 619.2 928.2 619.3 928.6 619.5 929.1 619.7 929.7 619.9 930.2 620.1 930.6 620.3 931.1 620.5 931.6 620.7 932.2 620.9 932.6 621.1 933.1 621.3 933.6 621.5 934 621.7 934.5 621.8 935.1 622.1 935.6 622.2 936 622.4 936.5 622.6 937 622.8 937.6 623 937.9 623.2 938.5 623.4 938.8 623.6 939.4 623.8 939.9 624 940.5 624.2 940.8 624.4 941.4 624.5 941.7 624.7 942.3 624.9 942.8 625.1 943.2 625.3 943.7 625.5 944.2 625.7 944.6 625.9 945.2 626.1 945.7 626.3 946 626.4 946.8 626.4 947.1 626.6 947.3 626.8 947.5 627 947.9 627.2 948.2 627.4 948.8 627.6 948.9 627.8 949.3 627.8 949.8 628 950.2 628.1 951.3 628.2 951.3 627.3 950.9 627.2 950.8 627"/>
              <polygon class="cls-13" points="952.2 627.5 950.4 627.5 949.8 626.8 952.9 626.8 952.2 627.5"/>
            </g>
            <polygon class="cls-3" points="956.4 627.2 985.9 615.3 985.5 647.8 956.3 660.2 956.4 627.2"/>
            <rect class="cls-36" x="950.3" y="568.3" width="3" height="7.4"/>
            <ellipse class="cls-37" cx="951.8" cy="565.2" rx="5" ry="5.1"/>
            <ellipse class="cls-38" cx="940.9" cy="594.9" rx="3.3" ry="3.4"/>
            <ellipse class="cls-33" cx="961.7" cy="594.9" rx="3.3" ry="3.4"/>
            <path class="cls-41" d="M978.3,583.4h2.8c2,0,3.7,1.6,3.7,3.7v7.5c0,2-1.6,3.7-3.7,3.7h-2.8v-14.9h0Z"/>
            <path class="cls-37" d="M979,585.7h.3c1.4,0,2.6,1.2,2.6,2.6v4.9c0,1.4-1.2,2.6-2.6,2.6h-.3v-10.2h0v.1Z"/>
            <path class="cls-41" d="M925.5,599.9h-2.8c-2,0-3.7-1.6-3.7-3.7v-7.5c0-2,1.6-3.7,3.7-3.7h2.8v14.9h0Z"/>
            <path class="cls-37" d="M924.8,597.6h-.3c-1.4,0-2.6-1.2-2.6-2.6v-4.9c0-1.4,1.2-2.6,2.6-2.6h.3v10.2h0v-.1Z"/>
            <polygon class="cls-3" points="946.2 627.2 916.6 615.3 917 647.6 946.3 659.9 946.2 627.2"/>
            <polygon class="cls-1" points="985.6 625.6 985.8 625.6 985.8 625.8 986 625.8 986 626 986.2 626 986.3 626 986.3 626.2 986.5 626.2 986.5 626.4 986.7 626.4 986.9 626.4 986.9 626.5 987.1 626.5 987.1 626.7 987.2 626.7 987.2 626.9 987.4 626.9 987.4 627.1 987.8 627.1 987.8 627.3 988 627.3 988 627.5 988.1 627.5 988.1 627.7 988.3 627.7 988.3 627.9 988.5 627.9 988.5 628.1 988.7 628.1 988.7 628.4 988.9 628.4 988.9 628.6 989 628.6 989 629 989.2 629 989.2 629.2 989.4 629.2 989.4 629.6 989.6 629.6 989.6 630 989.8 630 989.8 630.4 989.9 630.4 989.9 630.8 990.1 630.8 990.1 631.3 990.3 631.3 990.3 632.1 990.5 632.1 990.5 633 990.7 633 990.7 635.6 990.5 635.6 990.5 636.5 990.3 636.5 990.3 637.3 990.1 637.3 990.1 637.8 989.9 637.8 990 638.2 989.8 638.2 989.8 638.8 989.6 638.8 989.6 639.2 989.4 639.2 989.4 639.4 989.2 639.4 989.2 639.7 989.1 639.7 989.1 639.9 988.9 639.9 988.9 640.3 988.7 640.3 988.7 640.5 988.5 640.5 988.5 640.7 988.3 640.7 988.3 640.9 988.1 640.9 988.1 641.1 988 641.1 988 641.3 987.8 641.3 987.8 641.5 987.6 641.5 987.6 641.7 987.4 641.7 987.4 641.9 987.1 641.9 987.1 642 986.7 642 986.7 642.2 986.5 642.2 986.5 642.5 986.2 642.4 986.2 642.6 985.8 642.6 985.8 642.8 985.3 642.8 985.3 643 984.7 643 984.7 643.2 983.6 643.2 983.6 643.4 981 643.4 980.9 643.2 980.6 643.2 979.9 643.2 979.9 643 979.2 643 979.1 642.8 978.6 642.8 978.6 642.6 978.2 642.6 978.2 642.4 977.9 642.4 977.9 642.3 977.5 642.3 977.5 642 977.2 642.1 977.2 641.8 976.8 641.9 976.8 641.7 976.6 641.7 976.6 641.5 976.4 641.5 976.4 641.3 976.1 641.3 976.1 641.1 975.9 641.1 975.9 640.9 975.7 640.9 975.7 640.7 975.5 640.7 975.5 640.5 975.4 640.5 975.4 640.3 975.2 640.3 975.2 640.1 975 640.1 975 639.8 974.8 639.8 974.8 639.6 974.6 639.6 974.6 639.4 974.5 639.4 974.5 639 974.5 638.8 974.3 638.8 974.3 638.4 974.1 638.4 974.1 638 973.9 638 973.9 637.1 973.8 637.1 973.7 635.6 973.9 635.5 973.9 634.8 974.1 634.8 974.1 634.2 974.3 634.2 974.3 633.8 974.5 633.8 974.5 633.4 974.6 633.4 974.7 633.2 974.8 633.2 974.8 633 975 633 975 632.9 975.2 632.9 975.2 632.7 975.4 632.7 975.4 632.5 975.5 632.5 975.5 632.3 975.8 632.3 975.7 632.1 976 632.1 976.1 632.1 976.1 631.9 976.5 631.9 976.4 631.7 976.8 631.7 976.8 631.5 977.2 631.5 977.2 631.3 977.6 631.3 977.7 631.1 978.8 631.2 978.8 631 981.1 631 981.1 631.1 981.5 631.1 981.9 631.1 982.2 631.1 982.2 631.3 982.5 631.3 982.5 631.5 982.9 631.5 983.4 631.5 983.3 631.8 983.8 631.8 983.8 631.9 984.1 631.9 984.1 632.1 984.4 632 984.4 632.2 984.6 632.3 984.7 632.4 985.1 632.4 985.2 632.7 985.7 632.7 985.7 632.5 986 632.5 986.4 632.5 986.4 632.2 986.7 632.2 986.7 631.9 986.9 631.9 986.9 631.5 986.7 631.5 986.7 631.3 986.5 631.3 986.5 631.1 986.3 631.1 986.3 630.9 986.2 630.9 986.2 630.8 986 630.7 986 630.6 985.6 630.6 985.6 625.6"/>
            <polygon class="cls-1" points="916.4 625.6 916.2 625.6 916.2 625.8 916 625.8 916 626 915.8 626 915.7 626 915.7 626.2 915.5 626.2 915.5 626.4 915.3 626.4 915.1 626.4 915.1 626.5 914.9 626.5 914.9 626.7 914.8 626.7 914.8 626.9 914.6 626.9 914.6 627.1 914.2 627.1 914.2 627.3 914 627.3 914 627.5 913.9 627.5 913.9 627.7 913.7 627.7 913.7 627.9 913.5 627.9 913.5 628.1 913.3 628.1 913.3 628.4 913.1 628.4 913.1 628.6 913 628.6 913 629 912.8 629 912.8 629.2 912.6 629.2 912.6 629.6 912.4 629.6 912.4 630 912.2 630 912.2 630.4 912.1 630.4 912.1 630.8 911.9 630.8 911.9 631.3 911.7 631.3 911.7 632.1 911.5 632.1 911.5 633 911.3 633 911.3 635.6 911.5 635.6 911.5 636.5 911.7 636.5 911.7 637.3 911.9 637.3 911.9 637.8 912.1 637.8 912 638.2 912.2 638.2 912.2 638.8 912.4 638.8 912.4 639.2 912.6 639.2 912.6 639.4 912.8 639.4 912.8 639.7 912.9 639.7 912.9 639.9 913.1 639.9 913.1 640.3 913.3 640.3 913.3 640.5 913.5 640.5 913.5 640.7 913.7 640.7 913.7 640.9 913.9 640.9 913.9 641.1 914 641.1 914 641.3 914.2 641.3 914.2 641.5 914.4 641.5 914.4 641.7 914.6 641.7 914.6 641.9 914.9 641.9 914.9 642 915.3 642 915.3 642.2 915.5 642.2 915.5 642.5 915.8 642.4 915.8 642.6 916.2 642.6 916.2 642.8 916.7 642.8 916.7 643 917.3 643 917.3 643.2 918.4 643.2 918.4 643.4 921 643.4 921.1 643.2 921.4 643.2 922.1 643.2 922.1 643 922.8 643 922.9 642.8 923.4 642.8 923.4 642.6 923.8 642.6 923.8 642.4 924.1 642.4 924.1 642.3 924.5 642.3 924.5 642 924.8 642.1 924.8 641.8 925.2 641.9 925.2 641.7 925.4 641.7 925.4 641.5 925.6 641.5 925.6 641.3 925.9 641.3 925.9 641.1 926.1 641.1 926.1 640.9 926.3 640.9 926.3 640.7 926.5 640.7 926.5 640.5 926.6 640.5 926.6 640.3 926.8 640.3 926.8 640.1 927 640.1 927 639.8 927.2 639.8 927.2 639.6 927.4 639.6 927.4 639.4 927.5 639.4 927.5 639 927.5 638.8 927.7 638.8 927.7 638.4 927.9 638.4 927.9 638 928.1 638 928.1 637.1 928.2 637.1 928.3 635.6 928.1 635.5 928.1 634.8 927.9 634.8 927.9 634.2 927.7 634.2 927.7 633.8 927.5 633.8 927.5 633.4 927.4 633.4 927.3 633.2 927.2 633.2 927.2 633 927 633 927 632.9 926.8 632.9 926.8 632.7 926.6 632.7 926.7 632.5 926.5 632.5 926.5 632.3 926.2 632.3 926.3 632.1 926 632.1 925.9 632.1 925.9 631.9 925.5 631.9 925.6 631.7 925.2 631.7 925.2 631.5 924.8 631.5 924.8 631.3 924.4 631.3 924.3 631.1 923.2 631.2 923.2 631 920.9 631 920.9 631.1 920.5 631.1 920.1 631.1 919.8 631.1 919.8 631.3 919.5 631.3 919.5 631.5 919.1 631.5 918.6 631.5 918.7 631.8 918.2 631.8 918.2 631.9 917.9 631.9 917.9 632.1 917.6 632 917.6 632.2 917.4 632.3 917.3 632.4 916.9 632.4 916.8 632.7 916.3 632.7 916.3 632.5 916 632.5 915.6 632.5 915.6 632.2 915.3 632.2 915.3 631.9 915.1 631.9 915.1 631.5 915.3 631.5 915.3 631.3 915.5 631.3 915.5 631.1 915.7 631.1 915.7 630.9 915.8 630.9 915.8 630.8 916 630.7 916 630.6 916.4 630.6 916.4 625.6"/>
            <polygon class="cls-12" points="947.6 628.3 947.6 660.8 948 661.1 948.3 661.3 949.5 661.7 950 661.9 953.1 661.9 953.9 661.7 954.4 661.3 955 661.1 954.9 628.3 954.6 628.6 954 628.8 953.5 629 951.6 629.1 950.8 629 949.7 628.9 948.7 628.7 948.1 628.6 947.6 628.3"/>
          </g>
          <g class="cls-23">
            <text class="cls-18" transform="translate(904.9 685.2)"><tspan x="0" y="0">TECH</tspan></text>
          </g>
          <g class="cls-23">
            <text class="cls-16" transform="translate(884.3 706.5)"><tspan x="0" y="0">IN </tspan></text>
            <text class="cls-16" transform="translate(914.7 706.5)"><tspan x="0" y="0">M</tspan></text>
            <text class="cls-16" transform="translate(934.8 706.5)"><tspan class="cls-14" x="0" y="0">Y</tspan><tspan x="13.76" y="0"> </tspan></text>
            <text class="cls-16" transform="translate(955.6 706.5)"><tspan x="0" y="0">S</tspan></text>
            <text class="cls-16" transform="translate(969.1 706.5)"><tspan x="0" y="0">T</tspan></text>
            <text class="cls-15" transform="translate(982.2 706.5)"><tspan x="0" y="0">Y</tspan></text>
            <text class="cls-16" transform="translate(996.8 706.5)"><tspan x="0" y="0">LE</tspan></text>
          </g>
        </g>
        <g>
          <path class="cls-27" d="M153.2,449.2v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
          <path class="cls-27" d="M169.8,453.8h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM167.4,450.5v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
          <path class="cls-27" d="M180.1,451.1c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M196.1,451.1c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M205.2,449.8v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5.5-.8.5-1.5v-.2Z"/>
          <path class="cls-27" d="M215.7,451.8c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
          <path class="cls-27" d="M226.6,451.8c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
          <path class="cls-27" d="M240.8,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM238.6,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M251.4,451.1c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M261.4,451.1c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9,1.4-.7,2.4-.7,2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5c.2.1.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M267.9,444.7v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/>
          <path class="cls-27" d="M278.6,449.8v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5c.3-.3.5-.8.5-1.5v-.2Z"/>
          <path class="cls-27" d="M287.4,453.8h-2.3v-11.8h2.3v11.8Z"/>
          <path class="cls-27" d="M293.9,453.8h-2.3v-11.8h2.3v11.8Z"/>
          <path class="cls-27" d="M299.5,457.2c-.8,0-1.6-.3-2.3-1l1.1-1.8c.4.4.8.6,1.2.6s.4-.1.6-.3c.2-.2.2-.4.2-.7s-1.1-3.1-3.2-8.7h2.5l2,5.3,2-5.3h2.5l-3.9,10.1c-.2.6-.6,1-1.1,1.4-.5.3-1,.5-1.6.5v-.1Z"/>
          <path class="cls-27" d="M319.1,451.8c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
          <path class="cls-27" d="M334.3,449.5c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM327.8,449.5c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
          <path class="cls-27" d="M345.6,449.2v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5-.2-.3-.5-.5-1-.5s-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9s.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
          <path class="cls-27" d="M359.9,445.1c1,0,1.8.4,2.6,1.2s1.1,1.9,1.1,3.1-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM357.4,449.5c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
          <path class="cls-27" d="M369.7,453.8h-2.3v-11.8h2.3v11.8Z"/>
          <path class="cls-27" d="M381,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM378.8,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M388,447v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
          <path class="cls-27" d="M401.2,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM399,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M408.8,453.9c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM407.4,449.5c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
          <path class="cls-27" d="M430.8,453.8h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM428.5,450.5v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
          <path class="cls-27" d="M437.2,453.8h-2.3v-11.8h2.3v11.8Z"/>
          <path class="cls-27" d="M443.7,453.8h-2.3v-11.8h2.3v11.8Z"/>
          <path class="cls-27" d="M453.9,444.8v-2.1h6.6v1.7l-2.2,2.6c.9.1,1.5.5,2,1.1s.7,1.3.7,2.1c0,1.2-.4,2.1-1.2,2.7-.8.7-1.8,1-3,1s-2.4-.4-3.6-1.3l1-2c1,.7,1.9,1.1,2.7,1.1s.9-.1,1.2-.4c.3-.2.5-.6.5-1.1s-.2-.8-.5-1.1c-.4-.3-.9-.4-1.5-.4s-.8.1-1.4.3v-1.8l2.1-2.5h-3.4v.1Z"/>
          <path class="cls-27" d="M469.2,453.9c-1.5,0-2.6-.5-3.4-1.6s-1.1-2.4-1.1-4.2.4-3.1,1.1-4.2s1.9-1.6,3.4-1.6,2.6.5,3.4,1.6,1.1,2.4,1.1,4.2-.4,3.1-1.1,4.2-1.9,1.6-3.4,1.6ZM467.6,445.5c-.3.7-.5,1.6-.5,2.7s.2,2,.5,2.7.9,1,1.6,1,1.3-.3,1.6-1c.3-.7.5-1.6.5-2.7s-.2-2-.5-2.7-.9-1-1.6-1-1.3.3-1.6,1Z"/>
          <path class="cls-27" d="M490.6,442.7h2.4v11.1h-2.4v-4.4h-4.3v4.4h-2.4v-11.1h2.4v4.6h4.3v-4.6Z"/>
          <path class="cls-27" d="M502.2,444.8v9h-2.4v-9h-3.1v-2.1h8.6v2.1h-3.1Z"/>
          <path class="cls-27" d="M518.6,446.8l-2.9,6.1h-1.4l-2.9-6.1v7h-2.4v-11.1h3.3l2.8,6.1,2.8-6.1h3.3v11.1h-2.4v-7h-.2Z"/>
          <path class="cls-27" d="M525.6,453.8v-11.1h2.4v8.9h4.6v2.2h-7Z"/>
          <path class="cls-27" d="M544.9,447v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
          <path class="cls-27" d="M558,453.8h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM555.7,450.5v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
          <path class="cls-27" d="M568.3,451.1c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M574.4,453.8h-2.3v-11.8h2.3v6.1l2.6-2.8h2.9l-3.2,3.5,3.3,5.1h-2.8l-2.1-3.3-.8.8v2.5l.1-.1Z"/>
          <path class="cls-27" d="M589.3,451.1c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M606.1,453.8h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM603.8,450.5v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
          <path class="cls-27" d="M614.2,451.8c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
          <path class="cls-27" d="M625.5,447.3c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
          <path class="cls-27" d="M637.7,449.5c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM631.2,449.5c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
          <path class="cls-27" d="M647.5,451.1c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M657.5,451.1c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M670,447v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
          <path class="cls-27" d="M678.3,449.2v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
          <path class="cls-27" d="M695.1,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM692.8,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M710.4,453.8h-4.7v-11.1h4.2c.7,0,1.4,0,1.9.3.5.2.9.4,1.2.7.5.6.7,1.2.7,1.9s-.3,1.5-.8,1.9c-.2.1-.3.2-.4.3s-.2,0-.4.2c.7.1,1.2.5,1.6.9.4.5.6,1.1.6,1.8s-.3,1.5-.8,2.1c-.6.7-1.6,1-3.1,1h0ZM708,447.2h1.1c.7,0,1.2,0,1.5-.2s.5-.5.5-1-.1-.8-.4-1c-.3-.2-.8-.2-1.5-.2h-1.2v2.4h0ZM708,451.7h1.7c.7,0,1.2,0,1.6-.3s.5-.5.5-1-.2-.9-.5-1c-.4-.2-1-.2-1.8-.2h-1.4v2.6l-.1-.1Z"/>
          <path class="cls-27" d="M725.2,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM723,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M735.7,452.3c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1c.8-.8,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM735.4,449.3c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/>
          <path class="cls-27" d="M742,444.1c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM744.1,453.8h-2.3v-8.6h2.3v8.6Z"/>
          <path class="cls-27" d="M750.6,449v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
          <path class="cls-27" d="M762.4,449v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
          <path class="cls-27" d="M779.1,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM776.9,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M787.8,447.3c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9s.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
          <path class="cls-27" d="M792,453.6c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
          <path class="cls-27" d="M804.5,442.7h2.4v11.1h-2.4v-11.1Z"/>
          <path class="cls-27" d="M813.6,449v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
          <path class="cls-27" d="M825.7,447v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
          <path class="cls-27" d="M838.9,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM836.7,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M847.6,447.3c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9s.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
          <path class="cls-27" d="M859.2,449.2v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
          <path class="cls-27" d="M875.9,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM873.7,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M883.5,453.9c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM882.1,449.5c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
          <path class="cls-27" d="M892.6,444.1c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM894.8,453.8h-2.3v-8.6h2.3v8.6Z"/>
          <path class="cls-27" d="M906,453.8h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.8-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5l-.1-.1ZM903.6,450.5v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
          <path class="cls-27" d="M912.7,447v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
          <path class="cls-27" d="M925.9,452.5c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM923.7,447.5c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M930.5,453.6c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
          <path class="cls-27" d="M184.2,472.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM181.8,469.6v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
          <path class="cls-27" d="M190.5,468.1v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
          <path class="cls-27" d="M203.4,473c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM201.9,468.6c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
          <path class="cls-27" d="M226.3,472.9l-1-2.4h-4.5l-1,2.4h-2.6l4.7-11.1h2.3l4.7,11.1h-2.6,0ZM223,465.1l-1.4,3.2h2.7l-1.3-3.2Z"/>
          <path class="cls-27" d="M234.9,473c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM233.5,468.6c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
          <path class="cls-27" d="M246.1,472.9l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
          <path class="cls-27" d="M261.8,472.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM259.5,469.6v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
          <path class="cls-27" d="M268.2,468.1v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
          <path class="cls-27" d="M281.7,470.9c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
          <path class="cls-27" d="M295.9,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM293.7,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M303.5,473c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM302.1,468.6c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
          <path class="cls-27" d="M320.8,472.9h-2.3v-11.8h2.3v11.8Z"/>
          <path class="cls-27" d="M332.2,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM329.9,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M338.6,472.9l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
          <path class="cls-27" d="M354.6,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM352.3,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
          <path class="cls-27" d="M361.2,472.9h-2.3v-11.8h2.3v11.8Z"/>
          <path class="cls-27" d="M371.6,470.2c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9,1.4-.7,2.4-.7,2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5c.2.1.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
          <path class="cls-27" d="M381.3,469.1v-2.1h5.5v2.1h-5.5Z"/>
          <path class="cls-27" d="M404,472.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM401.6,469.6v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
          <path class="cls-27" d="M410.4,468.1v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5c-.3.3-.5.9-.5,1.5h-.1Z"/>
          <path class="cls-27" d="M434.2,468.6c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM427.8,468.6c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
                      <path class="cls-27" d="M443.3,468.9v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5c.3-.3.5-.8.5-1.5v-.2Z"/>
            <path class="cls-27" d="M452.5,466v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M464.8,470.2c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9,1.4-.7,2.4-.7,2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5c.2.1.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M471.2,466v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M484.3,472.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM481.9,469.6v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M490.6,468.1v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M503.5,473c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM502,468.6c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M512.6,463.2c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM514.7,472.9h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M521.2,468.1v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M536.9,471.4c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1c.8-.8,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM536.5,468.4c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/>
            <path class="cls-27" d="M556.1,472.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM553.7,469.6v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M564.1,470.9c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M573.4,468.3v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M583.1,463.2c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM585.3,472.9h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M596.6,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM594.4,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M603,472.9l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
            <path class="cls-27" d="M619,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM616.8,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M631,468.3v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M647.7,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM645.5,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M654.3,468.1v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M666.5,466v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M681.2,466v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M689.5,468.3v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M706.1,472.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM703.8,469.6v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M712.9,466v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M729.3,466.4c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M740.4,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM738.2,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M747.4,463.8v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/>
            <path class="cls-27" d="M755.1,472.9h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M766.5,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM764.2,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M774.8,470.9c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M784.5,466v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M796.7,470.2c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3c-.7-.2-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5-.5-.1-.8-.3-1.1-.4-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4c.5.2.9.3,1.1.4s.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M809.8,473c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM808.4,468.6c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M826,471.6c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM823.7,466.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M833.6,473c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM832.1,468.6c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M842.7,463.2c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM844.8,472.9h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M853,470.9c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M867,472.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.8-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5l-.1-.1ZM864.7,469.6v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M873.7,466v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M879.9,463.2c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM882,472.9h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M894.5,468.6c0,1.2-.4,2.3-1.3,3.1-.8.8-1.9,1.3-3.2,1.3s-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM888,468.6c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M900.5,468.1v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M910.3,472.7c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
            <path class="cls-27" d="M274.9,483.2c1,0,1.8.4,2.6,1.2s1.1,1.9,1.1,3.1-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM272.4,487.7c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M286.7,485.5c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M297.9,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM295.6,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M308.4,489.3c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5c.2.1.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M319.4,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM317.1,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M325.8,491.9l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
            <path class="cls-27" d="M341.8,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM339.5,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M350.5,485.5c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M361.4,491.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM359,488.7v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M367.8,487.2v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M381.3,489.9c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M395.4,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM393.2,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M400,491.7c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
            <path class="cls-27" d="M419.4,491.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM417,488.7v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M425.8,487.2v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M438.6,492.1c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM437.2,487.7c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M459.8,489.3c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5c.2.1.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M466.3,485.1v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M476.6,485.5c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M488.8,487.7c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM482.3,487.7c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M494.7,487.2v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M510.4,490.5c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7c.5-.5.7-1.1.7-2.1v-.1ZM510.1,487.5c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6.9.6,1.4.6,1-.2,1.4-.6.6-1,.6-1.6Z"/>
            <path class="cls-27" d="M528.7,490.5c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1c.8-.8,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM528.4,487.5c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/>
            <path class="cls-27" d="M539.2,485.5c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M550.1,491.9h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM547.8,488.7v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M560.5,489.3c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M569,483.2c1,0,1.8.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM566.5,487.7c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M590.8,487.7c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM584.3,487.7c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M597.1,482.9v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/>
            <path class="cls-27" d="M616.2,487.3v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M634,487.7c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM627.5,487.7c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M641,492.1c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM639.5,487.7c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M657.1,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM654.9,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M665.8,485.5c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M672,487.2v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M691.9,491.9h-2.4l-2.8-8.6h2.4l1.6,5.2,1.6-5.2h2.2l1.6,5.2,1.6-5.2h2.4l-2.8,8.6h-2.4l-1.5-4.7-1.5,4.7h0Z"/>
            <path class="cls-27" d="M710.7,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM708.5,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M719.8,483.2c1,0,1.9.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.2,3.2c-.8.9-1.7,1.3-2.6,1.3s-1.8-.4-2.5-1.3v1.1h-2.3v-11.8h2.3v4.2c.6-.7,1.5-1.1,2.5-1.1l.1.1ZM717.3,487.7c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M736.6,492.1c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM735.2,487.7c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M752.8,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM750.5,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M759.2,491.9l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
            <path class="cls-27" d="M775.2,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM772.9,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M781.8,491.9h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M794.3,487.7c0,1.2-.4,2.3-1.3,3.1-.8.8-1.9,1.3-3.2,1.3s-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM787.8,487.7c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M802.8,483.2c1,0,1.8.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM800.2,487.7c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M817.8,487.3v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M834.5,490.7c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM832.3,485.6c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M841.2,487.2v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M853.3,485.1v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M859.5,491.7c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1-.6.4-1,.4-.7-.1-1-.4Z"/>
          </g>
          <line class="cls-10" x1="191.9" y1="603.1" x2="396.5" y2="601.7"/>
          <g class="cls-23">
            <text class="cls-19" transform="translate(244 628.3)"><tspan x="0" y="0">SK Basha</tspan></text>
          </g>
          <g class="cls-23">
            <text class="cls-29" transform="translate(231 650.8)"><tspan x="0" y="0">DEVE</tspan></text>
            <text class="cls-28" transform="translate(282.9 650.8)"><tspan x="0" y="0">L</tspan></text>
            <text class="cls-29" transform="translate(293.6 650.8)"><tspan x="0" y="0">OPER</tspan></text>
          </g>
          <line class="cls-10" x1="646.9" y1="603.1" x2="851.5" y2="601.7"/>
          <g class="cls-23">
            <text class="cls-29" transform="translate(675.5 625.6)"><tspan x="0" y="0">G </tspan></text>
            <text class="cls-29" transform="translate(695.6 625.6)"><tspan x="0" y="0">R</tspan></text>
            <text class="cls-29" transform="translate(708.9 625.6)"><tspan x="0" y="0">ama Krishna</tspan></text>
          </g>
          <g class="cls-23">
            <text class="cls-29" transform="translate(704.5 650.7)"><tspan x="0" y="0">DESIGNER</tspan></text>
          </g>
          <!-- Removed image tags for 4.png -->
          <!-- Added text elements for dynamic content -->
          <text id="userNameText" class="name-text" x="543.1" y="475">Your Name Here</text>
          <text id="currentDateText" class="date-text" x="543.1" y="530">Date Here</text>
        </g>
      </svg>
    `;
    certificateTemplateContainer.innerHTML = svgCode;
  }

  async downloadCertificate() {
    const userName = document.getElementById('userName').value.trim();
    
    if (!userName) {
      alert('Please enter your name to generate the certificate.');
      return;
    }
    
    try {
      // Get the SVG content
      const svgContainer = document.getElementById('certificateTemplate');
      const svgElement = svgContainer.querySelector('svg');

      // Update the name and date directly in the SVG
      const userNameTextElement = svgElement.querySelector('#userNameText');
      if (userNameTextElement) userNameTextElement.textContent = userName;

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const currentDateTextElement = svgElement.querySelector('#currentDateText');
      if (currentDateTextElement) currentDateTextElement.textContent = currentDate;

      // Serialize the SVG to a string
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Create a canvas to render the SVG as PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions to match SVG viewBox
      const viewBox = svgElement.getAttribute('viewBox').split(' ');
      canvas.width = parseFloat(viewBox[2]);
      canvas.height = parseFloat(viewBox[3]);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);

        // Download the canvas content as PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `HTML_Certificate_${userName.replace(/\s+/g, '_')}.png`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }, 100);
            alert('🎉 Certificate downloaded successfully!');
          } else {
            throw new Error('Failed to create certificate blob');
          }
        }, 'image/png', 1.0);
      };
      img.onerror = (error) => {
        console.error('Error loading SVG into image:', error);
        alert('Error generating certificate. Please try again.');
      };
      img.src = svgUrl;

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
      editorContent: {}
    };
    this.saveGameState();
    this.updateUI();
    console.log('Game data reset successfully');
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HTMLLearningGame();
});

