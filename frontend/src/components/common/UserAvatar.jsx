import { getAvatarUrl, getDefaultAvatar } from "../../utils/avatar";

const sizeClasses = {
	xs: "w-8 h-8",
	sm: "w-9 h-9 sm:w-10 sm:h-10",
	md: "w-11 h-11 sm:w-12 sm:h-12",
	lg: "w-14 h-14",
};

const UserAvatar = ({
	user,
	size = "md",
	online = false,
	className = "",
	ring = false,
}) => {
	const avatarUrl = getAvatarUrl(user);
	const sizeClass = sizeClasses[size] || sizeClasses.md;
	const fallbackUrl = getDefaultAvatar(user?.gender, user?.username);

	return (
		<div className={`avatar shrink-0 ${online ? "online" : ""} ${className}`}>
			<div
				className={`${sizeClass} rounded-full overflow-hidden bg-slate-700 ${
					ring ? "ring-2 ring-sky-500/50 ring-offset-2 ring-offset-slate-900" : ""
				}`}
			>
				<img
					src={avatarUrl}
					alt={user?.fullName || user?.username || "User avatar"}
					className='w-full h-full object-cover'
					loading='lazy'
					onError={(e) => {
						if (e.currentTarget.src !== fallbackUrl) {
							e.currentTarget.src = fallbackUrl;
						}
					}}
				/>
			</div>
		</div>
	);
};

export default UserAvatar;
