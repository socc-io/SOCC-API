var express = require('express');
var router = express.Router();
var account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
	if(req.body.id == undefined) res.json({success:0, msg:'id required'})
	else if(req.body.password == undefined) res.json({success:0, msg:'password required'})
	else account.selectByIdAndPasswordAll(req.body.id, req.body.password, function(err, rows) {
		if(err) throw err;
		if(rows.length == 1) {
			var row = rows[0]
			req.session.acc = {
			  	'id': row.id,
			  	'name': row.name,
			  	'no': row.no
			}
			res.json({success:1, msg:'successfully logined'})
		}
		else {
			res.json({success:0, msg:'login failed'});
		}
	})
});

router.post('/signup', function(req, res, next) {
	console.log('Signup Request : ' + JSON.stringify(req.body))
	if(req.body.id == undefined) res.json({success:0, msg:'id required'})
	else if(req.body.password == undefined) res.json({success:0, msg:'password required'})
	else if(req.body.name == undefined) res.json({success:0, msg:'name required'})
	else {
		account.countById(req.body.id, function(err, row) {
			if(err) throw err;
			if(row.cnt != 0) {
				res.json({success:0, msg:'already taken id'});
			}
			else {
				account.insert(req.body.id, req.body.password, req.body.name)
				res.json({success:1, msg:'successfully signed up'})
			}
		})
	}
});
router.post('/logout', function(req, res, next) {
	if(req.session.acc == undefined) {
		res.json({success:0, msg:'you aren\'t logined already'});
	}
	else {
		res.session.acc = undefined;
	}
})
router.get('/whoami', function(req, res, next) {
	if(req.session.acc == undefined) {
		res.json({success:0, msg:'you aren\'t logined'})
	} else {
		res.json(req.session.acc)
	}
})

module.exports = router;
