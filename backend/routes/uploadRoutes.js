const express = require("express");
const multer = require("multer");
const File = require("../models/File");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.array("files"),
  async (req, res) => {

    try {

      const savedFiles = [];

      for (const file of req.files) {

        const newFile = new File({
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
        });

        await newFile.save();

        savedFiles.push(newFile);
      }

      res.status(200).json({
        message: "Files uploaded successfully",
        files: savedFiles,
      });

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;