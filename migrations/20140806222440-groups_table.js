module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('groups', 
	  	{id: {
	  		type: DataTypes.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	groupName: {
  			type: DataTypes.STRING,
  			allowNull: false
  		},
  		groupID: {
  			type: DataTypes.STRING,
  			allowNull: false
  		},
	  	spendingLimit: DataTypes.INTEGER,
	  	groupTotal: DataTypes.INTEGER,
	  	admin: {
  			type: DataTypes.INTEGER,
  			allowNull: false
  		},
	  	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE
	  	}).complete(done)
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('groups').then(done);
  }
}

