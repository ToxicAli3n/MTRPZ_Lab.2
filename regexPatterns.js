const formattingHTML = {
    type: "HTML",
    regExp: [
        {pattern: /\`\`\`([\s\S]+?)\`\`\`/g, replacement: "<pre>$1</pre>"},
        {pattern: /^\s*$/gm, replacement: "<p></p>"},
        {pattern: /\*\*([^ ].*[^ ])\*\*/g, replacement: "<b>$1</b>",},
        {pattern: /\*\*([^ ])\*\*/g, replacement: "<b>$1</b>",},
        {pattern: /\_([^ ].*[^ ])\_/g, replacement: " <em>$1</em> "},
        {pattern: /\_([^ ])\_/g, replacement: " <em>$1</em> "},
        {pattern: /\`([^ ].*[^ ])\`/g, replacement: " <tt>$1</tt> "},
        {pattern: /\`([^ ])\`/g, replacement: " <tt>$1</tt> "},
    ],
};

const formattingAnsi = {
    type: "ANSI",
    regExp: [
        {
            pattern: /\`\`\`([\s\S]+?)\`\`\`/g,
            replacement:
                "\x1b[7mPREFORMATED_PLACEHOLDER$1PREFORMATED_PLACEHOLDER\x1b[0m",
        },
        { pattern: /\*\*([^ ].*[^ ])\*\*/g, replacement: "\x1b[1m$1\x1b[0m", },
        { pattern: /\*\*([^ ])\*\*/g, replacement: "\x1b[1m$1\x1b[0m", },
        { pattern: /\_([^ ].*[^ ])\_/g, replacement: "\x1b[3m$1\x1b[0m" },
        { pattern: /\_([^ ])\_/g, replacement: "\x1b[3m$1\x1b[0m" },
        { pattern: /\`([^ ].*[^ ])\`/g, replacement: "\x1b[7m$1\x1b[0m" },
        { pattern: /\`([^ ])\`/g, replacement: "\x1b[7m$1\x1b[0m" },
    ],
};

module.exports = { formattingHTML, formattingAnsi }