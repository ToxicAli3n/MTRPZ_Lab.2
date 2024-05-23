const invalidPatterns = [

    { pattern: /\*\*.*(\`|\_|(\*\*)).*(\`|\_|(\*\*)).*\*\*/g, },
    { pattern: /\_*.*(\`|\_|(\*\*)).*(\`|\_|(\*\*)).*\_/g, },
    { pattern: /\`.*(\`|\_|(\*\*)).*(\`|\_|(\*\*)).*\`/g, },
    { pattern: /(?<=(^| )\*\*)[^**\n]*$/gm, },
    { pattern: /(?<=(^| )\`)[^`\n]*$/gm, },
    { pattern: /(?<=(^| )\_)[^_\n]*$/gm, },

];

module.exports = {invalidPatterns}