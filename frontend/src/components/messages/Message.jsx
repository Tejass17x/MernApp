import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import UserAvatar from "../common/UserAvatar";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const shakeClass = message.shouldShake ? "shake" : "";
	const sender = fromMe ? authUser : selectedConversation;

	return (
		<div className={`flex gap-2 sm:gap-3 mb-3 ${fromMe ? "flex-row-reverse" : "flex-row"}`}>
			<UserAvatar user={sender} size='xs' />

			<div
				className={`flex flex-col max-w-[75%] xs:max-w-[80%] sm:max-w-[70%] ${
					fromMe ? "items-end" : "items-start"
				}`}
			>
				<div
					className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${shakeClass} ${
						fromMe
							? "bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-br-md shadow-md shadow-sky-500/10"
							: "bg-slate-700/90 text-slate-100 rounded-bl-md border border-white/5"
					}`}
				>
					{message.message}
				</div>
				<span className='text-[10px] sm:text-xs text-slate-500 mt-1 px-1'>{formattedTime}</span>
			</div>
		</div>
	);
};

export default Message;
