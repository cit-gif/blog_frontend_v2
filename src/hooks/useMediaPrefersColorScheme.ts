import { typeTheme } from '@src/typesGlobal';
import { useEffect, useState } from 'react';

export default function useMediaPrefersColorScheme() {
	const [state, setState] = useState<typeTheme>('emerald');
	const handleChange = (e: MediaQueryListEvent) => {
		if (e.matches) {
			setState('forest');
		} else {
			setState('emerald');
		}
	};
	useEffect(() => {
		if (!window.matchMedia) return;
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setState('forest');
		} else {
			setState('emerald');
		}
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleChange);
		return () => {
			window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleChange);
		};
	}, []);
	return state;
}
