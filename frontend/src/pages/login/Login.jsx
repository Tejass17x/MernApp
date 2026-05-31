import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='auth-card'>
			<div className='text-center mb-6 sm:mb-8'>
				<h1 className='text-2xl sm:text-3xl font-bold text-white'>
					Welcome back to <span className='text-sky-400'>ChatApp</span>
				</h1>
				<p className='text-sm text-slate-400 mt-2'>Sign in to continue messaging</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-slate-300 mb-1.5'>Username</label>
					<input
						type='text'
						placeholder='Enter username'
						className='w-full rounded-xl px-4 py-2.5 text-sm bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete='username'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-slate-300 mb-1.5'>Password</label>
					<input
						type='password'
						placeholder='Enter password'
						className='w-full rounded-xl px-4 py-2.5 text-sm bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='current-password'
					/>
				</div>

				<button
					type='submit'
					disabled={loading}
					className='w-full btn bg-sky-500 hover:bg-sky-400 border-0 text-white rounded-xl mt-2 h-11'
				>
					{loading ? <span className='loading loading-spinner loading-sm' /> : "Sign In"}
				</button>
			</form>

			<p className='text-center text-sm text-slate-400 mt-6'>
				{"Don't have an account? "}
				<Link to='/signup' className='text-sky-400 hover:text-sky-300 font-medium'>
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default Login;
