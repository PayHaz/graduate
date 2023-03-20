import React, { useEffect } from 'react'
import './ProductPage.css'
import { $ } from 'jquery'

const ProductPage = () => {
	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-8'>
						<h1>Название товара</h1>
						<div class='outer'>
							<div id='big' class='owl-carousel owl-theme'>
								<div class='item'>
									<h1>1</h1>
								</div>
								<div class='item'>
									<h1>2</h1>
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
									<h1>1</h1>
								</div>
								<div class='item'>
									<h1>2</h1>
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
			</div>
		</>
	)
}

export default ProductPage
