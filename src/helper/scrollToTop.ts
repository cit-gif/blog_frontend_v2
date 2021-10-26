export default function smoothScrollBackToTop() {
	let targetPosition = 0;
	let startPosition = window.pageYOffset;
	let distance = targetPosition - startPosition;
	let duration = 150;
	let start: any = null;

	window.requestAnimationFrame(step);

	function step(timestamp: any) {
		if (!start) start = timestamp;
		let progress = timestamp - start;
		window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
		if (progress < duration) window.requestAnimationFrame(step);
	}
}

function easeInOutCubic(t: number, b: number, c: number, d: number) {
	t /= d / 2;
	if (t < 1) return (c / 2) * t * t * t + b;
	t -= 2;
	return (c / 2) * (t * t * t + 2) + b;
}
