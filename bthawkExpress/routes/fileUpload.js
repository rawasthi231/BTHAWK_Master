const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("upload");

router.post("/uploads", upload.single('upload'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
});








// try {
//   var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//       var dir = './uploads';
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//       }
//       //console.log(file);
//       callback(null, dir);
//     },
//     filename: function (req, file, callback) {
//       callback(null, file.originalname);
//     }
//   });

//   var upload = multer({ storage: storage }).array('file', 5);

//   router.post('/upload', (req, res) => {
//     console.log(req.body);
//     upload(req, res, (err) => {
//       if (err) throw err;
//       else {
//         res.send({ "result": "File Uploaded" })
//       }
//     });
//   });

// } catch (e) {
//   console.log(e);
// }


module.exports = router;