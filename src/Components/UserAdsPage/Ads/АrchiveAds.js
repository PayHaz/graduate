/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { Dropdown, Button } from 'antd'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

const АrchiveAds = () => {
	const [data, setData] = useState([])
	const adsTab = useSelector((state) => state.myAds.value)

	async function fetchData() {
		try {
			const response = await fetch('http://127.0.0.1:8000/product?status=AR', {
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

	async function changeProductStatus(id) {
		const response = await fetch(`http://127.0.0.1:8000/product/${id}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			body: JSON.stringify({
				status: 'AC',
			}),
		})

		if (!response.ok) {
			throw new Error('Failed to change product status')
		} else {
			setData(data.filter((item) => item.id !== id))
		}
	}

	async function deleteProduct(id) {
		try {
			const response = await fetch(`http://127.0.0.1:8000/product/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			})
			if (response.ok) {
				console.log('Продукт успешно удален')
				setData(data.filter((item) => item.id !== id))
			} else {
				console.error('Ошибка удаления продукта')
			}
		} catch (error) {
			console.error('Ошибка удаления продукта:', error)
		}
	}

	useEffect(() => {
		fetchData()
		if (adsTab) {
			fetchData()
		}
	}, [adsTab])

	const [selectedItem, setselectedItem] = useState()

	const handleClick = (el) => {
		setselectedItem(el.id)

		console.log(el)
	}

	const onClick = ({ key }) => {
		if (key === '1') {
			changeProductStatus(selectedItem)
			console.log(selectedItem, key)
		}
		if (key === '3') {
			deleteProduct(selectedItem)
			console.log(selectedItem, key)
		}
	}

	const items = [
		{
			key: '1',
			label: <a>Опубликовать</a>,
		},
		{
			key: '2',
			label: <a>Редактировать</a>,
		},
		{
			key: '3',
			label: <a>Удлить</a>,
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
									onClick: onClick, // передаем функцию handleClick
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
				{data.length === 0 ? 'Пока у вас нету архивных объявлений' : card}
			</div>
		</div>
	)
}

export default АrchiveAds
