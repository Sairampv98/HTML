// DOM elements
// We now separate elements for Learn and Practice tabs
const learnEditor = document.getElementById('html-editor');
const learnRenderBtn = document.getElementById('render-btn');
const learnPreview = document.getElementById('preview-iframe');

const practiceEditor = document.getElementById('practice-editor');
const practiceRenderBtn = document.getElementById('practice-render-btn');
const practicePreview = document.getElementById('practice-preview-iframe');

// Common elements
const allowScriptsCheckbox = document.getElementById('allow-scripts');
const scriptWarning = document.getElementById('script-warning');

// Guided learning elements
const tabButtons = document.querySelectorAll('.tab-button');
const learnTab = document.getElementById('learn');
const practiceTab = document.getElementById('practice');
const currentLesson = document.getElementById('current-lesson');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const challengeSection = document.getElementById('challenge-section');

// Modal elements
const modalDialog = document.getElementById('modal-dialog');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalOk = document.getElementById('modal-ok');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

// Helper to get currently active editor elements
function getActiveElements() {
    const isPractice = practiceTab.style.display !== 'none';
    return {
        editor: isPractice ? practiceEditor : learnEditor,
        preview: isPractice ? practicePreview : learnPreview
    };
}

// Lesson data - Updated with proper Challenge descriptions (FIX #2)
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
        expectedOutput: /<h1>Hello, World<\/h1>/i,
        challenge: {
            description: "Modify the code to say 'Hello, HTML!' instead of 'Hello, World!' and change the title to 'Lesson 1'.",
            check: (code) => /Hello,\s*HTML!/i.test(code) && /<title>Lesson 1<\/title>/i.test(code)
        }
    },
    {
        title: "Lesson 2: Headings and Paragraphs",
        content: `
            <p>HTML provides six levels of headings (h1 to h6) and paragraph tags. Let's try them out.</p>
            <pre><code>&lt;h1&gt;Main Heading&lt;/h1&gt;
&lt;h2&gt;Subheading&lt;/h2&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;</code></pre>
        `,
        expectedOutput: /<h1>.*<\/h1>.*<h2>.*<\/h2>.*<p>.*<\/p>/is,
        challenge: {
            description: "Create a page with one &lt;h1&gt;, one &lt;h3&gt;, and two &lt;p&gt; paragraphs.",
            check: (code) => (code.match(/<h1/g) || []).length >= 1 && 
                             (code.match(/<h3/g) || []).length >= 1 && 
                             (code.match(/<p/g) || []).length >= 2
        }
    },
    {
        title: "Lesson 3: Lists",
        content: `
            <p>Create lists using &lt;ul&gt; (unordered) and &lt;ol&gt; (ordered) tags, with &lt;li&gt; for items.</p>
            <pre><code>&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;
  &lt;li&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        `,
        expectedOutput: /<ul>.*<li>.*<\/li>.*<\/ul>|.*<ol>.*<li>.*<\/li>.*<\/ol>/is,
        challenge: {
            description: "Create an Ordered List (&lt;ol&gt;) with at least 3 items inside it.",
            check: (code) => /<ol>[\s\S]*?<li>[\s\S]*?<li>[\s\S]*?<li>[\s\S]*?<\/ol>/i.test(code)
        }
    },
    {
        title: "Lesson 4: Links and Images",
        content: `
            <p>Add links with &lt;a href="..."&gt; and images with &lt;img src="..."&gt;.</p>
        `,
        expectedOutput: /<a href=".*">.*<\/a>.*<img src=".*"/is,
        challenge: {
            description: "Add a link to 'https://google.com' and an image tag.",
            check: (code) => /<a\s+[^>]*href=["']https:\/\/google\.com["'][^>]*>/i.test(code) && /<img\s+[^>]*src=/i.test(code)
        }
    },
    {
        title: "Lesson 5: Divs and Spans",
        content: `
            <p>Use &lt;div&gt; for block containers and &lt;span&gt; for inline styling.</p>
        `,
        expectedOutput: /<div.*>.*<\/div>/is,
        challenge: {
            description: "Create a &lt;div&gt; that contains an &lt;h2&gt; and a &lt;p&gt; with a &lt;span&gt; inside it.",
            check: (code) => /<div[\s\S]*?<h2[\s\S]*?<p[\s\S]*?<span/i.test(code)
        }
    }
];

// Current lesson index
let currentLessonIndex = 0;
let highlightedElement = null;

// Element explanations (kept mainly same as original)
const elementExplanations = {
    'html': { name: 'HTML', description: 'Root element.', category: 'Structure', example: '<html>...</html>' },
    'body': { name: 'Body', description: 'Contains visible content.', category: 'Structure', example: '<body>...</body>' },
    'h1': { name: 'Heading 1', description: 'Main heading.', category: 'Text', example: '<h1>Title</h1>' },
    // ... (Keep existing map or expand as needed)
};

// Function to show modal dialog
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.innerHTML = message;
    modalDialog.style.display = 'flex';
}

function hideModal() {
    modalDialog.style.display = 'none';
}

// Initialize the guided learning path
function initGuidedLearning() {
    updateProgressBar();
    renderCurrentLesson();
    
    // Setup for Lesson 1
    learnEditor.value = lessons[0].content.match(/<pre><code>([\s\S]*?)<\/code><\/pre>/)[1]
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    
    // Initial render for lesson 1
    renderHTML();
}

function updateProgressBar() {
    const progress = ((currentLessonIndex + 1) / lessons.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentLessonIndex + 1}/${lessons.length} lessons`;
}

function renderCurrentLesson() {
    const lesson = lessons[currentLessonIndex];
    
    // Render Lesson Text
    currentLesson.innerHTML = `
        <h2>${lesson.title}</h2>
        <div class="lesson-step">
            ${lesson.content}
        </div>
        <!-- Next button is now handled via Event Delegation -->
        <button id="next-lesson-btn" class="nav-btn">Next Lesson</button>
    `;

    // Render Challenge Section (FIX #2)
    if (lesson.challenge) {
        challengeSection.style.display = 'block';
        challengeSection.innerHTML = `
            <h3>Challenge</h3>
            <p>${lesson.challenge.description}</p>
            <button id="check-challenge">Check My Work</button>
            <p id="challenge-result"></p>
        `;
    } else {
        challengeSection.style.display = 'none';
    }
}

// EVENT DELEGATION FOR DYNAMIC BUTTONS (FIX #4)
document.addEventListener('click', function(e) {
    // Next Lesson Button
    if (e.target && e.target.id === 'next-lesson-btn') {
        currentLessonIndex++;
        if (currentLessonIndex < lessons.length) {
            updateProgressBar();
            renderCurrentLesson();
            // Clear result text
            const res = document.getElementById('challenge-result');
            if(res) res.innerHTML = '';
        } else {
            // Completed
            tabButtons[1].click(); // Switch to practice
            showModal("Course Complete!", "You have finished all lessons!");
        }
    }

    // Check Challenge Button
    if (e.target && e.target.id === 'check-challenge') {
        const userCode = learnEditor.value;
        const lesson = lessons[currentLessonIndex];
        const resultEl = document.getElementById('challenge-result');
        
        // Use custom check function if available, else regex
        let success = false;
        if (lesson.challenge && lesson.challenge.check) {
            success = lesson.challenge.check(userCode);
        } else {
            success = userCode.match(lesson.expectedOutput);
        }

        if (success) {
            resultEl.innerHTML = `<span style="color: var(--primary-color);">✅ Correct! You can move to the next lesson.</span>`;
            // Optional: Auto-enable next button styling or animation
        } else {
            resultEl.innerHTML = `<span style="color: #f44336;">❌ Not quite. Check the instructions and try again.</span>`;
        }
    }
});

// Tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (button.dataset.tab === 'learn') {
            learnTab.style.display = 'flex';
            practiceTab.style.display = 'none';
            // Trigger a render for the active tab
            renderHTML(); 
        } else {
            learnTab.style.display = 'none';
            practiceTab.style.display = 'flex';
            renderHTML();
        }
    });
});

// Render Function (Handles both tabs) (FIX #3)
function renderHTML() {
    const { editor, preview } = getActiveElements();
    const htmlCode = editor.value;
    
    let safeHtmlCode = htmlCode;
    if (!allowScriptsCheckbox.checked) {
        safeHtmlCode = htmlCode.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '');
    }

    // Inject CSS for highlighting
    const fullSource = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: sans-serif; padding: 10px; }
                .highlight-element { outline: 2px solid #2196F3; }
            </style>
        </head>
        <body>
            ${safeHtmlCode}
        </body>
        </html>
    `;

    preview.srcdoc = fullSource;

    // Re-attach tooltip listeners after load
    preview.onload = () => setupIframeListeners(preview);
}

// Listeners for Practice Tab elements (FIX #3)
learnRenderBtn.addEventListener('click', renderHTML);
practiceRenderBtn.addEventListener('click', renderHTML);

// Auto-render on typing (debounced slightly or direct)
learnEditor.addEventListener('input', renderHTML);
practiceEditor.addEventListener('input', renderHTML);

// Tooltip/Highlight Logic (Simplified for brevity but functional)
function setupIframeListeners(iframe) {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.body.addEventListener('mouseover', (e) => {
        if(e.target !== doc.body) {
            e.target.classList.add('highlight-element');
            e.target.title = `<${e.target.tagName.toLowerCase()}>`; // Native tooltip as fallback
        }
    });
    doc.body.addEventListener('mouseout', (e) => {
        e.target.classList.remove('highlight-element');
    });
    doc.body.addEventListener('click', (e) => {
        if(e.target !== doc.body) {
            e.preventDefault(); // Stop links
            showModal(`Element: <${e.target.tagName.toLowerCase()}>`, 
                `This is a <strong>${e.target.tagName}</strong> element.`);
        }
    });
}

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Modal close
modalOk.addEventListener('click', hideModal);
window.addEventListener('click', (e) => {
    if (e.target === modalDialog) hideModal();
});

// Init
initGuidedLearning();