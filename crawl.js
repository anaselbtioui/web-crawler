const { JSDOM } = require("jsdom");

const crawlPage = async (baseURL, currentURL, pages) => {
    // are we working with an external link?
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    };

    // how many times we have encountered a page in thesame website
    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    };

    pages[normalizedCurrentURL] = 1;


    console.log(`actively crawling: ${currentURL}`)
    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399) {
            console.error(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages;
        };

        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.error(`non html response, content type: ${contentType} on page: ${currentURL}`)
            return pages;
        };

        const htmlBody = await resp.text();
        
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);
        
        for (const nextURL of nextURLs) {
           pages = await crawlPage(baseURL, nextURL, pages); 
        };
    } catch (error) {
        console.error(error.message);
        return pages;
    };
    return pages;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === "/") {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            //absolute
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(error.message);
            }
        };
    };
    return urls;
};

const normalizeURL = (urlString) => {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    };
    return hostPath;
};

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};