const fs = require("fs").promises;

async function validateMarkdownPath(path) {
    if (!path.endsWith(".md")) {
        console.error("Not a Markdown file.");
        return null;
    }

    try {
        const stats = await fs.stat(path);
        if (stats.isFile() && stats.size > 0) {
            console.log("File on this path with md extension exists and contains data.");
            return path;
        } else {
            console.error("File exists but is empty.");
            return null;
        }
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error("Wrong path to md file.");
        } else {
            console.error("Error reading file:", err);
        }
        return null;
    }
}

module.exports = { validateMarkdownPath };
