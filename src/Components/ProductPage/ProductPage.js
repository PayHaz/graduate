/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductPage.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const ProductPage = () => {
	const [product, setProduct] = useState(null)
	const [numberVisible, setNumberVisible] = useState(false)
	const { id } = useParams()

	const onTelButtonClick = () => {
		setNumberVisible(true)
	}

	useEffect(() => {
		fetch(`http://localhost:8000/product/${id}`)
			.then((response) => response.json())
			.then((data) => setProduct(data))
			.catch((error) => console.log(error))
	}, [id])

	if (!product) {
		return <p>Loading...</p>
	}

	const str = '+7 (912) 536-04-84'

	const ButtonTelContent = () => {
		if (numberVisible)
			return (
				<div className='row'>
					<div className='col-12'>
						<span>{str}</span>
					</div>
				</div>
			)
		else
			return (
				<div className='row'>
					<div className='col-12'>
						<span>Показать телефон</span>
					</div>
					<div className='col-12'>
						<span>{str.substr(0, 8)} XXX-XX-XX</span>
					</div>
				</div>
			)
	}

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-8'>
						<h1>{product.name}</h1>
						<div className='outer'>
							<Carousel showStatus={false} showIndicators={false} width={800}>
								{product.images.map((image) => (
									<div key={`http://localhost:8000${image.img}`}>
										<img src={`http://localhost:8000${image.img}`} />
									</div>
								))}
							</Carousel>
						</div>
					</div>
					<div className='col'>
						<h1>
							{product.is_lower_bound ? 'От' : ''} {product.price} {product.price_suffix}
						</h1>
						<button type='button' className='phone_btn btn btn-primary btn-lg' onClick={onTelButtonClick}>
							{ButtonTelContent()}
						</button>
					</div>
				</div>
				<h3>Характеристики</h3>
				<div className='col-lg-8'>
					<div className='row'>
						<div className='col-lg-6'>
							<p>Год выпуска: 2023</p>
						</div>
						<div className='col-lg-6'>
							<p>Привод: Передний</p>
						</div>
						<div className='col-lg-6'>
							<p>Состояние: Не битый</p>
						</div>
						<div className='col-lg-6'>
							<p>Цвет: Чёрный</p>
						</div>
					</div>
				</div>
				<h3>Описание</h3>

				<div className='col-lg-8'>
					<p>{product.description}</p>
				</div>
			</div>
		</>
	)
}

export default ProductPage
