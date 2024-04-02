import mongoose from"mongoose" ;

const connectDb=async (): Promise<void>=>{
    try{
        await
      mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    }catch(error){
        console.log(error);
        throw  error("Error connecting");
    }
}

export default connectDb;