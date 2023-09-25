const express = require('express');
const app = express();
const port = 8000;

// Setup views engine
app.set('view engine', 'ejs');
app.set('views', './views');
// Use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err) {
    if (err) {
        // console.log("Error", err);
        console.log(`Error : ${err}`);
    }

    console.log(`Server Working Properly on port : ${port}`);
});

