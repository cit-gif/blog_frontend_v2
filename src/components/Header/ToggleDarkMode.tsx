import { appReducerActions } from '@src/app/appSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import useMediaPrefersColorScheme from '@src/hooks/useMediaPrefersColorScheme';
import { typeTheme } from '@src/typesGlobal';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { MyImSun, MyMdModeNight, MyCgDarkMode } from '../icons';
const darkModeOptions = [
	{
		icon: MyImSun,
		title: 'Sáng',
		vaulue: 'emerald' as typeTheme,
	},
	{
		icon: MyCgDarkMode,
		title: 'Hệ thống',
		vaulue: 'auto' as typeTheme,
	},
	{
		icon: MyMdModeNight,
		title: 'Tối',
		vaulue: 'forest' as typeTheme,
	},
];

export default function ToggleDarkMode() {
	const dispatch = useAppDispatch();
	const classNameFontSizeIconDefault = useAppSelector(state => state.app.classNameFontSizeIconDefault);
	const theme = useAppSelector(state => state.app.theme);

	const prefersColorScheme = useMediaPrefersColorScheme();

	const toggleDarkMode = (theme: typeTheme) => {
		// nếu theme = auto thì lấy thệ thống
		//theme thì có hai chế độ
		// còn value thì 3
		const getTheme = theme === 'auto' ? prefersColorScheme : theme;

		const htmlEL = document.querySelector('html');
		htmlEL?.setAttribute('data-theme', getTheme);
		localStorage.setItem('theme', theme);
		dispatch(appReducerActions.setTheme(theme));
	};
	useEffect(() => {
		// đổi theme khi hiển thị lần đầu
		const currentTheme = localStorage.getItem('theme');
		if (currentTheme === 'forest' || currentTheme === 'emerald' || currentTheme === 'auto') {
			toggleDarkMode(currentTheme);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [darkModeOptions, prefersColorScheme]);

	return (
		<div className="flex-none dropdown dropdown-end">
			<div tabIndex={0} className={classNames('btn btn-ghost btn-square', classNameFontSizeIconDefault)}>
				{darkModeOptions.map((item, key) => (
					<span
						key={key}
						className={classNames(
							'transition-all duration-300 ease-in-out',
							classNameFontSizeIconDefault,
							{
								'invisible hidden opacity-0': !(item.vaulue === theme),
								'visible block opacity-1': item.vaulue === theme,
							}
						)}>
						<item.icon />
					</span>
				))}
			</div>
			<div tabIndex={0} className="dropdown-content drop-shadow-lg bg-base-100 rounded-box p-2">
				<div className="w-36 flex flex-col gap-2">
					{darkModeOptions.map((item, key) => (
						<button
							onClick={() => {
								toggleDarkMode(item.vaulue);
							}}
							aria-label={item.title}
							key={key}
							className={classNames('btn btn-sm justify-start gap-2', {
								'btn-primary': item.vaulue === theme,
								'btn-outline': !(item.vaulue === theme),
							})}>
							{<item.icon className={classNames(classNameFontSizeIconDefault)} />}
							{item.title}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
