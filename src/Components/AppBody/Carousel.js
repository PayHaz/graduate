/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './carousel.css'
import Main1 from './img/MainBanners/MainRent1.jpg'
import Main2 from './img/MainBanners/MainRent2.jpg'
import Main3 from './img/MainBanners/MainRent3.jpg'

const Carousel = () => {
	return (
		<div id='myCarousel' className='carousell slide' data-bs-ride='carousel'>
			<div className='carousel-inner'>
				<div className='carousel-item active'>
					<img style={{ width: 'nan' }} src={Main1}></img>

					<div className='container'>
						<div className='carousel-caption text-start'>
							<h1 className='title'>
								<span>Аренда квартир</span>
								<br />
								<span>по выгодным ценам!</span>
							</h1>
						</div>
					</div>
				</div>
				<div className='carousel-item'>
					<img src={Main2} />
					<div className='container'>
						<div className='carousel-caption text-end'>
							<h1 className='title'>
								<span>Большой выбор</span>
								<br />
								<span>Мото и авто техники</span>
							</h1>
						</div>
					</div>
				</div>
				<div className='carousel-item'>
					<img src={Main3}></img>

					<div className='container'>
						<div className='carousel-caption text-end'>
							<h1 className='title'>
								<span>Различные виды</span>
								<br />
								<span>Спортивного инвентаря</span>
							</h1>
						</div>
					</div>
				</div>
			</div>
			<button className='carousel-control-prev' type='button' data-bs-target='#myCarousel' data-bs-slide='prev'>
				<span className='carousel-control-prev-icon' aria-hidden='true'></span>
				<span className='visually-hidden'>Previous</span>
			</button>
			<button className='carousel-control-next' type='button' data-bs-target='#myCarousel' data-bs-slide='next'>
				<span className='carousel-control-next-icon' aria-hidden='true'></span>
				<span className='visually-hidden'>Next</span>
			</button>
		</div>
	)
}

export default Carousel
