const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://prachighadge26_db_user:BmkD7TrLHe8s38JP@ac-ty9flf9-shard-00-00.lbtnxok.mongodb.net:27017,ac-ty9flf9-shard-00-01.lbtnxok.mongodb.net:27017,ac-ty9flf9-shard-00-02.lbtnxok.mongodb.net:27017/?ssl=true&replicaSet=atlas-e7hi93-shard-0&authSource=admin&appName=Cluster2");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;