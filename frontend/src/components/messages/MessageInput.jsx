import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message.trim());
		setMessage("");
	};

	return (
		<form
			className='shrink-0 px-3 sm:px-4 py-3 border-t border-white/10 bg-slate-900/50 safe-bottom'
			onSubmit={handleSubmit}
		>
			<div className='flex items-center gap-2'>
				<input
					type='text'
					className='flex-1 min-w-0 rounded-xl px-4 py-2.5 text-sm bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition'
					placeholder='Type a message…'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type='submit'
					disabled={loading || !message.trim()}
					className='btn btn-circle btn-sm sm:btn-md bg-sky-500 hover:bg-sky-400 border-0 text-white disabled:opacity-40 shrink-0'
					aria-label='Send message'
				>
					{loading ? <span className='loading loading-spinner loading-sm' /> : <BsSend className='w-4 h-4' />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
