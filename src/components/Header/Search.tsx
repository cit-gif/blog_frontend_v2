import React, { useEffect, useRef, useState } from 'react';
// import { Button, Dropdown, Form, IconButton, Input, InputGroup } from 'rsuite';
import classNames from 'classnames';
import useAutoCloseOutsideElement from '@src/hooks/useAutoCloseOutsideElement';
import { useAppSelector } from '@src/hooks/reduxHook';
import { useRouter } from 'next/router';
import { urlBySearch } from '@src/config/constrant';
import { MyFaSearch } from '../icons';

export default function Search() {
	const classNameFontSizeIconDefault = useAppSelector(state => state.app.classNameFontSizeIconDefault);

	// const [open, setOpen] = useState(false);
	// const divRef = useRef<HTMLDivElement>(null);
	// const btnRef = useRef(null);
	const router = useRouter();

	const [inputValue, setInputValue] = useState('');

	const handleSearch = () => {
		router.push(
			{
				pathname: `/${urlBySearch}`,
				query: {
					q: inputValue,
					page: 1,
				},
			},
			undefined,
			{ shallow: false }
		);
	};

	return (
		<div className="flex-none dropdown dropdown-end">
			<div tabIndex={0} className={classNames('btn btn-ghost', classNameFontSizeIconDefault)}>
				<MyFaSearch />
			</div>
			<form
				tabIndex={0}
				onSubmit={handleSearch}
				className="dropdown-content dropdown-open drop-shadow-md bg-base-100 w-64 rounded-box p-2">
				<div className="relative">
					<input
						value={inputValue}
						onChange={e => setInputValue(e.target.value.toString())}
						type="text"
						placeholder="Nhập từ khóa..."
						className="w-full text-base-content pr-16 input-md input input-primary input-bordered"
					/>
					<button
						aria-label="submit"
						type="submit"
						className="absolute z-10 btn-md top-0 right-0 rounded-l-none btn btn-primary">
						Tìm kiếm
					</button>
				</div>
			</form>
		</div>
	);
}
