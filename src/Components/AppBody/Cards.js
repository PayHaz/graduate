/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { Carousel } from 'antd'
import { useSelector } from 'react-redux'
import './carousel.css'
import Cookies from 'js-cookie'

const contentStyle = {
	height: '230px',
	width: '100%',
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

	const productImages = (images) => {
		return images.map((image, index) => (
			<div key={index}>
				<img style={contentStyle} src={`http://localhost:8000${image}`} />
			</div>
		))
	}

	const card = allCards.map((el, index) => {
		return (
			<div className='col pt-3' key={index}>
				<div className='card  h-100'>
					<Carousel autoplay autoplaySpeed={Math.random() * (6000 - 3000) + 3000}>
						{productImages(el.images)}
					</Carousel>

					<div className='card-body'>
						<h5 className='card-title'>
							<a href='/' className='card__title'>
								{el.name}
							</a>
						</h5>
						<p className='card-text card-description'>{el.description}</p>
					</div>
					<div class='card-footer'>
						<p className='card-text'>
							{el.is_lower_bound ? 'от ' : ''}
							{el.price}
							{el.price_suffix ? ' ' + el.price_suffix : ''}
						</p>
						<p className='card-text card-city'>{el.city_name}</p>
					</div>
				</div>
			</div>
		)
	})

	const onEmptyCity = () => {
		return <h3>К сожалению, в вашем городе ещё нет объявлений.</h3>
	}

	return (
		<div className='container px-4 pb-5 pt-4'>
			<div className={allCards.length ? 'row  row-cols-1 row-cols-lg-3 col-md-auto' : 'empty__title'}>
				{allCards.length ? card : onEmptyCity()}
			</div>
		</div>
	)
}

export default Cards
