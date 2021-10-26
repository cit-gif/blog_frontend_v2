import classNames from 'classnames';
import React, { useState } from 'react';
import { exportExcel } from '@src/helper/exportExcel';
import { toast } from 'react-toastify';

interface interfaceStateLayout {
	attributesName: string;
	split: string;
	value: string;
}
interface interfaceStateModal {
	attributesName: string;
	split: string;
	mode: 'add' | 'edit'; //để thêm hoặc xóa
	index: number; // index được chọn để sửa
	show: boolean;
}
export default function Tool() {
	const [statelayout, setStateLayout] = useState<interfaceStateLayout[]>([]);
	const [stateModal, setStateModal] = useState<interfaceStateModal>({
		attributesName: '',
		split: '',
		mode: 'add', //để thêm hoặc xóa
		index: -1, // index được chọn để sửa
		show: false,
	});
	const handlerToggleModal = () => {
		setStateModal(pre => ({ ...pre, show: !pre.show, mode: 'add' }));
	};
	const [stateFileName, setStateFileName] = useState({
		value: '',
		auto: true,
	});
	const handlerAddLayout = () => {
		if (stateModal.mode === 'add') {
			if (stateModal.attributesName.trim() !== '') {
				const newStateLayout: interfaceStateLayout = {
					attributesName: stateModal.attributesName,
					split: stateModal.split,
					value: '',
				};
				setStateLayout([...statelayout, newStateLayout]);
				setStateModal({
					...stateModal,
					attributesName: '',
					split: '',
					show: !stateModal.show,
				});
			}
			return;
		}
		if (stateModal.mode === 'edit') {
			if (stateModal.attributesName.trim() !== '') {
				setStateLayout(pre => {
					const newStateLayout = [...pre];
					newStateLayout[stateModal.index].attributesName = stateModal.attributesName;
					newStateLayout[stateModal.index].split = stateModal.split;
					return newStateLayout;
				});
				setStateModal({
					...stateModal,
					attributesName: '',
					split: '',
					show: !stateModal.show,
				});
			}
			return;
		}
	};
	const handleToExcel = () => {
		if (statelayout.length === 0) {
			toast.error('Cần thêm dữ liệu', {
				autoClose: 3000,
			});
			return;
		}
		if (stateFileName.auto === false && stateFileName.value.trim() === '') {
			toast.error('Tên file không được để trống', {
				autoClose: 3000,
			});
			return;
		}

		const fileName = stateFileName.auto === true ? new Date().toISOString() : stateFileName.value;
		let arrAtributes: string[] = [];
		//tạo mảng dữ liệu [ {} ]
		const data = statelayout.map((cur, key) => {
			const newValue = {
				name: cur.attributesName,
				value: cur.value.split(cur.split),
			};
			// lấy array tên giá tri

			arrAtributes.push(cur.attributesName);
			return newValue;
		});

		//so sánh độ dài của mảng cái nào dài nhất lấy cái đó
		// để những giá trị không có thành ''
		const arrLength = data.map((item, key) => item.value.length);
		const maxLength = Math.max(...arrLength);
		// tạo data
		let result = [];
		for (let i = 0; i < maxLength; i++) {
			const newObj: any = {};
			arrAtributes.forEach((item, key) => {
				data.forEach((item2, key2) => {
					if (item === item2.name) {
						/// thuộc tính của object
						newObj[item] = item2.value[i];
					}
				});
			});
			result.push(newObj);
		}
		/// chuyển sang excel;
		exportExcel({ csvData: result, fileName: fileName });
	};
	return (
		<div className="my-12">
			<h2 className="mb-4">To excel</h2>
			<div className="mb-4">
				<div>
					Sử dụng trình duyệt Chrome và Tải tiện ích Image to Text :{' '}
					<a
						className="link link-primary font-semibold"
						href="https://chrome.google.com/webstore/detail/docsumo-free-ocr-software/ihmmlfacoffajllfpdfkdikgmoogbnph"
						target="_blank"
						rel="noreferrer">
						Tại đây.
					</a>
				</div>
			</div>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-8">
					{statelayout.map((item, key) => {
						return (
							<div className="form-control gap-4 border rounded-box p-4" key={key}>
								<div className="flex items-center gap-2">
									Tên:<kbd className="kbd">{item.attributesName}</kbd>
								</div>
								<div className="flex items-center gap-2">
									Kí tự phân cách:
									<kbd className="kbd">{`"${item.split}"`}</kbd>
								</div>
								<label className="label label-text">Giá trị</label>
								<input
									type="text"
									value={item.value}
									onChange={e => {
										setStateLayout(pre => {
											const newStateLayout = [...pre];
											newStateLayout[key].value = e.target.value;
											return newStateLayout;
										});
									}}
									className="input input-bordered input-primary"
								/>
								<button
									onClick={() => {
										setStateModal({
											...stateModal,
											mode: 'edit',
											index: key,
											show: !stateModal.show,
											attributesName: item.attributesName,
											split: item.split,
										});
									}}
									aria-label="button"
									className="btn btn-accent">
									Chỉnh sửa
								</button>
								<button
									onClick={() => {
										setStateLayout(pre => pre.filter((val, id) => id !== key));
									}}
									aria-label="button"
									className="btn">
									Xóa
								</button>
							</div>
						);
					})}
				</div>
				<div>
					<div
						className={classNames('modal', {
							'modal-open': stateModal.show,
						})}>
						<div className="modal-box">
							<div className="flex flex-col gap-4">
								<div className="form-control">
									<label className="label label-text">Tên giá trị</label>
									<input
										type="text"
										value={stateModal.attributesName}
										onChange={e => {
											setStateModal({
												...stateModal,
												attributesName: e.target.value,
											});
										}}
										className="input input-bordered input-primary"
									/>
								</div>
								<div className="form-control">
									<label className="label label-text">Kí tự phân cách</label>
									<input
										type="text"
										value={stateModal.split}
										onChange={e => {
											setStateModal({
												...stateModal,
												split: e.target.value,
											});
										}}
										className="input input-bordered input-primary"
									/>
								</div>
							</div>
							<div className="modal-action">
								<button
									aria-label="button"
									onClick={handlerToggleModal}
									className="btn">
									Đóng
								</button>

								<button
									onClick={handlerAddLayout}
									aria-label="button"
									className="btn btn-primary">
									Oke
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col col gap-8">
					<button aria-label="button" onClick={handlerToggleModal} className="btn btn-outline">
						Thêm thuộc tính
					</button>
					<div className="form-control">
						<div className="label label-text">
							Tên file:
							<div className="form-control">
								<label className="cursor-pointer label gap-2">
									<span className="label-text">Tự động:</span>
									<input
										type="checkbox"
										checked={stateFileName.auto}
										onChange={e => {
											setStateFileName({
												...stateFileName,
												auto: e.target.checked,
											});
										}}
										className="toggle toggle-primary"
									/>
								</label>
							</div>
						</div>

						<input
							type="text"
							disabled={stateFileName.auto}
							value={stateFileName.value}
							onChange={e => {
								setStateFileName({ ...stateFileName, value: e.target.value });
							}}
							className="input bordered input-primary"
						/>
					</div>
					<button
						onClick={handleToExcel}
						disabled={statelayout.length === 0}
						aria-label="button"
						className="btn btn-primary">
						Chuyển sang Excel
					</button>
				</div>
			</div>
		</div>
	);
}
