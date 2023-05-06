import React, { useState, useEffect } from 'react'
import { Carousel } from 'antd'
import { useSelector } from 'react-redux'
import './carousel.css'
import Cookies from 'js-cookie'

const contentStyle = {
	margin: 0,
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
}

const Cards = () => {
	const [allCards, setAllCards] = useState([])
	const city = useSelector((state) => state.city.value)

	const fetchData = async () => {
		const cookie = Cookies.get('city_id')
		if (cookie) {
			try {
				const response = await fetch('http://127.0.0.1:8000/product', {
					headers: {
						'x-city-id': Cookies.get('city_id'),
					},
				})
				const data = await response.json()
				setAllCards(data)
			} catch (error) {
				console.log(error)
			}
		} else {
			try {
				const response = await fetch('http://127.0.0.1:8000/product')
				const data = await response.json()
				setAllCards(data)
			} catch (error) {
				console.log(error)
			}
		}
	}

	useEffect(() => {
		fetchData()
		if (city) {
			fetchData()
		}
	}, [city])

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
						<h5 className='card-title'>
							<a href='/' className='card__title'>
								{el.name}
							</a>
						</h5>
						<p className='card-text'>{el.description}</p>
						<p className='card-text'>
							{el.is_lower_bound ? 'от ' : ''}
							{el.price}
							{el.price_suffix ? ' ' + el.price_suffix : ''}
						</p>
						<p className='card-text'>{el.city_name}</p>
					</div>
				</div>
			</div>
		)
	})

	const onEmptyCity = () => {
		return <h3>К сожалению, в вашем городе ещё нет объявлений.</h3>
	}

	return (
		<div className='container px-4'>
			<div className={allCards.length ? 'row  row-cols-1 row-cols-lg-3 col-md-auto ' : 'empty__title'}>
				{allCards.length ? card : onEmptyCity()}
			</div>
		</div>
	)
}

export default Cards
