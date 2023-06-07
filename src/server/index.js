var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js');
const { getSentiment } = require('./api.js');

const app = express();

app.use(cors());
app.use(express.static('dist'));
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'));
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/sentiment', async function(req, res) {
    const { url, lang, model } = req.query;
    const sentiment = await getSentiment(url, lang, model);
    res.send(sentiment.data);
});
