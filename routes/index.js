var express = require('express');
var router = express.Router();
var user = require('./user/index.js');

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res, next) => {
    res.send('Node Serve')
});

router.use('/user', user);

module.exports = router;
