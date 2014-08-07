module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('profiles', 
	  	{id: {
	  		type: DataTypes.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	spendingLimit: DataTypes.INTEGER,
	  	groupTotal: DataTypes.INTEGER,
	  	cuisine: DataTypes.ARRAY(DataTypes.STRING),
	  	hobbies: DataTypes.ARRAY(DataTypes.STRING),
	  	stores: DataTypes.ARRAY(DataTypes.STRING),
	  	books: DataTypes.ARRAY(DataTypes.STRING),
	  	clothes: DataTypes.ARRAY(DataTypes.STRING),
	  	art: DataTypes.ARRAY(DataTypes.STRING),
	  	color: DataTypes.ARRAY(DataTypes.STRING),
	  	animals: DataTypes.ARRAY(DataTypes.STRING),
	  	metal: DataTypes.ARRAY(DataTypes.STRING),
	  	elements: DataTypes.ARRAY(DataTypes.STRING),
	  	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE
	  	}).complete(done)
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('profiles').then(done);
  }
}

