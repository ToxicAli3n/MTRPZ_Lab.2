const fs = require("fs").promises;
const { validateCommandLineArgs } = require("./validateCommandLineArgs");
const { validateMarkdownPath } = require("./validateMarkdownPath");
const { parserHTML } = require("./parserHTML");
const { formattingHTML, formattingAnsi } = require("./regexPatterns");

async function main() {
    const args = process.argv.slice(2);
    const commandArgs = validateCommandLineArgs(args);

    if (!commandArgs) return;

    const mdRightPath = await validateMarkdownPath(commandArgs.path);
    if (!mdRightPath) return;

    try {
        const data = await fs.readFile(mdRightPath, "utf-8");
        let convertedMd;
        if (commandArgs.format === "html") {
            convertedMd = parserHTML(data, formattingHTML);
        } else if (commandArgs.format === "ansi") {
            convertedMd = parserHTML(data, formattingAnsi);
        } else if (!commandArgs.format && commandArgs.outputFile) {
            convertedMd = parserHTML(data, formattingHTML);
        } else if (!commandArgs.outputFile && !commandArgs.format) {
            convertedMd = parserHTML(data, formattingAnsi);
        }
        if (commandArgs.outputFile && convertedMd) {
            await fs.writeFile(commandArgs.outputFile);
            console.log("File created and content written successfully.");
        } else {
            console.log(convertedMd);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();
