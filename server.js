const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());


// import database
require("./db/connect");
// import model/collection
require("./models/todoSchema");


//use express.json() to get data into json format 
app.use(express.json());

// import routes
app.use(require("./routes/todoitem"));




// SERVING FRONTEND

const path = require('path')
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});


app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})