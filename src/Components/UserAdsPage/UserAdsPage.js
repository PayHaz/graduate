import React from 'react'
import { Tabs } from 'antd'
import ActiveAds from './Ads/ActiveAds'
import АrchiveAds from './Ads/АrchiveAds'

const onChange = (key) => {
	console.log(key)
}
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
	return (
		<div className='container'>
			<h1>Мои объявления</h1>
			<Tabs defaultActiveKey='1' items={items} onChange={onChange} />
		</div>
	)
}

export default UserAdsPage