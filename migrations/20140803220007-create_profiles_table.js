module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('profiles', 
	  	{id: {
	  		type: DataTypes.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	spendingLimit: DataTypes.INTEGER, // changed from dollarLimit
	  	totalParticipants: DataTypes.INTEGER,// added
	  	gender: DataTypes.BOOLEAN,
	  	color: DataTypes.ARRAY(DataTypes.STRING),
	  	animals: DataTypes.ARRAY(DataTypes.STRING),
	  	books: DataTypes.ARRAY(DataTypes.STRING),
	  	clothes: DataTypes.ARRAY(DataTypes.STRING),
	  	jewelry: DataTypes.ARRAY(DataTypes.STRING),
	  	art: DataTypes.ARRAY(DataTypes.STRING),
	  	food: DataTypes.ARRAY(DataTypes.STRING),
	  	hobbies: DataTypes.ARRAY(DataTypes.STRING),
	  	stores: DataTypes.ARRAY(DataTypes.STRING),
	  	restaurants: DataTypes.ARRAY(DataTypes.STRING),
	  	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE
	  	}).complete(done)
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('profiles').then(done);
  }
}

