import { useAppSelector } from '@src/hooks/reduxHook';
import { ReactNode } from 'react';
// import { CustomProvider } from 'rsuite';
interface Props {
	children: ReactNode;
}
export default function ThemeContexProvider(props: Props) {
	const theme = useAppSelector(state => state.app.theme);

	// return <CustomProvider theme={theme}>{props.children}</CustomProvider>;
}
