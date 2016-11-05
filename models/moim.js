var db = require('./db')

var moimService = {
	makeTable: function() {
		db.serialize(function() {
			db.run('CREATE TABLE IF NOT EXISTS moim(\
				no integer primary key autoincrement,\
				author varchar(256),\
				date date not null unique,\
				description varchar(512))');
		})
	},
	insert: function(author, date, description) {
		db.serialize(function() {
			var stmt = db.prepare('INSERT INTO moim(author, date, description) VALUES(?, ?, ?)')
			stmt.run(author, date, description)
		})
	},
	delete: function(no) {
		db.serialize(function() {
			var stmt = db.prepare('DELETE FROM moim WHERE no = ?')
			stmt.run(no);
		})
	},
	modifyDescription: function(no, description) {
		db.serialize(function() {
			var stmt = db.prepare('UPDATE moim SET description = ? WHERE no = ?')
			stmt.run(description, no);
		})
	},
	selectAll: function(no, callback) {
		db.serialize(function() {
			var stmt = db.prepare('SELECT * FROM moim WHERE no = ?')
			stmt.all(no, callback);
		})
	}
}

module.exports = moimService;