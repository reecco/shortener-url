import mongoose from "mongoose";

class Database {
  static async start(connection) {
    try {
      if (!connection) {
        console.log("Database connection error.");
        return;
      }

      await mongoose.connect(connection);
      console.log("Connected to database.")
    } catch (error) {
      console.log(`${error.name}: ${error.message}`);
    }
  }
}

export default Database;