const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const pdfParse = require("pdf-parse");
const os = require("os");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const port = 4001;

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const fileType = req.file.mimetype;

  if (fileType === "application/pdf") {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error reading PDF file." });
      }

      pdfParse(data)
        .then((result) => {
          res.json({ text: result.text });
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error recognizing text from PDF." });
        });
    });
  } else if (fileType.startsWith("image/")) {
    Tesseract.recognize(filePath, "eng", {
      logger: (m) => console.log(m),
      langPath: path.join(__dirname, "tessdata"),
    })
      .then(({ data: { text } }) => {
        res.json({ text });
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error recognizing text from image." });
      });
  } else {
    res.status(400).json({ error: "Unsupported file type." });
  }
});

const getServerIp = () => {
  const ifaces = os.networkInterfaces();
  let ip = "";
  for (let dev in ifaces) {
    ifaces[dev].filter((details) => {
      if (details.family === "IPv4" && !details.internal) {
        ip = details.address;
      }
    });
  }
  return ip;
};

const serverIp = getServerIp();

app
  .listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://${serverIp}:${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
