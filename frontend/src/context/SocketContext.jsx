import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import { API_BASE } from "../utils/api";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (!authUser) {
			setSocket(null);
			return;
		}

		const socketInstance = io(API_BASE || undefined, {
			query: { userId: authUser._id },
			withCredentials: true,
		});

		socketInstance.on("getOnlineUsers", setOnlineUsers);
		setSocket(socketInstance);

		return () => socketInstance.close();
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
