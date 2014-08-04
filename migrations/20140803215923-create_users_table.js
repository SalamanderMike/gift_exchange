module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('users', 
  		{id: {
  			type: DataTypes.INTEGER,
  			primaryKey: true,
  			autoIncrement: true
  		},
  		username: {
  			type: DataTypes.STRING,
  			allowNull: false
  		},
  		password: {
  			type: DataTypes.STRING,
  			allowNull: false
  		},
  		groupName: {
  			type: DataTypes.STRING,
  			allowNull: false
  		},
  		groupPassword: {
  			type: DataTypes.STRING,
  			allowNull: false
  		},
  		firstname: DataTypes.STRING,
  		lastname: DataTypes.STRING,
  		phone: DataTypes.STRING,
  		commit: {
  			type: DataTypes.BOOLEAN,
  			defaultValue: false
  		},
  		admin: {
  			type: DataTypes.BOOLEAN,
  			defaultValue:false
  		},
  		createdAt: DataTypes.DATE,
  		updatedAt: DataTypes.DATE
  	}).then(done)
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('users').then(done);
  }
}

