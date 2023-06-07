const axios = require('axios');
require('dotenv').config();
const axiosClient = axios.create({
    baseURL: 'https://api.meaningcloud.com',
    params: {
        key: process.env.APP_KEY,
    },
    maxRedirects: 20
});

async function getSentiment(url, lang = 'en', model='general') {
    return axiosClient.post('/sentiment-2.1', {}, { params: {
        lang,
        url,
        model,
        key: process.env.APP_KEY,
    }});
}
module.exports.getSentiment = getSentiment;
