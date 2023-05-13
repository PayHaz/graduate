/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { Carousel } from 'antd'
import { useSelector } from 'react-redux'
import './carousel.css'
import Cookies from 'js-cookie'
import Heart from 'react-heart'

const contentStyle = {
	height: '270px',
	width: '100%',
}

const Cards = () => {
	const [allCards, setAllCards] = useState([])
	const city = useSelector((state) => state.city.value)

	const fetchData = async () => {
		const cookie = Cookies.get('city_id')
		try {
			const headers = {}
			if (Cookies.get('token')) {
				headers.Authorization = `Bearer ${Cookies.get('token')}`
			}
			const response = await fetch(`http://127.0.0.1:8000/product?status=AC${cookie ? `&city=${cookie}` : ''}`, {
				headers,
			})
			const data = await response.json()
			setAllCards(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [city])

	const productImages = (images) => {
		return images.map((image) => (
			<div key={image.id}>
				<img style={contentStyle} src={`http://localhost:8000${image.img}`} />
			</div>
		))
	}

	const handleClick = async (id) => {
		const updatedCards = allCards.map((el) => {
			if (el.id === id) {
				return {
					...el,
					is_favorite: !el.is_favorite,
				}
			}
			return el
		})
		setAllCards(updatedCards)
		try {
			const response = await fetch(`http://localhost:8000/product/${id}/favorite/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
				body: JSON.stringify({
					is_favorite: !allCards.find((el) => el.id === id).is_favorite,
				}),
			})
			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	const heart = (el) => {
		return (
			<div style={{ width: '25px' }}>
				<Heart isActive={el.is_favorite} onClick={() => handleClick(el.id)} />
			</div>
		)
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
							<a href={`http://localhost:3000/product/${el.id}`} className='card__title'>
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
						<div className='d-flex justify-content-between'>
							<p className='card-text card-city'>{el.city_name}</p>
							{heart(el)}
						</div>
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
