//Required modules
const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const app = express();

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

//Reading file from computer
let testFile = fs.readFileSync("/Applications/MAMP/htdocs/nft/FRONT/marketplace/africanart/Capture d’écran 2021-12-09 à 23.18.58.png");
//Creating buffer for ipfs function to add file to the system
let testBuffer = new Buffer(testFile);

//Addfile router for adding file a local file to the IPFS network without any local node
app.get('/addfile', function(req, res) {

    ipfs.files.add(testBuffer, function (err, file) {
        if (err) {
          console.log(err);
        }
        console.log(file)
        return res.json({
            error :false ,
            message : "Uploaded with success",
            file : file
        });
      })

})
//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
    let file_hash = req.query.file_hash;

    //This hash is returned hash of addFile router.
    const validCID = file_hash;
    var filesData = [];

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          console.log(file.path)
          filesData.push(file);
          console.log(file.content.toString('utf8'))
        })

        return res.json({
            error :false ,
            message : "Files return with success",
            file_url : "https://gateway.ipfs.io/ipfs/" + file_hash
        });
      })

})

app.listen(3000, () => console.log('App listening on port 3000!'))
