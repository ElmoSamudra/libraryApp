const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();
app.use(cors());

// set the view engine
app.set('view engine', 'pug');

// test express where the static files are kept
app.use(express.static(__dirname + '/public'));



require("./models");

// use the body-parser middleware, which parses request bodies into req.body
// support parsing of json
app.use(bodyParser.json());
// support parsing of urlencoded bodies (e.g. for forms)
app.use(bodyParser.urlencoded({ extended: false  }));

// GET home page
app.get("/", (req, res) => {
    res.render('index', {
        title: 'Library App'
    });
});

// handle author-management related requests
// first import the author router
const authorRouter = require("./routes/authorRouter");

// the author routes are added onto the end of '/author-management'
app.use("/author-management", authorRouter);

// start app and listen for incoming requests on port
app.listen(process.env.PORT || 3000, () => {
  console.log("The library app is running!");
});

