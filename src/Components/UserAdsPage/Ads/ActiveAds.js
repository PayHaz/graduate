/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef } from 'react'
import { Dropdown, Button } from 'antd'
import '../UserAdsPage.css'

const onLoadCards = [
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '1',
	},
	{
		label: 'Самосвальчик',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '2',
	},
	{
		label: 'Автомобильчик',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '3',
	},
]

const ActiveAds = () => {
	const [allCards] = useState(onLoadCards)

	const [selectedItem, setselectedItem] = useState()

	const handleClick = (el) => {
		setselectedItem(el.label)
		console.log(el)
	}
	const onClick = ({ key }) => {
		console.log(selectedItem, key)
	}

	const items = [
		{
			key: '1',
			label: <a>Снять объявление</a>,
		},
		{
			key: '2',
			label: <a>Изменить</a>,
		},
	]

	const card = allCards.map((el, index) => {
		return (
			<div className='col'>
				<div key={index} className={index > 2 ? 'card mt-4' : 'card'}>
					<img src='https://klike.net/uploads/posts/2020-07/1595055001_3.jpg' />
					<div className='card-body'>
						<div className='title__group'>
							<h5 className='card-title'>
								<a href='/product'>{el.label}</a>
							</h5>
							<Dropdown
								menu={{
									items,
									onClick,
								}}
								placement='bottom'
								arrow
								onOpenChange={(e) => {
									handleClick(el)
								}}
							>
								<a onClick={(e) => e.preventDefault()}>
									<Button>...</Button>
								</a>
							</Dropdown>
						</div>

						<p className='card-text'>{el.description}</p>
						<p className='card-text'>{el.coast}</p>
						<p className='card-text'>{el.location}</p>
					</div>
				</div>
			</div>
		)
	})

	return (
		<div className='container px-4'>
			<div className='row  row-cols-1 row-cols-lg-3 col-md-auto '>{card}</div>
		</div>
	)
}

export default ActiveAds
