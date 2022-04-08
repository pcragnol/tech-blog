const sequelize = require('../config/connection');
const { User, Thread, Comment } = require('../models');

const userData = require('./userData.json');
const threadData = require('./threadData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await Thread.bulkCreate(threadData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
