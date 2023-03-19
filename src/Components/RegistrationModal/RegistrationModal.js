import React from 'react'
import { Modal, Form, Input } from 'antd'

const RegistrationModal = ({ visible, handleOk, handleCancel }) => {
	const [form] = Form.useForm()

	const onFinish = (values) => {
		console.log('Received values of form: ')
		handleOk()
	}

	return (
		<Modal title='Регистрация' visible={visible} onOk={form.submit} onCancel={handleCancel}>
			<Form form={form} onFinish={onFinish}>
				<Form.Item name='email' label='Email' rules={[{ required: true, message: 'Введите ваш email!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					name='username'
					label='Имя пользователя'
					rules={[{ required: true, message: 'Введите ваше имя пользователя!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item name='password' label='Пароль' rules={[{ required: true, message: 'Введите ваш пароль!' }]}>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default RegistrationModal
