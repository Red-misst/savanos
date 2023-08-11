import mongoose from "mongoose";
const connection = {};

 async function connectDb() {
  if (connection.isConnected) {
    ("Using existing connection");
  }
  if(mongoose.connections.length){
    connection.isConnected = mongoose.connections[0].readyState;
    if(connection.isConnected === 1){
      ("Using existing connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    ("DB Connected");
    connection.isConnected = db.connections[0].readyState;
}

 async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      ("Not disconnecting");
    }
  }
}

const db = { connectDb, disconnectDb };
export default db;