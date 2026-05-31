import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='auth-card my-4 sm:my-0'>
			<div className='text-center mb-5 sm:mb-6'>
				<h1 className='text-2xl sm:text-3xl font-bold text-white'>
					Join <span className='text-sky-400'>ChatApp</span>
				</h1>
				<p className='text-sm text-slate-400 mt-2'>Create an account to start chatting</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
				<div>
					<label className='block text-sm font-medium text-slate-300 mb-1.5'>Full Name</label>
					<input
						type='text'
						placeholder='John Doe'
						className='w-full rounded-xl px-4 py-2.5 text-sm bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
						value={inputs.fullName}
						onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						autoComplete='name'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-slate-300 mb-1.5'>Username</label>
					<input
						type='text'
						placeholder='johndoe'
						className='w-full rounded-xl px-4 py-2.5 text-sm bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
						value={inputs.username}
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						autoComplete='username'
					/>
				</div>

				<div className='grid grid-cols-1 xs:grid-cols-2 gap-3'>
					<div>
						<label className='block text-sm font-medium text-slate-300 mb-1.5'>Password</label>
						<input
							type='password'
							placeholder='Min. 6 characters'
							className='w-full rounded-xl px-4 py-2.5 text-sm bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							autoComplete='new-password'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-slate-300 mb-1.5'>Confirm</label>
						<input
							type='password'
							placeholder='Repeat password'
							className='w-full rounded-xl px-4 py-2.5 text-sm bg-slate-800/80 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
							autoComplete='new-password'
						/>
					</div>
				</div>

				<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

				<button
					type='submit'
					disabled={loading}
					className='w-full btn bg-sky-500 hover:bg-sky-400 border-0 text-white rounded-xl mt-1 h-11'
				>
					{loading ? <span className='loading loading-spinner loading-sm' /> : "Create Account"}
				</button>
			</form>

			<p className='text-center text-sm text-slate-400 mt-5'>
				Already have an account?{" "}
				<Link to='/login' className='text-sky-400 hover:text-sky-300 font-medium'>
					Sign in
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
