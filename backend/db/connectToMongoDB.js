import mongoose from "mongoose";

const connectToMongoDB = async () => {
	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI environment variable is not set");
	}

	await mongoose.connect(process.env.MONGO_URI);
	console.log("Connected to MongoDB");
};

export default connectToMongoDB;
