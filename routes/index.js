require('dotenv').config()
var express = require('express');
var router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt')
const File = require('../models/File');


const upload = multer({ dest: "uploads" })
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'New Share | Share securely' });
});

router.post('/upload', upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  }
  if (req.body.password != null && req.body.password !== "") {
    fileData.password = await bcrypt.hash(req.body.password, 10)
  }

  const file = await File.create(fileData)
  res.render('index', { fileLink: `${process.env.APP_BASE_URL}/file/${file.id}` , title: 'New Share | Share securely'} )

})



module.exports = router;
