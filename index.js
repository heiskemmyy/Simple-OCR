const https = require('https');
const express = require("express");
const multer = require("multer");
const Tess = require("tesseract.js");
const os = require("os");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const port = 4001;

const app = express();

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const upload = multer({ dest: uploadDir });

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const key = fs.readFileSync('key.pem');
const cert = fs.readFileSync('cert.pem');

const httpsServer = https.createServer({ key, cert }, app);

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const fileType = req.file.mimetype;

  if (fileType.startsWith("image/")) {
    Tess.recognize(filePath, "eng", {
      logger: (m) => console.log(m),
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
    res
      .status(400)
      .json({ error: "Unsupported file type. Please upload an image." });
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

app.get("/server-ip", (req, res) => {
  res.json({ ip: serverIp });
});

httpsServer.listen(4001, () => {
  console.log('HTTPS server running on port 4001');
});

app
  .listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://${serverIp}:${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
