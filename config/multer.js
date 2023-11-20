const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileArray = file.originalname.split(".");
    cb(null, fileArray[0] + "-" + uniqueSuffix + ".csv");
  },
});

module.exports = storage;
