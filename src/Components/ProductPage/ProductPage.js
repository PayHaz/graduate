/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductPage.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const backendAPI = 'http://194.67.74.221:8000'

const ProductPage = () => {
	const [product, setProduct] = useState(null)
	const [numberVisible, setNumberVisible] = useState(false)
	const { id } = useParams()

	const onTelButtonClick = () => {
		setNumberVisible(true)
	}

	useEffect(() => {
		fetch(`${backendAPI}/product/${id}`)
			.then((response) => response.json())
			.then((data) => setProduct(data))
			.catch((error) => console.log(error))
	}, [id])

	if (!product) {
		return <p>Loading...</p>
	}

	const formatPhoneNumber = (phoneNumber) => {
		const cleaned = ('' + phoneNumber).replace(/\D/g, '')
		const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/)
		if (match) {
			return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
		}
		return null
	}

	const ButtonTelContent = () => {
		const formattedPhone = formatPhoneNumber(product.author.phone)
		if (numberVisible)
			return (
				<div className='row'>
					<div className='col-12'>
						<span>{formattedPhone}</span>
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
						<span>{formattedPhone && formattedPhone.substr(0, 8)} XXX-XX-XX</span>
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
									<div key={`${backendAPI}${image.img}`}>
										<img src={`${backendAPI}${image.img}`} />
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
				{product.features.length > 0 ? (
					<div>
						<h3>Характеристики</h3>
						<div className='col-lg-8'>
							<div className='row'>
								{product.features.map((feature) => (
									<div className='col-lg-6' key={feature.name}>
										<p>
											{feature.name}: {feature.value}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				) : (
					''
				)}

				<h3>Описание</h3>

				<div className='col-lg-8'>
					<p>{product.description}</p>
				</div>
			</div>
		</>
	)
}

export default ProductPage
