/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Carousel, Pagination } from 'antd'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

const contentStyle = {
	height: '230px',
	width: '100%',
}

const backendAPI = 'http://194.67.74.221:8000'

const CategoryPage = () => {
	const [cards, setCards] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const { params } = useParams()
	const pageSize = 12
	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize
	const cardsToShow = cards.slice(startIndex, endIndex)
	const city = useSelector((state) => state.city.value)
	let parentCategory = ''
	const [category, setCategory] = useState([])

	async function fetchCategories() {
		try {
			const response = await fetch(`${backendAPI}/category/tree?category=${params}`)
			const responseData = await response.json()
			setCategory(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	async function fetchCards() {
		try {
			const response = await fetch(
				`${backendAPI}/search?category=${params}${
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

	const Cat = category.map((el) => {
		if (el.value !== parseInt(params)) {
			return (
				<div key={el.value} className={el.value > 7 ? 'col category pt-2' : 'col category'}>
					<a className='category__element' href={`/category/${el.value}`}>
						{el.title}
					</a>
				</div>
			)
		} else {
			parentCategory = el.title
			return null
		}
	})

	const productImages = (images) => {
		return images.map((image, index) => (
			<div key={index}>
				<img style={contentStyle} src={`${backendAPI}${image.img}`} />
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
							<a href={`/product/${el.id}`} className='card__title'>
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

	const onEmptyCards = () => {
		return (
			<div className='d-flex justify-content-center'>
				<h1>К сожалению, тут ещё пусто.</h1>
			</div>
		)
	}

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-12'>
						<div className='px-4'>
							<div className='row row-cols-lg-5 cat pt-3 d-flex justify-content-center'>{Cat}</div>
							<h3 className='pt-4'>Категория: {parentCategory}</h3>
							{cardsToShow.length > 0 ? (
								<div className='row  row-cols-1 row-cols-lg-3 col-md-auto '>{card}</div>
							) : (
								onEmptyCards()
							)}
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
