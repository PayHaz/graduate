import React, { useState } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { MaskedInput } from 'antd-mask-input'

const RegistrationModal = ({ open, handleOk, handleCancel }) => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)

	const onFinish = async (values) => {
		setLoading(true)
		const datas = {
			username: values.email,
			...values,
			phone: values.phone.replace(/[+()-]/g, ''),
		}
		console.log(datas)
		const response = await fetch('http://localhost:8000/api/auth/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datas),
		})
		const data = await response.json()
		console.log(data)
		if (response.status === 201) {
			message.success('Вы зарегестрированы!')
			form.resetFields()
			setLoading(false)
			handleCancel()
		} else {
			message.error('Не удалось зарегистрироваться!')
			setLoading(false)
		}
		setLoading(false)
	}

	return (
		<Modal title='Регистрация' open={open} onOk={form.submit} onCancel={handleCancel} footer={null}>
			<Form form={form} onFinish={onFinish}>
				<Form.Item
					name='email'
					label='Email'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, ввведите email!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='phone'
					label='Телефон:'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, ввведите телефон',
						},
					]}
				>
					<MaskedInput mask='+7(000)00-00-000' />
				</Form.Item>
				<Form.Item
					name='first_name'
					label='Введите имя:'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, ввведите имя!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='last_name'
					label='Введите фамилию'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, ввведите фамилию!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='password'
					label='Введите пароль'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, ввведите пароль!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name='repassword'
					label='Повторите пароль'
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Пожалуйста, ввведите повторный пароль!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve()
								}
								return Promise.reject(new Error('The two passwords do not match!'))
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item style={{ display: 'flex', margin: '0', justifyContent: 'center' }}>
					<Button type='primary' htmlType='submit' loading={loading}>
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default RegistrationModal
