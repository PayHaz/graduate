/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import { Dropdown, Button } from 'antd'
import '../UserAdsPage.css'
import Cookies from 'js-cookie'

const ActiveAds = () => {
	const [data, setData] = useState([])

	async function fetchData() {
		try {
			const response = await fetch('http://127.0.0.1:8000/product?status=AC', {
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			})
			const responseData = await response.json()
			setData(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const [selectedItem, setselectedItem] = useState()

	const handleClick = (el) => {
		setselectedItem(el.label)
		console.log(el)
	}
	const onClick = ({ key }) => {
		console.log(selectedItem, key)
	}

	const items = [
		{
			key: '1',
			label: <a>Снять объявление</a>,
		},
		{
			key: '2',
			label: <a>Изменить</a>,
		},
	]

	const card = data.map((el, index) => {
		return (
			<div className='col' key={index}>
				<div className={index > 2 ? 'card mt-4' : 'card'}>
					<img src='https://klike.net/uploads/posts/2020-07/1595055001_3.jpg' />
					<div className='card-body'>
						<div className='title__group'>
							<h5 className='card-title'>
								<a href='/product'>{el.name}</a>
							</h5>
							<Dropdown
								menu={{
									items,
									onClick,
								}}
								placement='bottom'
								arrow
								onOpenChange={(e) => {
									handleClick(el)
								}}
							>
								<a onClick={(e) => e.preventDefault()}>
									<Button>...</Button>
								</a>
							</Dropdown>
						</div>

						<p className='card-text'>{el.description}</p>
						<p className='card-text'>{el.price}</p>
						<p className='card-text'>{el.city_name}</p>
					</div>
				</div>
			</div>
		)
	})

	return (
		<div className='container px-4'>
			<div className='row  row-cols-1 row-cols-lg-3 col-md-auto '>
				{data.length === 0 ? 'Пока у вас нету активных объявлений' : card}
			</div>
		</div>
	)
}

export default ActiveAds
