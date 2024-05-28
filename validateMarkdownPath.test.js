const { validateMarkdownPath } = require("./validateMarkdownPath");

describe("validateMarkdownPath", () => {
    test("should throw an error if the file is not a Markdown file", async () => {
        await expect(validateMarkdownPath("markdown.notmd")).rejects.toThrow("Not a Markdown file.");
    });
    test("should return path if it's md file and it exists and not empty", async () => {
        const path = "markdown.md";
        const res = await validateMarkdownPath(path);
        expect(res).toBe(path);
    });
    test("shoud trow  an error when the file is empty", async () => {
        validateMarkdownPath("test.md").catch((err) => {
            expect(err).toBeInstanceOf(Error);
        });
    });
    test("should return an error if file doesn't exist", async () => {
        validateMarkdownPath("notExistingFile").catch((err) =>
            expect(err).toBeInstanceOf(Error)
        );
    });
});