const express = require('express')
const app = express()
const port = 3001;
const bodyParser = require('body-parser');
const { upload } = require('./example');
const cors = require('cors')

const jsonParser = bodyParser.json()

app.use(cors())

app.post("/add", jsonParser, function(req, res){
    if(req.query['key'] != "GIRI_RAJ_APP_1"){
        res.statusCode = 400;
        res.send("Invalid_Key Please contact resource owner !");
    }
    
    upload(req.body).then((value) => {
        res.statusCode = 200;
        res.send(value);
    }, (error) => {
        res.statusCode = 400;
        res.send(error);
    });
});

app.cor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})