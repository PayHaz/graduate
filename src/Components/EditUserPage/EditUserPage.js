import { useEffect, useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../features/session/sessionSlice'
import Cookies from 'js-cookie'

const EditUserPage = () => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const token = Cookies.get('token')
	const dispatch = useDispatch()

	if (Cookies.get('token') !== undefined) {
		dispatch(setToken(Cookies.get('token')))
	}

	const session = useSelector((state) => state.session.value)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`http://194.67.74.221:8000/api/user`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				const data = await response.json()
				form.setFieldsValue({
					email: data.email,
					first_name: data.first_name,
					last_name: data.last_name,
					phone: data.phone,
				})
			} catch (error) {
				console.error(error)
			}
		}
		fetchUser()
	}, [form])

	const onFinish = async (values) => {
		setLoading(true)
		try {
			const response = await fetch('http://194.67.74.221:8000/api/user/', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify(values),
			})
			const data = await response.json()
			console.log(data)
			if (response.status === 200) {
				message.success('Данные успешно обновлены')
			} else {
				message.error(data.message)
			}
		} catch (error) {
			console.error(error)
		}
		setLoading(false)
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	if (!form) {
		return <div>Loading...</div>
	}
	if (session !== '')
		return (
			<div className='container'>
				<div className='row'>
					<div className='pt-5 col-6 mx-auto change__category__group'>
						<h3>Изменение данных о профиле</h3>
						<Form
							form={form}
							style={{
								maxWidth: 600,
							}}
							className='pt-3'
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
						>
							<Form.Item
								label='Email'
								name='email'
								rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}
							>
								<Input />
							</Form.Item>
							<Form.Item label='Имя' name='first_name' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item label='Фамилия' name='last_name' rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item
								label='Телефон'
								name='phone'
								rules={[
									{
										required: true,
										pattern: /^\d{11}$/,
										message: 'Введите корректный номер телефона',
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item className='d-flex justify-content-center'>
								<Button type='primary' htmlType='submit' loading={loading}>
									Сохранить
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		)
	else
		return (
			<div className='container'>
				<div className='error__label'>
					<h3>Авторизируйтесь для доступа к этой странице.</h3>
				</div>
			</div>
		)
}

export default EditUserPage
