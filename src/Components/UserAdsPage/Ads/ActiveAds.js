/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import { Dropdown, Button, Modal } from 'antd'
import '../UserAdsPage.css'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

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
	}

	const items = [
		{
			key: '1',
			label: <p>Снять объявление</p>,
		},
		{
			key: '2',
			label: <p>Изменить</p>,
		},
	]

	const card = data.map((el, index) => {
		return (
			<div className='col' key={index}>
				<div className={index > 2 ? 'card mt-4' : 'card'}>
					<img src={`http://localhost:8000${el.images[0]}`} />
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
				{data.length === 0 ? 'Пока у вас нету активных объявлений' : card}
			</div>
		</div>
	)
}

export default ActiveAds
