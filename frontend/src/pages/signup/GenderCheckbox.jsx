const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div>
			<p className='text-sm font-medium text-slate-300 mb-2'>Gender</p>
			<div className='flex flex-wrap gap-3'>
				<label
					className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 cursor-pointer rounded-xl px-4 py-2.5 border transition ${
						selectedGender === "male"
							? "bg-sky-500/20 border-sky-500/50 text-sky-300"
							: "bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20"
					}`}
				>
					<input
						type='radio'
						name='gender'
						className='sr-only'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
					<span className='text-sm font-medium'>Male</span>
				</label>

				<label
					className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 cursor-pointer rounded-xl px-4 py-2.5 border transition ${
						selectedGender === "female"
							? "bg-sky-500/20 border-sky-500/50 text-sky-300"
							: "bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20"
					}`}
				>
					<input
						type='radio'
						name='gender'
						className='sr-only'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
					<span className='text-sm font-medium'>Female</span>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckbox;
