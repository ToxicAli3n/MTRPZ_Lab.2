function validateCommandLineArgs(args) {
    const path = args[0];
    if (!path) {
        console.log("Error: Please provide a Markdown file.");
        return;
    }

    let outputFile = null;

    if (args[1] === "--out") {
        if (args[2]) {
            if (args[2].endsWith(".html")) {
                outputFile = args[2];
            } else {
                console.log("Error: Output file must have a .html extension.");
                return;
            }
        } else {
            console.log("Error: No output file specified after --out flag.");
            return;
        }
    } else {
        console.log("Error: Missing --out flag or incorrect usage.");
        return;
    }

    return { path, outputFile };
}

module.exports = { validateCommandLineArgs };
