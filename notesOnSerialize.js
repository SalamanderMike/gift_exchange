Group.hasMany(User)
User.hasMany(Group)
 
Group.create()...
User.create()...
User.create()...
 
// save them... and then:
group.setUsers([user1, user2]).success(function() {
  // saved!
})
 
// ok now they are saved... how do I get them later on?
group.getUsers().success(function(associatedUsers) {
  // associatedUsers is an array of users
})
 
// You can also pass filters to the getter method.
// They are equal to the options you can pass to a usual finder method.
group.getUsers({ where: 'id > 10' }).success(function(users) {
  // users with an id greater than 10 :)
})
 
// You can also only retrieve certain fields of an associated object.
// This example will retrieve the attributes "title" and "id"
group.getUsers({attributes: ['title']}).success(function(users) {
  // users with an id greater than 10 :)
})
// or
user.getGroup({attributes: ['spendingLimit']}).success(function(groups){
  // to grab the value of spendingLimit
})


//To remove created associations you can just call the set method without a specific id:
// remove the association with user1
group.setUsers([user2]).success(function(associatedUsers) {
  // you will get user2 only
})
 
// remove 'em all
group.setUsers([]).success(function(associatedUsers) {
  // you will get an empty array
})
 
// or remove 'em more directly
group.removeUser(user1).success(function() {
  // it's gone
})
 
// and add 'em again
group.addUser(user1).success(function() {
  // it's back again
})

// You can of course also do it vice versa:
// group is associated with user1 and user2
user2.setGroup(null).success(function() {
  // and it's gone
})
// For hasOne/belongsTo its basically the same:

User.hasOne(User, {as: "Match"})
User#setMatch(aMatch)


// **********1:M Relationship Setup *******************
var User = sequelize.define('User', {})
  , Group = sequelize.define('Group', {})
 
User.hasOne(Group)
Group.belongsTo(User)
 
User.create({}).complete(function(err, user) {
  Group.create({}).complete(function(err, group) {
    // Set the association
    user.setGroup(group).complete(function(err) {
      // Get the association
      user.getGroup().complete(function(err, _group) {
        console.log(_group.values)
        /*
          {
            id: 1,
            createdAt: Sun Dec 08 2013 11:46:42 GMT+0100 (CET),
            updatedAt: Sun Dec 08 2013 11:46:42 GMT+0100 (CET),
            UserId: 1
          }
        */
      })
    })
  })
})


// *****************************May Not Need**************************************
// Adding associations to a relation with a custom join table can be done in two ways 
// (continuing with the associations defined in the previous chapter):

// Either by adding a property with the name of the join table model to the object, 
// before creating the association
group.UserGroups = {
  status: 'active'
}
u.addGroup(group)
 
// Or by providing a second argument when adding the association, containing the data that 
// should go in the join table
u.addGroup(group, { status: 'active' })
 
 
// When associating multiple objects, you can combine the two options above. In this case the second argument
// will be treated as a defaults object, that will be used if no data is provided
group1.UserGroups = {
    status: 'inactive'
}
 
u.setGroups([group1, group2], { status: 'active' })
// The code above will record inactive for group one, and active for group two in the join table
When getting data on an association that has a custom join table, the data from the join table will be returned as a DAO instance:

u.getGroups().success(function(groups) {
  var group = groups[0]
 
  if (group.UserGroups.status === 'active') {
    // .. do magic
 
    // since this is a real DAO instance, you can save it directly after you are done doing magic
    group.UserGroups.save()
  }
})
// If you only need some of the attributes from the join table, you can provide an array 
// with the attributes you want:
// This will select only name from the Groups table, and only status from the UserGroups table
user.getGroups({ attributes: ['name'], joinTableAttributes: ['status']})


