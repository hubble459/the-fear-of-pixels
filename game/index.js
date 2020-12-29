const express = require("express");

const app = express();
app.use(express.static('./website'));
app.listen(80, () => {
    console.log('Listening on http://localhost:80/');
});
