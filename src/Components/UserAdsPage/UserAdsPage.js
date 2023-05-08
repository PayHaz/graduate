import React from 'react'
import { Tabs } from 'antd'
import ActiveAds from './Ads/ActiveAds'
import АrchiveAds from './Ads/АrchiveAds'
import Cookies from 'js-cookie'
import { setToken } from '../../features/session/sessionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setMyAds } from '../../features/myads/myadsSlice'

const items = [
	{
		key: '1',
		label: `Активные`,
		children: <ActiveAds />,
	},
	{
		key: '2',
		label: `Архив`,
		children: <АrchiveAds />,
	},
]

const UserAdsPage = () => {
	const dispatch = useDispatch()
	const onChange = (key) => {
		dispatch(setMyAds(key))
	}
	if (Cookies.get('token') !== undefined) {
		dispatch(setToken(Cookies.get('token')))
	}
	const session = useSelector((state) => state.session.value)
	if (session !== '')
		return (
			<div className='container'>
				<h1>Мои объявления</h1>
				<Tabs defaultActiveKey='1' items={items} onChange={onChange} />
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

export default UserAdsPage
