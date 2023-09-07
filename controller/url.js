const shortid = require('shortid')
const URL = require('../model/url') //imported the schema

async function handleGenerateNewShortUrl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
    const shortID = shortid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],

    });

    return res.json({id: shortID})
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.Id;
    const result = await URL.findOne({shortId})
    return res.json({
        totalClicks:XPathResult.visitHistory.length,
        analytics: result.visitHistory})
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}