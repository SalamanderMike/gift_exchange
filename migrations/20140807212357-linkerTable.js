module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('linkers', 
	  	{
	  	id: {
	  		type: DataTypes.INTEGER,
	  		primaryKey: true,
	  		autoIncrement: true
	  	},
	  	groupId: {
  			type: DataTypes.INTEGER,
  			allowNull: false
  		},
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false   
      },
  		createdAt: DataTypes.DATE,
  		updatedAt: DataTypes.DATE
  	}).complete(done);
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('linkers').complete(done);
  }
};
