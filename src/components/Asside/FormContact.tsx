import { useMutation } from '@apollo/client';
import { gqlCreateCustomer } from '@src/apollo-client/gql';
import { validateNumberPhone } from '@src/helper/validateHelper';
import classNames from 'classnames';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import { Button, ButtonToolbar, Form } from 'rsuite';
// import { Notification, toaster } from 'rsuite';
const message = null;
// <Notification type="success" header="Đăng kí thành công" closable>
// 	<span className="leading-8">
// 		Cảm ơn bạn đã đăng kí. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
// 	</span>
// </Notification>
export default function FormContact() {
	const [stateForm, setStateForm] = useState({
		name: '',
		numberPhone: '',
	});
	const [stateFormMessage, setStateFormMessage] = useState<any>({
		name: null,
		numberPhone: null,
	});
	const [createCustomer] = useMutation(gqlCreateCustomer, {
		variables: { name: stateForm.name, numberPhone: stateForm.numberPhone },
	});
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const name = stateForm.name.trim();
		if (name.length < 5) {
			return setStateFormMessage({ ...stateFormMessage, name: 'Tên ít nhất 5 kí tự' });
		}
		setStateFormMessage((pre: any) => ({
			...pre,
			name: null,
		}));
		const numberPhone = stateForm.numberPhone.trim();
		const checkNumberPhone = validateNumberPhone(numberPhone);
		if (!checkNumberPhone) {
			return setStateFormMessage((pre: any) => ({
				...pre,
				numberPhone: 'Số điện thoại chưa chính xác',
			}));
		}
		setStateFormMessage((pre: any) => ({
			...pre,
			numberPhone: null,
		}));

		createCustomer();
		setStateForm({ ...stateForm, name: '', numberPhone: '' });
		// toaster.push(message, { placement: 'topCenter' });
		toast.success('Cảm ơn bạn đã đăng kí. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất', {
			autoClose: 15000,
		});
	};
	return (
		<div className="relative">
			<form onSubmit={handleSubmit}>
				<div className="p-10 card bg-base-200">
					<div className="form-control">
						<label className="label">
							<span className="label-text font-semibold">Họ và tên</span>
						</label>
						<input
							type="text"
							name="name"
							value={stateForm.name}
							onChange={e => {
								setStateForm({ ...stateForm, name: e.target.value });
							}}
							placeholder="Họ và tên"
							className={classNames('input input-bordered', {
								'input-primary': !stateFormMessage.name,
								'input-error': stateFormMessage.name,
							})}
						/>
						{stateFormMessage.name && (
							<label className="label">
								<span className="label-text-alt text-error">
									{stateFormMessage.name}
								</span>
							</label>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-semibold">Số điện thoại</span>
						</label>
						<input
							type="text"
							name="numberPhone"
							value={stateForm.numberPhone}
							onChange={e => {
								setStateForm({ ...stateForm, numberPhone: e.target.value });
							}}
							placeholder="Số điện thoại"
							className={classNames('input input-bordered', {
								'input-primary': !stateFormMessage.numberPhone,
								'input-error': stateFormMessage.numberPhone,
							})}
						/>
						{stateFormMessage.numberPhone && (
							<label className="label">
								<span className="label-text-alt text-error">
									{stateFormMessage.numberPhone}
								</span>
							</label>
						)}
					</div>
					<div className="form-control mt-8">
						<button type="submit" className="btn btn-primary" aria-label="Đăng kí">
							Đăng kí
						</button>
					</div>
				</div>
			</form>
			{/* {message} */}
			{/* <Form onSubmit={handleSubmit}>
				<Form.Group controlId="name">
					<Form.ControlLabel>Họ và tên</Form.ControlLabel>
					<Form.Control
						name="name"
						value={stateForm.name}
						onChange={value => {
							setStateForm({ ...stateForm, name: value });
						}}
						errorMessage={stateFormMessage.name}
						errorPlacement="bottomStart"
					/>
					<Form.HelpText tooltip>Bắt buộc</Form.HelpText>
				</Form.Group>
				<Form.Group controlId="numberPhone">
					<Form.ControlLabel>Số điện thoại</Form.ControlLabel>
					<Form.Control
						name="numberPhone"
						value={stateForm.numberPhone}
						onChange={value => {
							setStateForm({ ...stateForm, numberPhone: value });
						}}
						errorMessage={stateFormMessage.numberPhone}
						errorPlacement="bottomStart"
					/>
					<Form.HelpText tooltip>Bắt buộc</Form.HelpText>
				</Form.Group>
				<Form.Group>
					<Button type="submit" appearance="primary">
						Đăng kí
					</Button>
				</Form.Group>
			</Form> */}
		</div>
	);
}
