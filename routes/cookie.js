var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const preferences = req.body.preferences;
    res.cookie('userPreferences', preferences, { maxAge: 3600000 }); // Cookie expires in 1 hour
    res.render("cookie/index");
});

router.get('/logout', (req, res) => {
    res.setHeader('Clear-Site-Data', '"cache", "cookies", "storage"')
    res.redirect('/');
})

router.post('/set-preferences', (req, res) => {
    const preferences = req.body.preferences;
    res.cookie('userPreferences', preferences, { maxAge: 3600000 }); // Cookie expires in 1 hour
    res.redirect('/');
});

module.exports = router;
