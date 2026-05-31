import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<button
			type='button'
			onClick={logout}
			disabled={loading}
			className='btn btn-ghost btn-sm btn-circle text-slate-400 hover:text-red-400 hover:bg-red-500/10 shrink-0'
			aria-label='Log out'
		>
			{loading ? (
				<span className='loading loading-spinner loading-sm' />
			) : (
				<BiLogOut className='w-5 h-5' />
			)}
		</button>
	);
};

export default LogoutButton;
