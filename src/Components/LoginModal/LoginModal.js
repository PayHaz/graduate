import React, { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'

const LoginModal = ({ visible, handleOk, handleCancel }) => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)

	const onFinish = (values) => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			handleOk()
		}, 2000)
	}

	return (
		<Modal
			visible={visible}
			title='Войти в систему'
			onCancel={handleCancel}
			footer={[
				<Button key='back' onClick={handleCancel}>
					Отмена
				</Button>,
				<Button key='submit' type='primary' loading={loading} onClick={() => form.submit()}>
					Войти
				</Button>,
			]}
		>
			<Form form={form} onFinish={onFinish}>
				<Form.Item
					name='username'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите имя пользователя',
						},
					]}
				>
					<Input placeholder='Имя пользователя' />
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, введите пароль',
						},
					]}
				>
					<Input.Password placeholder='Пароль' />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default LoginModal
