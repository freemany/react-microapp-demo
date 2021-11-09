const express = require("express");
const app = express();

app.use(express.static("src"));

app.listen(9999, function () {
  console.log("Web server listening on port 9999");
});
