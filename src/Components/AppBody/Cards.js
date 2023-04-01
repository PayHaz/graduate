/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { Carousel } from 'antd'

const contentStyle = {
	margin: 0,
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
}

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
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '4',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '5',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '6',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '7',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '8',
	},
]

const Cards = () => {
	const [allCards] = useState(onLoadCards)

	const card = allCards.map((el, index) => {
		return (
			<div className='col' key={index}>
				<div className='card mt-5'>
					<Carousel autoplay autoplaySpeed={Math.random() * (6000 - 3000) + 3000}>
						<div>
							<h3 style={contentStyle}>1</h3>
						</div>
						<div>
							<h3 style={contentStyle}>2</h3>
						</div>
						<div>
							<h3 style={contentStyle}>3</h3>
						</div>
						<div>
							<h3 style={contentStyle}>4</h3>
						</div>
					</Carousel>
					<div className='card-body'>
						<h5 className='card-title'>{el.label}</h5>
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

export default Cards
