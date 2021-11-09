const express = require("express");
const cors = require("cors");

const app = express();

app.options("*", cors());
app.use(cors());
app.use(express.static("build"));

app.listen(9090, function () {
  console.log("CORS-enabled web server listening on port 9090");
});
