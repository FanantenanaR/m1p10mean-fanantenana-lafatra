var express = require('express');
var router = express.Router();

router.get("/login", (request, response) => {
    response.send("login");
});

module.exports = router;