const { normalizeURL, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL, strip protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL, strip trailing slash", () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL, capitals", () => {
    const input = "https://BLOG.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL, strip http", () => {
    const input = "http://BLOG.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML", () => {
    const input = `
    <html>  
        <body>
            <a href="https://blog.boot.dev">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;

    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(input, inputBaseUrl);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
});