const { validateCommandLineArgs } = require('./validateCommandLineArgs');

describe("validateCommandLineArgs", () => {
    it("should return error when no path is provided", () => {
        console.log = jest.fn();
        expect(validateCommandLineArgs([])).toBeUndefined();
        expect(console.log).toHaveBeenCalledWith("Error: Please provide a Markdown file.");
    });

    it("should return error for invalid output file extension", () => {
        console.log = jest.fn();
        expect(validateCommandLineArgs(["file.md", "--out", "output.txt"])).toBeUndefined();
        expect(console.log).toHaveBeenCalledWith("Error: Output file must have a .html or .ansi extension.");
    });

    it("should return error when no output file is specified after --out flag", () => {
        console.log = jest.fn();
        expect(validateCommandLineArgs(["file.md", "--out"])).toBeUndefined();
        expect(console.log).toHaveBeenCalledWith("Error: No output file specified after --out flag.");
    });

    it("should return error for invalid format", () => {
        console.log = jest.fn();
        expect(validateCommandLineArgs(["file.md", "--format=pdf"])).toBeUndefined();
        expect(console.log).toHaveBeenCalledWith("Error: Invalid format specified. Please use 'html' or 'ansi'.");
    });

    it("should return correct values when valid arguments are provided", () => {
        expect(validateCommandLineArgs(["file.md", "--out", "output.html"])).toEqual({
            path: "file.md",
            outputFile: "output.html",
            format: "html"
        });

        expect(validateCommandLineArgs(["file.md", "--out", "output.ansi"])).toEqual({
            path: "file.md",
            outputFile: "output.ansi",
            format: "html" // "ansi"
        });

        expect(validateCommandLineArgs(["file.md", "--format=ansi"])).toEqual({
            path: "file.md",
            outputFile: null,
            format: "ansi"
        });

        expect(validateCommandLineArgs(["file.md", "--format=html"])).toEqual({
            path: "file.md",
            outputFile: null,
            format: "html"
        });

        expect(validateCommandLineArgs(["file.md", "--out", "output.html", "--format=ansi"])).toEqual({
            path: "file.md",
            outputFile: "output.html",
            format: "ansi"
        });
    });
});
