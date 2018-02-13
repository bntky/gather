const {mongoose, databaseUrl, options} = require('../database');

const connectDatabaseAndDropData = async () => {
  await mongoose.connect(databaseUrl, options);
  await mongoose.connection.db.dropDatabase();
};

const diconnectDatabase = async () => {
  await mongoose.disconnect();
};

const fakeId = (id) => {
  return mongoose.Types.ObjectId(id);
};

module.exports = {
  connectDatabaseAndDropData,
  diconnectDatabase,
  fakeId
};
