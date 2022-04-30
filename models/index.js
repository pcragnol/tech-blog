const User = require('./User');
const Thread = require('./Thread');
const Comment = require('./Comment');

User.hasMany(Thread, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Thread.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Thread.hasMany(Comment, {
  foreignKey: 'thread_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Thread, {
  foreignKey: 'thread_id'
});

module.exports = { User, Thread, Comment };
