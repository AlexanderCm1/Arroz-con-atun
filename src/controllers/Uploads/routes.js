const express = require('express');
const router = express.Router();
const uploadController = require('./controller');
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination : path.join(__dirname , 'files'),
    filename : (req,file,cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
  });
  const uploadStorage = multer({storage,
  fileFilter : function (req,file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.pdf')
      {
          return callback(new Error('Only pdf are allowed'));
      }
      callback(null,true);
    }
  
  }
  ).single('file');


router.post('/api/v1/upload', uploadStorage , uploadController.upload)


module.exports = router;
