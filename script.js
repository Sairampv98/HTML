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

// Modal elements
const modalDialog = document.getElementById('modal-dialog');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalOk = document.getElementById('modal-ok');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

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
    }
];

// Current lesson index
let currentLessonIndex = 0;
let highlightedElement = null;

// Element explanations (expanded)
const elementExplanations = {
    'html': {
        name: 'HTML',
        description: 'The root element of an HTML page. It defines the entire document and must contain a <head> and <body>.',
        category: 'Structure',
        example: '<html lang="en"><head>...</head><body>...</body></html>'
    },
    // ... [keep all other explanations from previous version]
};

// Function to show modal dialog
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.innerHTML = message;
    modalDialog.style.display = 'flex';
}

// Function to hide modal dialog
function hideModal() {
    modalDialog.style.display = 'none';
}

// Initialize the guided learning path
function initGuidedLearning() {
    updateProgressBar();
    renderCurrentLesson();

    // Set up challenge section for lessons that have challenges
    document.querySelector('.challenge-section').style.display = 'block';

    // Enable auto-render in practice mode
    editor.addEventListener('input', () => {
        if (document.querySelector('.tab-button.active').dataset.tab === 'practice') {
            renderHTML();
        }
    });
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

            // Remove input event listener for guided mode
            editor.removeEventListener('input', () => {});
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
        document.querySelector('.challenge-section').style.display = 'block';
    } else {
        // All lessons completed - switch to practice mode
        tabButtons[1].click(); // This triggers the practice tab

        // Show completion message
        showModal("Lesson Complete!", "Congratulations! You've completed all guided lessons. Now you can practice freely.");
    }
});

// Challenge checking functionality
checkChallengeBtn.addEventListener('click', () => {
    const userCode = editor.value;
    const expectedOutput = lessons[currentLessonIndex].expectedOutput;

    if (userCode.match(expectedOutput)) {
        challengeResult.innerHTML = `
            <p style="color: #4CAF50;">✅ Great job! Your code matches the expected output.</p>
            <button onclick="nextLessonBtn.click()">Proceed to Next Lesson</button>
        `;
    } else {
        challengeResult.innerHTML = `
            <p style="color: #f44336;">❌ Your code doesn't match the expected output yet. Try again!</p>
        `;
    }
});

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
    // Create tooltip element if it doesn't exist
    let tooltip = document.querySelector('.tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
    }

    // Update tooltip content and position
    tooltip.innerHTML = content;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y + 20}px`; // Position below the element

    // Hide tooltip after 5 seconds
    setTimeout(() => {
        tooltip.remove();
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

        highlightedElement = element;
    }
}

// Function to get element position relative to iframe
function getElementPositionInIframe(element) {
    const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;

    // Get the bounding rectangle of the element in iframe coordinates
    const rect = element.getBoundingClientRect();

    // Convert to iframe coordinates (since iframe is at position 0,0)
    return {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
    };
}

// Function to handle mouseover in the iframe content
function setupIframeEventListeners() {
    const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;

    // Clear previous event listeners
    Array.from(iframeDoc.querySelectorAll('*')).forEach(el => {
        el.removeEventListener('mouseover', null);
        el.removeEventListener('click', null);
    });

    // Add event listeners to all elements in the iframe
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    node.addEventListener('mouseover', handleElementMouseOver);
                    node.addEventListener('click', handleElementClick);
                }
            });
        });
    });

    // Add initial event listeners
    Array.from(iframeDoc.querySelectorAll('*')).forEach(element => {
        element.addEventListener('mouseover', handleElementMouseOver);
        element.addEventListener('click', handleElementClick);
    });

    // Observe for new elements
    observer.observe(iframeDoc.body, { childList: true, subtree: true });
}

// Handle mouse over events
function handleElementMouseOver(e) {
    const element = e.target;
    if (!element.classList.contains('highlight-element')) {
        highlightElementInIframe(element);

        // Get position relative to viewport
        const rect = element.getBoundingClientRect();
        const iframeRect = previewIframe.getBoundingClientRect();

        // Calculate position relative to the viewport (not just iframe)
        const x = rect.left + window.scrollX;
        const y = rect.top + window.scrollY;

        // Show tooltip with explanation
        showTooltip(createTooltipContent(element.tagName, element.textContent.trim() || 'Element'), x, y);
    }
}

// Handle click events
function handleElementClick(e) {
    const element = e.target;
    if (!element.classList.contains('highlight-element')) {
        highlightElementInIframe(element);

        // Get explanation for the clicked element
        const explanation = getElementExplanation(element.tagName);

        showModal(`Element: ${element.tagName}`, `
            <div style="margin-bottom: 15px;">
                <strong>${element.tagName.toUpperCase()}</strong><br>
                <em>Description:</em> ${elementExplanations[element.tagName.toLowerCase()]?.description || 'Standard HTML element.'}<br><br>

                <strong>Example usage:</strong><br>
                <pre style="background: #f5f5f5; padding: 8px; border-radius: 4px; margin-top: 10px;">
${elementExplanations[element.tagName.toLowerCase()]?.example || `<${element.tagName}>Content</${element.tagName}>`}
                </pre>
            </div>

            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${element.tagName}" target="_blank" style="color: var(--secondary-color); text-decoration: none;">
                Open MDN Documentation
            </a>
        `);
    }
}

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
                        background-color: var(--bg-color);
                        color: var(--text-color);
                    }
                    .highlight-element {
                        outline: 2px solid var(--secondary-color) !important;
                        box-shadow: 0 0 0 1px rgba(33, 150, 243, 0.3) inset;
                    }
                </style>
            </head>
            <body>
                ${htmlCode}
            </body>
            </html>
        `;
    } else {
        // If scripts are not allowed, strip out script tags
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
                        background-color: var(--bg-color);
                        color: var(--text-color);
                    }
                    .highlight-element {
                        outline: 2px solid var(--secondary-color) !important;
                        box-shadow: 0 0 0 1px rgba(33, 150, 243, 0.3) inset;
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
    setTimeout(() => {
        setupIframeEventListeners();
    }, 100);
}

// Render on button click (works in both modes)
renderBtn.addEventListener('click', renderHTML);

// Initial render when switching to practice mode or loading page
function initialRender() {
    // Set default code for guided learning
    if (document.querySelector('.tab-button.active').dataset.tab === 'learn') {
        editor.value = `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`;
    } else {
        // Clear for practice mode
        editor.value = '';
    }
    renderHTML();
}

// Update warning visibility based on checkbox state
allowScriptsCheckbox.addEventListener('change', function() {
    if (this.checked) {
        scriptWarning.style.display = 'inline';
    } else {
        scriptWarning.style.display = 'none';
    }
    renderHTML(); // Re-render to apply script stripping or not
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');

    if (isDark) {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Toggle light mode');
    } else {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    }
});

// Initialize modal close
modalOk.addEventListener('click', hideModal);

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modalDialog) {
        hideModal();
    }
});

// Initialize the app - start with guided learning tab active and render
initialRender();
