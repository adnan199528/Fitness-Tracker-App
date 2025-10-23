const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://samad:12345@samadcluster.1mb1wox.mongodb.net/eproject?retryWrites=true&w=majority&appName=samadCluster");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;  // ✅ yahan bas export ho, call na ho

