const MessageSkeleton = () => {
	return (
		<div className='space-y-4 animate-pulse'>
			<div className='flex gap-3 items-center'>
				<div className='skeleton w-9 h-9 rounded-full shrink-0 bg-slate-700' />
				<div className='skeleton h-10 w-48 rounded-2xl bg-slate-700' />
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className='skeleton h-10 w-36 rounded-2xl bg-slate-700' />
				<div className='skeleton w-9 h-9 rounded-full shrink-0 bg-slate-700' />
			</div>
		</div>
	);
};

export default MessageSkeleton;
