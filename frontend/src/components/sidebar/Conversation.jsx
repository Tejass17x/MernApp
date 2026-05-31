import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import UserAvatar from "../common/UserAvatar";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<button
				type='button'
				onClick={() => setSelectedConversation(conversation)}
				className={`w-full flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-150 text-left ${
					isSelected
						? "bg-sky-500/20 border border-sky-500/30"
						: "hover:bg-white/5 border border-transparent active:scale-[0.98]"
				}`}
			>
				<UserAvatar user={conversation} size='md' online={isOnline} />

				<div className='min-w-0 flex-1'>
					<div className='flex items-center justify-between gap-2'>
						<p className='font-medium text-white truncate'>{conversation.fullName}</p>
						<span className='text-base shrink-0' aria-hidden='true'>
							{emoji}
						</span>
					</div>
					<p className='text-xs text-slate-400 truncate'>@{conversation.username}</p>
				</div>
			</button>

			{!lastIdx && <div className='h-px bg-white/5 mx-2 my-0.5' />}
		</>
	);
};

export default Conversation;
