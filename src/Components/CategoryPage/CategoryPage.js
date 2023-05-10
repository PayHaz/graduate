import React, { useState, useEffect } from 'react'
import { TreeSelect, Slider, Button, Form, Carousel, Pagination } from 'antd'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

const contentStyle = {
	height: '230px',
	width: '100%',
}

const CategoryPage = () => {
	const [cards, setCards] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const { params } = useParams()
	const pageSize = 12
	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize
	const cardsToShow = cards.slice(startIndex, endIndex)
	const city = useSelector((state) => state.city.value)
	const [category, setCategory] = useState()

	async function fetchCategories() {
		try {
			const response = await fetch(`http://localhost:8000/category/tree?category=${params}`)
			const responseData = await response.json()
			setCategory(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	async function fetchCards() {
		try {
			const response = await fetch(
				`http://localhost:8000/search?category=${params}${
					Cookies.get('city_id') ? '&city=' + Cookies.get('city_id') : ''
				}`
			)
			const responseData = await response.json()
			setCards(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}

	useEffect(() => {
		fetchCategories()
		fetchCards()
		if (city) {
			fetchCards()
		}
	}, [city])

	const productImages = (images) => {
		return images.map((image, index) => (
			<div key={index}>
				<img style={contentStyle} src={`http://localhost:8000${image}`} />
			</div>
		))
	}

	const card = cardsToShow.map((el, index) => {
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
						<p className='card-text card-city'>{el.city_name}</p>
					</div>
				</div>
			</div>
		)
	})

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-12'>
						<div className='px-4'>
							<div className='row row-cols-lg-5 cat'></div>
							<div className='row  row-cols-1 row-cols-lg-3 col-md-auto '>{card}</div>
						</div>
						<Pagination
							current={currentPage}
							onChange={handlePageChange}
							pageSize={pageSize}
							total={cards.length}
							style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default CategoryPage
