const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");


/**to do list to move */
/** db */


/** routes */

// app.post("/api/saved", (req, res) => {
//   var article = req.body
  

//   Article.create(article)
//   .then(() => {
//     res.json(article)
//   })
//   .catch((err) => {
//     res.json(err)
//   })
// })

// app.get("/api/saved", (req,res) => {
//   Article.find({}).then(articles => res.json(articles))
// })
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
