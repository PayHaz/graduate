/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Button, Divider, Dropdown, Space, theme } from 'antd'
import './AppHeader.css'
import LoginModal from '../LoginModal/LoginModal'

const { useToken } = theme

const items = [
	{
		key: '1',
		label: (
			<a rel='noopener noreferrer' href='ads'>
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

const UpperHeader = () => {
	const [visible, setVisible] = useState(false)
	const [isAuth, setIsAuth] = useState(true)

	const handleOk = () => {
		setVisible(false)
	}

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

	const onLogoutClick = () => {
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
											<a href='#'>
												<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAl0lEQVR4nO3WsQ3CMBBA0asZISMwCVaGYAxPwzSIRWxGSEP1kSWQDMIoxfmuuV9bebEvliISeQeswB29KpD2wG2hdsXq1BYgA4+3bAJ3L5CH8MyZvnY+hKfOlD/wlAKWOGri41IqrpM4XafiARfgZA4P84Sry68OkJTx3zPd09eDNuAoFvHZ2QRtdehFLAOuwA04mMIzewKXM5wJv73VoAAAAABJRU5ErkJggg=='></img>
											</a>
										</div>
									</div>
									<div className='header_item header_button'>
										<div className='header-services-menu'>
											<a href='#'>Мои объявления</a>
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
												Вася Пупкин
												<DownOutlined style={{ color: 'white' }} />
											</Space>
										</a>
									</Dropdown>
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
										<LoginModal visible={visible} handleOk={handleOk} handleCancel={handleCancel} />
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
