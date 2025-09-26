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
          const expected = `<h1>main title</h1> <h2 >subtitle</h2> <h3 >section title</h3>`;
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
          <p><strong>Instructions:</strong> Create:&lt;/p&gt;
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
          <p><strong>Instructions:</strong> Create a table with:&lt;/p&gt;
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
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1090.81 797.59">
        <defs>
          <style>
            .cls-1{fill:#e35d26;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-7,.cls-8,.cls-9,.cls-10,.cls-11,.cls-12{stroke-miterlimit:10;}.cls-1,.cls-2,.cls-3,.cls-10,.cls-12{stroke:#083e5c;}.cls-2,.cls-13,.cls-10{fill:#fae4c4;}.cls-3,.cls-14,.cls-15{fill:#e15c26;}.cls-3,.cls-10{stroke-width:1.6px;}.cls-16,.cls-14{letter-spacing:-.02em;}.cls-17,.cls-18{fill:#053c59;}.cls-19,.cls-20,.cls-18,.cls-21,.cls-4,.cls-22,.cls-5,.cls-6,.cls-23,.cls-24,.cls-7,.cls-25,.cls-8,.cls-26,.cls-27,.cls-14,.cls-28,.cls-15,.cls-11{isolation:isolate;}.cls-19,.cls-20,.cls-21,.cls-22,.cls-24,.cls-25,.cls-28{fill:#231f20;}.cls-19,.cls-20,.cls-4,.cls-5,.cls-24,.cls-7,.cls-25,.cls-8{font-family:ArialMT, Arial;}.cls-19,.cls-4{letter-spacing:.1em;}.cls-19,.cls-4,.cls-5,.cls-24,.cls-14,.cls-15{font-size:21.2px;}.cls-29{fill:#faf1dd;}.cls-30{fill:#fff;}.cls-20,.cls-18,.cls-7,.cls-25,.cls-8{font-size:31.8px;}.cls-20,.cls-7{letter-spacing:-.02em;}.cls-31{fill:#083e5b;}.cls-18,.cls-21,.cls-22,.cls-6,.cls-26,.cls-27,.cls-14,.cls-15,.cls-11{font-family:Arial-BoldMT, Arial;font-weight:700;}.cls-18,.cls-21,.cls-25,.cls-8{letter-spacing:.1em;}.cls-21,.cls-22{font-size:15.9px;}.cls-32{fill:#f0662a;}.cls-33{fill:#f9e1bc;}.cls-4,.cls-5,.cls-6,.cls-7,.cls-8,.cls-9,.cls-11{fill:none;}.cls-4,.cls-5,.cls-6,.cls-7,.cls-8,.cls-11{stroke-width:.5px;}.cls-4,.cls-5,.cls-7,.cls-8,.cls-9{stroke:#231f20;}.cls-34{fill:#083e5c;}.cls-22{letter-spacing:.08em;}.cls-5,.cls-24{letter-spacing:.1em;}.cls-6,.cls-26,.cls-27,.cls-11{font-size:63.6px;}.cls-6,.cls-27{letter-spacing:.2em;}.cls-6,.cls-11{stroke:#e15726;}.cls-35{fill:#e35e26;}.cls-36{fill:#063d5c;}.cls-37,.cls-26,.cls-27{fill:#e25626;}.cls-38{opacity:.3;}.cls-26,.cls-11{letter-spacing:.06em;}.cls-39{fill:#ebebeb;}.cls-9{stroke-width:2.6px;}.cls-28{opacity:.8;}.cls-40{fill:#083f5c;}.cls-12{fill:#e55e26;}</style></defs><polygon class="cls-37" points="398.83 1.37 79.93 367.29 2.01 453.37 2.01 1.37 398.83 1.37"/><polygon class="cls-37" points="620.03 797.27 1003.51 356.9 1090.63 258.67 1090.61 797.16 620.03 797.27"/><polygon class="cls-32" points="605.09 .1 2.01 661.51 2.33 446.95 397.67 0 605.09 .1"/><polygon class="cls-32" points="1090.63 258.67 620.03 797.27 422.12 797.27 1090.81 62.89 1090.63 258.67"/><polygon class="cls-39" points="1090.81 62.89 421.39 796.72 2.01 661.51 595.98 7.06 1090.81 62.89"/><polygon class="cls-39" points="2.16 797.59 422.12 797.27 477.9 736.31 2.01 661.51 2.16 797.59"/><rect class="cls-30" x="53.11" y="61.97" width="985.14" height="673.7"/><polygon class="cls-39" points="1090.11 65.09 580.88 22.78 600.29 .97 1090.61 .97 1090.11 65.09"/><g class="cls-23"><text class="cls-27" transform="translate(292.77 147.87)"><tspan x="0" y="0">CE</tspan></text><text class="cls-6" transform="translate(292.77 147.87)"><tspan x="0" y="0">CE</tspan></text><text class="cls-27" transform="translate(393.57 147.87)"><tspan x="0" y="0">R</tspan></text><text class="cls-6" transform="translate(393.57 147.87)"><tspan x="0" y="0">R</tspan></text><text class="cls-27" transform="translate(444.43 147.87)"><tspan x="0" y="0">TIFIC</tspan></text><text class="cls-6" transform="translate(444.43 147.87)"><tspan x="0" y="0">TIFIC</tspan></text><text class="cls-26" transform="translate(653.85 147.87)"><tspan x="0" y="0">A</tspan></text><text class="cls-11" transform="translate(653.85 147.87)"><tspan x="0" y="0">A</tspan></text><text class="cls-27" transform="translate(704.6 147.87)"><tspan x="0" y="0">TE</tspan></text><text class="cls-6" transform="translate(704.6 147.87)"><tspan x="0" y="0">TE</tspan></text></g><g class="cls-23"><text class="cls-25" transform="translate(373.04 219.67)"><tspan x="0" y="0">Of </tspan></text><text class="cls-8" transform="translate(373.04 219.67)"><tspan x="0" y="0">Of </tspan></text><text class="cls-20" transform="translate(430.6 219.67)"><tspan x="0" y="0">T</tspan></text><text class="cls-7" transform="translate(430.6 219.67)"><tspan x="0" y="0">T</tspan></text><text class="cls-25" transform="translate(451.82 219.67)"><tspan x="0" y="0">ask </tspan></text><text class="cls-8" transform="translate(451.82 219.67)"><tspan x="0" y="0">ask </tspan></text><text class="cls-25" transform="translate(529.2 219.67)"><tspan x="0" y="0">C</tspan></text><text class="cls-8" transform="translate(529.2 219.67)"><tspan x="0" y="0">C</tspan></text><text class="cls-25" transform="translate(554.93 219.67)"><tspan x="0" y="0">ompletion</tspan></text><text class="cls-8" transform="translate(554.93 219.67)"><tspan x="0" y="0">ompletion</tspan></text></g><g class="cls-23"><text class="cls-19" transform="translate(450.62 279.07)"><tspan x="0" y="0">is p</tspan></text><text class="cls-4" transform="translate(450.62 279.07)"><tspan x="0" y="0">is p</tspan></text><text class="cls-24" transform="translate(492.67 279.07)"><tspan x="0" y="0">r</tspan></text><text class="cls-5" transform="translate(492.67 279.07)"><tspan x="0" y="0">r</tspan></text><text class="cls-19" transform="translate(502.58 279.07)"><tspan x="0" y="0">ese</tspan></text><text class="cls-4" transform="translate(502.58 279.07)"><tspan x="0" y="0">ese</tspan></text><text class="cls-24" transform="translate(542.02 279.07)"><tspan x="0" y="0">n</tspan></text><text class="cls-5" transform="translate(542.02 279.07)"><tspan x="0" y="0">n</tspan></text><text class="cls-24" transform="translate(556.24 279.07)"><tspan x="0" y="0">t</tspan></text><text class="cls-5" transform="translate(556.24 279.07)"><tspan x="0" y="0">t</tspan></text><text class="cls-24" transform="translate(566.45 279.07)"><tspan x="0" y="0">ed </tspan></text><text class="cls-5" transform="translate(566.45 279.07)"><tspan x="0" y="0">ed </tspan></text><text class="cls-24" transform="translate(602.79 279.07)"><tspan x="0" y="0">t</tspan></text><text class="cls-5" transform="translate(602.79 279.07)"><tspan x="0" y="0">t</tspan></text><text class="cls-24" transform="translate(613 279.07)"><tspan x="0" y="0">o :</tspan></text><text class="cls-5" transform="translate(613 279.07)"><tspan x="0" y="0">o :</tspan></text></g><g class="cls-38"><rect class="cls-29" x="864.87" y="549.87" width="173.48" height="185.9"/><rect class="cls-10" x="929.94" y="577.57" width="51.65" height="32.8" rx="5.2" ry="5.2"/><rect class="cls-31" x="934.34" y="584.07" width="42.75" height="19.8" rx="5.2" ry="5.2"/><ellipse class="cls-33" cx="965.57" cy="593.97" rx="5.41" ry="5.8"/><ellipse class="cls-33" cx="944.75" cy="593.97" rx="5.41" ry="5.8"/><polygon class="cls-17" points="926.83 614.67 927.03 614.37 927.33 614.17 927.63 614.97 927.73 614.77 928.13 614.47 928.44 614.27 928.64 614.07 928.84 613.77 929.24 613.57 929.54 613.47 929.94 613.27 930.04 613.07 930.54 612.87 931.14 612.67 931.44 612.47 932.14 612.17 932.44 611.97 978.69 611.87 979.09 612.07 979.69 612.27 980.19 612.47 980.49 612.67 980.69 612.77 980.89 613.07 981.29 613.17 981.49 613.37 981.79 613.57 982.19 613.77 982.49 614.07 982.79 614.47 983.19 614.67 983.39 614.87 983.59 615.27 983.79 615.57 984.19 615.97 984.19 617.57 983.19 617.57 982.39 617.77 981.29 617.97 980.19 618.17 979.19 618.37 978.19 618.57 977.29 618.77 976.29 618.97 975.38 619.17 974.38 619.37 973.68 619.57 972.88 619.77 971.98 619.97 971.08 620.27 970.18 620.37 969.68 620.57 969.08 620.77 968.28 620.97 967.68 621.17 967.08 621.37 966.58 621.57 965.97 621.77 965.57 621.97 965.07 622.17 964.67 622.37 964.07 622.57 963.67 622.77 963.27 622.97 962.87 623.17 962.47 623.37 962.17 623.57 961.77 623.77 961.37 623.97 960.97 624.17 960.67 624.37 960.37 624.57 960.07 624.77 959.77 624.97 959.47 625.17 959.07 625.37 958.87 625.57 958.67 625.77 958.37 625.97 958.07 626.17 957.87 626.37 957.67 626.57 957.47 626.77 957.27 626.97 957.07 627.07 956.87 627.27 956.77 627.47 956.56 627.77 956.36 627.87 956.16 628.27 955.96 628.67 955.76 629.17 955.56 629.37 954.86 629.37 954.86 629.07 954.66 628.87 954.36 628.37 954.06 627.97 953.76 627.47 953.26 627.07 952.76 626.57 952.46 626.27 952.06 625.97 951.66 625.67 951.36 625.27 950.76 624.87 950.16 624.47 949.26 624.07 948.66 623.67 948.06 623.27 947.15 622.77 946.25 622.37 945.75 622.17 945.15 621.87 944.75 621.67 944.15 621.47 943.55 621.27 942.85 621.07 942.15 620.77 941.25 620.57 940.55 620.37 939.85 620.27 938.95 619.97 938.15 619.77 937.24 619.57 936.24 619.47 935.44 619.17 934.44 618.97 933.54 618.87 932.44 618.67 931.64 618.37 930.54 618.17 929.54 618.07 928.54 617.87 927.63 617.67 926.83 617.57 926.83 615.77"/><polygon class="cls-17" points="983.39 615.07 983.99 615.07 984.39 614.87 984.89 614.57 985.4 614.37 985.9 614.17 986.4 613.97 986.8 613.67 987.3 613.47 987.7 613.37 988 613.37 988.5 613.57 988.7 613.77 988.9 614.17 988.9 614.67 988.9 616.97 987.4 617.97 987.3 615.27 987.1 615.47 986.8 615.47 986.3 615.77 985.9 615.97 985.4 616.17 984.89 616.37 984.19 616.77 983.39 616.77 983.39 614.97 983.39 615.07"/><polygon class="cls-17" points="928.34 614.97 927.73 614.97 927.13 614.77 926.53 614.37 926.03 614.17 925.33 613.87 924.73 613.67 924.23 613.37 923.63 613.17 923.13 612.97 922.73 612.97 922.03 612.97 921.73 613.37 921.73 613.97 921.73 614.57 921.73 617.07 923.23 617.97 923.23 615.77 923.83 615.47 924.13 615.77 924.83 615.97 925.33 616.17 926.03 616.47 926.53 616.77 927.43 617.07 928.44 617.07 928.44 614.87 928.34 614.97"/><polygon class="cls-2" points="955.76 628.47 955.96 628.27 956.16 627.87 956.36 627.47 956.56 627.17 956.77 626.97 956.87 626.77 957.07 626.57 957.27 626.37 957.47 626.17 957.67 625.97 957.77 625.77 957.97 625.57 958.17 625.37 958.37 625.27 958.67 625.07 958.87 624.87 959.17 624.67 959.47 624.47 959.67 624.27 959.97 624.07 960.17 623.87 960.47 623.67 960.87 623.47 961.17 623.27 961.37 623.07 961.77 622.97 962.17 622.77 962.47 622.57 962.87 622.37 963.27 622.17 963.67 621.97 964.07 621.77 964.67 621.57 964.97 621.37 965.57 621.17 966.08 620.97 966.68 620.87 967.18 620.67 967.78 620.47 968.28 620.27 968.78 620.07 969.58 619.87 970.28 619.67 970.98 619.47 971.68 619.27 972.58 619.07 973.28 618.87 974.18 618.67 975.08 618.47 975.99 618.37 976.69 618.17 977.79 617.97 978.69 617.77 979.59 617.57 980.49 617.37 981.39 617.17 982.49 616.97 983.39 616.77 984.19 616.57 984.89 616.37 985.6 616.17 986.1 616.07 986.6 615.87 986.8 615.87 986.8 617.57 986.3 617.77 985.7 617.97 985.2 618.17 984.69 618.37 984.29 618.57 983.79 618.67 983.19 618.87 982.69 619.07 982.19 619.27 981.79 619.47 981.39 619.67 980.89 619.87 980.39 620.07 979.79 620.27 979.29 620.47 978.89 620.67 978.39 620.77 977.99 620.97 977.49 621.17 976.89 621.37 976.39 621.57 975.99 621.77 975.48 621.97 974.98 622.17 974.38 622.37 973.98 622.57 973.48 622.77 972.98 622.97 972.58 623.17 972.08 623.27 971.48 623.57 970.98 623.67 970.58 623.87 970.08 624.07 969.58 624.27 968.98 624.47 968.58 624.67 968.08 624.87 967.68 625.07 967.18 625.27 966.68 625.47 966.08 625.67 965.77 625.87 965.17 625.97 964.87 626.17 964.27 626.37 963.77 626.57 963.37 626.77 962.87 626.97 962.37 627.17 961.97 627.37 961.37 627.57 960.87 627.77 960.57 627.87 959.77 627.87 959.47 628.07 959.27 628.27 959.07 628.47 958.67 628.67 958.37 628.87 957.77 629.07 957.67 629.27 957.27 629.27 956.77 629.47 956.36 629.57 955.16 629.67 955.26 628.77 955.66 628.67 955.76 628.47"/><polygon class="cls-2" points="954.66 628.47 954.46 628.27 954.26 627.87 954.06 627.47 953.86 627.17 953.66 626.97 953.56 626.77 953.36 626.57 953.16 626.37 952.96 626.17 952.76 625.97 952.66 625.77 952.46 625.57 952.26 625.37 952.06 625.27 951.76 625.07 951.56 624.87 951.26 624.67 950.96 624.47 950.76 624.27 950.46 624.07 950.26 623.87 949.96 623.67 949.56 623.47 949.26 623.27 949.06 623.07 948.66 622.97 948.26 622.77 947.96 622.57 947.56 622.37 947.15 622.17 946.75 621.97 946.35 621.77 945.75 621.57 945.45 621.37 944.85 621.17 944.35 620.97 943.75 620.87 943.25 620.67 942.65 620.47 942.15 620.27 941.65 620.07 940.85 619.87 940.15 619.67 939.45 619.47 938.75 619.27 937.85 619.07 937.14 618.87 936.24 618.67 935.34 618.47 934.44 618.37 933.74 618.17 932.64 617.97 931.74 617.77 930.84 617.57 929.94 617.37 929.04 617.17 927.93 616.97 927.03 616.77 926.23 616.57 925.53 616.37 924.83 616.17 924.33 616.07 923.83 615.87 923.63 615.87 923.63 617.57 924.13 617.77 924.73 617.97 925.23 618.17 925.73 618.37 926.13 618.57 926.63 618.67 927.23 618.87 927.73 619.07 928.24 619.27 928.64 619.47 929.04 619.67 929.54 619.87 930.04 620.07 930.64 620.27 931.14 620.47 931.54 620.67 932.04 620.77 932.44 620.97 932.94 621.17 933.54 621.37 934.04 621.57 934.44 621.77 934.94 621.97 935.44 622.17 936.04 622.37 936.44 622.57 936.94 622.77 937.44 622.97 937.85 623.17 938.35 623.27 938.95 623.57 939.45 623.67 939.85 623.87 940.35 624.07 940.85 624.27 941.45 624.47 941.75 624.67 942.35 624.87 942.65 625.07 943.25 625.27 943.75 625.47 944.35 625.67 944.65 625.87 945.25 625.97 945.55 626.17 946.15 626.37 946.65 626.57 947.05 626.77 947.56 626.97 948.06 627.17 948.46 627.37 949.06 627.57 949.56 627.77 949.86 627.87 950.66 627.87 950.96 628.07 951.16 628.27 951.36 628.47 951.76 628.67 952.06 628.87 952.66 629.07 952.76 629.27 953.16 629.27 953.66 629.47 954.06 629.57 955.16 629.67 955.16 628.77 954.76 628.67 954.66 628.47"/><polygon class="cls-13" points="956.06 628.97 954.26 628.97 953.66 628.27 956.77 628.27 956.06 628.97"/><polygon class="cls-3" points="960.27 628.67 989.8 616.77 989.4 649.27 960.17 661.67 960.27 628.67"/><rect class="cls-34" x="954.16" y="569.77" width="3" height="7.4"/><ellipse class="cls-35" cx="955.66" cy="566.67" rx="5.01" ry="5.1"/><ellipse class="cls-36" cx="944.75" cy="596.37" rx="3.3" ry="3.4"/><ellipse class="cls-31" cx="965.57" cy="596.37" rx="3.3" ry="3.4"/><path class="cls-40" d="M982.19,584.87h2.8c2,0,3.7,1.6,3.7,3.7v7.5c0,2-1.6,3.7-3.7,3.7h-2.8v-14.9h0Z"/><path class="cls-35" d="M982.89,587.17h.3c1.4,0,2.6,1.2,2.6,2.6v4.9c0,1.4-1.2,2.6-2.6,2.6h-.3v-10.2h0v.1Z"/><path class="cls-40" d="M929.34,601.37h-2.8c-2,0-3.7-1.6-3.7-3.7v-7.5c0-2,1.6-3.7,3.7-3.7h2.8v14.9h0Z"/><path class="cls-35" d="M928.64,599.07h-.3c-1.4,0-2.6-1.2-2.6-2.6v-4.9c0-1.4,1.2-2.6,2.6-2.6h.3v10.2h0v-.1Z"/><polygon class="cls-3" points="950.06 628.67 920.43 616.77 920.83 649.07 950.16 661.37 950.06 628.67"/><polygon class="cls-1" points="989.5 627.07 989.7 627.07 989.7 627.27 989.9 627.27 989.9 627.47 990.1 627.47 990.2 627.47 990.2 627.67 990.4 627.67 990.4 627.87 990.6 627.87 990.8 627.87 990.8 627.97 991 627.97 991 628.17 991.1 628.17 991.1 628.37 991.3 628.37 991.3 628.57 991.7 628.57 991.7 628.77 991.9 628.77 991.9 628.97 992 628.97 992 629.17 992.2 629.17 992.2 629.37 992.4 629.37 992.4 629.57 992.6 629.57 992.6 629.87 992.8 629.87 992.8 630.07 992.9 630.07 992.9 630.47 993.1 630.47 993.1 630.67 993.3 630.67 993.3 631.07 993.5 631.07 993.5 631.47 993.7 631.47 993.7 631.87 993.8 631.87 993.8 632.27 994 632.27 994 632.77 994.2 632.77 994.2 633.57 994.4 633.57 994.4 634.47 994.61 634.47 994.61 637.07 994.4 637.07 994.4 637.97 994.2 637.97 994.2 638.77 994 638.77 994 639.27 993.8 639.27 993.9 639.67 993.7 639.67 993.7 640.27 993.5 640.27 993.5 640.67 993.3 640.67 993.3 640.87 993.1 640.87 993.1 641.17 993 641.17 993 641.37 992.8 641.37 992.8 641.77 992.6 641.77 992.6 641.97 992.4 641.97 992.4 642.17 992.2 642.17 992.2 642.37 992 642.37 992 642.57 991.9 642.57 991.9 642.77 991.7 642.77 991.7 642.97 991.5 642.97 991.5 643.17 991.3 643.17 991.3 643.37 991 643.37 991 643.47 990.6 643.47 990.6 643.67 990.4 643.67 990.4 643.97 990.1 643.87 990.1 644.07 989.7 644.07 989.7 644.27 989.2 644.27 989.2 644.47 988.6 644.47 988.6 644.67 987.5 644.67 987.5 644.87 984.89 644.87 984.79 644.67 984.49 644.67 983.79 644.67 983.79 644.47 983.09 644.47 982.99 644.27 982.49 644.27 982.49 644.07 982.09 644.07 982.09 643.87 981.79 643.87 981.79 643.77 981.39 643.77 981.39 643.47 981.09 643.57 981.09 643.27 980.69 643.37 980.69 643.17 980.49 643.17 980.49 642.97 980.29 642.97 980.29 642.77 979.99 642.77 979.99 642.57 979.79 642.57 979.79 642.37 979.59 642.37 979.59 642.17 979.39 642.17 979.39 641.97 979.29 641.97 979.29 641.77 979.09 641.77 979.09 641.57 978.89 641.57 978.89 641.27 978.69 641.27 978.69 641.07 978.49 641.07 978.49 640.87 978.39 640.87 978.39 640.47 978.39 640.27 978.19 640.27 978.19 639.87 977.99 639.87 977.99 639.47 977.79 639.47 977.79 638.57 977.69 638.57 977.59 637.07 977.79 636.97 977.79 636.27 977.99 636.27 977.99 635.67 978.19 635.67 978.19 635.27 978.39 635.27 978.39 634.87 978.49 634.87 978.59 634.67 978.69 634.67 978.69 634.47 978.89 634.47 978.89 634.37 979.09 634.37 979.09 634.17 979.29 634.17 979.29 633.97 979.39 633.97 979.39 633.77 979.69 633.77 979.59 633.57 979.89 633.57 979.99 633.57 979.99 633.37 980.39 633.37 980.29 633.17 980.69 633.17 980.69 632.97 981.09 632.97 981.09 632.77 981.49 632.77 981.59 632.57 982.69 632.67 982.69 632.47 984.99 632.47 984.99 632.57 985.4 632.57 985.8 632.57 986.1 632.57 986.1 632.77 986.4 632.77 986.4 632.97 986.8 632.97 987.3 632.97 987.2 633.27 987.7 633.27 987.7 633.37 988 633.37 988 633.57 988.3 633.47 988.3 633.67 988.5 633.77 988.6 633.87 989 633.87 989.1 634.17 989.6 634.17 989.6 633.97 989.9 633.97 990.3 633.97 990.3 633.67 990.6 633.67 990.6 633.37 990.8 633.37 990.8 632.97 990.6 632.97 990.6 632.77 990.4 632.77 990.4 632.57 990.2 632.57 990.2 632.37 990.1 632.37 990.1 632.27 989.9 632.17 989.9 632.07 989.5 632.07 989.5 627.07"/><polygon class="cls-1" points="920.23 627.07 920.03 627.07 920.03 627.27 919.83 627.27 919.83 627.47 919.63 627.47 919.53 627.47 919.53 627.67 919.33 627.67 919.33 627.87 919.13 627.87 918.93 627.87 918.93 627.97 918.72 627.97 918.72 628.17 918.62 628.17 918.62 628.37 918.42 628.37 918.42 628.57 918.02 628.57 918.02 628.77 917.82 628.77 917.82 628.97 917.72 628.97 917.72 629.17 917.52 629.17 917.52 629.37 917.32 629.37 917.32 629.57 917.12 629.57 917.12 629.87 916.92 629.87 916.92 630.07 916.82 630.07 916.82 630.47 916.62 630.47 916.62 630.67 916.42 630.67 916.42 631.07 916.22 631.07 916.22 631.47 916.02 631.47 916.02 631.87 915.92 631.87 915.92 632.27 915.72 632.27 915.72 632.77 915.52 632.77 915.52 633.57 915.32 633.57 915.32 634.47 915.12 634.47 915.12 637.07 915.32 637.07 915.32 637.97 915.52 637.97 915.52 638.77 915.72 638.77 915.72 639.27 915.92 639.27 915.82 639.67 916.02 639.67 916.02 640.27 916.22 640.27 916.22 640.67 916.42 640.67 916.42 640.87 916.62 640.87 916.62 641.17 916.72 641.17 916.72 641.37 916.92 641.37 916.92 641.77 917.12 641.77 917.12 641.97 917.32 641.97 917.32 642.17 917.52 642.17 917.52 642.37 917.72 642.37 917.72 642.57 917.82 642.57 917.82 642.77 918.02 642.77 918.02 642.97 918.22 642.97 918.22 643.17 918.42 643.17 918.42 643.37 918.72 643.37 918.72 643.47 919.13 643.47 919.13 643.67 919.33 643.67 919.33 643.97 919.63 643.87 919.63 644.07 920.03 644.07 920.03 644.27 920.53 644.27 920.53 644.47 921.13 644.47 921.13 644.67 922.23 644.67 922.23 644.87 924.83 644.87 924.93 644.67 925.23 644.67 925.93 644.67 925.93 644.47 926.63 644.47 926.73 644.27 927.23 644.27 927.23 644.07 927.63 644.07 927.63 643.87 927.93 643.87 927.93 643.77 928.34 643.77 928.34 643.47 928.64 643.57 928.64 643.27 929.04 643.37 929.04 643.17 929.24 643.17 929.24 642.97 929.44 642.97 929.44 642.77 929.74 642.77 929.74 642.57 929.94 642.57 929.94 642.37 930.14 642.37 930.14 642.17 930.34 642.17 930.34 641.97 930.44 641.97 930.44 641.77 930.64 641.77 930.64 641.57 930.84 641.57 930.84 641.27 931.04 641.27 931.04 641.07 931.24 641.07 931.24 640.87 931.34 640.87 931.34 640.47 931.34 640.27 931.54 640.27 931.54 639.87 931.74 639.87 931.74 639.47 931.94 639.47 931.94 638.57 932.04 638.57 932.14 637.07 931.94 636.97 931.94 636.27 931.74 636.27 931.74 635.67 931.54 635.67 931.54 635.27 931.34 635.27 931.34 634.87 931.24 634.87 931.14 634.67 931.04 634.67 931.04 634.47 930.84 634.47 930.84 634.37 930.64 634.37 930.64 634.17 930.44 634.17 930.54 633.97 930.34 633.97 930.34 633.77 930.04 633.77 930.14 633.57 929.84 633.57 929.74 633.57 929.74 633.37 929.34 633.37 929.44 633.17 929.04 633.17 929.04 632.97 928.64 632.97 928.64 632.77 928.24 632.77 928.13 632.57 927.03 632.67 927.03 632.47 924.73 632.47 924.73 632.57 924.33 632.57 923.93 632.57 923.63 632.57 923.63 632.77 923.33 632.77 923.33 632.97 922.93 632.97 922.43 632.97 922.53 633.27 922.03 633.27 922.03 633.37 921.73 633.37 921.73 633.57 921.43 633.47 921.43 633.67 921.23 633.77 921.13 633.87 920.73 633.87 920.63 634.17 920.13 634.17 920.13 633.97 919.83 633.97 919.43 633.97 919.43 633.67 919.13 633.67 919.13 633.37 918.93 633.37 918.93 632.97 919.13 632.97 919.13 632.77 919.33 632.77 919.33 632.57 919.53 632.57 919.53 632.37 919.63 632.37 919.63 632.27 919.83 632.17 919.83 632.07 920.23 632.07 920.23 627.07"/><polygon class="cls-1" points="989.5 627.07 989.7 627.07 989.7 627.27 989.9 627.27 989.9 627.47 990.1 627.47 990.2 627.47 990.2 627.67 990.4 627.67 990.4 627.87 990.6 627.87 990.8 627.87 990.8 627.97 991 627.97 991 628.17 991.1 628.17 991.1 628.37 991.3 628.37 991.3 628.57 991.7 628.57 991.7 628.77 991.9 628.77 991.9 628.97 992 628.97 992 629.17 992.2 629.17 992.2 629.37 992.4 629.37 992.4 629.57 992.6 629.57 992.6 629.87 992.8 629.87 992.8 630.07 992.9 630.07 992.9 630.47 993.1 630.47 993.1 630.67 993.3 630.67 993.3 631.07 993.5 631.07 993.5 631.47 993.7 631.47 993.7 631.87 993.8 631.87 993.8 632.27 994 632.27 994 632.77 994.2 632.77 994.2 633.57 994.4 633.57 994.4 634.47 994.61 634.47 994.61 637.07 994.4 637.07 994.4 637.97 994.2 637.97 994.2 638.77 994 638.77 994 639.27 993.8 639.27 993.9 639.67 993.7 639.67 993.7 640.27 993.5 640.27 993.5 640.67 993.3 640.67 993.3 640.87 993.1 640.87 993.1 641.17 993 641.17 993 641.37 992.8 641.37 992.8 641.77 992.6 641.77 992.6 641.97 992.4 641.97 992.4 642.17 992.2 642.17 992.2 642.37 992 642.37 992 642.57 991.9 642.57 991.9 642.77 991.7 642.77 991.7 642.97 991.5 642.97 991.5 643.17 991.3 643.17 991.3 643.37 991 643.37 991 643.47 990.6 643.47 990.6 643.67 990.4 643.67 990.4 643.97 990.1 643.87 990.1 644.07 989.7 644.07 989.7 644.27 989.2 644.27 989.2 644.47 988.6 644.47 988.6 644.67 987.5 644.67 987.5 644.87 984.89 644.87 984.79 644.67 984.49 644.67 983.79 644.67 983.79 644.47 983.09 644.47 982.99 644.27 982.49 644.27 982.49 644.07 982.09 644.07 982.09 643.87 981.79 643.87 981.79 643.77 981.39 643.77 981.39 643.47 981.09 643.57 981.09 643.27 980.69 643.37 980.69 643.17 980.49 643.17 980.49 642.97 980.29 642.97 980.29 642.77 979.99 642.77 979.99 642.57 979.79 642.57 979.79 642.37 979.59 642.37 979.59 642.17 979.39 642.17 979.39 641.97 979.29 641.97 979.29 641.77 979.09 641.77 979.09 641.57 978.89 641.57 978.89 641.27 978.69 641.27 978.69 641.07 978.49 641.07 978.49 640.87 978.39 640.87 978.39 640.47 978.39 640.27 978.19 640.27 978.19 639.87 977.99 639.87 977.99 639.47 977.79 639.47 977.79 638.57 977.69 638.57 977.59 637.07 977.79 636.97 977.79 636.27 977.99 636.27 977.99 635.67 978.19 635.67 978.19 635.27 978.39 635.27 978.39 634.87 978.49 634.87 978.59 634.67 978.69 634.67 978.69 634.47 978.89 634.47 978.89 634.37 979.09 634.37 979.09 634.17 979.29 634.17 979.29 633.97 979.39 633.97 979.39 633.77 979.69 633.77 979.59 633.57 979.89 633.57 979.99 633.57 979.99 633.37 980.39 633.37 980.29 633.17 980.69 633.17 980.69 632.97 981.09 632.97 981.09 632.77 981.49 632.77 981.59 632.57 982.69 632.67 982.69 632.47 984.99 632.47 984.99 632.57 985.4 632.57 985.8 632.57 986.1 632.57 986.1 632.77 986.4 632.77 986.4 632.97 986.8 632.97 987.3 632.97 987.2 633.27 987.7 633.27 987.7 633.37 988 633.37 988 633.57 988.3 633.47 988.3 633.67 988.5 633.77 988.6 633.87 989 633.87 989.1 634.17 989.6 634.17 989.6 633.97 989.9 633.97 990.3 633.97 990.3 633.67 990.6 633.67 990.6 633.37 990.8 633.37 990.8 632.97 990.6 632.97 990.6 632.77 990.4 632.77 990.4 632.57 990.2 632.57 990.2 632.37 990.1 632.37 990.1 632.27 989.9 632.17 989.9 632.07 989.5 632.07 989.5 627.07"/><polygon class="cls-1" points="920.23 627.07 920.03 627.07 920.03 627.27 919.83 627.27 919.83 627.47 919.63 627.47 919.53 627.47 919.53 627.67 919.33 627.67 919.33 627.87 919.13 627.87 918.93 627.87 918.93 627.97 918.72 627.97 918.72 628.17 918.62 628.17 918.62 628.37 918.42 628.37 918.42 628.57 918.02 628.57 918.02 628.77 917.82 628.77 917.82 628.97 917.72 628.97 917.72 629.17 917.52 629.17 917.52 629.37 917.32 629.37 917.32 629.57 917.12 629.57 917.12 629.87 916.92 629.87 916.92 630.07 916.82 630.07 916.82 630.47 916.62 630.47 916.62 630.67 916.42 630.67 916.42 631.07 916.22 631.07 916.22 631.47 916.02 631.47 916.02 631.87 915.92 631.87 915.92 632.27 915.72 632.27 915.72 632.77 915.52 632.77 915.52 633.57 915.32 633.57 915.32 634.47 915.12 634.47 915.12 637.07 915.32 637.07 915.32 637.97 915.52 637.97 915.52 638.77 915.72 638.77 915.72 639.27 915.92 639.27 915.82 639.67 916.02 639.67 916.02 640.27 916.22 640.27 916.22 640.67 916.42 640.67 916.42 640.87 916.62 640.87 916.62 641.17 916.72 641.17 916.72 641.37 916.92 641.37 916.92 641.77 917.12 641.77 917.12 641.97 917.32 641.97 917.32 642.17 917.52 642.17 917.52 642.37 917.72 642.37 917.72 642.57 917.82 642.57 917.82 642.77 918.02 642.77 918.02 642.97 918.22 642.97 918.22 643.17 918.42 643.17 918.42 643.37 918.72 643.37 918.72 643.47 919.13 643.47 919.13 643.67 919.33 643.67 919.33 643.97 919.63 643.87 919.63 644.07 920.03 644.07 920.03 644.27 920.53 644.27 920.53 644.47 921.13 644.47 921.13 644.67 922.23 644.67 922.23 644.87 924.83 644.87 924.93 644.67 925.23 644.67 925.93 644.67 925.93 644.47 926.63 644.47 926.73 644.27 927.23 644.27 927.23 644.07 927.63 644.07 927.63 643.87 927.93 643.87 927.93 643.77 928.34 643.77 928.34 643.47 928.64 643.57 928.64 643.27 929.04 643.37 929.04 643.17 929.24 643.17 929.24 642.97 929.44 642.97 929.44 642.77 929.74 642.77 929.74 642.57 929.94 642.57 929.94 642.37 930.14 642.37 930.14 642.17 930.34 642.17 930.34 641.97 930.44 641.97 930.44 641.77 930.64 641.77 930.64 641.57 930.84 641.57 930.84 641.27 931.04 641.27 931.04 641.07 931.24 641.07 931.24 640.87 931.34 640.87 931.34 640.47 931.34 640.27 931.54 640.27 931.54 639.87 931.74 639.87 931.74 639.47 931.94 639.47 931.94 638.57 932.04 638.57 932.14 637.07 931.94 636.97 931.94 636.27 931.74 636.27 931.74 635.67 931.54 635.67 931.54 635.27 931.34 635.27 931.34 634.87 931.24 634.87 931.14 634.67 931.04 634.67 931.04 634.47 930.84 634.47 930.84 634.37 930.64 634.37 930.64 634.17 930.44 634.17 930.54 633.97 930.34 633.97 930.34 633.77 930.04 633.77 930.14 633.57 929.84 633.57 929.74 633.57 929.74 633.37 929.34 633.37 929.44 633.17 929.04 633.17 929.04 632.97 928.64 632.97 928.64 632.77 928.24 632.77 928.13 632.57 927.03 632.67 927.03 632.47 924.73 632.47 924.73 632.57 924.33 632.57 923.93 632.57 923.63 632.57 923.63 632.77 923.33 632.77 923.33 632.97 922.93 632.97 922.43 632.97 922.53 633.27 922.03 633.27 922.03 633.37 921.73 633.37 921.73 633.57 921.43 633.47 921.43 633.67 921.23 633.77 921.13 633.87 920.73 633.87 920.63 634.17 920.13 634.17 920.13 633.97 919.83 633.97 919.43 633.97 919.43 633.67 919.13 633.67 919.13 633.37 918.93 633.37 918.93 632.97 919.13 632.97 919.13 632.77 919.33 632.77 919.33 632.57 919.53 632.57 919.53 632.37 919.63 632.37 919.63 632.27 919.83 632.17 919.83 632.07 920.23 632.07 920.23 627.07"/><polygon class="cls-12" points="951.46 629.77 951.46 662.27 951.86 662.57 952.16 662.77 953.36 663.17 953.86 663.37 956.97 663.37 957.77 663.17 958.27 662.77 958.87 662.57 958.77 629.77 958.47 630.07 957.87 630.27 957.37 630.47 955.46 630.57 954.66 630.47 953.56 630.37 952.56 630.17 951.96 630.07 951.46 629.77"/><g class="cls-23"><text class="cls-18" transform="translate(908.71 686.67)"><tspan x="0" y="0">TECH</tspan></text></g><g class="cls-23"><text class="cls-15" transform="translate(888.09 707.97)"><tspan x="0" y="0">IN </tspan></text><text class="cls-15" transform="translate(918.53 707.97)"><tspan x="0" y="0">M</tspan></text><text class="cls-15" transform="translate(938.65 707.97)"><tspan class="cls-16" x="0" y="0">Y</tspan><tspan x="13.76" y="0"> </tspan></text><text class="cls-15" transform="translate(959.47 707.97)"><tspan x="0" y="0">S</tspan></text><text class="cls-15" transform="translate(972.98 707.97)"><tspan x="0" y="0">T</tspan></text><text class="cls-14" transform="translate(986.1 707.97)"><tspan x="0" y="0">Y</tspan></text><text class="cls-15" transform="translate(1000.71 707.97)"><tspan x="0" y="0">LE</tspan></text></g></g><path class="cls-28" d="M156.67,450.67v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M173.29,455.27h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM170.88,451.97v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M183.6,452.57c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M199.61,452.57c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M208.72,451.27v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5.5-.8.5-1.5v-.2Z"/><path class="cls-28" d="M219.24,453.27c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M230.15,453.27c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M244.36,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1c.8.7,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM242.16,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M254.97,452.57c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M264.98,452.57c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5c.2.1.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M271.49,446.17v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/><path class="cls-28" d="M282.2,451.27v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5.5-.8.5-1.5v-.2Z"/><path class="cls-28" d="M291.01,455.27h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M297.52,455.27h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M303.12,458.67c-.8,0-1.6-.3-2.3-1l1.1-1.8c.4.4.8.6,1.2.6s.4-.1.6-.3c.2-.2.2-.4.2-.7s-1.1-3.1-3.2-8.7h2.5l2,5.3,2-5.3h2.5l-3.9,10.1c-.2.6-.6,1-1.1,1.4-.5.3-1,.5-1.6.5v-.1Z"/><path class="cls-28" d="M322.74,453.27c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M337.96,450.97c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM331.45,450.97c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M349.27,450.67v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5-.2-.3-.5-.5-1-.5s-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9s.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M363.59,446.57c1,0,1.8.4,2.6,1.2s1.1,1.9,1.1,3.1-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM361.09,450.97c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M373.4,455.27h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M384.71,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM382.51,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M391.72,448.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M404.93,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM402.73,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M412.54,455.37c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM411.14,450.97c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M434.56,455.27h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM432.26,451.97v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M440.97,455.27h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M447.48,455.27h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M457.69,446.27v-2.1h6.61v1.7l-2.2,2.6c.9.1,1.5.5,2,1.1s.7,1.3.7,2.1c0,1.2-.4,2.1-1.2,2.7-.8.7-1.8,1-3,1s-2.4-.4-3.6-1.3l1-2c1,.7,1.9,1.1,2.7,1.1s.9-.1,1.2-.4c.3-.2.5-.6.5-1.1s-.2-.8-.5-1.1c-.4-.3-.9-.4-1.5-.4s-.8.1-1.4.3v-1.8l2.1-2.5h-3.4v.1Z"/><path class="cls-28" d="M473,455.37c-1.5,0-2.6-.5-3.4-1.6s-1.1-2.4-1.1-4.2.4-3.1,1.1-4.2,1.9-1.6,3.4-1.6,2.6.5,3.4,1.6,1.1,2.4,1.1,4.2-.4,3.1-1.1,4.2-1.9,1.6-3.4,1.6ZM471.4,446.97c-.3.7-.5,1.6-.5,2.7s.2,2,.5,2.7.9,1,1.6,1,1.3-.3,1.6-1c.3-.7.5-1.6.5-2.7s-.2-2-.5-2.7-.9-1-1.6-1-1.3.3-1.6,1Z"/><path class="cls-28" d="M494.43,444.17h2.4v11.1h-2.4v-4.4h-4.3v4.4h-2.4v-11.1h2.4v4.6h4.3v-4.6Z"/>
            <path class="cls-28" d="M506.04,446.27v9h-2.4v-9h-3.1v-2.1h8.61v2.1h-3.1Z"/>
            <path class="cls-28" d="M522.46,448.27l-2.9,6.1h-1.4l-2.9-6.1v7h-2.4v-11.1h3.3l2.8,6.1,2.8-6.1h3.3v11.1h-2.4v-7h-.2Z"/>
            <path class="cls-28" d="M529.46,455.27v-11.1h2.4v8.9h4.6v2.2h-7.01Z"/>
            <path class="cls-28" d="M548.78,448.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-28" d="M561.9,455.27h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM559.6,451.97v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-28" d="M572.21,452.57c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-28" d="M578.32,455.27h-2.3v-11.8h2.3v6.1l2.6-2.8h2.9l-3.2,3.5,3.3,5.1h-2.8l-2.1-3.3-.8.8v2.5l.1-.1Z"/>
            <path class="cls-28" d="M593.23,452.57c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-28" d="M610.05,455.27h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM607.75,451.97v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/>
            <path class="cls-28" d="M618.16,453.27c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/>
            <path class="cls-28" d="M629.47,448.77c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-28" d="M641.68,450.97c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM635.18,450.97c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/>
            <path class="cls-28" d="M651.49,452.57c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-28" d="M661.5,452.57c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-28" d="M674.02,448.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-28" d="M682.32,450.67v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/>
            <path class="cls-28" d="M699.14,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM696.84,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-28" d="M714.46,455.27h-4.7v-11.1h4.2c.7,0,1.4,0,1.9.3.5.2.9.4,1.2.7.5.6.7,1.2.7,1.9s-.3,1.5-.8,1.9c-.2.1-.3.2-.4.3s-.2,0-.4.2c.7.1,1.2.5,1.6.9.4.5.6,1.1.6,1.8s-.3,1.5-.8,2.1c-.6.7-1.6,1-3.1,1h0ZM712.06,448.67h1.1c.7,0,1.2,0,1.5-.2s.5-.5.5-1-.1-.8-.4-1c-.3-.2-.8-.2-1.5-.2h-1.2v2.4h0ZM712.06,453.17h1.7c.7,0,1.2,0,1.6-.3s.5-.5.5-1-.2-.9-.5-1c-.4-.2-1-.2-1.8-.2h-1.4v2.6l-.1-.1Z"/>
            <path class="cls-28" d="M729.27,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM727.07,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-28" d="M739.79,453.77c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1c.8-.8,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM739.49,450.77c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/>
            <path class="cls-28" d="M746.09,445.57c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM748.19,455.27h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-28" d="M754.7,450.47v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-28" d="M766.51,450.47v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-28" d="M783.23,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM781.03,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4c-.4.3-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-28" d="M791.94,448.77c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9s.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-28" d="M796.15,455.07c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/>
            <path class="cls-28" d="M808.66,444.17h2.4v11.1h-2.4v-11.1Z"/>
            <path class="cls-28" d="M817.77,450.47v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-28" d="M829.88,448.47v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/>
            <path class="cls-28" d="M843.09,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM840.89,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/>
            <path class="cls-28" d="M851.8,448.77c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9s.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/>
            <path class="cls-28" d="M863.42,450.67v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5-.2-.3-.5-.5-1-.5s-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M880.13,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM877.93,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M887.74,455.37c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM886.34,450.97c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M896.85,445.57c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM899.05,455.27h-2.3v-8.6h2.3v8.6Z"/><path class="cls-28" d="M910.27,455.27h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.8-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5l-.1-.1ZM907.86,451.97v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M916.97,448.47v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M930.19,453.97c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1.4.3.9.4,1.4.4.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM927.98,448.97c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M934.79,455.07c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/><path class="cls-28" d="M187.7,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM185.3,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M194.01,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M206.92,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM205.42,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M229.85,474.37l-1-2.4h-4.5l-1,2.4h-2.6l4.7-11.1h2.3l4.7,11.1h-2.6,0ZM226.54,466.57l-1.4,3.2h2.7l-1.3-3.2Z"/><path class="cls-28" d="M238.46,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM237.05,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M249.67,474.37l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/><path class="cls-28" d="M265.38,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM263.08,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M271.79,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M285.31,472.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M299.52,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM297.32,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M307.13,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM305.73,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M324.45,474.37h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M335.86,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM333.56,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M342.27,474.37l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/><path class="cls-28" d="M358.28,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM355.98,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M364.89,474.37h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M375.3,471.67c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M385.01,470.57v-2.1h5.51v2.1h-5.51Z"/><path class="cls-28" d="M407.73,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM405.33,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M414.14,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M437.97,470.07c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM431.56,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M447.08,470.37v-4.6h2.3v8.6h-2.3v-1.1c-.6.8-1.3,1.3-2.2,1.3s-1.7-.3-2.3-.9-.9-1.5-.9-2.6v-5.2h2.3v4.7c0,1.3.5,2,1.4,2s.9-.2,1.2-.5.5-.8.5-1.5v-.2Z"/><path class="cls-28" d="M456.29,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M468.6,471.67c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M475.01,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M488.12,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM485.72,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M494.43,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M507.34,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM505.84,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M516.45,464.67c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM518.55,474.37h-2.3v-8.6h2.3v8.6Z"/><path class="cls-28" d="M525.06,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M540.78,472.87c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1c.8-.8,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM540.37,469.87c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/><path class="cls-28" d="M560,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM557.59,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M568,472.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M577.31,469.77v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M587.02,464.67c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM589.23,474.37h-2.3v-8.6h2.3v8.6Z"/><path class="cls-28" d="M600.54,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM598.34,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M606.95,474.37l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/><path class="cls-28" d="M622.96,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM620.76,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M634.97,469.77v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M651.69,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM649.49,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M658.3,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M670.51,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M685.23,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M693.54,469.77v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M710.15,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM707.85,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M716.96,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M733.38,467.87c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M744.49,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM742.29,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M751.5,465.27v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/><path class="cls-28" d="M759.21,474.37h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M770.62,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM768.32,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M778.93,472.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M788.64,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M800.85,471.67c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3c-.7-.2-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5-.5-.1-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4c.5.2.9.3,1.1.4s.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M813.96,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM812.56,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M830.18,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1.4.3.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM827.88,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M837.79,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM836.29,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M846.9,464.67c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM849,474.37h-2.3v-8.6h2.3v8.6Z"/><path class="cls-28" d="M857.21,472.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M871.22,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.8-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5l-.1-.1ZM868.92,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M877.93,467.47v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M884.14,464.67c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM886.24,474.37h-2.3v-8.6h2.3v8.6Z"/><path class="cls-28" d="M898.75,470.07c0,1.2-.4,2.3-1.3,3.1-.8.8-1.9,1.3-3.2,1.3s-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM892.25,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M904.76,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M914.57,474.17c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/><path class="cls-28" d="M278.5,484.67c1,0,1.8.4,2.6,1.2s1.1,1.9,1.1,3.1-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM276,489.17c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M290.31,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M301.52,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM299.22,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M312.03,490.77c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M323.05,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM320.74,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M329.45,493.37l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/><path class="cls-28" d="M345.47,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM343.17,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M354.18,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M365.09,493.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM362.69,490.17v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/><path class="cls-28" d="M371.5,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M385.01,491.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M399.13,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM396.92,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M403.73,493.17c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/><path class="cls-28" d="M423.15,493.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM420.75,490.17v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/><path class="cls-28" d="M429.56,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M442.37,493.57c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM440.97,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M463.59,490.77c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M470.1,486.57v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M480.41,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M492.62,489.17c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM486.12,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M498.53,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M514.25,491.97c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1s1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7c.5-.5.7-1.1.7-2.1v-.1ZM513.95,488.97c0-.7-.2-1.2-.6-1.6s-.8-.6-1.4-.6-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6.9.6,1.4.6,1-.2,1.4-.6.6-1,.6-1.6Z"/><path class="cls-28" d="M532.57,491.97c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1s1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM532.27,488.97c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/><path class="cls-28" d="M543.08,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M553.99,493.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM551.69,490.17v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M564.4,490.77c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M572.91,484.67c1,0,1.8.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM570.41,489.17c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M594.73,489.17c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM588.23,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M601.04,484.37v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/><path class="cls-28" d="M620.16,488.77v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M637.98,489.17c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM631.47,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M644.99,493.57c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM643.48,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M661.1,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM658.9,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M669.81,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M676.02,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M695.94,493.37h-2.4l-2.8-8.6h2.4l1.6,5.2,1.6-5.2h2.2l1.6,5.2,1.6-5.2h2.4l-2.8,8.6h-2.4l-1.5-4.7-1.5,4.7h0Z"/><path class="cls-28" d="M714.76,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM712.56,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M723.87,484.67c1,0,1.9.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.2,3.2c-.8.9-1.7,1.3-2.6,1.3s-1.8-.4-2.5-1.3v1.1h-2.3v-11.8h2.3v4.2c.6-.7,1.5-1.1,2.5-1.1l.1.1ZM721.37,489.17c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M740.69,493.57c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM739.29,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M756.9,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM754.6,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M763.31,493.37l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/><path class="cls-28" d="M779.33,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM777.03,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M785.93,493.37h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M798.45,489.17c0,1.2-.4,2.3-1.3,3.1-.8.8-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM791.94,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M806.96,484.67c1,0,1.8.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM804.35,489.17c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M821.97,488.77v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M838.69,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1.4.3.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM836.49,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M845.4,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M857.51,486.57v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M863.72,493.17c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4Z"/><line class="cls-9" x1="194.96" y1="604.57" x2="399.78" y2="603.17"/><g class="cls-23"><text class="cls-21" transform="translate(247.12 629.77)"><tspan x="0" y="0">SK Basha</tspan></text></g><g class="cls-23"><text class="cls-21" transform="translate(234.1 652.27)"><tspan x="0" y="0">DEVE</tspan></text><text class="cls-22" transform="translate(286.06 652.27)"><tspan x="0" y="0">L</tspan></text><text class="cls-21" transform="translate(296.77 652.27)"><tspan x="0" y="0">OPER</tspan></text></g><line class="cls-9" x1="650.44" y1="604.57" x2="855.26" y2="603.17"/><g class="cls-23"><text class="cls-21" transform="translate(679.07 627.07)"><tspan x="0" y="0">G </tspan></text><text class="cls-21" transform="translate(699.19 627.07)"><tspan x="0" y="0">R</tspan></text><text class="cls-21" transform="translate(712.51 627.07)"><tspan x="0" y="0">ama Krishna</tspan></text></g><g class="cls-23"><text class="cls-21" transform="translate(708.1 652.17)"><tspan x="0" y="0">DESIGNER</tspan></text></g><image width="743" height="336" transform="translate(478.51 455.14) scale(.73)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAucAAAFQCAYAAAAcINCYAAAQAElEQVR4AezdB4BcVt0G8HNuv1NSCb1JlwiisWHBoAiigjXYVgR14VMXFMW+6uDacEVUXBUsKFiJDVDAHlREpEgREASW3hLSpt1+vzO4KEoLQ8rM5Jlfhszcuaf939nsk3OTyBHcIAABCEAAAhCAAAQgUAMCCJo1gIouIQABCMQvgJYQgAAEUkcAQTN1aomVQAACEIAABCAAgYQSSImgmVCimAwEIAABCEAAAhCAwG4BBM3dDPgHAhCAAASqUQBdQQACENgtgKC5mwH/QAACEIAABCAAAQhUtwCCZnWLxtsf2kEAAhCAAAQgAIEUE0DQTLGCYjkQgAAEIFA9AugFAhA4cgEEzSM3RA8QgAAEIAABCEAAAvsRQNDcDwoOxSuAdhCAAAQgAAEIQOAPAQTNPyzwCAIQgAAEIJBaAlgNBOpYAEGzjguA4SEAAQhAAAIQgECqCiBopmplsa54BdAOAhCAAAQgAIFqEkDQrCZIdAMBCEAAAhCAQE0IoM9kFkDQTObqYe4QgAAEIAABCEAggQUQNBO4OJgaBOIVQDsIQAACEIBAIgggaCZCFTAHCEAAAhCAAARSWaDerg1Bs96WHguHAAQgAAEIQAACNSuAoFmzvugdAhCIVwDtIAABCEAg6QUQNJO+hFgABCAAAQhAAAIQqHmBeEZA0IxHDW0gAAEIQAACEIAABA4pgKB5SCKcAAEIQCBeAbSDAAQgUL8FEDTrd/2xeghAAAIQgAAEIFBjAgkXNGtspegYAhCAAAQgAAEIQKBWBRA0a5Ubg0EAAhBIOgFMGAIQgEDcAgiacdOhIQQgAAEIQAACEIDAwQQQNA+mE+9raAcBCEAAAhCAAAQgQBA08SaAAAQgAIGUF8ACIQCBuhFA0Kwbd4wKAQhAAAIQgAAEUl4AQTPlSxzvAtEOAhCAAAQgAAEIHJkAguaR+aE1BCAAAQhAoHYEMAoEklAAQTMJi4YpQwACEIAABCAAgWQQQNBMhiphjvEKoB0EIAABCEAAAnUogKBZh/gYGgIQgAAEIFC/BLDa+iaAoFnfKo71QgACEIAABCAAgVoSQNCsJWgMA4F4BdAOAhCAAAQgkKwCCJrJWjnMGwIQgAAEIAABCKSUAIJmSpUTi4lXAO0gAAEIQAACEKh+AQTN6jdFjxCAAAQgAAEIHJkAWqeIAIJmihQSy4AABCAAAQhAAAKJJoCgmWgVwXwgEK8A2kEAAhCAAAQSTABBM8EKgulAAAIQgAAEIJAaAlgFIQiaeBdAAAIQgAAEIAABCNSIAIJmjbCiUwhAID4BtIIABCAAgVQSQNBMpWpiLRCAAAQgAAEIQKA6BY6wLwTNIwREcwhAAAIQgAAEIACB/QsgaO7fBUchAAEIxCuAdhCAAAQg8D8BBM3/QeATBCAAAQhAAAIQgED1CiRG0KzeNaE3CEAAAhCAAAQgAIEEEEDQTIAiYAoQgAAEEk0A84EABCBQHQIImtWhiD4gAAEIQAACEIAABPYRQNDchyTeA2gHAQhAAAIQgAAEILC3AILm3hp4DAEIQAACqSOAlUAAAnUugKBZ5yXABCAAAQhAAAIQgEBqCiBopmZd410V2kEAAhCAAAQgAIFqE0DQrDZKdAQBCEAAAhCobgH0B4HkFkDQTO76YfYQgAAEIAABCEAgYQUQNBO2NJhYvAJoB4FkEygoCEgFIx6S7e+uS7fF/xCAAIQOBBA0DySD4xCAAARqXoD2vmak96eV81osmjmr8w9L5zQYNWoUgmbNu2OE2hXAaPVYAEGzHhcfS4cABOpOILZ72bFjf9/K73+8wNaNZwhxJvhF5bKI2sJbd7PCyBCAAASqVwBBs3o90RsEqkfgz73Q/PxBSl5eQXpe3hCREFxa/TNPcj5bt26rEDaDvSVeeJgQ+9w0vy+XunbXTz+alZacK8KsIQABCOwrgKC5rwmOQCBhBGI/r4fCZvqOXSVn2a41IKht7Zw/aJRMcEtqgYKCAml7+aqTJYH7p2NZ7TLT0qlAOUfxeLKioQp/rO5JvUBMHgIpKIAlxSeAoBmfG1pBoFYEeva82VsWLD3OJfbDtms/IYr02uL5cz0FBVP4WpkABql2gVjtfvoppLi2fVEkWNk5ze91iOtalBDOMrR0ryD48HOa1c6ODiEAgToSQNCsI3gMC4FDCeTnB4RweEtmNGr2knmxnSrJRBKlRraoJsmlVVLHt9iPGLg0PxAQAoEAF7vHQl7szh4LQ4aMFwsCAWnQoIAyZEjAw3aO2efffjQh9jqpoZui/KiE9IqOiiR3b9CgAW9Z1g5B4H/UNG2nrkeFaFQXa2hodAsBCECg1gUQNGudHANCoCoCLt0Y/M5bGdFyZYGe5fd5FFWVBV7gGvDEzsnNXeFWpZdkOCc/PyDE7uSIby5ll6T5WHCM/SZ3l9OvzmjZ5YKMtW/PafjyWwuavP7ujy3mLR7fas7859u/8cG8E2bMnnL2D5OLLvl+0bwBn33z7TXrtm2a8tWczUOO6nzu6W+/vUg94unsp4NYyF29dYtPEuW+qiS2UmTRtG1njqVbk3lC1wuCqFIqeDt37kz30xyHIAABCByZQB20RtCsA3QMCYFDCRQUFHI+6mks8nw/WZY7iaLIu66rcg5pTDnagrWv1f/txsJb94IRauzet+8wOW/IEDH2OPbLSfksKJLDvLEdQ65fvyGeQOCNtA3bv+m7YfM3Z3XLH5QRO04OcIuFyD3jxXYf8/Nv8sXuvXoNSc+/6NaMtl375Py4uKzDt4t+zN+2cs3gaGX5HZJjPywK/JOyaD0ry8JzXq/nOUHm/8O59Fmfoo71+ryPGbr5L0VW78nJbjCcUvdOQRDuoz7aOjbeAaYS9+HNmwulXRt2NPPIwmmUczMMQ9dYbb+PREK7XI6yoQWZ4xzPF198Uav1jXtBaAgBCEDgEAL4YnYIILwMgboQWFUxXdGN8FE8T46nxPEahuFGo1G2+WVHeELZpdVWQm3O69fSjWLpqjWNt/y8rGDZuhW3lH277uady5Zfo7mbzli/tahdXq+C9NNO6+9nQdDTu/c13vz8At/JJ1+dFguCp512nb8bC5EnnT0w+7hTr2rVqct5XSa/Pbv78tWrOxd+9NYF0UhkFEfdmyu2bTxnygdzT+ve44pTTzjlktOOzbv49LxTLj/+xPyrup3Z+4Zzfv41OtimJTdvLv5h2PaSHbftLN94b3H55n9t3L5xTNnmDU8pojo6I93/nwyf9xnXdgKKKP7Dq6r9M9PTzlclqbfA01PZF7yTfB5PF7Zd2JinVGaBk0vz+VxTN2QW+hp4PB6eWR9laXrTwsJChxBCqu/m0h07yiTDsc5wXKsrdUnYJXS2IEgLCS/ksnFaUsIrVFbTfvhhvURwgwAEIJACAuzrbgqsAkuAQBIIxHbrAoGvhc6dC/fP+P3tX3zXf973u+eXk/bL3d+W/vS3e+651YMHX3z44YOnT37604+fP/3pTz/8+Mc/Pv7jH//4+Otf/3r83/7t3/+P/vSnP/30xRdf/PjHP/749MMPP/7rX/96/PX+67/u+97v/f/f/v73v//947///e/j7/u+//v/3//+r/j/7/f/j/8//v//x/++f/nL3//+97/99MMPP/zw7bff/vLnP//46+eff/4f//Ef/8f/9V//9f/93//9/9Of/vSnP/3pTz/8+Mc/fvzP+/7vv+/7fv/3e//3f//3+/7v//7v/3//+7//+3/8x3/8x//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z/8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8z//8-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/>
            <path class="cls-28" d="M494.43,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-28" d="M507.34,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM505.84,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/>
            <path class="cls-28" d="M516.45,464.67c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM518.55,474.37h-2.3v-8.6h2.3v8.6Z"/>
            <path class="cls-28" d="M525.06,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/>
            <path class="cls-28" d="M540.78,472.87c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1c.8-.8,1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM540.37,469.87c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6s-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6c.4.4.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/><path class="cls-28" d="M560,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM557.59,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M568,472.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M577.31,469.77v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M587.02,464.67c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM589.23,474.37h-2.3v-8.6h2.3v8.6Z"/><path class="cls-28" d="M600.54,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM598.34,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M606.95,474.37l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/><path class="cls-28" d="M622.96,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM620.76,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M634.97,469.77v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M651.69,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM649.49,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M658.3,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M670.51,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M685.23,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M693.54,469.77v4.6h-2.3v-11.8h2.3v4.2c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M710.15,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM707.85,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M716.96,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M733.38,467.87c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M744.49,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM742.29,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M751.5,465.27v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/><path class="cls-28" d="M759.21,474.37h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M770.62,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2c-.8-.8-1.2-1.9-1.2-3.2s.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM768.32,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M778.93,472.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M788.64,467.47v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M800.85,471.67c0,.8-.3,1.5-.9,2-.6.5-1.4.8-2.3.8s-1.3-.1-1.9-.3c-.7-.2-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5-.5-.1-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4c.5.2.9.3,1.1.4s.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M813.96,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM812.56,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M830.18,473.07c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1.4.3.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM827.88,468.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M837.79,474.47c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM836.29,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M846.9,464.67c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM849,474.37h-2.3v-8.6h2.3v8.6Z"/><path class="cls-28" d="M857.21,472.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M871.22,474.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.8-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5l-.1-.1ZM868.92,471.07v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2.8-.1,1.1-.4.5-.6.5-1h0Z"/><path class="cls-28" d="M877.93,467.47v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M884.14,464.67c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4ZM886.24,474.37h-2.3v-8.6h2.3v8.6Z"/><path class="cls-28" d="M898.75,470.07c0,1.2-.4,2.3-1.3,3.1-.8.8-1.9,1.3-3.2,1.3s-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM892.25,470.07c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M904.76,469.57v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M914.57,474.17c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/><path class="cls-28" d="M278.5,484.67c1,0,1.8.4,2.6,1.2s1.1,1.9,1.1,3.1-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM276,489.17c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M290.31,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M301.52,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM299.22,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M312.03,490.77c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M323.05,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM320.74,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M329.45,493.37l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/><path class="cls-28" d="M345.47,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM343.17,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M354.18,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M365.09,493.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM362.69,490.17v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/><path class="cls-28" d="M371.5,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M385.01,491.37c.8,0,1.5-.4,2.1-1.2l1.4,1.6c-1.1,1.1-2.2,1.7-3.5,1.7s-2.3-.4-3.2-1.2c-.9-.8-1.3-1.9-1.3-3.2s.4-2.4,1.3-3.2,1.9-1.2,3.1-1.2,1.2.1,1.8.4c.6.3,1.2.6,1.6,1.1l-1.2,1.6c-.3-.3-.6-.6-1-.8-.4-.2-.8-.3-1.2-.3-.6,0-1.1.2-1.6.6-.4.4-.7,1-.7,1.7s.2,1.3.7,1.7c.4.4,1,.6,1.5.6l.2.1Z"/><path class="cls-28" d="M399.13,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM396.92,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M403.73,493.17c-.4-.3-.5-.6-.5-1s.1-.8.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4.9-.1.8-.4,1.3l-.9,1.6h-1.5l.6-1.8h-.1Z"/><path class="cls-28" d="M423.15,493.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM420.75,490.17v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7c.2.2.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/><path class="cls-28" d="M429.56,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M442.37,493.57c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM440.97,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M463.59,490.77c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M470.1,486.57v3.8c0,.3,0,.6.2.8.2.2.4.3.6.3.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M480.41,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M492.62,489.17c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM486.12,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M498.53,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M514.25,491.97c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1s1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7c.5-.5.7-1.1.7-2.1v-.1ZM513.95,488.97c0-.7-.2-1.2-.6-1.6s-.8-.6-1.4-.6-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/><path class="cls-28" d="M532.57,491.97c-.7.8-1.6,1.3-2.7,1.3s-2-.4-2.8-1.1c-.7-.8-1.1-1.8-1.1-3s.4-2.3,1.2-3.1s1.7-1.2,2.6-1.2s1.8.4,2.5,1.3v-1.1h2.3v7.5c0,.8-.1,1.4-.4,2s-.6,1.1-1,1.4c-.9.7-1.9,1-3,1s-1.3-.1-1.9-.3c-.6-.2-1.2-.5-1.7-.9l.9-1.8c.8.6,1.6.9,2.4.9s1.5-.2,2-.7.7-1.1.7-2.1v-.1ZM532.27,488.97c0-.7-.2-1.2-.6-1.6-.4-.4-.8-.6-1.4-.6-1,.2-1.4.6-.6.9-.6,1.6.2,1.2.6,1.6.9.6,1.4.6s1-.2,1.4-.6.6-1,.6-1.6Z"/><path class="cls-28" d="M543.08,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M553.99,493.37h-2.2v-1c-.6.8-1.3,1.2-2.2,1.2s-1.6-.3-2.2-.8c-.6-.5-.9-1.2-.9-2.1s.3-1.5.9-2c.6-.4,1.5-.7,2.5-.7h1.7c0-1-.5-1.4-1.4-1.4s-.8,0-1.3.2c-.4.2-.8.4-1.1.6l-1-1.5c1.1-.8,2.3-1.2,3.7-1.2s1.8.3,2.5.8c.6.5,1,1.3,1,2.5v5.5-.1ZM551.69,490.17v-.4h-1.5c-.9,0-1.4.3-1.4.9s.1.5.3.7.5.2,1,.2s.8-.1,1.1-.4c.3-.3.5-.6.5-1h0Z"/><path class="cls-28" d="M564.4,490.77c0,.8-.3,1.5-.9,2s-1.4.8-2.3.8s-1.3-.1-1.9-.3-1.3-.6-1.8-1l1-1.5c.9.7,1.8,1,2.8,1s.5,0,.7-.2c.2-.1.3-.3.3-.5s-.1-.4-.4-.6c-.2-.2-.6-.3-1.1-.5s-.8-.3-1.1-.4c-.2-.1-.5-.3-.8-.5-.6-.4-.9-1-.9-1.8s.3-1.4.9-1.9c.6-.5,1.4-.7,2.4-.7s2,.3,2.9,1l-.9,1.6c-.7-.5-1.4-.8-2.2-.8s-1.1.2-1.1.6.1.4.3.5.6.3,1.1.4s.9.3,1.1.4.5.2.8.4c.6.4.9,1,.9,1.8l.2.2Z"/><path class="cls-28" d="M572.91,484.67c1,0,1.8.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM570.41,489.17c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M594.73,489.17c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM588.23,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M601.04,484.37v.6h2v1.7h-2v6.8h-2.3v-6.8h-1v-1.7h1v-.5c0-.9.3-1.7.8-2.2.6-.5,1.2-.8,2.1-.8s1.6.3,2.2,1l-.8,1.6c-.3-.4-.7-.6-1.1-.6s-.4,0-.6.3-.2.4-.2.8l-.1-.2Z"/><path class="cls-28" d="M620.16,488.77v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M637.98,489.17c0,1.2-.4,2.3-1.3,3.1s-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM631.47,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M644.99,493.57c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM643.48,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M661.1,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM658.9,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M669.81,486.97c-.7,0-1.2.3-1.5.8s-.5,1.2-.5,2v3.7h-2.3v-8.6h2.3v1.1c.3-.3.7-.6,1.1-.9.4-.2.9-.4,1.4-.4v2.2h-.4l-.1.1Z"/><path class="cls-28" d="M676.02,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1c.6.6.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M695.94,493.37h-2.4l-2.8-8.6h2.4l1.6,5.2,1.6-5.2h2.2l1.6,5.2,1.6-5.2h2.4l-2.8,8.6h-2.4l-1.5-4.7-1.5,4.7h0Z"/><path class="cls-28" d="M714.76,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM712.56,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M723.87,484.67c1,0,1.9.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.2,3.2c-.8.9-1.7,1.3-2.6,1.3s-1.8-.4-2.5-1.3v1.1h-2.3v-11.8h2.3v4.2c.6-.7,1.5-1.1,2.5-1.1l.1.1ZM721.37,489.17c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M740.69,493.57c-1,0-1.9-.4-2.6-1.3-.8-.9-1.2-1.9-1.2-3.2s.4-2.3,1.1-3.1c.8-.8,1.6-1.2,2.6-1.2s1.8.4,2.5,1.1v-4.2h2.3v11.8h-2.3v-1.1c-.7.8-1.5,1.3-2.5,1.3l.1-.1ZM739.29,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.8-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M756.9,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM754.6,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M763.31,493.37l-3.3-8.6h2.4l2.1,5.4,2.1-5.4h2.4l-3.3,8.6h-2.4Z"/><path class="cls-28" d="M779.33,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1s.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM777.03,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M785.93,493.37h-2.3v-11.8h2.3v11.8Z"/><path class="cls-28" d="M798.45,489.17c0,1.2-.4,2.3-1.3,3.1-.8.8-1.9,1.3-3.2,1.3-2.3-.4-3.2-1.3c-.8-.8-1.3-1.9-1.3-3.1s.4-2.3,1.3-3.1c.8-.9,1.9-1.3,3.2-1.3s2.3.4,3.2,1.3c.8.9,1.3,1.9,1.3,3.1ZM791.94,489.17c0,.7.2,1.3.6,1.7.4.4.9.7,1.5.7s1.1-.2,1.5-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.4-.9-.7-1.5-.7s-1.1.2-1.5.7c-.4.4-.6,1-.6,1.7Z"/><path class="cls-28" d="M806.96,484.67c1,0,1.8.4,2.6,1.2.8.8,1.1,1.9,1.1,3.1s-.4,2.3-1.1,3.2c-.8.8-1.6,1.3-2.7,1.3s-1.8-.4-2.5-1.3v4.2h-2.3v-11.6h2.3v1c.7-.7,1.6-1.1,2.5-1.1h.1ZM804.35,489.17c0,.7.2,1.3.6,1.7.4.4.8.7,1.4.7s1-.2,1.4-.7c.4-.4.6-1,.6-1.7s-.2-1.3-.6-1.7c-.4-.5-.9-.7-1.4-.7s-1,.2-1.4.7-.6,1-.6,1.7Z"/><path class="cls-28" d="M821.97,488.77v4.6h-2.3v-4.7c0-.7-.1-1.2-.3-1.5s-.5-.5-1-.5-.8.2-1.2.5c-.3.3-.5.9-.5,1.5v4.6h-2.3v-8.6h2.3v1c.6-.7,1.4-1.1,2.2-1.1s1,.2,1.4.5.8.7,1,1.2c.3-.5.8-.9,1.3-1.2.5-.3,1.1-.4,1.6-.4,1,0,1.8.3,2.4.9.6.6.9,1.5.9,2.6v5.2h-2.3v-4.7c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5l-.1.1Z"/><path class="cls-28" d="M838.69,492.17c-.9.9-2,1.4-3.3,1.4s-2.3-.4-3.1-1.2-1.2-1.9-1.2-3.2.4-2.4,1.3-3.2,1.8-1.2,3-1.2,2.1.4,2.9,1.1,1.2,1.7,1.2,2.9v1.3h-6.11c0,.5.3.8.7,1.1.4.3.9.4,1.4.4c.8,0,1.5-.3,2-.8l1.3,1.4h-.1ZM836.49,487.07c-.3-.3-.7-.4-1.2-.4s-.9.1-1.3.4-.6.7-.7,1.2h3.7c0-.5-.2-.9-.6-1.2h.1Z"/><path class="cls-28" d="M845.4,488.67v4.8h-2.3v-8.6h2.3v1c.7-.7,1.5-1.1,2.4-1.1s1.6.3,2.2,1,.9,1.5.9,2.5v5.2h-2.3v-4.8c0-1.3-.5-2-1.4-2s-.9.2-1.2.5-.5.9-.5,1.5h-.1Z"/><path class="cls-28" d="M857.51,486.57v3.8c0,.3,0,.6.2.8s.4.3.6.3c.4,0,.8-.2,1.1-.6l.9,1.7c-.7.7-1.5,1-2.3,1s-1.5-.3-2-.8c-.6-.5-.8-1.3-.8-2.2v-3.9h-1v-1.7h1v-2.6h2.3v2.6h2v1.7h-2v-.1Z"/><path class="cls-28" d="M863.72,493.17c-.3-.3-.4-.6-.4-1s.1-.7.4-1c.3-.3.6-.4,1-.4s.7.1,1,.4.4.6.4,1-.1.7-.4,1c-.3.3-.6.4-1,.4s-.7-.1-1-.4Z"/><line class="cls-9" x1="194.96" y1="604.57" x2="399.78" y2="603.17"/><g class="cls-23"><text class="cls-21" transform="translate(247.12 629.77)"><tspan x="0" y="0">SK Basha</tspan></text></g><g class="cls-23"><text class="cls-21" transform="translate(234.1 652.27)"><tspan x="0" y="0">DEVE</tspan></text><text class="cls-22" transform="translate(286.06 652.27)"><tspan x="0" y="0">L</tspan></text><text class="cls-21" transform="translate(296.77 652.27)"><tspan x="0" y="0">OPER</tspan></text></g><line class="cls-9" x1="650.44" y1="604.57" x2="855.26" y2="603.17"/><g class="cls-23"><text class="cls-21" transform="translate(679.07 627.07)"><tspan x="0" y="0">G </tspan></text><text class="cls-21" transform="translate(699.19 627.07)"><tspan x="0" y="0">R</tspan></text><text class="cls-21" transform="translate(712.51 627.07)"><tspan x="0" y="0">ama Krishna</tspan></text></g><g class="cls-23"><text class="cls-21" transform="translate(708.1 652.17)"><tspan x="0" y="0">DESIGNER</tspan></text></g></g><image width="743" height="336" transform="translate(478.51 455.14) scale(.73)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAucAAAFQCAYAAAAcINCYAAAQAElEQVR4AezdB4BcVdoG8HNuv1NSCb1JlwiisWHBoAiigjXYVgR14VMXFMW+6uDacEVUXBUsKFiJDVDAHlREpEgREASW3hLSpt1+vzO4KEoLQ8rM5Jlfhszcuaf939nsk3OTyBHcIAABCEAAAhCAAAQgUAMCCJo1gIouIQABCMQvgJYQgAAEUkcAQTN1aomVQAACEIAABCAAgYQSSImgmVCimAwEIAABCEAAAhCAwG4BBM3dDPgHAhCAAASqUQBdQQACENgtgKC5mwH/QAACEIAABCAAAQhUtwCCZnWLxtsf2kEAAhCAAAQgAIEUE0DQTLGCYjkQgAAEIFA9AugFAhA4cgEEzSM3RA8QgAAEIAABCEAAAvsRQNDcDwoOxSuAdhCAAAQgAAEIQOAPAQTNPyzwCAIQgAAEIJBaAlgNBOpYAEGzjguA4SEAAQhAAAIQgECqCiBopmplsa54BdAOAhCAAAQgAIFqEkDQrDZKdAQBCEAAAhCAQE0IoM9kFkDQTObqYe4QgAAEIAABCEAggQUQNBO4OJgaBOIVQDsIQAACEIBAIgggaCZCFTAHCEAAAhCAAARSWaDerg1Bs96WHguHAAQgAAEIQAACNSuAoFmzvugdAhCIVwDtIAABCEAg6QUQNJO+hFgABCAAAQhAAAIQqHmBeEZA0IxHDW0gAAEIQAACEIAABA4pgKB5SCKcAAEIQCBeAbSDAAQgUL8FEDTrd/2xeghAAAIQgAAEIFBjAgkXNGtspegYAhCAAAQgAAEIQKBWBRA0a5Ubg0EAAhBIOgFMGAIQgEDcAgiacdOhIQQgAAEIQAACEIDAwQQQNA+mE+9raAcBCEAAAhCAAAQgQBA08SaAAAQgAIGUF8ACIQCBuhFA0Kwbd4wKAQhAAAIQgAAEUl4AQTPlSxzvAtEOAhCAAAQgAAEIHJkAguaR+aE1BCAAAQhAoHYEMAoEklAAQTMJi4YpQwACEIAABCAAgWQQQNBMhiphjvEKoB0EIAABCEAAAnUogKBZh/gYGgIQgAAEIFC/BLDa+iaAoFnfKo71QgACEIAABCAAgVoSQNCsJWgMA4F4BdAOAhCAAAQgkKwCCJrJWjnMGwIQgAAEIACBuhDAmIchgKB5GFg4FQIQgAAEIAABCECg6gIImlW3wpkQgEC8AmgHAQhAAAL1UgBBs16WHYuGAAQgAAEIQKA+C9TW2hE0a0sa40AAAhCAAAQgAIF6JoCgWc9KjuVCAALxCqAdBCAAAQgcrgCC5uGK4XwIQAACEIAABCAAgSoJ1GjQrNIMcBIEIAABCEAAAhCAQEoKIGimZFmxKAhAAAL7FcBBCEAAArUqgKBZq9wYDAIQgAAEIAABCNQfAQTNQ9Uar0MAAhCAAAQgAAEIxCWAoBkXGxpBAAIQgEBdCWBcCEAgeQQQNJOnVpgpBCAAAQhAAAIQSCoBBM2kKle8k0U7CEAAAhCAAAQgUPsCCJq1b44RIQABCECgvgtg/RCoJwIImvWk0FgmBCAAAQhAAAIQqG2BBM3aFsd48QqgHQQgAAEIQAACSSaAoJlkBcN0IQABCEAAAokhgFlA4NACCJqHNsIZEIAABCAAAQhAAAJxCCBoxoGGJhCIVwDtIAABCEAAAvVJAEGzPlUba4UABCAAAQhAYG8BPK5hAQTNGgZG9xCAAAQgAAEIQKC+CiBo1tfKY90QiFcA7SAAAQhAAAJVFEDQrCIUToMABCAAAQhAAAKJKJDIc0LQTOTqYG4QgAAEIAABCEAgiQUQNJO4eJg6BCAQrwDaQQACEIBAbQggaNaGMsaAAAQgAAEIQAAC9VCgykGzHtpgyRCAAAQgAAEIQAACRyCAoHkEeGgKAQhAoA4FMDQEIACBhBdA0Ez4EmGCEIAABCAAAQhAIDkF6lfQTM4aYdYQgAAEIAABCECgKQUQNJOybJg0BCAAgdQQwCogAIHUFkDQTO36YnUQgAAEIAABCECgzgQQNOuMPt6B0Q4CEIAABCAAAQgkhwCCZnLUCbOEAAQgAIFEFcC8IACBAwogaB6QBi9AAAIQgAAEIAABCByJAILmkeihbbwCaAcBCEAAAhCAQD0QQNCsB0XGEiEAAQhAAAIHF8CrEKgZAQTNmnFFrxCAAAQgAAEIQKDeEyBo1vu3AADiFUA7CEAAAhCAAAQOLoCgeXAfvAoBCEAAAhCAQHIIYJYJKICgmYBFwZQgAAEIQAACEIBAKgggaKZCFbEGCMQrgHYQgAAEIAACBGhRAK2gWQMImjWojbEgAAEIQAACEIAABOpAAEGzDtAxJAQgAAEIQKB+C2D19UUAQbO+VBrrhAAEIAABCEAAArUsgKBZy+AYDgLxCqAdBCAAAQhAINkEEDSTrWKYLwQgAAEIQAACiSCAOVRBAEGzCkg4BQIQgAAEIAABCEDg8AUQNA/fDC0gAIF4BdAOAhCAAATqlQCCZr0qNxYLAQhAAAIQgAAE/hCo6UcImjUtjP4hAAEIQAACEIBAPRVA0KynhceyIQCBeAXQDgIQgAAEqiqAoFlVKZwHAQhAAAIQgAAEIHBYArUSNA9rRjgZAhCAAAQgAIH6LoCgWd/fAVg/BOIVQDsIQAACEIDAIQQQNA8BhJchAAEIQAACEIBAMggk4hwRNBOxKpgTBCAAAQhAAAIQSAEBBM0UKCKWAAEIxCuAdhCAAAQgUJMCCJo1qYu+IQABCEAAAhCAQD0W+H8AAAD/2pWw/YAAAAGSURBVAMA0RmXoj2l83QAAAAASUVORK5CYII="></image>
        <!-- Corrected position for userNameText and currentDateText -->
        <text id="userNameText" class="name-text" x="543.1" y="400">Danny</text>
        <text id="currentDateText" class="date-text" x="500" y="555">September 24, 2025</text>
      </svg>
    `;
    certificateTemplateContainer.innerHTML = svgCode;
  }

  async downloadCertificate() {
        const userName = this.username;

    
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

      const currentDateTextElement = svgElement.querySelector('#currentDateText');
      if (currentDateTextElement) currentDateTextElement.textContent = 'September 26, 2025';


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


