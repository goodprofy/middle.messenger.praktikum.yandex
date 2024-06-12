const express = require("express");
const path = require("path");

try {
  run();
} catch (err) {
  console.error(err);
}

function run() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, "dist")));

  app.get("/", (_, res) => {
    res.sendFile("index.html");
  });

  app.listen(port, () => {
    console.log(`Server listening at: http://localhost:${port}`);
  });
}
