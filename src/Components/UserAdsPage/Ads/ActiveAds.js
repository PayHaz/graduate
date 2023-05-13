/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import { Dropdown, Button, Modal } from 'antd'
import '../UserAdsPage.css'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const contentStyle = {
	height: '270px',
	width: '100%',
}

const ActiveAds = () => {
	const [data, setData] = useState([])
	const adsTab = useSelector((state) => state.myAds.value)

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

	async function changeProductStatus(id) {
		const response = await fetch(`http://127.0.0.1:8000/product/${id}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			body: JSON.stringify({
				status: 'AR',
			}),
		})

		if (!response.ok) {
			throw new Error('Failed to change product status')
		} else {
			setData(data.filter((item) => item.id !== id))
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
		console.log()
		if (key === '1') {
			Modal.confirm({
				title: 'В архив',
				content: 'Вы уверены, что хотите переместить объявление в архив?',
				okText: 'Да',
				cancelText: 'Нет',
				onOk() {
					changeProductStatus(selectedItem)
				},
			})
		}
		if (key === '2') {
			if (key === '2') {
				window.location.href = `http://localhost:3000/edit/product/${selectedItem}`
			}
		}
	}

	const items = [
		{
			key: '1',
			label: <a>Снять объявление</a>,
		},
		{
			key: '2',
			label: <a>Редактировать</a>,
		},
	]

	const card = data.map((el, index) => {
		return (
			<div className='col' key={index}>
				<div className='card  h-100'>
					<img style={contentStyle} src={`http://localhost:8000${el.images[0].img}`} />
					<div className='card-body'>
						<div className='title__group'>
							<h5 className='card-title'>
								<a href={`http://localhost:3000/product/${el.id}`} className='card__title'>
									{el.name}
								</a>
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

						<p className='card-text card-description'>{el.description}</p>
					</div>
					<div class='card-footer'>
						<p className='card-text'>
							{el.is_lower_bound ? 'от ' : ''}
							{el.price}
							{el.price_suffix ? ' ' + el.price_suffix : ''}
						</p>
						<p className='card-text card-city'>{el.city_name}</p>
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
