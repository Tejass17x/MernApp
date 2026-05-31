import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
	try {
		if (!process.env.MONGO_URI) {
			throw new Error("MONGO_URI environment variable is not set");
		}
		
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		
		console.log("✓ Connected to MongoDB");
	} catch (error) {
		console.error("✗ Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};

export default connectToMongoDB;
