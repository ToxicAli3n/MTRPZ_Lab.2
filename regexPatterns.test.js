const { formattingHTML, formattingAnsi } = require('./regexPatterns');

describe('formattingHTML RegExp Patterns', () => {
    test('should replace markdown code blocks with HTML <pre> tags', () => {
        const markdown = '```code```';
        const result = markdown.replace(formattingHTML.regExp[0].pattern, formattingHTML.regExp[0].replacement);
        expect(result).toBe('<pre>code</pre>');
    });

    test('should replace empty lines with <p></p> tags', () => {
        const markdown = '\n\n';
        const result = markdown.replace(formattingHTML.regExp[1].pattern, formattingHTML.regExp[1].replacement);
        expect(result).toBe('<p></p><p></p>');
    });

    test('should replace double asterisks with <b> tags', () => {
        const markdown = '**bold**';
        const result = markdown.replace(formattingHTML.regExp[2].pattern, formattingHTML.regExp[2].replacement);
        expect(result).toBe('<b>bold</b>');
    });

    test('should replace single underscores with <em> tags', () => {
        const markdown = '_italic_';
        const result = markdown.replace(formattingHTML.regExp[4].pattern, formattingHTML.regExp[4].replacement);
        expect(result).toBe(' <em>italic</em> ');
    });

    test('should replace single backticks with <tt> tags', () => {
        const markdown = '`code`';
        const result = markdown.replace(formattingHTML.regExp[6].pattern, formattingHTML.regExp[6].replacement);
        expect(result).toBe(' <tt>code</tt> ');
    });
});

describe('formattingAnsi RegExp Patterns', () => {
    test('should replace markdown code blocks with ANSI preformatted text', () => {
        const markdown = '```code```';
        const result = markdown.replace(formattingAnsi.regExp[0].pattern, formattingAnsi.regExp[0].replacement);
        expect(result).toBe('\x1b[7mPREFORMATED_PLACEHOLDERcodePREFORMATED_PLACEHOLDER\x1b[0m');
    });

    test('should replace double asterisks with ANSI bold text', () => {
        const markdown = '**bold**';
        const result = markdown.replace(formattingAnsi.regExp[1].pattern, formattingAnsi.regExp[1].replacement);
        expect(result).toBe('\x1b[1mbold\x1b[0m');
    });

    test('should replace single underscores with ANSI italic text', () => {
        const markdown = '_italic_';
        const result = markdown.replace(formattingAnsi.regExp[3].pattern, formattingAnsi.regExp[3].replacement);
        expect(result).toBe('\x1b[3mitalic\x1b[0m');
    });

    test('should replace single backticks with ANSI preformatted text', () => {
        const markdown = '`code`';
        const result = markdown.replace(formattingAnsi.regExp[5].pattern, formattingAnsi.regExp[5].replacement);
        expect(result).toBe('\x1b[7mcode\x1b[0m');
    });
});
