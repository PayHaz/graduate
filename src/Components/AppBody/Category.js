/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './carousel.css'

const backendAPI = 'http://194.67.74.221:8000'

const Category = () => {
	const [categories, setCategories] = useState([])

	const fetchData = async () => {
		try {
			const response = await fetch(`${backendAPI}/category`)
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

	const Cat = categories.map((el, index) => {
		return (
			<div key={el.value} className={index > 4 ? 'col category pt-4' : 'col category'}>
				<a className='category__element' href={`/category/${el.value}`}>
					{el.label}
				</a>
			</div>
		)
	})

	return (
		<div className='container'>
			<div className='row row-cols-lg-5 cat d-flex justify-content-center'>{Cat}</div>
		</div>
	)
}

export default Category
