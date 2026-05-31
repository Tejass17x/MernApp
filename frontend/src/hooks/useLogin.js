import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { apiUrl } from "../utils/api";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch(apiUrl("/api/auth/login"), {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ username, password }),
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
			toast.error(error.message || "Login failed");
			console.error("Login error:", error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
