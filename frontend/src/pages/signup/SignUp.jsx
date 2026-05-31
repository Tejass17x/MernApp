import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import UserAvatar from "../../components/common/UserAvatar";

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

	const previewUser = {
		fullName: inputs.fullName || "Your Name",
		username: inputs.username || "username",
		gender: inputs.gender || "male",
	};

	return (
		<div className='auth-card my-2 sm:my-0 max-h-[90dvh] overflow-y-auto'>
			<div className='text-center mb-5 sm:mb-6'>
				{inputs.gender && (
					<div className='flex justify-center mb-4'>
						<UserAvatar user={previewUser} size='lg' ring />
					</div>
				)}
				<h1 className='text-2xl sm:text-3xl font-bold text-white'>Create account</h1>
				<p className='text-sm text-slate-400 mt-2'>Choose gender for your avatar</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
				<div>
					<label className='block text-sm font-medium text-slate-300 mb-1.5'>Full Name</label>
					<input
						type='text'
						placeholder='John Doe'
						className='input-field'
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
						className='input-field'
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
							className='input-field'
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
							className='input-field'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
							autoComplete='new-password'
						/>
					</div>
				</div>

				<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

				<button type='submit' disabled={loading} className='btn-primary'>
					{loading ? <span className='loading loading-spinner loading-sm' /> : "Create Account"}
				</button>
			</form>

			<p className='text-center text-sm text-slate-400 mt-5'>
				Already have an account?{" "}
				<Link to='/login' className='text-sky-400 hover:text-sky-300 font-medium transition-colors'>
					Sign in
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
