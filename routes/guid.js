var express = require('express');
var router = express.Router();
var uid = require('uid-safe');

// TODO: this needs to do JWT auth, f.e. the mechanism here is of course breakable */
router.get('/', function(req, res, next) {
	var strUid = uid.sync(18);
	res.json({guid: strUid});
});

module.exports = router;
