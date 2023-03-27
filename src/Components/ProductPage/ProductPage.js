/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import './ProductPage.css'

const ProductPage = () => {
	const [numberVisible, setNumberVisible] = useState(false)

	const onTelButtonClick = () => {
		setNumberVisible(true)
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
						<h1>Название товара</h1>
						<div className='outer'>
							<div id='big' className='owl-carousel owl-theme'>
								<div className='item'>
									<img
										className='product-img'
										src='https://akt22.ru/upload/iblock/58f/04zgbjpmdvpbwjr31mlo19p0naj29rvf.jpg'
									></img>
								</div>
								<div className='item'>
									<img
										className='product-img'
										src='https://www.championnet.ru/spree/products/132360/original/IMG_1065.JPG?1617084023'
									></img>
								</div>
								<div className='item'>
									<h1>3</h1>
								</div>
								<div className='item'>
									<h1>4</h1>
								</div>
								<div className='item'>
									<h1>5</h1>
								</div>
								<div className='item'>
									<h1>6</h1>
								</div>
								<div className='item'>
									<h1>7</h1>
								</div>
								<div className='item'>
									<h1>8</h1>
								</div>
								<div className='item'>
									<h1>9</h1>
								</div>
								<div className='item'>
									<h1>10</h1>
								</div>
							</div>
							<div id='thumbs' className='owl-carousel owl-theme'>
								<div className='item'>
									<img
										className='product-img'
										src='https://akt22.ru/upload/iblock/58f/04zgbjpmdvpbwjr31mlo19p0naj29rvf.jpg'
									></img>
								</div>
								<div className='item'>
									<img
										className='product-img'
										src='https://www.championnet.ru/spree/products/132360/original/IMG_1065.JPG?1617084023'
									></img>
								</div>
								<div className='item'>
									<h1>3</h1>
								</div>
								<div className='item'>
									<h1>4</h1>
								</div>
								<div className='item'>
									<h1>5</h1>
								</div>
								<div className='item'>
									<h1>6</h1>
								</div>
								<div className='item'>
									<h1>7</h1>
								</div>
								<div className='item'>
									<h1>8</h1>
								</div>
								<div className='item'>
									<h1>9</h1>
								</div>
								<div className='item'>
									<h1>10</h1>
								</div>
							</div>
						</div>
					</div>
					<div className='col'>
						<h1>17000 ₽ в месяц</h1>
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
					<p>
						Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является
						стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный
						печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки
						образцов.
					</p>
				</div>
			</div>
		</>
	)
}

export default ProductPage
