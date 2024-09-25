const express = require("express");
const app = express();
const crawlRouter = require("./routes/crawl");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/crawl", crawlRouter);

app.listen(3001, () => console.log('====> API running on http://localhost:3001'));