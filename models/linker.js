module.exports = function (sequelize, DataTypes){
	var Linker = sequelize.define('linker', {
			groupId: {
  			type: DataTypes.INTEGER,
  			allowNull: false
  		},
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false   
      }
    },
		{
			classMethods: {
				associate: function(db){// tell Group that it hasMany users
					Linker.belongsTo(db.user);
					Linker.belongsTo(db.group);
				}
			}
		});
	return Linker;
};

