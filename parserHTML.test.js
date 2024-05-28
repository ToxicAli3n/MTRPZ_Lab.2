const { parserHTML } = require('./parserHTML');
const { formattingHTML, formattingAnsi } = require('./regexPatterns');

describe('parserHTML', () => {
    test('should detect mistakes and throw error for invalid markdown', () => {
        const invalidMarkdown = '**bold';
        expect(() => parserHTML(invalidMarkdown, formattingHTML)).toThrow('Wrong file');
    });

    test('should parse and convert markdown to HTML correctly', () => {
        const markdown = '**bold**\n\n_text_';
        const expectedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p><b>bold</b></p>
<p> <em>text</em> </p>
</body>
</html>`;
        expect(parserHTML(markdown, formattingHTML).replace(/\s+/g, '')).toBe(expectedHTML.replace(/\s+/g, ''));
    });

    test('should parse and convert markdown to ANSI correctly', () => {
        const markdown = '**bold**\n\n_text_';
        const expectedANSI = '\x1b[1mbold\x1b[0m\n\x1b[3mtext\x1b[0m';
        expect(parserHTML(markdown, formattingAnsi).replace(/\s+/g, '')).toBe(expectedANSI.replace(/\s+/g, ''));
    });
});
