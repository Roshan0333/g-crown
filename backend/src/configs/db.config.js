import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        let db = await mongoose.connect(process.env.MongoDB_URl);
        console.log("Your Database Connect SuccessFully");
        return db;
    }
    catch (err) {
        console.log(`Database Connection Falid: ${err.message}`);
    }
};

export default dbConnection;