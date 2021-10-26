import React, { useState } from 'react';
import Image from 'next/image';
import { MyImPhone, MyIoIosClose } from '../icons';
import { useAppContext } from '@src/contexts/AppContext';
import classNames from 'classnames';
export default function ContactButton() {
	const { dataAppSettings } = useAppContext();
	const [open, setOpen] = useState(true);
	return (
		<>
			<div className="fixed z-20 bottom-24 right-2">
				<div onClick={() => setOpen(true)} className="dropdown dropdown-top dropdown-end">
					<div tabIndex={0} className="flex items-center flex-col">
						<button
							aria-label="Liên hệ"
							className="btn btn-circle btn-primary shadow-xl relative">
							<span className="absolute inset-2 rounded-box z-[-1] animate-ping bg-primary" />
							<MyImPhone />
						</button>
						<span className="badge badge-md badge-primary shadow-lg rounded-badge mt-2">
							Liên hệ
						</span>
					</div>

					<div
						tabIndex={0}
						className={classNames(
							' grid items-center gap-4 p-4 py-8 shadow-xl bg-base-100 rounded-box place-items-center w-72',
							{
								'dropdown-open dropdown-content': open,
								'opacity-0 invisible absolute': !open,
							}
						)}>
						<button
							onClick={e => {
								e.stopPropagation();
								setOpen(false);
							}}
							className="btn btn-circle btn-sm btn-primary text-xl absolute z-10 top-4 left-4">
							<MyIoIosClose />
						</button>
						{dataAppSettings.avatarAdmin?.url && (
							<div className="avatar online">
								<div className="w-24 h-24 relative p-px mask mask-squircle bg-base-content bg-opacity-10">
									<Image
										src={dataAppSettings.avatarAdmin.url}
										alt={dataAppSettings.adminName}
										layout="fill"
										objectFit="cover"
									/>
									{/* <img
									src="/tailwind-css-component-profile-1@94w.png"
									width={94}
									height={94}
									alt="Avatar Tailwind CSS Component"
									className="mask mask-squircle"
								/> */}
								</div>
							</div>
						)}
						<div>
							<div className="dropdown w-full">
								<div className="text-center">
									<div className="text-lg font-semibold">
										{dataAppSettings.adminName}
									</div>{' '}
									<div className="my-3 text-sm text-base-content text-opacity-80">
										{/* {}
										Strategic Art Manager
										<br />
										Global Illustration Observer
										<br />
										Business Alignment Developer */}
										{dataAppSettings.job}
									</div>
								</div>
							</div>
							{/* <div className="w-full">
								<div className="mt-2 text-center">
									<div className="badge badge-ghost">Design</div>{' '}
									<div className="badge badge-ghost">Art</div>{' '}
									<div className="badge badge-ghost">Illustration</div>
								</div>
							</div> */}
						</div>{' '}
						<a
							href={`tel:${dataAppSettings?.numberPhoneComponent?.number}`}
							className="w-full btn btn-primary btn-sm bg-primary-focus shadow-sm rounded-full">
							<span className="normal-case text-sm mr-2">
								{dataAppSettings.numberPhoneComponent?.text}
							</span>
							<span className="text-base">
								{dataAppSettings.numberPhoneComponent?.number}
							</span>
							{/* <button className="btn btn-accent btn-sm">Follow</button>{' '}
							<button
								aria-label="button component"
								className="btn btn-accent btn-sm btn-square">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="w-6 h-6 stroke-current">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
									/>
								</svg>
							</button> */}
						</a>
					</div>
				</div>
				{/* <MyTooltip
					label={`Zalo: ${dataAppSettings?.numberPhoneComponent?.number}`}
					trigger="hover"
					placement="left">
					<a
						href={`https://zalo.me/${dataAppSettings?.numberPhoneComponent?.number}`}
						className="block w-12 h-12 rounded-full overflow-hidden border border-solid shadow-md relative">
						<Image
							src="/zalo.jpg"
							objectFit="fill"
							layout="fill"
							alt={`Liên hệ zalo/sdt: ${dataAppSettings?.numberPhoneComponent?.number}`}
						/>
					</a>
				</MyTooltip> */}
			</div>
			{/* <div className="fixed z-20 bottom-6 left-2">
				<a
					href={`tel: ${dataAppSettings?.numberPhoneComponent?.number}`}
					className="cursor-pointer flex gap-2 rounded-3xl bg-red-700 items-center justify-between py-1 px-2">
					<div className="relative w-8 h-8 text-center bg-gray-200 animate-bounce rounded-full text-xl p-1">
						<MyImPhone />
						<span className="absolute inset-0 animate-ping bg-gray-100 rounded-full z-[-1] opacity-70"></span>
					</div>
					<span className="text-white font-semibold hover:no-underline">
						{dataAppSettings?.numberPhoneComponent?.number}
					</span>
				</a>
			</div> */}
		</>
	);
}
