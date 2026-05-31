import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { apiUrl } from "../utils/api";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(apiUrl("/api/auth/signup"), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			if (!res.ok) {
				const contentType = res.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					const data = await res.json();
					throw new Error(data.error || `HTTP Error: ${res.status}`);
				} else {
					throw new Error(`Server Error: ${res.status} ${res.statusText}`);
				}
			}

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message || "Signup failed");
			console.error("Signup error:", error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
