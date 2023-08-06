import mongoose from "mongoose";
const uri = "mongodb+srv://ahmetulutas:JNRgzJ6g9gnnLA1n@paramtechfe.rmjz2ym.mongodb.net/?retryWrites=true&w=majority";
const connect = async () => {
  if(!uri) {
    throw new Error(`Connection failed! No mongo db uri has been found`);
  }
  try {
    await mongoose.connect(uri);
    console.log("CONNECTED");
  } catch (error) {
    console.log("CONNECTION FAILED")
    throw new Error(`Connection failed! ${error}`);
  }
};

export default connect;
