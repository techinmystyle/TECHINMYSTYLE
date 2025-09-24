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
            <li>An <h1> heading with the text "Welcome to HTML"</li>
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
            <li>An <h1> heading with "Main Title"</li>
            <li>An <h2> heading with "Subtitle"</li>
            <li>An <h3> heading with "Section Title"</li>
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
            <li>A paragraph with <strong> text "Important text"</li>
            <li>A paragraph with <em> text "Emphasized text"</li>
            <li>A paragraph with <mark> text "Highlighted text"</li>
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
          const expected = `<form> <fieldset> <legend>personal information</legend> <input type="text" placeholder="first name"> <input type="text" placeholder="last name"> <input type="email" placeholder="email"></fieldset> <button type="submit">submit</button> </form>`;
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
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1100.76 806.71">
        <defs>
          <style>
            .cls-1 {
              fill: #e35d26;
            }

            .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10, .cls-11, .cls-12 {
              stroke-miterlimit: 10;
            }

            .cls-1, .cls-2, .cls-3, .cls-11, .cls-12 {
              stroke: #083e5c;
            }

            .cls-2, .cls-13, .cls-11 {
              fill: #fae4c4;
            }

            .cls-14, .cls-15 {
              letter-spacing: -.02em;
            }

            .cls-3, .cls-11 {
              stroke-width: 1.6px;
            }

            .cls-3, .cls-16, .cls-15 {
              fill: #e15c26;
            }

            .cls-17, .cls-18 {
              fill: #053c59;
            }

            .cls-19 {
              letter-spacing: .1em;
            }

            .cls-19, .cls-4, .cls-20, .cls-5, .cls-6, .cls-21, .cls-22, .cls-23, .cls-18, .cls-7, .cls-24, .cls-8, .cls-25, .cls-9, .cls-26, .cls-27, .cls-16, .cls-28, .cls-29, .cls-15 {
              isolation: isolate;
            }

            .cls-19, .cls-20, .cls-6, .cls-21, .cls-18, .cls-7, .cls-9, .cls-26, .cls-16, .cls-28, .cls-29, .cls-15 {
              font-family: Arial-BoldMT, Arial;
              font-weight: 700;
            }

            .cls-19, .cls-22, .cls-24, .cls-25, .cls-27, .cls-28, .cls-29 {
              fill: #231f20;
            }

            .cls-19, .cls-28, .cls-29 {
              font-size: 15.9px;
            }

            .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9 {
              stroke-width: .5px;
            }

            .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10 {
              fill: none;
            }

            .cls-4, .cls-5, .cls-22, .cls-24, .cls-8, .cls-25 {
              font-family: ArialMT, Arial;
            }

            .cls-4, .cls-5, .cls-18, .cls-24, .cls-25 {
              font-size: 31.8px;
            }

            .cls-4, .cls-5, .cls-8, .cls-10 {
              stroke: #231f20;
            }

            .cls-4, .cls-24 {
              letter-spacing: -.02em;
            }

            .cls-20, .cls-6, .cls-21, .cls-7, .cls-9, .cls-26 {
              font-size: 63.6px;
            }

            .cls-20, .cls-21, .cls-30, .cls-26 {
              fill: #e25626;
            }

            .cls-20, .cls-9 {
              letter-spacing: .06em;
            }

            .cls-31 {
              fill: #faf1dd;
            }

            .cls-5, .cls-25 {
              letter-spacing: .1em;
            }

            .cls-32 {
              fill: #fff;
            }

            .cls-33 {
              fill: #083e5b;
            }

            .cls-6, .cls-21 {
              letter-spacing: .2em;
            }

            .cls-6, .cls-7, .cls-9 {
              stroke: #e15726;
            }

            .cls-34 {
              fill: #f0662a;
            }

            .cls-35 {
              fill: #f9e1bc;
            }

            .cls-36 {
              fill: #083e5c;
            }

            .cls-22, .cls-8 {
              letter-spacing: .1em;
            }

            .cls-22, .cls-8, .cls-16, .cls-15 {
              font-size: 21.2px;
            }

            .cls-37 {
              fill: #e35e26;
            }

            .cls-18, .cls-29 {
              letter-spacing: .1em;
            }

            .cls-38 {
              fill: #063d5c;
            }

            .cls-7, .cls-26 {
              letter-spacing: .2em;
            }

            .cls-39 {
              opacity: .3;
            }

            .cls-40 {
              fill: #ebebeb;
            }

            .cls-10 {
              stroke-width: 2.6px;
            }

            .cls-27 {
              opacity: .8;
            }

            .cls-28 {
              letter-spacing: .08em;
            }

            .cls-41 {
              fill: #083f5c;
            }

            .cls-12 {
              fill: #e55e26;
            }
          </style>
        </defs>
        <g>
          <polygon class="cls-30" points="406.15 0 87.59 365.91 9.75 452 9.75 0 406.15 0"/>
          <polygon class="cls-30" points="627.36 799.74 1011.7 360.48 1098.35 262.38 1100.76 800.18 627.36 799.74"/>
          <polygon class="cls-34" points="611.35 1.13 9.75 663.43 9.75 452 404.15 1.03 611.35 1.13"/>
          <polygon class="cls-34" points="1098.35 262.38 628.75 797.3 431.05 797.3 1098.56 63.92 1098.35 262.38"/>
          <polygon class="cls-40" points="1098.56 63.92 429.85 797.75 10.45 663.05 604.24 8.09 1098.56 63.92"/>
          <polygon class="cls-40" points="9.75 797.3 431.05 797.3 485.6 737.5 9.75 662.02 9.75 797.3"/>
          <rect class="cls-32" x="61.95" y="63" width="984.1" height="673.7"/>
          <polygon class="cls-40" points="1097.86 64.12 595.95 22.99 614.45 0 1098.35 0 1097.86 64.12"/>
          <g class="cls-23">
            <text class="cls-26" transform="translate(301.35 148.9)"><tspan x="0" y="0">CE</tspan></text>
            <text class="cls-7" transform="translate(301.35 148.9)"><tspan x="0" y="0">CE</tspan></text>
            <text class="cls-26" transform="translate(402.05 148.9)"><tspan x="0" y="0">R</tspan></text>
            <text class="cls-7" transform="translate(402.05 148.9)"><tspan x="0" y="0">R</tspan></text>
            <text class="cls-21" transform="translate(452.85 148.9)"><tspan x="0" y="0">TIFIC</tspan></text>
            <text class="cls-6" transform="translate(452.85 148.9)"><tspan x="0" y="0">TIFIC</tspan></text>
            <text class="cls-20" transform="translate(662.05 148.9)"><tspan x="0" y="0">A</tspan></text>
            <text class="cls-9" transform="translate(662.05 148.9)"><tspan x="0" y="0">A</tspan></text>
            <text class="cls-21" transform="translate(712.76 148.9)"><tspan x="0" y="0">TE</tspan></text>
            <text class="cls-6" transform="translate(712.76 148.9)"><tspan x="0" y="0">TE</tspan></text>
          </g>
          <g class="cls-23">
            <text class="cls-25" transform="translate(381.54 220.7)"><tspan x="0" y="0">Of </tspan></text>
            <text class="cls-5" transform="translate(381.54 220.7)"><tspan x="0" y="0">Of </tspan></text>
            <text class="cls-24" transform="translate(439.04 220.7)"><tspan x="0" y="0">T</tspan></text>
            <text class="cls-4" transform="translate(439.04 220.7)"><tspan x="0" y="0">T</tspan></text>
            <text class="cls-25" transform="translate(460.24 220.7)"><tspan x="0" y="0">ask </tspan></text>
            <text class="cls-5" transform="translate(460.24 220.7)"><tspan x="0" y="0">ask </tspan></text>
            <text class="cls-25" transform="translate(537.54 220.7)"><tspan x="0" y="0">C</tspan></text>
            <text class="cls-5" transform="translate(537.54 220.7)"><tspan x="0" y="0">C</tspan></text>
            <text class="cls-25" transform="translate(563.24 220.7)"><tspan x="0" y="0">ompletion</tspan></text>
            <text class="cls-5" transform="translate(563.24 220.7)"><tspan x="0" y="0">ompletion</tspan></text>
          </g>
          <g class="cls-23">
            <text class="cls-22" transform="translate(459.04 280.1)"><tspan x="0" y="0">is p</tspan></text>
            <text class="cls-8" transform="translate(459.04 280.1)"><tspan x="0" y="0">is p</tspan></text>
            <text class="cls-22" transform="translate(501.04 280.1)"><tspan x="0" y="0">r</tspan></text>
            <text class="cls-8" transform="translate(501.04 280.1)"><tspan x="0" y="0">r</tspan></text>
            <text class="cls-22" transform="translate(510.94 280.1)"><tspan x="0" y="0">ese</tspan></text>
            <text class="cls-8" transform="translate(510.94 280.1)"><tspan x="0" y="0">ese</tspan></text>
            <text class="cls-22" transform="translate(550.34 280.1)"><tspan x="0" y="0">n</tspan></text>
            <text class="cls-8" transform="translate(550.34 280.1)"><tspan x="0" y="0">n</tspan></text>
            <text class="cls-22" transform="translate(564.54 280.1)"><tspan x="0" y="0">t</tspan></text>
            <text class="cls-8" transform="translate(564.54 280.1)"><tspan x="0" y="0">t</tspan></text>
            <text class="cls-22" transform="translate(574.74 280.1)"><tspan x="0" y="0">ed </tspan></text>
            <text class="cls-8" transform="translate(574.74 280.1)"><tspan x="0" y="0">ed </tspan></text>
            <text class="cls-22" transform="translate(611.04 280.1)"><tspan x="0" y="0">t</tspan></text>
            <text class="cls-8" transform="translate(611.04 280.1)"><tspan x="0" y="0">t</tspan></text>
            <text class="cls-22" transform="translate(621.24 280.1)"><tspan x="0" y="0">o :</tspan></text>
            <text class="cls-8" transform="translate(621.24 280.1)"><tspan x="0" y="0">o :</tspan></text>
          </g>
          <g class="cls-39">
            <rect class="cls-31" x="872.85" y="550.9" width="173.3" height="185.9"/>
            <g>
              <rect class="cls-11" x="937.85" y="578.6" width="51.6" height="32.8" rx="5.2" ry="5.2"/>
              <rect class="cls-33" x="942.25" y="585.1" width="42.7" height="19.8" rx="5.2" ry="5.2"/>
              <ellipse class="cls-35" cx="973.45" cy="595" rx="5.4" ry="5.8"/>
              <ellipse class="cls-35" cx="952.65" cy="595" rx="5.4" ry="5.8"/>
              <polygon class="cls-17" points="934.75 615.7 934.95 615.4 935.25 615.2 935.55 614.9 935.65 614.7 936.05 614.4 936.35 614.2 936.55 614 936.75 613.7 937.15 613.5 937.45 613.4 937.85 613.2 937.95 613 938.45 612.8 939.05 612.6 939.35 612.4 940.05 612.1 940.35 611.9 986.55 611.8 986.95 612 987.55 612.2 988.05 612.4 988.35 612.6 988.55 612.7 988.75 613 989.15 613.1 989.35 613.3 989.65 613.5 990.05 613.7 990.35 614 990.65 614.4 991.05 614.6 991.25 614.8 991.45 615.2 991.65 615.5 992.05 615.9 992.05 617.5 991.05 617.5 990.25 617.7 989.15 617.9 988.05 618.1 987.05 618.3 986.05 618.5 985.15 618.7 984.15 618.9 983.25 619.1 982.25 619.3 981.55 619.5 980.75 619.7 979.85 619.9 978.95 620.2 978.05 620.3 977.55 620.5 976.95 620.7 976.15 620.9 975.55 621.1 974.95 621.3 974.45 621.5 973.85 621.7 973.45 621.9 972.95 622.1 972.55 622.3 971.95 622.5 971.55 622.7 971.15 622.9 970.75 623.1 970.35 623.3 970.05 623.5 969.65 623.7 969.25 623.9 968.85 624.1 968.55 624.3 968.25 624.5 967.95 624.7 967.65 624.9 967.35 625.1 966.95 625.3 966.75 625.5 966.55 625.7 966.25 625.9 965.95 626.1 965.75 626.3 965.55 626.5 965.35 626.7 965.15 626.9 964.95 627 964.75 627.2 964.65 627.4 964.45 627.7 964.25 627.8 964.05 628.2 963.85 628.6 963.65 629.1 963.45 629.3 962.75 629.3 962.75 629 962.55 628.8 962.25 628.3 961.95 627.9 961.65 627.4 961.15 627 960.65 626.5 960.35 626.2 959.95 625.9 959.55 625.6 959.25 625.2 958.65 624.8 958.05 624.4 957.15 624 956.55 623.6 955.95 623.2 955.05 622.7 954.15 622.3 953.65 622.1 953.05 621.8 952.65 621.6 952.05 621.4 951.45 621.2 950.75 621 950.05 620.7 949.15 620.5 948.45 620.3 947.75 620.2 946.85 619.9 946.05 619.7 945.15 619.5 944.15 619.4 943.35 619.1 942.35 618.9 941.45 618.8 940.35 618.6 939.55 618.3 938.45 618.1 937.45 618 936.45 617.8 935.55 617.6 934.75 617.5 934.75 615.7"/>
              <polygon class="cls-17" points="991.25 616.1 991.85 616.1 992.25 615.9 992.75 615.6 993.25 615.4 993.75 615.2 994.25 615 994.65 614.7 995.15 614.5 995.55 614.4 995.85 614.4 996.35 614.6 996.55 614.8 996.75 615.2 996.75 615.7 996.75 618 995.25 619 995.15 616.3 994.95 616.5 994.65 616.5 994.15 616.8 993.75 617 993.25 617.2 992.75 617.4 992.05 617.8 991.25 617.8 991.25 616 991.25 616.1"/>
              <polygon class="cls-17" points="936.25 616 935.65 616 935.05 615.8 934.45 615.4 933.95 615.2 933.25 614.9 932.65 614.7 932.15 614.4 931.55 614.2 931.05 614 930.65 614 929.95 614 929.65 614.4 929.65 615 929.65 615.6 929.65 618.1 931.15 619 931.15 616.8 931.75 616.5 932.05 616.8 932.75 617 933.25 617.2 933.95 617.5 934.45 617.8 935.35 618.1 936.35 618.1 936.35 615.9 936.25 616"/>
              <g>
                <polygon class="cls-2" points="963.65 629.5 963.85 629.3 964.05 628.9 964.25 628.5 964.45 628.2 964.65 628 964.75 627.8 964.95 627.6 965.15 627.4 965.35 627.2 965.55 627 965.65 626.8 965.85 626.6 966.05 626.4 966.25 626.3 966.55 626.1 966.75 625.9 967.05 625.7 967.35 625.5 967.55 625.3 967.85 625.1 968.05 624.9 968.35 624.7 968.75 624.5 969.05 624.3 969.25 624.1 969.65 624 970.05 623.8 970.35 623.6 970.75 623.4 971.15 623.2 971.55 623 971.95 622.8 972.55 622.6 972.85 622.4 973.45 622.2 973.95 622 974.55 621.9 975.05 621.7 975.65 621.5 976.15 621.3 976.65 621.1 977.45 620.9 978.15 620.7 978.85 620.5 979.55 620.3 980.45 620.1 981.15 619.9 982.05 619.7 982.95 619.5 983.85 619.4 984.55 619.2 985.65 619 986.55 618.8 987.45 618.6 988.35 618.4 989.25 618.2 990.35 618 991.25 617.8 992.05 617.6 992.75 617.4 993.45 617.2 993.95 617.1 994.45 616.9 994.65 616.9 994.65 618.6 994.15 618.8 993.55 619 993.05 619.2 992.55 619.4 992.15 619.6 991.65 619.7 991.05 619.9 990.55 620.1 990.05 620.3 989.65 620.5 989.25 620.7 988.75 620.9 988.25 621.1 987.65 621.3 987.15 621.5 986.75 621.7 986.25 621.8 985.85 622 985.35 622.2 984.75 622.4 984.25 622.6 983.85 622.8 983.35 623 982.85 623.2 982.25 623.4 981.85 623.6 981.35 623.8 980.85 624 980.45 624.2 979.95 624.3 979.35 624.6 978.85 624.7 978.45 624.9 977.95 625.1 977.45 625.3 976.85 625.5 976.45 625.7 975.95 625.9 975.55 626.1 975.05 626.3 974.55 626.5 973.95 626.7 973.65 626.9 973.05 627 972.75 627.2 972.15 627.4 971.65 627.6 971.25 627.8 970.75 628 970.25 628.2 969.85 628.4 969.25 628.6 968.75 628.8 968.45 628.9 967.65 628.9 967.35 629.1 967.15 629.3 966.95 629.5 966.55 629.7 966.25 629.9 965.65 630.1 965.55 630.3 965.15 630.3 964.65 630.5 964.25 630.6 963.05 630.7 963.15 629.8 963.55 629.7 963.65 629.5"/>
                <polygon class="cls-2" points="962.55 629.5 962.35 629.3 962.15 628.9 961.95 628.5 961.75 628.2 961.55 628 961.45 627.8 961.25 627.6 961.05 627.4 960.85 627.2 960.65 627 960.55 626.8 960.35 626.6 960.15 626.4 959.95 626.3 959.65 626.1 959.45 625.9 959.15 625.7 958.85 625.5 958.65 625.3 958.35 625.1 958.15 624.9 957.85 624.7 957.45 624.5 957.15 624.3 956.95 624.1 956.55 624 956.15 623.8 955.85 623.6 955.45 623.4 955.05 623.2 954.65 623 954.25 622.8 953.65 622.6 953.35 622.4 952.75 622.2 952.25 622 951.65 621.9 951.15 621.7 950.55 621.5 950.05 621.3 949.55 621.1 948.75 620.9 948.05 620.7 947.35 620.5 946.65 620.3 945.75 620.1 945.05 619.9 944.15 619.7 943.25 619.5 942.35 619.4 941.65 619.2 940.55 619 939.65 618.8 938.75 618.6 937.85 618.4 936.95 618.2 935.85 618 934.95 617.8 934.15 617.6 933.45 617.4 932.75 617.2 932.25 617.1 931.75 616.9 931.55 616.9 931.55 618.6 932.05 618.8 932.65 619 933.15 619.2 933.65 619.4 934.05 619.6 934.55 619.7 935.15 619.9 935.65 620.1 936.15 620.3 936.55 620.5 936.95 620.7 937.45 620.9 937.95 621.1 938.55 621.3 939.05 621.5 939.45 621.7 939.95 621.8 940.35 622 940.85 622.2 941.45 622.4 941.95 622.6 942.35 622.8 942.85 623 943.35 623.2 943.95 623.4 944.35 623.6 944.85 623.8 945.35 624 945.75 624.2 946.25 624.3 946.85 624.6 947.35 624.7 947.75 624.9 948.25 625.1 948.75 625.3 949.35 625.5 949.65 625.7 950.25 625.9 950.55 626.1 951.15 626.3 951.65 626.5 952.25 626.7 952.55 626.9 953.15 627 953.45 627.2 954.05 627.4 954.55 627.6 954.95 627.8 955.45 628 955.95 628.2 956.35 628.4 956.95 628.6 957.45 628.8 957.75 628.9 958.55 628.9 958.85 629.1 959.05 629.3 959.25 629.5 959.65 629.7 959.95 629.9 960.55 630.1 960.65 630.3 961.05 630.3 961.55 630.5 961.95 630.6 963.05 630.7 963.05 629.8 962.65 629.7 962.55 629.5"/>
                <polygon class="cls-13" points="963.95 630 962.15 630 961.55 629.3 964.65 629.3 963.95 630"/>
              </g>
              <polygon class="cls-3" points="968.15 629.7 997.65 617.8 997.25 650.3 968.05 662.7 968.15 629.7"/>
              <rect class="cls-36" x="962.05" y="570.8" width="3" height="7.4"/>
              <ellipse class="cls-37" cx="963.55" cy="567.7" rx="5" ry="5.1"/>
              <ellipse class="cls-38" cx="952.65" cy="597.4" rx="3.3" ry="3.4"/>
              <ellipse class="cls-33" cx="973.45" cy="597.4" rx="3.3" ry="3.4"/>
              <path class="cls-41" d="M990.05,585.9h2.8c2,0,3.7,1.6,3.7,3.7v7.5c0,2-1.6,3.7-3.7,3.7h-2.8v-14.9h0Z"/>
              <path class="cls-37" d="M990.75,588.2h.3c1.4,0,2.6,1.2,2.6,2.6v4.9c0,1.4-1.2,2.6-2.6,2.6h-.3v-10.2h0v.1Z"/>
              <path class="cls-41" d="M937.25,602.4h-2.8c-2,0-3.7-1.6-3.7-3.7v-7.5c0-2,1.6-3.7,3.7-3.7h2.8v14.9h0Z"/>
              <path class="cls-37" d="M936.55,600.1h-.3c-1.4,0-2.6-1.2-2.6-2.6v-4.9c0-1.4,1.2-2.6,2.6-2.6h.3v10.2h0v-.1Z"/>
              <polygon class="cls-3" points="957.95 629.7 928.35 617.8 928.75 650.1 958.05 662.4 957.95 629.7"/>
              <polygon class="cls-1" points="997.35 628.1 997.55 628.1 997.55 628.3 997.75 628.3 997.75 628.5 997.95 628.5 998.05 628.5 998.05 628.7 998.25 628.7 998.25 628.9 998.45 628.9 998.65 628.9 998.65 629 998.85 629 998.85 629.2 998.95 629.2 998.95 629.4 999.15 629.4 999.15 629.6 999.55 629.6 999.55 629.8 999.75 629.8 999.75 630 999.85 630 999.85 630.2 1000.05 630.2 1000.05 630.4 1000.25 630.4 1000.25 630.6 1000.45 630.6 1000.45 630.9 1000.65 630.9 1000.65 631.1 1000.75 631.1 1000.75 631.5 1000.95 631.5 1000.95 631.7 1001.15 631.7 1001.15 632.1 1001.35 632.1 1001.35 632.5 1001.55 632.5 1001.55 632.9 1001.65 632.9 1001.65 633.3 1001.85 633.3 1001.85 633.8 1002.05 633.8 1002.05 634.6 1002.25 634.6 1002.25 635.5 1002.45 635.5 1002.45 638.1 1002.25 638.1 1002.25 639 1002.05 639 1002.05 639.8 1001.85 639.8 1001.85 640.3 1001.65 640.3 1001.75 640.7 1001.55 640.7 1001.55 641.3 1001.35 641.3 1001.35 641.7 1001.15 641.7 1001.15 641.9 1000.95 641.9 1000.95 642.2 1000.85 642.2 1000.85 642.4 1000.65 642.4 1000.65 642.8 1000.45 642.8 1000.45 643 1000.25 643 1000.25 643.2 1000.05 643.2 1000.05 643.4 999.85 643.4 999.85 643.6 999.75 643.6 999.75 643.8 999.55 643.8 999.55 644 999.35 644 999.35 644.2 999.15 644.2 999.15 644.4 998.85 644.4 998.85 644.5 998.45 644.5 998.45 644.7 998.25 644.7 998.25 645 997.95 644.9 997.95 645.1 997.55 645.1 997.55 645.3 997.05 645.3 997.05 645.5 996.45 645.5 996.45 645.7 995.35 645.7 995.35 645.9 992.75 645.9 992.65 645.7 992.35 645.7 991.65 645.7 991.65 645.5 990.95 645.5 990.85 645.3 990.35 645.3 990.35 645.1 989.95 645.1 989.95 644.9 989.65 644.9 989.65 644.8 989.25 644.8 989.25 644.5 988.95 644.6 988.95 644.3 988.55 644.4 988.55 644.2 988.35 644.2 988.35 644 988.15 644 988.15 643.8 987.85 643.8 987.85 643.6 987.65 643.6 987.65 643.4 987.45 643.4 987.45 643.2 987.25 643.2 987.25 643 987.15 643 987.15 642.8 986.95 642.8 986.95 642.6 986.75 642.6 986.75 642.3 986.55 642.3 986.55 642.1 986.35 642.1 986.35 641.9 986.25 641.9 986.25 641.5 986.25 641.3 986.05 641.3 986.05 640.9 985.85 640.9 985.85 640.5 985.65 640.5 985.65 639.6 985.55 639.6 985.45 638.1 985.65 638 985.65 637.3 985.85 637.3 985.85 636.7 986.05 636.7 986.05 636.3 986.25 636.3 986.25 635.9 986.35 635.9 986.45 635.7 986.55 635.7 986.55 635.5 986.75 635.5 986.75 635.4 986.95 635.4 986.95 635.2 987.15 635.2 987.15 635 987.25 635 987.25 634.8 987.55 634.8 987.45 634.6 987.75 634.6 987.85 634.6 987.85 634.4 988.25 634.4 988.15 634.2 988.55 634.2 988.55 634 988.95 634 988.95 633.8 989.35 633.8 989.45 633.6 990.55 633.7 990.55 633.5 992.85 633.5 992.85 633.6 993.25 633.6 993.65 633.6 993.95 633.6 993.95 633.8 994.25 633.8 994.25 634 994.65 634 995.15 634 995.05 634.3 995.55 634.3 995.55 634.4 995.85 634.4 995.85 634.6 996.15 634.5 996.15 634.7 996.35 634.8 996.45 634.9 996.85 634.9 996.95 635.2 997.45 635.2 997.45 635 997.75 635 998.15 635 998.15 634.7 998.45 634.7 998.45 634.4 998.65 634.4 998.65 634 998.45 634 998.45 633.8 998.25 633.8 998.25 633.6 998.05 633.6 998.05 633.4 997.95 633.4 997.95 633.3 997.75 633.2 997.75 633.1 997.35 633.1 997.35 628.1"/>
              <polygon class="cls-1" points="928.15 628.1 927.95 628.1 927.95 628.3 927.75 628.3 927.75 628.5 927.55 628.5 927.45 628.5 927.45 628.7 927.25 628.7 927.25 628.9 927.05 628.9 926.85 628.9 926.85 629 926.65 629 926.65 629.2 926.55 629.2 926.55 629.4 926.35 629.4 926.35 629.6 925.95 629.6 925.95 629.8 925.75 629.8 925.75 630 925.65 630 925.65 630.2 925.45 630.2 925.45 630.4 925.25 630.4 925.25 630.6 925.05 630.6 925.05 630.9 924.85 630.9 924.85 631.1 924.75 631.1 924.75 631.5 924.55 631.5 924.55 631.7 924.35 631.7 924.35 632.1 924.15 632.1 924.15 632.5 923.95 632.5 923.95 632.9 923.85 632.9 923.85 633.3 923.65 633.3 923.65 633.8 923.45 633.8 923.45 634.6 923.25 634.6 923.25 635.5 923.05 635.5 923.05 638.1 923.25 638.1 923.25 639 923.45 639 923.45 639.8 923.65 639.8 923.65 640.3 923.85 640.3 923.75 640.7 923.95 640.7 923.95 641.3 924.15 641.3 924.15 641.7 924.35 641.7 924.35 641.9 924.55 641.9 924.55 642.2 924.65 642.2 924.65 642.4 924.85 642.4 924.85 642.8 925.05 642.8 925.05 643 925.25 643 925.25 643.2 925.45 643.2 925.45 643.4 925.65 643.4 925.65 643.6 925.75 643.6 925.75 643.8 925.95 643.8 925.95 644 926.15 644 926.15 644.2 926.35 644.2 926.35 644.4 926.65 644.4 926.65 644.5 927.05 644.5 927.05 644.7 927.25 644.7 927.25 645 927.55 644.9 927.55 645.1 927.95 645.1 927.95 645.3 928.45 645.3 928.45 645.5 929.05 645.5 929.05 645.7 930.15 645.7 930.15 645.9 932.75 645.9 932.85 645.7 933.15 645.7 933.85 645.7 933.85 645.5 934.55 645.5 934.65 645.3 935.15 645.3 935.15 645.1 935.55 645.1 935.55 644.9 935.85 644.9 935.85 644.8 936.25 644.8 936.25 644.5 936.55 644.6 936.55 644.3 936.95 644.4 936.95 644.2 937.15 644.2 937.15 644 937.35 644 937.35 643.8 937.65 643.8 937.65 643.6 937.85 643.6 937.85 643.4 938.05 643.4 938.05 643.2 938.25 643.2 938.25 643 938.35 643 938.35 642.8 938.55 642.8 938.55 642.6 938.75 642.6 938.75 642.3 938.95 642.3 938.95 642.1 939.15 642.1 939.15 641.9 939.25 641.9 939.25 641.5 939.25 641.3 939.45 641.3 939.45 640.9 939.65 640.9 939.65 640.5 939.85 640.5 939.85 639.6 939.95 639.6 940.05 638.1 939.85 638 939.85 637.3 939.65 637.3 939.65 636.7 939.45 636.7 939.45 636.3 939.25 636.3 939.25 635.9 939.15 635.9 939.05 635.7 938.95 635.7 938.95 635.5 938.75 635.5 938.75 635.4 938.55 635.4 938.55 635.2 938.35 635.2 938.45 635 938.25 635 938.25 634.8 937.95 634.8 938.05 634.6 937.75 634.6 937.65 634.6 937.65 634.4 937.25 634.4 937.35 634.2 936.95 634.2 936.95 634 936.55 634 936.55 633.8 936.15 633.8 936.05 633.6 934.95 633.7 934.95 633.5 932.65 633.5 932.65 633.6 932.25 633.6 931.85 633.6 931.55 633.6 931.55 633.8 931.25 633.8 931.25 634 930.85 634 930.35 634 930.45 634.3 929.95 634.3 929.95 634.4 929.65 634.4 929.65 634.6 929.35 634.5 929.35 634.7 929.15 634.8 929.05 634.9 928.65 634.9 928.55 635.2 928.05 635.2 928.05 635 927.75 635 927.35 635 927.35 634.7 927.05 634.7 927.05 634.4 926.85 634.4 926.85 634 927.05 634 927.05 633.8 927.25 633.8 927.25 633.6 927.45 633.6 927.45 633.4 927.55 633.4 927.55 633.3 927.75 633.2 927.75 633.1 928.15 633.1 928.15 628.1"/>
              <polygon class="cls-12" points="959.35 630.8 959.35 663.3 959.75 663.6 960.05 663.8 961.25 664.2 961.75 664.4 964.85 664.4 965.65 664.2 966.15 663.8 966.75 663.6 966.65 630.8 966.35 631.1 965.75 631.3 965.25 631.5 963.35 631.6 962.55 631.5 961.45 631.4 960.45 631.2 959.85 631.1 959.35 630.8"/>
            </g>
            <g class="cls-23">
              <text class="cls-18" transform="translate(916.65 687.7)"><tspan x="0" y="0">TECH</tspan></text>
            </g>
            <g class="cls-23">
              <text class="cls-16" transform="translate(896.05 709)"><tspan x="0" y="0">IN </tspan></text>
              <text class="cls-16" transform="translate(926.45 709)"><tspan x="0" y="0">M</tspan></text>
              <text class="cls-16" transform="translate(946.55 709)"><tspan class="cls-14" x="0" y="0">Y</tspan><tspan x="13.76" y="0"> </tspan></text>
              <text class="cls-16" transform="translate(967.35 709)"><tspan x="0" y="0">S</tspan></text>
              <text class="cls-16" transform="translate(980.85 709)"><tspan x="0" y="0">T</tspan></text>
              <text class="cls-15" transform="translate(993.95 709)"><tspan x="0" y="0">Y</tspan></text>
              <text class="cls-16" transform="translate(1008.55 709)"><tspan x="0" y="0">LE</tspan></text>
            </g>
          </g>
          <g>
            <path class="cls-27" d="M165.4,451.7v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M182,456.3h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM179.6,453v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M192.3,453.6c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M208.3,453.6c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M217.4,452.3v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5.5-.8.5-1.5v-.2Z"/>
            <path class="cls-27" d="M227.9,454.3c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M238.8,454.3c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M253,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM250.8,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M263.6,453.6c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M273.6,453.6c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9,1.4-.7,2.4-.7,2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5c.2.1.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M280.1,447.2v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/>
            <path class="cls-27" d="M290.8,452.3v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5.5-.8.5-1.5v-.2Z"/>
            <path class="cls-27" d="M299.6,456.3h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M306.1,456.3h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M311.7,459.7c-.8,0-1.6-.3-2.3-1l1.1-1.8c.4.4.8.6,1.2.6s.4-.1.6-.3c.2-.2.2-.4.2-.7s-1.1-3.1-3.2-8.7h2.5l2,5.3,2-5.3h2.5l-3.9,10.1c-.2.6-.6,1-1.1,1.4-.5.3-1,.5-1.6.5v-.1Z"/>
            <path class="cls-27" d="M331.3,454.3c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M346.5,452c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM340,452c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M357.8,451.7v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5-.2-.3-.5-.5-1-.5s-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9s.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M372.1,447.6c1,0,1.8.4,2.6,1.2s1.1,1.9,1.1,3.1-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM369.6,452c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M381.9,456.3h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M393.2,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM391,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M400.2,449.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M413.4,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM411.2,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M421,456.4c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM419.6,452c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M443,456.3h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM440.7,453v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M449.4,456.3h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M455.9,456.3h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M466.1,447.3v-2.1h6.6v1.7l-2.2,2.6c.9.1,1.5.5,2,1.1s.7,1.3.7,2.1c0,1.2-.4,2.1-1.2,2.7-.8.7-1.8,1-3,1s-2.4-.4-3.6-1.3l1-2c1,.7,1.9,1.1,2.7,1.1s.9-.1,1.2-.4c.3-.2.5-.6.5-1.1s-.2-.8-.5-1.1c-.4-.3-.9-.4-1.5-.4s-.8.1-1.4.3v-1.8l2.1-2.5h-3.4v.1Z"/>
            <path class="cls-27" d="M481.4,456.4c-1.5,0-2.6-.5-3.4-1.6s-1.1-2.4-1.1-4.2.4-3.1,1.1-4.2,1.9-1.6,3.4-1.6,2.6.5,3.4,1.6,1.1,2.4,1.1,4.2-.4,3.1-1.1,4.2-1.9,1.6-3.4,1.6ZM479.8,448c-.3.7-.5,1.6-.5,2.7s.2,2,.5,2.7.9,1,1.6,1,1.3-.3,1.6-1c.3-.7.5-1.6.5-2.7s-.2-2-.5-2.7-.9-1-1.6-1-1.3.3-1.6,1Z"/>
            <path class="cls-27" d="M502.8,445.2h2.4v11.1h-2.4v-4.4h-4.3v4.4h-2.4v-11.1h2.4v4.6h4.3v-4.6Z"/>
            <path class="cls-27" d="M514.4,447.3v9h-2.4v-9h-3.1v-2.1h8.6v2.1h-3.1Z"/>
            <path class="cls-27" d="M530.8,449.3l-2.9,6.1h-1.4l-2.9-6.1v7h-2.4v-11.1h3.3l2.8,6.1,2.8-6.1h3.3v11.1h-2.4v-7h-.2Z"/>
            <path class="cls-27" d="M537.8,456.3v-11.1h2.4v8.9h4.6v2.2h-7Z"/>
            <path class="cls-27" d="M557.1,449.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M570.2,456.3h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM567.9,453v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M580.5,453.6c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M586.6,456.3h-2.3v-11.8h2.3v6.1l2.6-2.8h2.9l-3.2,3.5,3.3,5.1h-2.8l-2.1-3.3-.8.8v2.5l.1-.1Z"/>
            <path class="cls-27" d="M601.5,453.6c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M618.3,456.3h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM616,453v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M626.4,454.3c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M637.7,449.8c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M649.9,452c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM643.4,452c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M659.7,453.6c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M669.7,453.6c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M682.2,449.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M690.5,451.7v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M707.3,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM705,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M722.6,456.3h-4.7v-11.1h4.2c.7,0,1.4,0,1.9.3.5.2.9.4,1.2.7.5.6.7,1.2.7,1.9s-.3,1.5-.8,1.9c-.2.1-.3.2-.4.3s-.2,0-.4.2c.7.1,1.2.5,1.6.9.4.5.6,1.1.6,1.8s-.3,1.5-.8,2.1c-.6.7-1.6,1-3.1,1h0ZM720.2,449.7h1.1c.7,0,1.2,0,1.5-.2s.5-.5.5-1-.1-.8-.4-1c-.3-.2-.8-.2-1.5-.2h-1.2v2.4h0ZM720.2,454.2h1.7c.7,0,1.2,0,1.6-.3s.5-.5.5-1-.2-.9-.5-1c-.4-.2-1-.2-1.8-.2h-1.4v2.6l-.1-.1Z"/>
            <path class="cls-27" d="M737.4,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM735.2,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M747.9,454.8c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1c.8-.8,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM747.6,451.8c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/>
            <path class="cls-27" d="M754.2,446.6c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM756.3,456.3h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M762.8,451.5v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M774.6,451.5v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M791.3,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM789.1,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M800,449.8c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9s.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M804.2,456.1c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
            <path class="cls-27" d="M816.7,445.2h2.4v11.1h-2.4v-11.1Z"/>
            <path class="cls-27" d="M825.8,451.5v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M837.9,449.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M851.1,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM848.9,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M859.8,449.8c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9s.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M871.4,451.7v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M888.1,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM885.9,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M895.7,456.4c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM894.3,452c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M904.8,446.6c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM907,456.3h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M918.2,456.3h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.8-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5l-.1-.1ZM915.8,453v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M924.9,449.5v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M938.1,455c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM935.9,450c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M942.7,456.1c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
            <path class="cls-27" d="M196.4,475.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM194,472.1v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M202.7,470.6v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M215.6,475.5c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM214.1,471.1c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M238.5,475.4l-1-2.4h-4.5l-1,2.4h-2.6l4.7-11.1h2.3l4.7,11.1h-2.6,0ZM235.2,467.6l-1.4,3.2h2.7l-1.3-3.2Z"/>
            <path class="cls-27" d="M247.1,475.5c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM245.7,471.1c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M258.3,475.4l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
            <path class="cls-27" d="M274,475.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM271.7,472.1v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M280.4,470.6v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M293.9,473.4c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M308.1,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM305.9,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M315.7,475.5c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM314.3,471.1c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M333,475.4h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M344.4,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM342.1,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M350.8,475.4l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
            <path class="cls-27" d="M366.8,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM364.5,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M373.4,475.4h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M383.8,472.7c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M393.5,471.6v-2.1h5.5v2.1h-5.5Z"/>
            <path class="cls-27" d="M416.2,475.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM413.8,472.1v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M422.6,470.6v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M446.4,471.1c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM440,471.1c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M455.5,471.4v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5.5-.8.5-1.5v-.2Z"/>
            <path class="cls-27" d="M464.7,468.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M477,472.7c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M483.4,468.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M496.5,475.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM494.1,472.1v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M502.8,470.6v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M515.7,475.5c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM514.2,471.1c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M524.8,465.7c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM526.9,475.4h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M533.4,470.6v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M549.1,473.9c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1c.8-.8,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM548.7,470.9c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/>
            <path class="cls-27" d="M568.3,475.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM565.9,472.1v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M576.3,473.4c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M585.6,470.8v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M595.3,465.7c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM597.5,475.4h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M608.8,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM606.6,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M615.2,475.4l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
            <path class="cls-27" d="M631.2,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM629,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M643.2,470.8v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M659.9,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM657.7,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M666.5,470.6v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M678.7,468.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M693.4,468.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M701.7,470.8v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M718.3,475.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM716,472.1v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M725.1,468.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M741.5,468.9c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M752.6,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM750.4,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M759.6,466.3v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/>
            <path class="cls-27" d="M767.3,475.4h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M778.7,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM776.4,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M787,473.4c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M796.7,468.5v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M808.9,472.7c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3c-.7-.2-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5-.5-.1-.8-.3-1.1-.4-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4c.5.2.9.3,1.1.4s.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M822,475.5c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM820.6,471.1c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M838.2,474.1c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM835.9,469.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M845.8,475.5c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM844.3,471.1c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M854.9,465.7c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM857,475.4h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M865.2,473.4c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M879.2,475.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.8-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5l-.1-.1ZM876.9,472.1v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M885.9,468.5v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M892.1,465.7c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM894.2,475.4h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-27" d="M906.7,471.1c0,1.2-.4,2.3-1.3,3.1-.8.8-1.9,1.3-3.2,1.3s-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM900.2,471.1c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M912.7,470.6v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M922.5,475.2c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
            <path class="cls-27" d="M287.1,485.7c1,0,1.8.4,2.6,1.2s1.1,1.9,1.1,3.1-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM284.6,490.2c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M298.9,488c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M310.1,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM307.8,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M320.6,491.8c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M331.6,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM329.3,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M338,494.4l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
            <path class="cls-27" d="M354,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM351.7,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M362.7,488c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M373.6,494.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM371.2,491.2v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M380,489.7v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M393.5,492.4c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-27" d="M407.6,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM405.4,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M412.2,494.2c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
            <path class="cls-27" d="M431.6,494.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM429.2,491.2v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M438,489.7v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M450.8,494.6c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM449.4,490.2c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M472,491.8c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M478.5,487.6v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M488.8,488c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M501,490.2c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM494.5,490.2c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M506.9,489.7v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M522.6,493c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1s1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7c.5-.5.7-1.1.7-2.1v-.1ZM522.3,490c0-.7-.2-1.2-.6-1.6s-.8-.6-1.4-.6-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6.9.6,1.4.6,1-.2,1.4-.6.6-1,.6-1.6Z"/>
            <path class="cls-27" d="M540.9,493c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1s1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM540.6,490c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/>
            <path class="cls-27" d="M551.4,488c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M562.3,494.4h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM560,491.2v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/>
            <path class="cls-27" d="M572.7,491.8c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-27" d="M581.2,485.7c1,0,1.8.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM578.7,490.2c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M603,490.2c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM596.5,490.2c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M609.3,485.4v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/>
            <path class="cls-27" d="M628.4,489.8v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M646.2,490.2c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM639.7,490.2c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M653.2,494.6c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM651.7,490.2c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M669.3,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM667.1,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M678,488c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-27" d="M684.2,489.7v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M704.1,494.4h-2.4l-2.8-8.6h2.4l1.6,5.2,1.6-5.2h2.2l1.6,5.2,1.6-5.2h2.4l-2.8,8.6h-2.4l-1.5-4.7-1.5,4.7h0Z"/>
            <path class="cls-27" d="M722.9,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM720.7,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M732,485.7c1,0,1.9.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.2,3.2c-.8.9-1.7,1.3-2.6,1.3s-1.8-.4-2.5-1.3v1.1h-2.3v-11.8h2.3v4.2c.6-.7,1.5-1.1,2.5-1.1l.1.1ZM729.5,490.2c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M748.8,494.6c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM747.4,490.2c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M765,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM762.7,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M771.4,494.4l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/>
            <path class="cls-27" d="M787.4,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM785.1,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M794,494.4h-2.3v-11.8h2.3v11.8Z"/>
            <path class="cls-27" d="M806.5,490.2c0,1.2-.4,2.3-1.3,3.1-.8.8-1.9,1.3-3.2,1.3s-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM800,490.2c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M815,485.7c1,0,1.8.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM812.4,490.2c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-27" d="M830,489.8v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-27" d="M846.7,493.2c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.1c0,.5.3.8.7,1.1.4.3.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM844.5,488.1c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-27" d="M853.4,489.7v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-27" d="M865.5,487.6v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-27" d="M871.7,494.2c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1-.6.4-1,.4-.7-.1-1-.4Z"/>
          </g>
          <line class="cls-10" x1="203.65" y1="605.6" x2="408.25" y2="604.2"/>
          <g class="cls-23">
            <text class="cls-19" transform="translate(255.75 630.8)"><tspan x="0" y="0">SK Basha</tspan></text>
          </g>
          <g class="cls-23">
            <text class="cls-29" transform="translate(242.75 653.3)"><tspan x="0" y="0">DEVE</tspan></text>
            <text class="cls-28" transform="translate(294.65 653.3)"><tspan x="0" y="0">L</tspan></text>
            <text class="cls-29" transform="translate(305.35 653.3)"><tspan x="0" y="0">OPER</tspan></text>
          </g>
          <line class="cls-10" x1="658.65" y1="605.6" x2="863.25" y2="604.2"/>
          <g class="cls-23">
            <text class="cls-29" transform="translate(687.25 628.1)"><tspan x="0" y="0">G </tspan></text>
            <text class="cls-29" transform="translate(707.35 628.1)"><tspan x="0" y="0">R</tspan></text>
            <text class="cls-29" transform="translate(720.65 628.1)"><tspan x="0" y="0">ama Krishna</tspan></text>
          </g>
          <g class="cls-23">
            <text class="cls-29" transform="translate(716.25 653.2)"><tspan x="0" y="0">DESIGNER</tspan></text>
          </g>
        </g>
        <image width="743" height="336" transform="translate(486.91 455.17) scale(.73)" xlink:href="ramu.png"/>
        <image width="666" height="375" transform="translate(0 431.71)" xlink:href="basha-removebg-preview.png"/>
        <!-- Corrected position for userNameText and currentDateText -->
        <text id="userNameText" class="name-text" x="543.1" y="400">Your Name Here</text>
        <text id="currentDateText" class="date-text" x="543.1" y="555">Date Here</text>
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

