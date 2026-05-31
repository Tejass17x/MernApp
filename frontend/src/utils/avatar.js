export function getAvatarUrl(user) {
	if (!user) return getDefaultAvatar("male");

	if (user.profilePic) {
		return user.profilePic;
	}

	return getDefaultAvatar(user.gender, user.username);
}

export function getDefaultAvatar(gender = "male", username = "user") {
	const seed = encodeURIComponent(username || "user");

	if (gender === "female") {
		return `https://avatar.iran.liara.run/public/girl?username=${seed}`;
	}

	return `https://avatar.iran.liara.run/public/boy?username=${seed}`;
}
