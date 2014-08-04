module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('profile', 
  	{id: {
  		type: DataTypes.INTEGER,
  		primaryKey: true,
  		autoIncrement: true
  	},
  	dollarLimit: DataTypes.INTEGER,
  	gender: DataTypes.BOOLEAN,
  	color: DataTypes.ARRAY,
  	





  	}).then(done);
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('profile').then(done);
  }
}

