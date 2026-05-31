import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	if (loading) {
		return (
			<div className='flex-1 flex items-center justify-center py-8'>
				<span className='loading loading-spinner loading-md text-sky-400' />
			</div>
		);
	}

	if (conversations.length === 0) {
		return (
			<div className='flex-1 flex items-center justify-center py-8 px-4'>
				<p className='text-sm text-slate-400 text-center'>No other users yet. Invite friends to join!</p>
			</div>
		);
	}

	return (
		<div className='flex-1 overflow-y-auto space-y-0.5 pr-0.5 -mr-0.5'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}
		</div>
	);
};

export default Conversations;
