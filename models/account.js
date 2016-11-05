var db = require('./db')

var accountService = {
	makeTable : function() {
		db.serialize(function() {
			db.run('CREATE TABLE IF NOT EXISTS account(\
				no integer primary key autoincrement, \
				id varchar(256) not null, \
				password varchar(256) not null, \
				name varchar(256) not null\
				)');
		})
	},
	insert: function(id, password, name) {
		db.serialize(function() {
			var stmt = db.prepare('INSERT INTO account(id, password, name) values(?, ?, ?)')
			stmt.run(id, password, name);
		});
	},
	selectEach: function(no, callback) {
		db.serialize(function() {
			db.each('SELECT * FROM account WHERE no = ' + no, callback);
		})
	},
	selectAll: function(no, callback) {
		db.serialize(function() {
			db.all('SELECT * FROM account WHERE no = ' + no, callback);
		})
	},
	selectByIdAndPasswordEach: function(id, password, callback) {
		db.serialize(function() {
			var stmt = db.prepare('SELECT * FROM account WHERE id = ? and password = ?');
			stmt.each(id, password, callback)
		})
	},
	selectByIdAndPasswordAll: function(id, password, callback) {
		db.serialize(function() {
			var stmt = db.prepare('SELECT * FROM account WHERE id = ? and password = ?');
			stmt.all(id, password, callback)
		})
	},
	countByIdEach: function(id, callback) {
		db.serialize(function() {
			var stmt = db.prepare('SELECT count(*) as cnt FROM account WHERE id = ?');
			stmt.each(id, callback)
		})
	},
	countByIdAll: function(id, callback) {
		db.serialize(function() {
			var stmt = db.prepare('SELECT count(*) as cnt FROM account WHERE id = ?');
			stmt.all(id, callback)
		})
	},
	delete: function(no) {
		db.serialize(function() {
			db.run('DELETE FROM account WHERE no = ' + no);
		})
	}
}

module.exports = accountService;