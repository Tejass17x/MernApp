import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	const isProduction = process.env.NODE_ENV === "production";
	const isCrossOrigin = Boolean(process.env.CLIENT_URL);

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: isCrossOrigin && isProduction ? "none" : "strict",
		secure: isProduction,
	});
};

export default generateTokenAndSetCookie;
