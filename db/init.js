import mongoose from "mongoose";

const database = "tricklor"; // REPLACE WITH YOUR DB NAME
const uri =
  process.env.URL_CONNECT_MONGO ||
  `mongodb+srv://thai626v:thai626v@cluster0.2bu7ahg.mongodb.net/${database}?retryWrites=true&w=majority`;
const connectMongo = async () => {
  try {
    mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );
  } catch (error) {
    console.log(error);
  }
};
export const dbconnection = mongoose.connection;
export default connectMongo;
