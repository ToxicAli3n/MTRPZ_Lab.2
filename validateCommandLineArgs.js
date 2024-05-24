function validateCommandLineArgs(args) {
    const path = args[0];
    if (!path) {
        console.log("Error: Please provide a Markdown file.");
        return;
    }

    let outputFile = null;
    let format = 'html';

    for (let i = 1; i < args.length; i++) {
        if (args[i] === "--out") {
            if (args[i + 1]) {
                if (args[i + 1].endsWith(".html") || args[i + 1].endsWith(".ansi")) {
                    outputFile = args[i + 1];
                    if (args[i + 1].endsWith(".ansi")) {
                        format = 'ansi';
                    }
                } else {
                    console.log("Error: Output file must have a .html or .ansi extension.");
                    return;
                }
            } else {
                console.log("Error: No output file specified after --out flag.");
                return;
            }
        } else if (args[i].startsWith("--format=")) {
            const formatValue = args[i].split("=")[1];
            if (formatValue !== "html" && formatValue !== "ansi") {
                console.log("Error: Invalid format specified. Please use 'html' or 'ansi'.");
                return;
            }
            format = formatValue;
        }
    }

    return { path, outputFile, format };
}

module.exports = { validateCommandLineArgs };
