const express = require('express');
const rootController = require('../controllers/root-controller')
const Router = express.Router();
const multer = require('multer');
const storage = require('../config/multer')
const middleware = require('../middlewares/middleware')
const upload = multer({
   storage : storage
})
Router.get("/" ,  rootController.renderHomePage)
Router.post("/upload-csv" ,  upload.single('csv') , rootController.uploadFile)
Router.get("/file-csv/:name" , rootController.getFileDetails)

module.exports = Router;