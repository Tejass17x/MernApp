import { useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	if (!selectedConversation) {
		return <NoChatSelected />;
	}

	return (
		<div className='flex flex-col h-full min-h-0'>
			<ChatHeader
				conversation={selectedConversation}
				onBack={() => setSelectedConversation(null)}
			/>
			<Messages />
			<MessageInput />
		</div>
	);
};

const ChatHeader = ({ conversation, onBack }) => {
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<div className='flex items-center gap-3 px-3 sm:px-4 py-3 border-b border-white/10 bg-slate-800/60 shrink-0'>
			<button
				type='button'
				onClick={onBack}
				className='md:hidden btn btn-ghost btn-sm btn-circle text-slate-300 hover:text-white'
				aria-label='Back to conversations'
			>
				<IoArrowBack className='w-5 h-5' />
			</button>

			<div className={`avatar ${isOnline ? "online" : ""}`}>
				<div className='w-10 h-10 rounded-full'>
					<img src={conversation.profilePic} alt={conversation.fullName} />
				</div>
			</div>

			<div className='min-w-0 flex-1'>
				<p className='font-semibold text-white truncate'>{conversation.fullName}</p>
				<p className='text-xs text-slate-400'>{isOnline ? "Online" : "Offline"}</p>
			</div>
		</div>
	);
};

const NoChatSelected = () => {
	const { authUser } = useAuthContext();

	return (
		<div className='hidden md:flex flex-col items-center justify-center h-full min-h-[320px] p-6 text-center'>
			<div className='glass-panel rounded-2xl p-8 max-w-sm animate-fade-in'>
				<TiMessages className='text-5xl text-sky-400 mx-auto mb-4' />
				<p className='text-lg font-semibold text-white mb-1'>Welcome, {authUser.fullName}</p>
				<p className='text-sm text-slate-400'>Select a conversation from the sidebar to start chatting</p>
			</div>
		</div>
	);
};

export default MessageContainer;
