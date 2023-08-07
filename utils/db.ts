import mongoose from "mongoose";

const connect = async () => {
  if(!process.env.MONGODB_URI) {
    throw new Error(`Connection failed! No mongo db uri has been found`);
  }
  else {
    const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri);
  } catch (error) {
    throw new Error(`Connection failed! ${error}`);
  }
   }
};

export default connect;
