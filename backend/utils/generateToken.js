import jwt from "jsonwebtoken";
import { CLIENT_URL } from "../config/env.js";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	const isProduction = process.env.NODE_ENV === "production";
	const isCrossOrigin = Boolean(CLIENT_URL);

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: isCrossOrigin && isProduction ? "none" : "strict",
		secure: isProduction,
	});
};

export default generateTokenAndSetCookie;
