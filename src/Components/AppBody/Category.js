/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './carousel.css'

const Category = () => {
	const [categories, setCategories] = useState([])

	const fetchData = async () => {
		try {
			const response = await fetch('http://127.0.0.1:8000/category')
			const responseData = await response.json()
			const formatedData = responseData.map((obj) => ({
				value: obj.id,
				label: obj.name,
			}))
			setCategories(formatedData)
			console.log(formatedData)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const Cat = categories.map((el) => {
		return (
			<div key={el.value} className={el.value > 7 ? 'col category pt-2' : 'col category'}>
				<a className='category__element' href='/'>
					{el.label}
				</a>
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
