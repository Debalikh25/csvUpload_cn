const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parse").parse;

const filesDirectory = path.join(__dirname, "../uploads");

//GET -> Renders the home page of the app
module.exports.renderHomePage = (req, res) => {
  fs.readdir(filesDirectory, (err, files) => {
    if (err) {
      console.log(err);
      return res.render("home", {
        title: "Upload CSV",
      });
    }
    return res.render("home", {
      title: "Upload CSV",
      csvFiles: files,
    });
  });
};

//POST -> User uploads csv file. The file gets saved in the system using multer middleware. Saving the file Path in DB.
module.exports.uploadFile = (req, res) => {
  const data = fs.readFileSync(req.file.path);
    
  return res.redirect("back");
};

//GET -> Getting the file using fs and parsing it using csv-parser and rendering
module.exports.getFileDetails = (req, res) => {
  const fileName = req.params.name;

  const data = fs.readFileSync(path.join(__dirname, "../uploads/", fileName));

  //reading the csv file using csv-parser. It accepts a callback with an error and records
  csvParser(data, (err, records) => {
    if (err) {
      console.error(err);
      return res.redirect("back");
    }

    const headers = records[0];
    records.shift(); // deleting the header array from records

    return res.render("file", {
      title: "File Details",
      headers: headers,
      records: records,
    });
  });
};
