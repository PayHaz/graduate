/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'

const onLoadCards = [
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '1',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '2',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '3',
	},
]

const АrchiveAds = () => {
	const [allCards] = useState(onLoadCards)

	const card = allCards.map((el, index) => {
		return (
			<div className='col'>
				<div key={index} className={index > 2 ? 'card mt-4' : 'card'}>
					<img src='https://klike.net/uploads/posts/2020-07/1595055001_3.jpg' />
					<div className='card-body'>
						<h5 className='card-title'>
							<a href='#'>{el.label}</a>
						</h5>
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

export default АrchiveAds
