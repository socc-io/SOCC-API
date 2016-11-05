var express = require('express')
var router = express.Router();
var moim = require('../models/moim')

router.get('/:no', function(req, res, next) {
	var no = req.params.no;
	moim.selectAll(no, function(err, rows) {
		if(err) throw err;
		if(rows.length == 1) {
			res.json(rows[0]);
		}
		else {
			res.json({success:0, msg:'not found'});
		}
	})
});

router.post('/', function(req, res, next) {
	if(req.body.date == undefined) res.json({success:0, msg:'date required'});
	if(req.body.description == undefined) res.json({success:0, msg:'description required'});
	if(req.session.acc == undefined) res.json({success:0, msg:'login required'})
	var date = req.body.date;
	var success = 0;
	if(typeof date == 'string') {
		var s = date.split("-");
		if(s.length == 3) {
			var a = parseInt(s[0]);
			var b = parseInt(s[1]);
			var c = parseInt(s[2]);
			if(1980 <= a && a <= 2200 && 1 <= b && b <= 12 && 1 <= c && c <= 31) {
				moim.insert(req.session.acc.name, req.body.date, req.body.description);
				success = 1;
				res.json({'success':success, 'msg':'successfully registered moim'});
			}
		}
	}
	if(success == 0) {
		res.json({'success':success, 'msg':'failed to register'});
	}
})

module.exports = router;
