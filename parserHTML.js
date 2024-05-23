const { invalidPatterns } = require('./invalidPatterns');
const { formattingPatterns } = require('./regexPatterns');

function detectMistakes(markdown) {
    return invalidPatterns.filter(({ pattern }) => pattern.test(markdown));
}

function extractCodeBlocks(markdown) {
    const regex = /\`\`\`([\s\S]+?)\`\`\`/g;
    const matches = [...markdown.matchAll(regex)];
    return matches.map(match => ({
        original: match[0],
        replaced: match[0].replace(regex, "<pre>$1</pre>")
    }));
}

function splitParagraphs(markdown) {
    const paragraphs = markdown.split(/([a-zA-Z0-9]*)^\s*$/gm).filter(Boolean);
    return paragraphs.map(paragraph => `<p>${paragraph.trim()}</p>`).join("\n");
}

function applyFormatting(html) {
    formattingPatterns.forEach(({ pattern, replacement }) => {
        html = html.replace(pattern, replacement);
    });
    return html;
}

function restoreCodeBlocks(html, matches) {
    return html.replace(/<pre>[\s\S]*?<\/pre>/g, () => {
        const element = matches.shift();
        return element.replaced;
    });
}

function parserHTML(markdown) {
    const mistakes = detectMistakes(markdown);
    if (mistakes.length > 0) {
        console.log("Wrong file");
        return;
    }

    const codeBlocks = extractCodeBlocks(markdown);
    let htmlContent = splitParagraphs(markdown);
    htmlContent = applyFormatting(htmlContent);
    const replacedText = restoreCodeBlocks(htmlContent, codeBlocks);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${replacedText}
</body>
</html>`;
}

module.exports = { parserHTML };
