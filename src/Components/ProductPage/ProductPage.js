/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './ProductPage.css'

const ProductPage = () => {
	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-8'>
						<h1>Название товара</h1>
						<div class='outer'>
							<div id='big' class='owl-carousel owl-theme'>
								<div class='item'>
									<img
										className='product-img'
										src='https://akt22.ru/upload/iblock/58f/04zgbjpmdvpbwjr31mlo19p0naj29rvf.jpg'
									></img>
								</div>
								<div class='item'>
									<img
										className='product-img'
										src='https://www.championnet.ru/spree/products/132360/original/IMG_1065.JPG?1617084023'
									></img>
								</div>
								<div class='item'>
									<h1>3</h1>
								</div>
								<div class='item'>
									<h1>4</h1>
								</div>
								<div class='item'>
									<h1>5</h1>
								</div>
								<div class='item'>
									<h1>6</h1>
								</div>
								<div class='item'>
									<h1>7</h1>
								</div>
								<div class='item'>
									<h1>8</h1>
								</div>
								<div class='item'>
									<h1>9</h1>
								</div>
								<div class='item'>
									<h1>10</h1>
								</div>
							</div>
							<div id='thumbs' class='owl-carousel owl-theme'>
								<div class='item'>
									<img
										className='product-img'
										src='https://akt22.ru/upload/iblock/58f/04zgbjpmdvpbwjr31mlo19p0naj29rvf.jpg'
									></img>
								</div>
								<div class='item'>
									<img
										className='product-img'
										src='https://www.championnet.ru/spree/products/132360/original/IMG_1065.JPG?1617084023'
									></img>
								</div>
								<div class='item'>
									<h1>3</h1>
								</div>
								<div class='item'>
									<h1>4</h1>
								</div>
								<div class='item'>
									<h1>5</h1>
								</div>
								<div class='item'>
									<h1>6</h1>
								</div>
								<div class='item'>
									<h1>7</h1>
								</div>
								<div class='item'>
									<h1>8</h1>
								</div>
								<div class='item'>
									<h1>9</h1>
								</div>
								<div class='item'>
									<h1>10</h1>
								</div>
							</div>
						</div>
					</div>
					<div class='col'>
						<h1>17000 ₽ в месяц</h1>
					</div>
				</div>
				<h3>Характеристики</h3>
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
		</>
	)
}

export default ProductPage
