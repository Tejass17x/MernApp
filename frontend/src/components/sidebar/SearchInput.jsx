import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			toast.error("No such user found!");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2 shrink-0'>
			<input
				type='search'
				placeholder='Search users…'
				className='flex-1 min-w-0 rounded-xl px-3.5 py-2.5 text-sm bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				type='submit'
				className='btn btn-circle btn-sm bg-sky-500 hover:bg-sky-400 border-0 text-white shrink-0'
				aria-label='Search'
			>
				<IoSearchSharp className='w-5 h-5' />
			</button>
		</form>
	);
};

export default SearchInput;
