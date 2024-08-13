const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const os = require("os")
const path = require("path");
const port = 4000;

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;

  Tesseract.recognize(imagePath, "eng", {
    logger: (m) => console.log(m),
  })
    .then(({ data: { text } }) => {
      res.json({ text });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error recognizing text." });
    });
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
