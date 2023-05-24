/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { TreeSelect, Slider, Button, Form, Carousel, Pagination } from 'antd'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import './SerachPage.css'

const contentStyle = {
	height: '230px',
	width: '100%',
}

const backendAPI = 'http://194.67.74.221:8000'

const SearchPage = () => {
	const [value] = useState()
	const [cards, setCards] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [data, setData] = useState([])
	const { params } = useParams()
	const [category, setCategory] = useState(null)
	const pageSize = 12
	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize
	const cardsToShow = cards.slice(startIndex, endIndex)
	const [priceRange, setPriceRange] = useState(null)
	const [minPrice, setMinPrice] = useState(999999)
	const [maxPrice, setMaxPrice] = useState(0)
	const city = useSelector((state) => state.city.value)

	async function fetchCards() {
		try {
			const response = await fetch(
				`${backendAPI}/search?name=${params}${Cookies.get('city_id') ? '&city=' + Cookies.get('city_id') : ''}${
					category ? '&category=' + category : ''
				}${priceRange ? '&minRange=' + priceRange[0] + '&maxRange=' + priceRange[1] : ''}`
			)
			const responseData = await response.json()
			responseData.map((el) => {
				if (el.min_price < minPrice) setMinPrice(el.min_price)

				if (el.max_price > maxPrice) setMaxPrice(el.max_price)
				return el
			})
			setCards(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	const handlePriceRangeChange = (value) => {
		setPriceRange(value)
	}

	const handleCategoryChange = (value) => {
		setCategory(value)
		fetchCards()
	}

	const handleApplyFilters = () => {
		fetchCards()
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}

	async function fetchData() {
		try {
			const response = await fetch(`${backendAPI}/category/tree`)
			const responseData = await response.json()
			setData(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchData()
		fetchCards()
		if (city) {
			fetchCards()
		}
	}, [city])

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

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-3 widget-products'>
						<h5 className='filter__title'>Фильтр</h5>
						<Form>
							<div className='pt-3'>
								<p className='category__selector__label'>Категория:</p>
								<Form.Item>
									<TreeSelect
										showSearch
										style={{
											width: '100%',
										}}
										value={value}
										dropdownStyle={{
											maxHeight: 400,
											overflow: 'auto',
										}}
										placeholder='Пожалуйста, выберите категорию'
										allowClear
										treeDefaultExpandAll
										onChange={handleCategoryChange}
										treeData={data}
									/>
								</Form.Item>
							</div>
							<div>
								<p className='category__selector__label'>Цена:</p>
								<Form.Item>
									<Slider
										className='slider-main-div'
										min={minPrice}
										max={maxPrice}
										range={{ draggableTrack: true }}
										onChange={handlePriceRangeChange}
										defaultValue={[minPrice, maxPrice]}
										marks={{
											[minPrice]: `${minPrice}₽`,
											[maxPrice]: `${maxPrice}₽`,
										}}
									/>
								</Form.Item>
							</div>
							<div className=' filter__button'>
								<Form.Item>
									<Button type='primary' onClick={handleApplyFilters}>
										Применить
									</Button>
								</Form.Item>
							</div>
						</Form>
					</div>
					<div className='col-9'>
						<div className='px-4'>
							<h1>Поиск: {params}</h1>
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

export default SearchPage
