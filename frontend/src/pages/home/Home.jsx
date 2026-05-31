import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
	const { selectedConversation } = useConversation();
	const isMobileChatOpen = !!selectedConversation;

	return (
		<div className='flex-1 flex items-stretch justify-center p-0 sm:p-4 md:p-6 min-h-0'>
			<div className='chat-shell'>
				<div
					className={`${
						isMobileChatOpen ? "hidden md:flex" : "flex"
					} w-full md:w-80 lg:w-96 shrink-0 flex-col min-h-0 border-r border-white/10`}
				>
					<Sidebar />
				</div>

				<div
					className={`${
						isMobileChatOpen ? "flex" : "hidden md:flex"
					} flex-1 flex-col min-w-0 min-h-0`}
				>
					<MessageContainer />
				</div>
			</div>
		</div>
	);
};

export default Home;
