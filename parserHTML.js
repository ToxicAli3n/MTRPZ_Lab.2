const { HTMLconvert } = require('./HTMLconvert');
const { invalidPatterns } = require('./invalidPatterns');

function detectMistakes(markdown) {
    return invalidPatterns.filter(({ pattern }) => pattern.test(markdown));
}

function extractCodeBlocks(markdown, format) {
    const regex = /\`\`\`([\s\S]+?)\`\`\`/g;
    const matches = [...markdown.matchAll(regex)];
    return matches.map(match => ({
        original: match[0],
        replaced: format.type === 'HTML' ? match[0].replace(regex, "<pre>$1</pre>") : match[0].replace(regex, "\x1b[7m$1\x1b[0m")
    }));
}

function splitParagraphs(markdown, format) {
    const paragraphs = markdown.split(/\n\s*\n/gm).filter(Boolean);
    return paragraphs.map(paragraph => format.type === 'HTML' ? `<p>${paragraph.trim()}</p>` : `${paragraph.trim()}`).join("\n");
}

function applyFormatting(content, formattingPatterns) {
    formattingPatterns.forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, replacement);
    });
    return content;
}

function restoreCodeBlocks(content, matches, format) {
    const regex = format.type === 'HTML' ? /<pre>[\s\S]*?<\/pre>/g : /\x1b\[7m[\s\S]+?\x1b\[0m/g;
    return content.replace(regex, () => {
        const element = matches.shift();
        return element ? element.replaced : '';
    });
}

function parserHTML(markdown, format) {
    const mistakes = detectMistakes(markdown);
    if (mistakes.length > 0) {
        throw Error("Wrong file");
    }

    const codeBlocks = extractCodeBlocks(markdown, format);
    let content = splitParagraphs(markdown, format);
    content = applyFormatting(content, format.regExp);
    const replacedText = restoreCodeBlocks(content, codeBlocks, format);

    return format.type === 'HTML' ? HTMLconvert(replacedText) : replacedText;
}

module.exports = { parserHTML };
