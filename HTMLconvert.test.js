const { HTMLconvert } = require('./HTMLconvert');

describe('HTMLconvert', () => {
    test('should wrap provided HTML tags in a complete HTML document structure', () => {
        const htmlTags = '<p>Test</p>';
        const expectedOutput = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>Test</p>
</body>
</html>`;
        expect(HTMLconvert(htmlTags).replace(/\s+/g, '')).toBe(expectedOutput.replace(/\s+/g, ''));
    });
});