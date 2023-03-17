/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import './AppHeader.css'
import LoginModal from '../LoginModal/LoginModal'
import { Button } from 'antd'

const UpperHeader = () => {
	const [visible, setVisible] = useState(false)

	const handleOk = () => {
		setVisible(false)
	}

	const handleCancel = () => {
		setVisible(false)
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
							<div className='header_item header_button'>
								<div className='header-services-menu'>
									<Button type='primary' onClick={() => setVisible(true)}>
										Войти
									</Button>
									<LoginModal visible={visible} handleOk={handleOk} handleCancel={handleCancel} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UpperHeader
