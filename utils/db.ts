import mongoose from "mongoose";

const connect = async () => {
  if(!process.env.MONGODB_URI) {
    throw new Error(`Connection failed! No mongo db uri has been found`);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw new Error(`Connection failed! ${error}`);
  }
};

export default connect;
