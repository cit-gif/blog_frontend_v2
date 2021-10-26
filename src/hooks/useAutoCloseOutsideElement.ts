import React from 'react';

export default function useAutoCloseOutsideElement(state: boolean, elementRef: any, toggleRef: any, setOpen: any) {
	const handleClosure = React.useCallback(
		event => {
			// nếu là đang mở mà click 1 lần nữa thì đóng
			if (state == true && toggleRef.current.contains(event.target)) {
				setOpen(false);
				return;
			}
			// nếu là đang mở mà click ra ngoài thì đóng
			if (!elementRef.current.contains(event.target) && !toggleRef.current.contains(event.target)) {
				setOpen(false);
			}
			// nếu đang đóng thì mở
			if (state == false && toggleRef.current.contains(event.target)) {
				setOpen(true);
				return;
			}
		},

		[setOpen, elementRef, toggleRef, state]
	);

	React.useEffect(() => {
		window.addEventListener('click', handleClosure);
		window.addEventListener('focusin', handleClosure);

		return () => {
			window.removeEventListener('click', handleClosure);
			window.removeEventListener('focusin', handleClosure);
		};
	}, [handleClosure, elementRef]);
}
