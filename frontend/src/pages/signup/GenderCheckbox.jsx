import UserAvatar from "../../components/common/UserAvatar";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div>
			<p className='text-sm font-medium text-slate-300 mb-2'>Gender & Avatar</p>
			<div className='grid grid-cols-2 gap-3'>
				<label
					className={`flex flex-col items-center gap-2 cursor-pointer rounded-xl p-3 border transition ${
						selectedGender === "male"
							? "bg-sky-500/20 border-sky-500/50"
							: "bg-slate-800/50 border-white/10 hover:border-white/20"
					}`}
				>
					<input
						type='radio'
						name='gender'
						className='sr-only'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
					<UserAvatar user={{ gender: "male", username: "male" }} size='sm' />
					<span className='text-sm font-medium text-slate-200'>Male</span>
				</label>

				<label
					className={`flex flex-col items-center gap-2 cursor-pointer rounded-xl p-3 border transition ${
						selectedGender === "female"
							? "bg-sky-500/20 border-sky-500/50"
							: "bg-slate-800/50 border-white/10 hover:border-white/20"
					}`}
				>
					<input
						type='radio'
						name='gender'
						className='sr-only'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
					<UserAvatar user={{ gender: "female", username: "female" }} size='sm' />
					<span className='text-sm font-medium text-slate-200'>Female</span>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckbox;
