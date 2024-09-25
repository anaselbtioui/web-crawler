const router = require("express").Router();
const { crawlPage } = require("../utils/crawl");
const { printReport } = require("../utils/report");

router.get("/", async (req, res) => {
    console.log("called");
    const { url } = req.query;
    try {
        const { tree, pagesCount } = await crawlPage(url, url, {});
        console.log(printReport(pagesCount));
        return res.json(tree);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;