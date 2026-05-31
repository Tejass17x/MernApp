import { useAuthContext } from "../../context/AuthContext";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	const { authUser } = useAuthContext();

	return (
		<div className='flex flex-col h-full min-h-0 p-3 sm:p-4 gap-3'>
			<div className='flex items-center gap-3 pb-1'>
				<div className='avatar online'>
					<div className='w-11 h-11 rounded-full ring-2 ring-sky-500/50 ring-offset-2 ring-offset-slate-900'>
						<img src={authUser.profilePic} alt={authUser.fullName} />
					</div>
				</div>
				<div className='min-w-0 flex-1'>
					<p className='font-semibold text-white truncate'>{authUser.fullName}</p>
					<p className='text-xs text-slate-400 truncate'>@{authUser.username}</p>
				</div>
				<LogoutButton />
			</div>

			<SearchInput />

			<div className='flex-1 min-h-0 overflow-hidden flex flex-col'>
				<p className='text-xs font-medium uppercase tracking-wider text-slate-500 px-1 mb-2'>
					Messages
				</p>
				<Conversations />
			</div>
		</div>
	);
};

export default Sidebar;
