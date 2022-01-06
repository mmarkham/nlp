const path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require("node-fetch");
let apiData;
let projectData;

const dotenv = require('dotenv');
dotenv.config({path: '.env'});

console.log(`Your API key is ${process.env.API_KEY}`);
const baseURL = "https://api.meaningcloud.com/sentiment-2.1?key=";
const apiKey = `${process.env.API_KEY}&of=json&txt=`;
const lang = '&lang=auto';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
    // res.sendFile(path.resolve('src/client/views/index.html'));
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});

// GET route
app.get('/all', sendData);
function sendData (req, res) {
  res.send(projectData);
};

// POST data
app.post('/addData', addData);
function addData (req,res){
    let newEntry = req.body.ft;
    console.log(newEntry);
    apiData = retrieveData(baseURL, apiKey, newEntry, lang)
    .then(function(apiData){
      projectData = {data: apiData};
      console.log(projectData);
      res.send(projectData);
    })
};

// Async GET
const retrieveData = async (url, key, text, lang) =>{
  console.log(url+key+text+lang);
  const request = await fetch(url+key+text+lang);
  try {
  // Transform into JSON
  const allData = await request.json()
  return allData;
  }
  catch(error) {
    console.log("error", error);
  }
};


