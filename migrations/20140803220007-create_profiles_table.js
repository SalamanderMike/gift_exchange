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
  	animals: DataTypes.ARRAY,
  	books: DataTypes.ARRAY,
  	clothes: DataTypes.ARRAY,
  	jewelry: DataTypes.ARRAY,
  	art: DataTypes.ARRAY,
  	food: DataTypes.ARRAY,
  	hobbies: DataTypes.ARRAY,
  	stores: DataTypes.ARRAY,
  	restaurants: DataTypes.ARRAY
  	}).then(done);
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('profile').then(done);
  }
}

