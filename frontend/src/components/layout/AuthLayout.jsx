const AuthLayout = ({ children, title = "ChatApp" }) => {
	return (
		<div className='auth-page'>
			<div className='auth-bg' aria-hidden='true' />
			<div className='auth-overlay' aria-hidden='true' />

			<div className='auth-content'>
				<div className='auth-brand'>
					<div className='auth-brand-icon'>
						<svg viewBox='0 0 24 24' fill='none' className='w-6 h-6 text-white' aria-hidden='true'>
							<path
								d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
					<span className='text-lg font-semibold text-white tracking-tight'>{title}</span>
				</div>

				{children}

				<p className='text-center text-xs text-slate-500 mt-6'>
					Secure real-time messaging
				</p>
			</div>
		</div>
	);
};

export default AuthLayout;
