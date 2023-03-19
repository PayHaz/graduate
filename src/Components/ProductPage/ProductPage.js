import React from 'react'
import './ProductPage.css'

const ProductPage = () => {
	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-8'>
						<h1>Название товара</h1>
						<div className='product__gallery'>
							<div className='product-gallery'>
								<div className='product-gallery__featured'>
									<div className='owl-carousel' id='product-image'>
										<a href='{$image->filename|resize:800:600}' data-fancybox='gallery'>
											<img
												src='https://i.pinimg.com/originals/8a/de/fe/8adefe5af862b4f9cec286c6ee4722cb.jpg'
												alt='{$product->name|escape}'
											></img>
										</a>
									</div>
								</div>
								<div className='product-gallery__carousel'>
									<div className='owl-carousel' id='product-carousel'>
										<a
											href='{$image->filename|resize:800:600}'
											className='product-gallery__carousel-item'
										>
											<img
												className='product-gallery__carousel-image'
												src='https://i.pinimg.com/originals/8a/de/fe/8adefe5af862b4f9cec286c6ee4722cb.jpg'
												alt='{$product->name|escape}'
											></img>
										</a>
									</div>
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
