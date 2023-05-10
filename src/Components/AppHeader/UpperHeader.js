/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Button, Divider, Dropdown, Space, theme } from 'antd'
import './AppHeader.css'
import { useLocation } from 'react-router-dom'
import LoginModal from '../LoginModal/LoginModal'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { deleteToken, setToken } from '../../features/session/sessionSlice'

const { useToken } = theme

const items = [
	{
		key: '1',
		label: (
			<a rel='noopener noreferrer' href='http://localhost:3000/ads'>
				Мои объявления
			</a>
		),
	},
	{
		key: '2',
		label: (
			<a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
				Управление профилем
			</a>
		),
	},
	{
		key: '3',
		label: (
			<a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
				Избранное
			</a>
		),
	},
]

const defaultData = [{}]

const UpperHeader = () => {
	const [visible, setVisible] = useState(false)
	const [isAuth, setIsAuth] = useState(false)
	const [userData, setUserData] = useState({ first_name: '', last_name: '' })
	const location = useLocation()
	const dispatch = useDispatch()

	const handleOk = () => {
		console.log(location)
		onUserLogin()
		setVisible(false)
	}

	const getUserData = async (token) => {
		const response = await fetch('http://localhost:8000/api/user/', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		const data = await response.json()
		if (response.status === 200) {
			console.log('User data received!')
			console.log(data)
			setUserData({ first_name: data.first_name, last_name: data.last_name })
		} else {
			console.log('Failed to get user data!')
		}
	}

	const onUserLogin = () => {
		const token = Cookies.get('token')
		if (token) {
			setIsAuth(true)
			getUserData(token)
		}
	}

	useEffect(() => {
		onUserLogin()
	}, [])

	const handleCancel = () => {
		setVisible(false)
	}

	const { token } = useToken()
	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	}
	const menuStyle = {
		boxShadow: 'none',
	}

	const AddItemButton = () => {
		if (location.pathname !== '/additem')
			return (
				<a href='/additem'>
					<Button className='ms-3' type='primary'>
						Разместить объявление
					</Button>
				</a>
			)
	}

	const onLogoutClick = () => {
		dispatch(deleteToken())
		Cookies.remove('token')
		setIsAuth(false)
	}

	return (
		<>
			<div className='index-sticky'>
				<div className='container'>
					<div className='header'>
						<div className='header_selection'>
							<div className='header_item header_button'>
								<div className='header-services-menu'>
									<a href='#'>Помощь</a>
								</div>
							</div>
							<div className='header_item header_button'>
								<div className='header-services-menu'>
									<a href='/aboute'>О проекте</a>
								</div>
							</div>
						</div>
						<div className='header_selection'>
							{isAuth ? (
								<>
									<div className='header_item header_button'>
										<div className='header-services-menu'>
											<a href='/ads'>Мои объявления</a>
										</div>
									</div>
									<Dropdown
										menu={{
											items,
										}}
										dropdownRender={(menu) => (
											<div style={contentStyle}>
												{React.cloneElement(menu, {
													style: menuStyle,
												})}
												<Divider
													style={{
														margin: 0,
													}}
												/>
												<Space
													style={{
														padding: 8,
													}}
												>
													<Button type='primary' onClick={onLogoutClick}>
														Выйти
													</Button>
												</Space>
											</div>
										)}
									>
										<a onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none' }}>
											<Space style={{ color: 'white', textDecoration: 'none' }}>
												{userData.first_name + ' ' + userData.last_name}
												<DownOutlined style={{ color: 'white' }} />
											</Space>
										</a>
									</Dropdown>
									{AddItemButton()}
								</>
							) : (
								<div className='header_button'>
									<div className='header-services-menu'>
										<Button
											type='text'
											style={{ color: 'white' }}
											id='LoginButton'
											onClick={() => setVisible(true)}
										>
											Вход и регистрация
										</Button>
										<LoginModal open={visible} handleOk={handleOk} handleCancel={handleCancel} />
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UpperHeader
