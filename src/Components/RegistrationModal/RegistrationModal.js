import React, { useState } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { MaskedInput } from 'antd-mask-input'

const RegistrationModal = ({ visible, handleOk, handleCancel }) => {
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
		if (response.status === 200) {
			message.success('Registration successful')
			form.resetFields()
			setLoading(false)
			handleCancel()
		} else {
			message.error('Registration failed')
			setLoading(false)
		}
		setLoading(false)
	}

	return (
		<Modal title='Регистрация' visible={visible} onOk={form.submit} onCancel={handleCancel} footer={null}>
			<Form form={form} onFinish={onFinish}>
				<Form.Item
					name='email'
					label='Email'
					rules={[
						{
							required: true,
							message: 'Please input your email!',
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
							message: 'Please input your last name!',
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
							message: 'Please input your first name!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='last_name'
					label='Last Name'
					rules={[
						{
							required: true,
							message: 'Please input your last name!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='password'
					label='Password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name='repassword'
					label='Confirm Password'
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
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

				<Form.Item>
					<Button type='primary' htmlType='submit' loading={loading}>
						Register
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default RegistrationModal
