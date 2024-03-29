const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const imageFileTypes = /jpeg|jpg|png/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "..", "images");

    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        return fs.mkdir(dir, { recursive: true }, (err) => {
          cb(err, dir);
        });
      }
      cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);

    const hash = crypto
      .createHash("sha256")
      .update(file.originalname)
      .digest("hex");

    const date = new Date().toISOString().replace(/:/g, "-");

    cb(null, `${file.fieldname}-${hash}-${date}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (imageFileTypes.test(ext)) {
    return cb(null, true);
  }
  cb(new Error("Only images are allowed"), false);
};

const fileValidation = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: "Image file is required." });
  }
  next();
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
}).single("file");

const handleUpload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ message: err.message });
    } else if (err) {
      return res.status(400).send({ message: err.message });
    }
    next();
  });
};

module.exports = {
  upload: handleUpload,
  fileValidation,
};
