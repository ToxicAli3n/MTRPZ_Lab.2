const fs = require("fs").promises;
const { validateMarkdownPath } = require("./validateMarkdownPath");
const { parserHTML } = require("./parserHTML");
const { validateCommandLineArgs } = require("./validateCommandLineArgs");

async function main() {
    const args = process.argv.slice(2);
    const commandArgs = validateCommandLineArgs(args);

    if (!commandArgs) return;

    const mdRightPath = await validateMarkdownPath(commandArgs.path);
    if (!mdRightPath) return;

    try {
        const data = await fs.readFile(mdRightPath, "utf-8");
        const html = parserHTML(data);

        if (commandArgs.outputFile) {
            await fs.writeFile(commandArgs.outputFile, html);
            console.log("Successful creation of file with written content.");
        } else {
            console.log(html);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();
