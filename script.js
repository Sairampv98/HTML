// DOM elements
const editor = document.getElementById('html-editor');
const renderBtn = document.getElementById('render-btn');
const previewIframe = document.getElementById('preview-iframe');
const allowScriptsCheckbox = document.getElementById('allow-scripts');
const scriptWarning = document.getElementById('script-warning');
const tooltipOverlay = document.getElementById('tooltip-overlay');

// Guided learning elements
const tabButtons = document.querySelectorAll('.tab-button');
const learnTab = document.getElementById('learn');
const practiceTab = document.getElementById('practice');
const nextLessonBtn = document.getElementById('next-lesson-btn');
const currentLesson = document.getElementById('current-lesson');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const checkChallengeBtn = document.getElementById('check-challenge');
const challengeResult = document.getElementById('challenge-result');

// Lesson data
const lessons = [
    {
        title: "Lesson 1: Your First HTML Page",
        content: `
            <p>Every HTML document starts with the same basic structure. Let's create one together.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Copy this code into the editor on the right and click "Render" to see it in action.</p>
        `,
        expectedOutput: /<h1>Hello, World<\/h1>/i
    },
    {
        title: "Lesson 2: Headings and Paragraphs",
        content: `
            <p>HTML provides six levels of headings (h1 to h6) and paragraph tags. Let's try them out.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Headings Practice&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Main Heading&lt;/h1&gt;
    &lt;h2&gt;Subheading&lt;/h2&gt;
    &lt;p&gt;This is a paragraph. It can contain multiple lines of text, but HTML doesn't require line breaks between paragraphs like word processors do.&lt;/p&gt;
    &lt;p&gt;Here's another paragraph with some <strong>bold text</strong>.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try to recreate this structure in the editor.</p>
        `,
        expectedOutput: /<h1>Main Heading<\/h1>.*<h2>Subheading<\/h2>.*<p>This is a paragraph.*<p>Here's another paragraph.*<strong>bold text<\/strong>/is
    },
    {
        title: "Lesson 3: Lists",
        content: `
            <p>Lists are fundamental in HTML. There are two types: ordered (numbered) and unordered (bulleted).</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Lists Practice&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;My Shopping List&lt;/h1&gt;

    &lt;h2&gt;Groceries&lt;/h2&gt;
    &lt;ul&gt;
        &lt;li&gt;Apples&lt;/li&gt;
        &lt;li&gt;Milk&lt;/li&gt;
        &lt;li&gt;Bread&lt;/li&gt;
    &lt;/ul&gt;

    &lt;h2&gt;To Do&lt;/h2&gt;
    &lt;ol&gt;
        &lt;li&gt;Buy groceries&lt;/li&gt;
        &lt;li&gt;Walk the dog&lt;/li&gt;
        &lt;li&gt;Do laundry&lt;/li&gt;
    &lt;/ol&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try creating your own lists in the editor.</p>
        `,
        expectedOutput: /<ul>.*<li>Apples<\/li>.*<li>Milk<\/li>.*<li>Bread<\/li>.*<\/ul>.*<ol>.*<li>Buy groceries<\/li>.*<li>Walk the dog<\/li>.*<li>Do laundry<\/li>.*<\/ol>/is
    },
    {
        title: "Lesson 4: Links and Images",
        content: `
            <p>Links (hyperlinks) connect your page to other resources, and images add visual elements.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Links and Images&lt;/title&gt;
    &lt;style&gt;
        img {
            max-width: 100%;
            height: auto;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;My Awesome Page&lt;/h1&gt;

    &lt;p&gt;Here's a link to &lt;a href="https://www.google.com"&gt;Google&lt;\/a&gt;.&lt;/p&gt;

    &lt;p&gt;And here's an image:&lt;/p&gt;
    &lt;img src="https://via.placeholder.com/300x150" alt="Placeholder image" /&gt;

    &lt;p&gt;Note: The image above is a placeholder. In real websites, you'd use actual image paths.&lt;\/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try adding your own links and images (use placeholder images if needed).</p>
        `,
        expectedOutput: /<a href=".*">Google<\/a>.*<img src=".*" alt=".*"/is
    },
    {
        title: "Lesson 5: Divs and Spans",
        content: `
            <p>&lt;div&gt; is a block-level container, while &lt;span&gt; is an inline container. They're often used with CSS classes or IDs.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Divs and Spans&lt;/title&gt;
    &lt;style&gt;
        .container {
            border: 1px solid #ccc;
            padding: 20px;
            margin-bottom: 20px;
        }
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="container"&gt;
        &lt;h2&gt;This is a div container&lt;/h2&gt;
        &lt;p&gt;Divs are block-level elements that can contain other elements. This text is inside a div.&lt;/p&gt;
    &lt;\/div&gt;

    &lt;div class="container"&gt;
        &lt;span class="highlight"&gt;This is a span element, which is inline.&lt;\/span&gt;
        &lt;p&gt;Spans are used to mark up parts of text or other inline elements without adding line breaks.&lt;/p&gt;
    &lt;\/div&gt;
&lt;\/body&gt;
&lt;\/html&gt;</code></pre>
            <p>Try creating your own divs and spans with different classes.</p>
        `,
        expectedOutput: /<div class="container".*><span class="highlight".*>/is
    },
    {
        title: "Lesson 6: Forms",
        content: `
            <p>Forms are used to collect user input. Here's a simple form with common elements.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;HTML Form&lt;/title&gt;
    &lt;style&gt;
        form {
            max-width: 400px;
            margin: 0 auto;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input, textarea, select {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            box-sizing: border-box;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;form&gt;
        &lt;h2&gt;Contact Form&lt;/h2&gt;

        &lt;label for="name"&gt;Name:&lt;\/label&gt;
        &lt;input type="text" id="name" name="name" required&gt;

        &lt;label for="email"&gt;Email:&lt;\/label&gt;
        &lt;input type="email" id="email" name="email" required&gt;

        &lt;label for="message"&gt;Message:&lt;\/label&gt;
        &lt;textarea id="message" name="message" rows="4" required&gt;&lt;/textarea&gt;

        &lt;button type="submit"&gt;Submit&lt;\/button&gt;
    &lt;\/form&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try creating your own form with different input types.</p>
        `,
        expectedOutput: /<form>.*<input type="text".*name="name".*><input type="email".*name="email".*><textarea.*name="message".*>/is
    },
    {
        title: "Lesson 7: Tables",
        content: `
            <p>Tables are used to display data in a grid format.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;HTML Table&lt;/title&gt;
    &lt;style&gt;
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h2&gt;Employee Directory&lt;/h2&gt;
    &lt;table&gt;
        &lt;thead&gt;
            &lt;tr&gt;
                &lt;th&gt;Name&lt;\/th&gt;
                &lt;th&gt;Position&lt;\/th&gt;
                &lt;th&gt;Department&lt;\/th&gt;
            &lt;\/tr&gt;
        &lt;\/thead&gt;
        &lt;tbody&gt;
            &lt;tr&gt;
                &lt;td&gt;John Doe&lt;\/td&gt;
                &lt;td&gt;Developer&lt;\/td&gt;
                &lt;td&gt;IT&lt;\/td&gt;
            &lt;\/tr&gt;
            &lt;tr&gt;
                &lt;td&gt;Jane Smith&lt;\/td&gt;
                &lt;td&gt;Designer&lt;\/td&gt;
                &lt;td&gt;Creative&lt;\/td&gt;
            &lt;\/tr&gt;
        &lt;\/tbody&gt;
    &lt;\/table&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try creating your own table with multiple rows and columns.</p>
        `,
        expectedOutput: /<table>.*<thead>.*<tr>.*<th>Name<\/th>.*<th>Position<\/th>.*<th>Department<\/th>.*<\/tr>.*<\/thead>.*<tbody>.*<tr>.*<td>John Doe<\/td>.*<td>Developer<\/td>.*<td>IT<\/td>.*<\/tr>.*<tr>.*<td>Jane Smith<\/td>.*<td>Designer<\/td>.*<td>Creative<\/td>.*<\/tr>.*<\/tbody>.*<\/table>/is
    },
    {
        title: "Lesson 8: Semantic HTML",
        content: `
            <p>Semantic elements clearly describe their meaning to both browser and developer. They improve accessibility and SEO.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Semantic HTML&lt;/title&gt;
    &lt;style&gt;
        header, footer {
            background-color: #f2f2f2;
            padding: 15px;
            text-align: center;
        }
        nav ul {
            list-style-type: none;
            padding: 0;
        }
        nav li {
            display: inline-block;
            margin-right: 15px;
        }
        article, section {
            padding: 20px;
            margin-bottom: 20px;
            border-left: 3px solid #4CAF50;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;My Semantic Page&lt;/h1&gt;
        &lt;nav&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href="#home"&gt;Home&lt;\/a&gt;&lt;\/li&gt;
                &lt;li&gt;&lt;a href="#about"&gt;About&lt;\/a&gt;&lt;\/li&gt;
                &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;\/a&gt;&lt;\/li&gt;
            &lt;\/ul&gt;
        &lt;\/nav&gt;
    &lt;\/header&gt;

    &lt;main&gt;
        &lt;article&gt;
            &lt;h2&gt;Article Title&lt;/h2&gt;
            &lt;p&gt;This is an article with semantic meaning. It could contain a blog post or news item.&lt;\/p&gt;
        &lt;\/article&gt;

        &lt;section&gt;
            &lt;h2&gt;Section Title&lt;/h2&gt;
            &lt;p&gt;This is a section within the main content. Sections group related content.&lt;\/p&gt;
        &lt;\/section&gt;
    &lt;\/main&gt;

    &lt;footer&gt;
        &lt;p&gt;&amp;copy; 2023 My Website. All rights reserved.&lt;\/p&gt;
    &lt;\/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try using semantic elements like header, nav, main, article, section, and footer.</p>
        `,
        expectedOutput: /<header>.*<nav>.*<ul>.*<li><a href=".*">Home<\/a>.*<li><a href=".*">About<\/a>.*<li><a href=".*">Contact<\/a>.*<\/ul>.*<\/nav>.*<\/header>.*<main>.*<article>.*<section>.*<footer>/is
    },
    {
        title: "Lesson 9: Inline vs External CSS",
        content: `
            <p>You can style HTML in two ways: inline (directly on elements) or external (in a separate CSS file).</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;CSS Styling&lt;/title&gt;
    &lt;style&gt;
        /* External-like styles in the head */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="container"&gt;
        &lt;h1 style="color: #4CAF50; text-align: center;">Inline CSS Example&lt;/h1&gt;

        &lt;p&gt;This paragraph has external CSS applied to the container div.&lt;\/p&gt;

        &lt;p style="color: blue; font-size: 18px; background-color: #e6f7ff;">
            This paragraph has inline CSS styling directly on the element.
        &lt;\/p&gt;
    &lt;\/div&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try adding your own styles - both external (in the style tags) and inline.</p>
        `,
        expectedOutput: /<style>.*body {.*} .container {.*} <\/style>.*<h1 style="color: #4CAF50; text-align: center;">Inline CSS Example<\/h1>.*<p style="color: blue; font-size: 18px; background-color: #e6f7ff;">/is
    },
    {
        title: "Lesson 10: Basic JavaScript Integration",
        content: `
            <p>You can add simple JavaScript to your HTML for interactivity. Here's a basic example:</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;JavaScript Example&lt;/title&gt;
    &lt;style&gt;
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Click the button below&lt;/h1&gt;
    &lt;button onclick="alert('Button clicked!')">Click Me&lt;/button&gt;

    &lt;p id="demo"&gt;&lt;/p&gt;

    &lt;script&gt;
        // This script runs when the page loads
        document.getElementById("demo").innerHTML = "This text was added by JavaScript!";
    &lt;\/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try adding your own simple JavaScript (if allowed) to make things interactive.</p>
        `,
        expectedOutput: /<button onclick="alert$'.*'$">Click Me<\/button>.*<script>.*document.getElementById$"demo"$.innerHTML = "This text was added by JavaScript!";/is
    },
    {
        title: "Lesson 11: Understanding Framework-Generated HTML",
        content: `
            <p>Most modern websites are built using frameworks like React, Angular, or Vue. These generate HTML dynamically.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Framework-Generated HTML&lt;/title&gt;
    &lt;style&gt;
        .framework-generated {
            font-family: monospace;
            background-color: #f5f5f5;
            padding: 10px;
            border-left: 3px solid #4CAF50;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h2&gt;Normal HTML&lt;/h2&gt;
    &lt;div id="normal-html"&gt;
        &lt;p&gt;This is regular HTML that you'd write directly.&lt;\/p&gt;
    &lt;\/div&gt;

    &lt;h2&gt;Framework-Generated HTML (Example)&lt;/h2&gt;
    &lt;div class="framework-generated"&gt;
        &lt;!-- This might look like what a framework generates --&gt;
        &lt;div data-reactroot=""&gt;
            &lt;section&gt;
                &lt;h3&gt;Dynamic Content&lt;/h3&gt;
                &lt;p&gt;This content was generated by a JavaScript framework.&lt;\/p&gt;
                &lt;button onclick="handleClick()">Click Me&lt;\/button&gt;
            &lt;\/section&gt;
        &lt;\/div&gt;

        &lt;script&gt;
            function handleClick() {
                alert("This is a dynamically generated button!");
            }
        &lt;\/script&gt;
    &lt;\/div&gt;

    &lt;p&gt;Note: Real framework-generated HTML often includes special attributes (like data-*) and more complex structures.&lt;\/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Compare the normal HTML with the framework-generated example.</p>
        `,
        expectedOutput: /<div id="normal-html".*><h2>Normal HTML<\/h2>.*<div class="framework-generated".*><h2>Framework-Generated HTML $Example$<\/h2>.*<div data-reactroot=""/is
    },
    {
        title: "Lesson 12: Common HTML Attributes",
        content: `
            <p>Attributes provide additional information about elements. Here are some common ones:</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;HTML Attributes&lt;/title&gt;
    &lt;style&gt;
        .attribute-example {
            font-family: monospace;
            white-space: pre-wrap;
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="attribute-example"&gt;
        &lt;!-- id attribute - unique identifier --&gt;
        &lt;p id="intro"&gt;This paragraph has an id of "intro".&lt;\/p&gt;

        &lt;!-- class attribute - for styling and JavaScript --&gt;
        &lt;div class="highlight important"&gt;
            This div has multiple classes: "highlight" and "important".
        &lt;\/div&gt;

        &lt;!-- href attribute - for links --&gt;
        &lt;a href="https://www.example.com" target="_blank"&gt;
            Link with href and target attributes
        &lt;\/a&gt;

        &lt;!-- src attribute - for images --&gt;
        &lt;img src="image.jpg" alt="Example image" width="200" height="150"&gt;

        &lt;!-- data-* attributes - custom data --&gt;
        &lt;div data-user-id="12345" data-role="admin"&gt;
            This div has custom data attributes.
        &lt;\/div&gt;
    &lt;\/div&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try adding different attributes to elements in your code.</p>
        `,
        expectedOutput: /<p id="intro".*><div class="highlight important".*><a href="https:\/\/www.example.com" target="_blank".*><img src="image.jpg".*alt="Example image".*width="200".*height="150".*><div data-user-id="12345".*data-role="admin"/is
    },
    {
        title: "Lesson 13: HTML Entities and Special Characters",
        content: `
            <p>HTML uses entities to display reserved characters like &lt;, &gt;, &amp;, etc.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;HTML Entities&lt;/title&gt;
&lt;\/head&gt;
&lt;body&gt;
    &lt;h2&gt;Special Characters and Entities&lt;/h2&gt;

    &lt;p&gt;Here are some common special characters:&lt;\/p&gt;
    &lt;ul&gt;
        &lt;li&gt;&amp;lt; - Less than sign (used in opening tags)&lt;\/li&gt;
        &lt;li&gt;&amp;gt; - Greater than sign (used in closing tags)&lt;\/li&gt;
        &lt;li&gt;&amp;amp; - Ampersand (used in entities)&lt;\/li&gt;
        &lt;li&gt;&amp;quot; - Quotation mark&lt;\/li&gt;
    &lt;\/ul&gt;

    &lt;p&gt;You can also use numeric entities like &#60; for &lt; or &#62; for &gt;.&lt;\/p&gt;

    &lt;p&gt;This is a paragraph with a "quoted" word: &amp;quot;HTML&amp;quot;.&lt;\/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try using different HTML entities in your text.</p>
        `,
        expectedOutput: /<li>&amp;lt; - Less than sign.*<li>&amp;gt; - Greater than sign.*<li>&amp;amp; - Ampersand.*<li>&amp;quot; - Quotation mark.*<p>This is a paragraph with a "quoted" word: &amp;quot;HTML&amp;quot;./is
    },
    {
        title: "Lesson 14: Meta Tags and SEO",
        content: `
            <p>Meta tags provide metadata about your HTML document. They're important for SEO.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My Page Title&lt;/title&gt;

    &lt;!-- Meta charset - specifies character encoding --&gt;
    &lt;meta charset="UTF-8"&gt;

    &lt;!-- Viewport meta tag for responsive design --&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

    &lt;!-- Description meta tag - important for SEO --&gt;
    &lt;meta name="description" content="This is a sample page demonstrating HTML meta tags."&gt;

    &lt;!-- Keywords (less important now but still used) --&gt;
    &lt;meta name="keywords" content="HTML, meta tags, SEO, web development"&gt;

    &lt;!-- Author information --&gt;
    &lt;meta name="author" content="Your Name"&gt;

    &lt;style&gt;
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Meta Tags Example&lt;/h1&gt;
    &lt;p&gt;This page demonstrates various meta tags that are important for SEO and proper document handling.&lt;\/p&gt;

    &lt;div style="font-family: monospace; background-color: #f5f5f5; padding: 10px; border-radius: 4px;"&gt;
        &lt;!-- Note: These meta tags appear in the head, not the body --&gt;
        &lt;p&gt;All meta tags go in the &lt;head&gt; section of your document.&lt;\/p&gt;
    &lt;\/div&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try adding different meta tags to your HTML documents.</p>
        `,
        expectedOutput: /<meta charset="UTF-8".*><meta name="viewport" content="width=device-width, initial-scale=1.0".*><title>My Page Title<\/title>.*<style>.*body {.*} <\/style>.*<meta name="description" content="This is a sample page demonstrating HTML meta tags.".*><meta name="keywords" content="HTML, meta tags, SEO, web development".*><meta name="author" content="Your Name"/is
    },
    {
        title: "Lesson 15: Putting It All Together",
        content: `
            <p>Now that you've learned the basics, let's combine everything into a complete page.</p>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My Complete HTML Page&lt;/title&gt;

    &lt;style&gt;
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        header, footer {
            background-color: #f2f2f2;
            padding: 15px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
        nav ul {
            list-style-type: none;
            padding: 0;
            display: flex;
            justify-content: center;
        }
        nav li {
            margin: 0 15px;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        .highlight {
            background-color: #fffacd;
            padding: 10px;
            border-left: 3px solid #ffc107;
        }
    &lt;\/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;My Awesome Website&lt;/h1&gt;
        &lt;nav&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href="#home"&gt;Home&lt;\/a&gt;&lt;\/li&gt;
                &lt;li&gt;&lt;a href="#about"&gt;About&lt;\/a&gt;&lt;\/li&gt;
                &lt;li&gt;&lt;a href="#services"&gt;Services&lt;\/a&gt;&lt;\/li&gt;
                &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;\/a&gt;&lt;\/li&gt;
            &lt;\/ul&gt;
        &lt;\/nav&gt;
    &lt;\/header&gt;

    &lt;main class="container"&gt;
        &lt;section&gt;
            &lt;h2&gt;Welcome to My Site&lt;/h2&gt;
            &lt;p&gt;This is a complete HTML page that demonstrates many of the concepts you've learned.&lt;\/p&gt;

            &lt;div class="highlight"&gt;
                &lt;h3&gt;Key Features&lt;/h3&gt;
                &lt;ul&gt;
                    &lt;li&gt;Semantic HTML structure&lt;/li&gt;
                    &lt;li&gt;Responsive design with viewport meta tag&lt;/li&gt;
                    &lt;li&gt;External CSS styling&lt;/li&gt;
                    &lt;li&gt;Navigation menu&lt;/li&gt;
                &lt;\/ul&gt;
            &lt;\/div&gt;

            &lt;p&gt;Here's an image:&lt;/p&gt;
            &lt;img src="https://via.placeholder.com/600x300" alt="Placeholder image for my website" style="width: 100%; height: auto;"&gt;
        &lt;\/section&gt;

        &lt;section&gt;
            &lt;h2&gt;About Us&lt;/h2&gt;
            &lt;p&gt;This section contains information about our company. We're a team of web developers passionate about creating beautiful, functional websites.&lt;\/p&gt;
        &lt;\/section&gt;
    &lt;\/main&gt;

    &lt;footer&gt;
        &lt;p&gt;&amp;copy; 2023 My Awesome Website. All rights reserved.&lt;\/p&gt;
        &lt;address&gt;
            Contact us at: &lt;a href="mailto:info@example.com"&gt;info@example.com&lt;\/a&gt;
        &lt;\/address&gt;
    &lt;\/footer&gt;

    &lt;script&gt;
        // Simple JavaScript example
        document.addEventListener('DOMContentLoaded', function() {
            console.log("Page loaded successfully!");
            alert("Welcome to our website! We hope you enjoy your visit.");
        });
    &lt;\/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            <p>Try recreating this complete page in the editor. It combines many of the concepts from previous lessons.</p>
        `,
        expectedOutput: /<html lang="en".*><head>.*<meta charset="UTF-8".*><meta name="viewport" content="width=device-width, initial-scale=1.0".*><title>My Complete HTML Page<\/title>.*<style>.*body {.*} header, footer {.*} nav ul {.*} .container {.*} .highlight {.*} <\/style>.*<body>.*<header>.*<h1>My Awesome Website<\/h1>.*<nav>.*<ul>.*<li><a href=".*">Home<\/a>.*<li><a href=".*">About<\/a>.*<li><a href=".*">Services<\/a>.*<li><a href=".*">Contact<\/a>.*<\/ul>.*<\/nav>.*<\/header>.*<main class="container".*><section>.*<h2>Welcome to My Site<\/h2>.*<div class="highlight".*><h3>Key Features<\/h3>.*<ul>.*<li>Semantic HTML structure<\/li>.*<li>Responsive design with viewport meta tag<\/li>.*<li>External CSS styling<\/li>.*<li>Navigation menu<\/li>.*<\/ul>.*<\/div>.*<p>Here's an image:<\/p>.*<img src="https:\/\/via.placeholder.com\/600x300" alt="Placeholder image for my website".*style="width: 100%; height: auto;"\/>.*<\/section>.*<section>.*<h2>About Us<\/h2>.*<p>This section contains information about our company. We're a team of web developers passionate about creating beautiful, functional websites.<\/p>.*<\/section>.*<\/main>.*<footer>.*<p>&amp;copy; 2023 My Awesome Website. All rights reserved.<\/p>.*<address>.*Contact us at: <a href="mailto:info@example.com">info@example.com<\/a>.*<\/address>.*<\/footer>.*<script>.*document.addEventListener$'DOMContentLoaded', function$$ {.*console.log$"Page loaded successfully!"$;.*alert$"Welcome to our website! We hope you enjoy your visit."$;.*}$$;.*<\/script>.*<\/body>.*<\/html>/is
    }
];

// Current lesson index
let currentLessonIndex = 0;

// Element explanations (expanded)
const elementExplanations = {
    'html': {
        name: 'HTML',
        description: 'The root element of an HTML page. It defines the entire document and must contain a <head> and <body>.',
        category: 'Structure',
        example: '<html lang="en"><head>...</head><body>...</body></html>'
    },
    'head': {
        name: 'Head',
        description: 'Contains meta-information about the document, like title, styles, and scripts. Not visible on the page.',
        category: 'Structure',
        example: '<head><title>Page Title</title><meta charset="UTF-8"></head>'
    },
    'title': {
        name: 'Title',
        description: 'Defines the title of the document, shown in the browser tab and search results.',
        category: 'Metadata',
        example: '<title>My Awesome Page</title>'
    },
    'body': {
        name: 'Body',
        description: 'Contains all visible content of the page. Everything inside <html> except <head>.',
        category: 'Structure',
        example: '<body><h1>Hello World</h1></body>'
    },
    'h1': {
        name: 'Heading 1 (h1)',
        description: 'The largest heading level (size 1). Should be used for the main title of the page. Only one h1 per page is recommended.',
        category: 'Text',
        example: '<h1>Main Page Title</h1>'
    },
    'h2': {
        name: 'Heading 2 (h2)',
        description: 'Second-level heading, smaller than h1 but larger than other headings. Used for section titles within the page.',
        category: 'Text',
        example: '<h2>Section Title</h2>'
    },
    'h3': {
        name: 'Heading 3 (h3)',
        description: 'Third-level heading, used for subsections or further division of content.',
        category: 'Text',
        example: '<h3>Subsection Title</h3>'
    },
    'p': {
        name: 'Paragraph (p)',
        description: 'Defines a paragraph of text. Browsers automatically add spacing before and after paragraphs.',
        category: 'Text',
        example: '<p>This is a paragraph of text that will be displayed with proper spacing.</p>'
    },
    'br': {
        name: 'Line Break (br)',
        description: 'Inserts a single line break. Unlike paragraphs, it doesn\'t add vertical space.',
        category: 'Text',
        example: '<p>First line<br>Second line</p>'
    },
    'hr': {
        name: 'Horizontal Rule (hr)',
        description: 'Draws a horizontal line across the page, often used as a thematic break between content sections.',
        category: 'Structure',
        example: '<h2>Section 1</h2><p>Content...</p><hr><h2>Section 2</h2>'
    },
    'a': {
        name: 'Anchor (a)',
        description: 'Defines a hyperlink to another page or resource. Requires href attribute.',
        category: 'Links',
        example: '<a href="https://example.com">Visit Example</a>'
    },
    'img': {
        name: 'Image (img)',
        description: 'Embeds an image in the document. Requires src attribute pointing to the image file. Always include alt text for accessibility.',
        category: 'Media',
        example: '<img src="image.jpg" alt="Descriptive alt text">'
    },
    'ul': {
        name: 'Unordered List (ul)',
        description: 'Creates a bulleted list of items. Items are defined with <li> elements.',
        category: 'Lists',
        example: '<ul><li>First item</li><li>Second item</li></ul>'
    },
    'ol': {
        name: 'Ordered List (ol)',
        description: 'Creates a numbered list of items. Items are defined with <li> elements.',
        category: 'Lists',
        example: '<ol><li>First item</li><li>Second item</li></ol>'
    },
    'li': {
        name: 'List Item (li)',
        description: 'Represents an item in a list. Must be placed inside <ul> or <ol> elements.',
        category: 'Lists',
        example: '<ul><li>This is a list item</li></ul>'
    },
    'div': {
        name: 'Division (div)',
        description: 'A block-level container used to group other elements. Often used with CSS classes or IDs for styling and JavaScript manipulation.',
        category: 'Structure',
        example: '<div class="container"><p>Content inside div</p></div>'
    },
    'span': {
        name: 'Span (span)',
        description: 'An inline container used to mark up parts of text or other inline elements without adding line breaks. Often used for styling specific parts of text.',
        category: 'Structure',
        example: '<p>This is <span class="highlight">highlighted</span> text.</p>'
    },
    'form': {
        name: 'Form (form)',
        description: 'Used to collect user input. Contains form controls like text fields, buttons, etc.',
        category: 'Forms',
        example: '<form><label for="name">Name:</label><input type="text" id="name"><button type="submit">Submit</button></form>'
    },
    'input': {
        name: 'Input (input)',
        description: 'Creates an input field for user input. Type attribute defines the kind of input (text, password, email, etc.).',
        category: 'Forms',
        example: '<input type="text" placeholder="Enter your name">'
    },
    'textarea': {
        name: 'Textarea (textarea)',
        description: 'Creates a multi-line text input control for larger amounts of text.',
        category: 'Forms',
        example: '<textarea rows="4" cols="50" placeholder="Enter multiple lines of text"></textarea>'
    },
    'button': {
        name: 'Button (button)',
        description: 'Creates a clickable button. Can be used for form submission or other actions.',
        category: 'Forms',
        example: '<button type="submit">Click Me</button>'
    },
    'select': {
        name: 'Dropdown (select)',
        description: 'Creates a dropdown list of options. Options are defined with <option> elements.',
        category: 'Forms',
        example: '<select><option value="1">Option 1</option><option value="2">Option 2</option></select>'
    },
    'option': {
        name: 'Option (option)',
        description: 'Defines an item in a dropdown list. Must be placed inside <select> elements.',
        category: 'Forms',
        example: '<select><option value="1">First option</option></select>'
    },
    'table': {
        name: 'Table (table)',
        description: 'Defines a table. Contains <tr> elements for rows, which in turn contain <td> or <th> cells.',
        category: 'Tables',
        example: '<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>'
    },
    'tr': {
        name: 'Table Row (tr)',
        description: 'Represents a row in a table. Must be placed inside <table> elements.',
        category: 'Tables',
        example: '<table><tr><td>Row content</td></tr></table>'
    },
    'td': {
        name: 'Table Data Cell (td)',
        description: 'Defines a standard data cell in a table. Holds the actual content of the table.',
        category: 'Tables',
        example: '<table><tr><td>Data cell</td></tr></table>'
    },
    'th': {
        name: 'Table Header Cell (th)',
        description: 'Defines a header cell in a table, typically used for column or row headers. Text is usually bold and centered.',
        category: 'Tables',
        example: '<table><tr><th>Header</th></tr></table>'
    },
    'thead': {
        name: 'Table Header (thead)',
        description: 'Groups header content in a table. Contains <tr> elements with <th> cells.',
        category: 'Tables',
        example: '<table><thead><tr><th>Column 1</th><th>Column 2</th></tr></thead></table>'
    },
    'tbody': {
        name: 'Table Body (tbody)',
        description: 'Groups the body content in a table. Contains <tr> elements with <td> cells.',
        category: 'Tables',
        example: '<table><tbody><tr><td>Row 1</td></tr></tbody></table>'
    },
    'header': {
        name: 'Header (header)',
        description: 'Represents introductory content or a set of navigational links for the document or section.',
        category: 'Semantic',
        example: '<header><h1>Main Title</h1><nav>...</nav></header>'
    },
    'footer': {
        name: 'Footer (footer)',
        description: 'Represents footer content, typically containing copyright information, author details, etc.',
        category: 'Semantic',
        example: '<footer><p>&copy; 2023 My Website</p></footer>'
    },
    'nav': {
        name: 'Navigation (nav)',
        description: 'Defines a block of navigation links. Should be used for the main navigation of the site.',
        category: 'Semantic',
        example: '<nav><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li></ul></nav>'
    },
    'main': {
        name: 'Main Content (main)',
        description: 'Specifies the dominant content of the document. Should contain all the main content that a user would see when they visit the page.',
        category: 'Semantic',
        example: '<main><h1>Article Title</h1><p>Article content...</p></main>'
    },
    'article': {
        name: 'Article (article)',
        description: 'Represents a self-contained composition that is independent of its surrounding content, like a blog post or news article.',
        category: 'Semantic',
        example: '<article><h2>Blog Post Title</h2><p>Post content...</p></article>'
    },
    'section': {
        name: 'Section (section)',
        description: 'Represents a thematic grouping of content, typically with a heading. Used to divide the document into logical sections.',
        category: 'Semantic',
        example: '<section><h2>Section Title</h2><p>Content...</p></section>'
    },
    'aside': {
        name: 'Aside (aside)',
        description: 'Represents content that is tangentially related to the main content, like sidebars or pull quotes.',
        category: 'Semantic',
        example: '<article><h2>Main Content</h2><p>...</p><aside><p>Related sidebar content</p></aside></article>'
    },
    'figure': {
        name: 'Figure (figure)',
        description: 'Represents self-contained content, usually with a caption, like an image or diagram.',
        category: 'Semantic',
        example: '<figure><img src="image.jpg" alt="Example"><figcaption>Figure 1: Example image</figcaption></figure>'
    },
    'figcaption': {
        name: 'Figure Caption (figcaption)',
        description: 'Provides a caption or legend for a <figure> element.',
        category: 'Semantic',
        example: '<figure><img src="image.jpg" alt="Example"><figcaption>Figure 1: Example image</figcaption></figure>'
    },
    'address': {
        name: 'Address (address)',
        description: 'Represents contact information for its nearest article or body element. Typically used for author/owner info.',
        category: 'Semantic',
        example: '<footer><address>Contact: <a href="mailto:info@example.com">info@example.com</a></address></footer>'
    },
    'meta': {
        name: 'Meta (meta)',
        description: 'Provides metadata about the HTML document. Used in the head section with attributes like charset, name, or http-equiv.',
        category: 'Metadata',
        example: '<meta charset="UTF-8">'
    },
    'style': {
        name: 'Style (style)',
        description: 'Contains CSS styling for a document. Can be used for inline styles or external stylesheets.',
        category: 'Styling',
        example: '<style>body { font-family: Arial; }</style>'
    },
    'script': {
        name: 'Script (script)',
        description: 'Embeds or references executable code, typically JavaScript. Can be placed in the head or body.',
        category: 'JavaScript',
        example: '<script src="script.js"></script>'
    },
    'id': {
        name: 'ID Attribute',
        description: 'Specifies a unique identifier for an HTML element. Must be unique within a page and can be used to target specific elements with CSS or JavaScript.',
        category: 'Attributes',
        example: '<div id="main-content">'
    },
    'class': {
        name: 'Class Attribute',
        description: 'Specifies one or more classnames for an element. Classes are often used for styling and can be shared among multiple elements.',
        category: 'Attributes',
        example: '<p class="highlight important">Text with multiple classes</p>'
    },
    'href': {
        name: 'Href Attribute',
        description: 'Specifies the URL of a hyperlink. Used in <a> (anchor) elements.',
        category: 'Attributes',
        example: '<a href="https://example.com">Link</a>'
    },
    'src': {
        name: 'Src Attribute',
        description: 'Specifies the location of an external resource, like an image or script file. Used in <img>, <script>, etc.',
        category: 'Attributes',
        example: '<img src="image.jpg" alt="Image">'
    },
    'alt': {
        name: 'Alt Attribute',
        description: 'Specifies alternative text for an image if it cannot be displayed. Important for accessibility and SEO.',
        category: 'Attributes',
        example: '<img src="image.jpg" alt="Descriptive alt text">'
    },
    'type': {
        name: 'Type Attribute',
        description: 'Specifies the type of an element, like input type (text, password, email, etc.) or script type (JavaScript).',
        category: 'Attributes',
        example: '<input type="email" placeholder="your@email.com">'
    },
    'name': {
        name: 'Name Attribute',
        description: 'Specifies the name of an element. Used in forms to identify form data when submitted.',
        category: 'Attributes',
        example: '<input type="text" name="username">'
    },
    'value': {
        name: 'Value Attribute',
        description: 'Specifies the value of an element, like the default value for input fields or buttons.',
        category: 'Attributes',
        example: '<button value="Submit">Click Me</button>'
    },
    'placeholder': {
        name: 'Placeholder Attribute',
        description: 'Provides a hint to the user about what kind of information should be entered into an input field.',
        category: 'Attributes',
        example: '<input type="text" placeholder="Enter your name">'
    },
    'required': {
        name: 'Required Attribute',
        description: 'Specifies that an input field must be filled out before a form can be submitted.',
        category: 'Attributes',
        example: '<input type="email" required>'
    },
    'data-*': {
        name: 'Data Attributes (data-)',
        description: 'Custom data attributes allow you to store extra information in HTML elements. They begin with "data-" and can be used for JavaScript manipulation or CSS targeting.',
        category: 'Attributes',
        example: '<div data-user-id="12345" data-role="admin"></div>'
    },
    'lang': {
        name: 'Lang Attribute',
        description: 'Specifies the language of the document or element. Important for accessibility and search engines.',
        category: 'Metadata',
        example: '<html lang="en">'
    }
};

// Function to get explanation for an element
function getElementExplanation(tagName) {
    tagName = tagName.toLowerCase();
    if (elementExplanations[tagName]) {
        const elementInfo = elementExplanations[tagName];
        return `
            <strong>${elementInfo.name}</strong><br>
            <em>Category:</em> ${elementInfo.category}<br>
            <em>Description:</em> ${elementInfo.description}<br><br>
            <em>Example usage:</em><br>
            <pre style="margin: 10px 0; padding: 5px; background: #f5f5f5; border-radius: 3px;">${elementInfo.example}</pre>
        `;
    }
    return `<strong>${tagName.toUpperCase()}</strong><br>This is a standard HTML element. Hover over it to learn more or click for details.`;
}

// Function to create tooltip content
function createTooltipContent(tagName, position) {
    const explanation = getElementExplanation(tagName);
    return `
        <div style="padding: 8px;">
            ${explanation}
        </div>
    `;
}

// Function to show tooltip at a given position
function showTooltip(content, x, y) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);

    // Hide tooltip after 5 seconds
    setTimeout(() => {
        document.body.removeChild(tooltip);
    }, 5000);
}

// Function to highlight an element in the iframe
function highlightElementInIframe(element) {
    const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
    const allElements = iframeDoc.querySelectorAll('*');

    // Remove previous highlights
    allElements.forEach(el => el.classList.remove('highlight-element'));

    if (element && element.tagName) {
        // Highlight elements with the same tag name
        iframeDoc.querySelectorAll(element.tagName.toLowerCase()).forEach(el => {
            el.classList.add('highlight-element');
        });
    }
}

// Function to handle mouseover in the iframe content
function setupIframeEventListeners() {
    const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;

    // Add event listeners to all elements in the iframe
    Array.from(iframeDoc.querySelectorAll('*')).forEach(element => {
        element.addEventListener('mouseover', (e) => {
            if (!element.classList.contains('highlight-element')) {
                highlightElementInIframe(element);
                const rect = element.getBoundingClientRect();
                // Calculate position relative to the viewport
                const x = rect.left + window.scrollX;
                const y = rect.top + window.scrollY;

                // Show tooltip with explanation
                showTooltip(createTooltipContent(element.tagName, element.textContent.trim() || 'Element'), x, y);
            }
        });

        element.addEventListener('click', (e) => {
            if (!element.classList.contains('highlight-element')) {
                highlightElementInIframe(element);
                const rect = element.getBoundingClientRect();
                const x = rect.left + window.scrollX;
                const y = rect.top + window.scrollY;

                // Show a more persistent popup or open documentation
                alert(`You clicked on a ${element.tagName} element.\n\n${getElementExplanation(element.tagName)}\n\nWould you like to learn more?`);
            }
        });
    });

    // Also listen for new elements added dynamically (if any)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    node.addEventListener('mouseover', (e) => {
                        highlightElementInIframe(node);
                        const rect = node.getBoundingClientRect();
                        showTooltip(createTooltipContent(node.tagName, node.textContent.trim() || 'Element'), rect.left + window.scrollX, rect.top + window.scrollY);
                    });
                }
            });
        });
    });

    observer.observe(iframeDoc.body, { childList: true, subtree: true });
}

// Initialize the guided learning path
function initGuidedLearning() {
    updateProgressBar();
    renderCurrentLesson();

    // Set up challenge section for lessons that have challenges
    if (lessons[currentLessonIndex].challenge) {
        challengeSection.style.display = 'block';
    } else {
        challengeSection.style.display = 'none';
    }
}

function updateProgressBar() {
    const progress = ((currentLessonIndex + 1) / lessons.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentLessonIndex + 1}/${lessons.length} lessons`;
}

function renderCurrentLesson() {
    currentLesson.innerHTML = `
        <h2>${lessons[currentLessonIndex].title}</h2>
        ${lessons[currentLessonIndex].content}
        ${shouldShowNextButton() ? '<button id="next-lesson-btn">Next Lesson</button>' : ''}
    `;
}

function shouldShowNextButton() {
    // For now, always show next button (in a real app, you'd check if the user's code matches expected output)
    return true;
}

// Tab switching functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding content
        if (button.dataset.tab === 'learn') {
            learnTab.style.display = 'flex';
            practiceTab.style.display = 'none';
            initGuidedLearning();
        } else {
            learnTab.style.display = 'none';
            practiceTab.style.display = 'flex';

            // Reset to free practice mode
            editor.value = '';
            renderHTML();
        }
    });
});

// Next lesson button functionality
nextLessonBtn.addEventListener('click', () => {
    currentLessonIndex++;

    if (currentLessonIndex < lessons.length) {
        updateProgressBar();
        renderCurrentLesson();

        // Set up challenge section if this lesson has one
        if (lessons[currentLessonIndex].challenge) {
            challengeSection.style.display = 'block';
        } else {
            challengeSection.style.display = 'none';
        }
    } else {
        // All lessons completed - switch to practice mode
        tabButtons[1].click(); // This triggers the practice tab

        // Show completion message
        alert(`Congratulations! You've completed all guided lessons. Now you can practice freely.`);
    }
});

// Challenge checking functionality
checkChallengeBtn.addEventListener('click', () => {
    const userCode = editor.value;
    const expectedOutput = lessons[currentLessonIndex].expectedOutput;

    if (userCode.match(expectedOutput)) {
        challengeResult.innerHTML = `
            <p style="color: green;">✅ Great job! Your code matches the expected output.</p>
            <button onclick="nextLessonBtn.click()">Proceed to Next Lesson</button>
        `;
    } else {
        challengeResult.innerHTML = `
            <p style="color: red;">❌ Your code doesn't match the expected output yet. Try again!</p>
        `;
    }
});

function renderHTML() {
    const htmlCode = editor.value;
    let safeHtmlCode;

    if (allowScriptsCheckbox.checked) {
        // If scripts are allowed, use the original code but ensure it's wrapped properly
        safeHtmlCode = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Preview</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .highlight-element {
                        background-color: rgba(255, 255, 0, 0.3);
                        outline: 1px dashed #ff0;
                    }
                </style>
            </head>
            <body>
                ${htmlCode}
            </body>
            </html>
        `;
    } else {
        // If scripts are not allowed, strip out script tags (simplified approach)
        safeHtmlCode = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Preview</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .highlight-element {
                        background-color: rgba(255, 255, 0, 0.3);
                        outline: 1px dashed #ff0;
                    }
                </style>
            </head>
            <body>
                ${htmlCode.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')}
            </body>
            </html>
        `;
    }

    previewIframe.srcdoc = safeHtmlCode;

    // Wait for the iframe content to load and then set up event listeners
    setTimeout(setupIframeEventListeners, 100);
}

// Auto-render on input for immediate feedback (in practice mode)
editor.addEventListener('input', () => {
    if (document.querySelector('.tab-button.active').dataset.tab === 'practice') {
        renderHTML();
    }
});

// Render on button click
renderBtn.addEventListener('click', renderHTML);

// Initial render for practice mode
renderHTML();

// Update warning visibility based on checkbox state
allowScriptsCheckbox.addEventListener('change', function() {
    if (this.checked) {
        scriptWarning.style.display = 'inline';
    } else {
        scriptWarning.style.display = 'none';
    }
    renderHTML(); // Re-render to apply script stripping or not
});

// Initialize the app - start with guided learning tab active
initGuidedLearning();

