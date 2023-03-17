/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'

const onLoadCategories = [
	{ label: 'Все категории', key: '1' },
	{ label: 'Транспортные средства', key: '2' },
	{ label: 'Строительное оборудование', key: '3' },
	{ label: 'Перфораторы', key: '4' },
	{ label: 'Мото-техника', key: '5' },
	{ label: 'Тепловое оборудование', key: '6' },
	{ label: 'Климатическая техника', key: '7' },
]

const Category = () => {
	const [categories] = useState(onLoadCategories)

	const Cat = categories.map((el) => {
		return (
			<div key={el.key} className={el.key > 5 ? 'col category pt-2' : 'col category'}>
				<a href='/'>{el.label}</a>
			</div>
		)
	})

	return (
		<div className='container'>
			<div className='row row-cols-lg-5 cat'>{Cat}</div>
		</div>
	)
}

export default Category
