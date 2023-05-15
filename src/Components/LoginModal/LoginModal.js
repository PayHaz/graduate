/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Modal, Form, Input, Button, Checkbox, Typography, message } from 'antd'
import './LoginModal.css'
import { useSelector, useDispatch } from 'react-redux'
import RegistrationModal from '../RegistrationModal/RegistrationModal'
import styles from './LoginModal.less'
import { setToken, deleteToken } from '../../features/session/sessionSlice'
import Cookies from 'js-cookie'

const { Text } = Typography

const backendAPI = 'http://194.67.74.221:8000'

const LoginModal = ({ open, handleOk, handleCancel }) => {
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [rememberPassword, setRememberPassword] = useState(false)
	const [, setMainModel] = useState(false)
	const [isSubModel, setSubModel] = useState(false)

	const error = () => {
		message.error('Неверный логин или пароль!')
	}

	const onFinish = async (values) => {
		setLoading(true)
		const response = await fetch(`${backendAPI}/api/token/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
		const data = await response.json()
		console.log(data.access)

		if (response.status === 200) {
			setLoading(false)
			Cookies.set('token', data.access)
			dispatch(setToken(data.access))
			handleOk() // JWT-токен
		} else {
			error()
			setLoading(false)
		}
	}

	const onSubModel = (e, stateSub = true, stateMain = false) => {
		handleCancel()
		setMainModel(stateMain)
		setSubModel(stateSub)
	}

	return (
		<>
			<Modal
				open={open}
				title='Вход'
				className={styles.booking_information_table}
				onCancel={handleCancel}
				footer={[
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: 10,
						}}
					>
						<div>
							<Checkbox
								checked={rememberPassword}
								onChange={(e) => setRememberPassword(e.target.checked)}
							>
								Запомнить пароль
							</Checkbox>
						</div>
						<div>
							<a href='#'>Забыли пароль?</a>
						</div>
					</div>,
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
						<Button key='submit' type='primary' loading={loading} onClick={() => form.submit()}>
							Войти
						</Button>
					</div>,
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 10,
							flexDirection: 'column',
							paddingTop: '15px',
						}}
					>
						<div>
							<Text>Нет аккаунта?</Text>
						</div>
						<div>
							<Button type='link' onClick={onSubModel} style={{ marginLeft: 5 }}>
								Зарегистрироваться
							</Button>
						</div>
					</div>,
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
			<RegistrationModal
				open={isSubModel}
				handleOk={() => setSubModel(false)}
				handleCancel={() => setSubModel(false)}
			/>
		</>
	)
}

export default LoginModal
