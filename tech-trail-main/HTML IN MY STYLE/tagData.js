/**
 * HTML5 Tag Data
 * Contains all HTML5 tags organized by category with descriptions
 */
const tagData = {
  categories: [
    {
      name: "Formatting Tags",
      description: "Tags for text formatting and styling",
      tags: [
        { name: "abbr", description: "Abbreviation or acronym" },
        { name: "b", description: "Bold text" },
        { name: "bdi", description: "Bidirectional isolate text" },
        { name: "bdo", description: "Bidirectional text override" },
        { name: "cite", description: "Citation or reference to a source" },
        { name: "code", description: "Code text" },
        { name: "del", description: "Deleted text" },
        { name: "em", description: "Emphasized text" },
        { name: "i", description: "Italic text" },
        { name: "ins", description: "Inserted text" },
        { name: "kbd", description: "Keyboard input" },
        { name: "mark", description: "Marked/highlighted text" },
        { name: "s", description: "Strikethrough text" },
        { name: "small", description: "Smaller text" },
        { name: "span", description: "Generic inline container" },
        { name: "strong", description: "Important text (semantically strong)" },
        { name: "sub", description: "Subscript text" },
        { name: "sup", description: "Superscript text" },
        { name: "u", description: "Underlined text (non-semantic)" },
        { name: "var", description: "Variable" }
      ]
    },
    {
      name: "Sectioning Tags",
      description: "Tags for document structure and layout",
      tags: [
        { name: "address", description: "Contact information" },
        { name: "article", description: "Self-contained content" },
        { name: "aside", description: "Aside content" },
        { name: "div", description: "Generic division" },
        { name: "footer", description: "Document footer section" },
        { name: "header", description: "Document header section" },
        { name: "main", description: "Main content section" },
        { name: "nav", description: "Navigation links section" },
        { name: "section", description: "Thematic section" }
      ]
    },
    {
      name: "Text Structure Tags",
      description: "Tags for structuring text content",
      tags: [
        { name: "blockquote", description: "Block quotation" },
        { name: "dfn", description: "Definition of a term" },
        { name: "figcaption", description: "Caption for figure" },
        { name: "figure", description: "Figure with caption" },
        { name: "h1-h6", description: "Headings level 1 to 6" },
        { name: "hgroup", description: "Group of headings" },
        { name: "li", description: "List item" },
        { name: "ol", description: "Ordered list" },
        { name: "p", description: "Paragraph" },
        { name: "pre", description: "Preformatted text" },
        { name: "q", description: "Short inline quotation" },
        { name: "ul", description: "Unordered list" },
        { name: "wbr", description: "Word break opportunity" }
      ]
    },
    {
      name: "Form Tags",
      description: "Tags for interactive web forms",
      tags: [
        { name: "button", description: "Clickable button" },
        { name: "datalist", description: "Predefined options for inputs" },
        { name: "fieldset", description: "Group of form controls" },
        { name: "form", description: "Form for user input" },
        { name: "input", description: "Input control" },
        { name: "label", description: "Label for form control" },
        { name: "legend", description: "Caption for fieldset" },
        { name: "meter", description: "Value within a range" },
        { name: "optgroup", description: "Option group" },
        { name: "option", description: "Option in dropdown list" },
        { name: "output", description: "Calculation result" },
        { name: "progress", description: "Progress indicator" },
        { name: "select", description: "Dropdown list" },
        { name: "textarea", description: "Multi-line text input" }
      ]
    },
    {
      name: "Media Tags",
      description: "Tags for multimedia content",
      tags: [
        { name: "audio", description: "Sound content" },
        { name: "canvas", description: "Graphics via scripting" },
        { name: "img", description: "Image" },
        { name: "picture", description: "Container for multiple image sources" },
        { name: "source", description: "Media resource" },
        { name: "svg", description: "Scalable vector graphics" },
        { name: "track", description: "Text track for media" },
        { name: "video", description: "Video content" }
      ]
    },
    {
      name: "Table Tags",
      description: "Tags for creating tables",
      tags: [
        { name: "caption", description: "Table caption" },
        { name: "col", description: "Table column" },
        { name: "table", description: "Table" },
        { name: "tbody", description: "Table body" },
        { name: "td", description: "Table data cell" },
        { name: "tfoot", description: "Table footer" },
        { name: "th", description: "Table header cell" },
        { name: "thead", description: "Table header group" },
        { name: "tr", description: "Table row" }
      ]
    },
    {
      name: "Metadata Tags",
      description: "Tags for document metadata",
      tags: [
        { name: "base", description: "Base URL for relative URLs" },
        { name: "link", description: "Link to external resource" },
        { name: "meta", description: "Metadata information" },
        { name: "style", description: "Style information" },
        { name: "title", description: "Document title" }
      ]
    },
    {
      name: "Script/Interactive Tags",
      description: "Tags for scripting and interactivity",
      tags: [
        { name: "a", description: "Hyperlink" },
        { name: "details", description: "Disclosure widget for showing/hiding content" },
        { name: "dialog", description: "Dialog box or interactive component" },
        { name: "embed", description: "Embedded content" },
        { name: "iframe", description: "Inline frame" },
        { name: "object", description: "Embedded object" },
        { name: "param", description: "Parameter for object" },
        { name: "summary", description: "Summary for details element" }
      ]
    },
    {
      name: "Programmatic Tags",
      description: "Tags for programming features",
      tags: [
        { name: "data", description: "Machine-readable value" },
        { name: "time", description: "Date/time" },
        { name: "var", description: "Variable" }
      ]
    }
  ]
};