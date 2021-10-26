type arrayAny = any[];
export const separateArray = (arr: arrayAny) => {
	const middleArray = arr.length / 2;
	return arr.reduce(
		(pre, v, key) => {
			if (key <= middleArray) {
				pre[0].push(v);
			} else {
				pre[1].push(v);
			}
			return pre;
		},
		[[], []]
	);
};
