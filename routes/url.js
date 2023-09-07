const express = require('express');
const router = express.Router();
const {handleGenerateNewShortUrl, handleGetAnalytics} = require('../controller/url')

router.post('/',handleGenerateNewShortUrl)

router.get('/analytics', handleGetAnalytics )

module.exports = router;