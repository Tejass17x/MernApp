import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-4 space-y-1'>
			{loading &&
				[...Array(3)].map((_, idx) => (
					<div key={idx} className='py-2'>
						<MessageSkeleton />
					</div>
				))}

			{!loading && messages.length === 0 && (
				<div className='flex items-center justify-center h-full min-h-[200px]'>
					<p className='text-sm text-slate-400 text-center px-4'>
						No messages yet. Say hello to start the conversation!
					</p>
				</div>
			)}

			{!loading &&
				messages.length > 0 &&
				messages.map((message, index) => (
					<div
						key={message._id}
						ref={index === messages.length - 1 ? lastMessageRef : null}
					>
						<Message message={message} />
					</div>
				))}
		</div>
	);
};

export default Messages;
