/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Modal, Form, Input, Button, Checkbox, Typography } from 'antd'
import './LoginModal.css'
import styles from './LoginModal.less'

const { Text } = Typography

const LoginModal = ({ visible, handleOk, handleCancel }) => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const [rememberPassword, setRememberPassword] = useState(false)

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
						<Checkbox checked={rememberPassword} onChange={(e) => setRememberPassword(e.target.checked)}>
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
						<Button type='link' onClick={handleCancel} style={{ marginLeft: 5 }}>
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
	)
}

export default LoginModal