import React, { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'

const RegistrationModal = ({ visible, handleOk, handleCancel }) => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)

	const onFinish = async (values) => {
		setLoading(true)
		const datas = {
			username: values.email,
			...values,
		}
		const response = await fetch('http://localhost:8000/api/auth/register/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datas),
		})
		const data = await response.json()
		console.log(data)
		setLoading(false)
	}

	return (
		<Modal title='Регистрация' visible={visible} onOk={form.submit} onCancel={handleCancel}>
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
					name='re_password'
					label='re_password'
					rules={[
						{
							required: true,
							message: 'Please input your re_password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name='first_name'
					label='First Name'
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
