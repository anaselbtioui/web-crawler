const printReport = (pages) => {
    console.log("==========");
    console.log("REPORT");
    console.log("==========");
    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to page: ${url}`);
    };
    console.log("==========");
    console.log("END REPORT");
    console.log("==========");
};

const sortPages = (pages) => {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        const aHits = a[1];
        const bHits = b[1];
        return bHits - aHits;
    });
    return pagesArr;
};

module.exports = {
    sortPages,
    printReport
};