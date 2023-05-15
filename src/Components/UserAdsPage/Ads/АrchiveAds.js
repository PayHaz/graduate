/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import { Dropdown, Button, Modal } from 'antd'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

const contentStyle = {
	height: '270px',
	width: '100%',
}

const backendAPI = 'http://194.67.74.221:8000'

const АrchiveAds = () => {
	const [data, setData] = useState([])
	const adsTab = useSelector((state) => state.myAds.value)

	async function fetchData() {
		try {
			const response = await fetch('${backendAPI}/product?own=false&status=AR', {
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
		const response = await fetch(`${backendAPI}/product/${id}/`, {
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
			const response = await fetch(`${backendAPI}/product/${id}`, {
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
		if (key === '2') {
			if (key === '2') {
				window.location.href = `/edit/product/${selectedItem}`
			}
		}
		if (key === '3') {
			Modal.confirm({
				title: 'Удалить объявление',
				content: 'Вы уверены, что хотите удалить объявление?',
				okText: 'Да',
				cancelText: 'Нет',
				onOk() {
					deleteProduct(selectedItem)
				},
			})
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
			label: <a>Удалить</a>,
		},
	]

	const card = data.map((el, index) => {
		return (
			<div className='col pt-4' key={index}>
				<div className='card  h-100'>
					<img style={contentStyle} src={`${backendAPI}${el.images[0].img}`} />
					<div className='card-body'>
						<div className='title__group'>
							<h5 className='card-title'>
								<a href={`/product/${el.id}`} className='card__title'>
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
				{data.length === 0 ? 'Пока у вас нету архивных объявлений' : card}
			</div>
		</div>
	)
}

export default АrchiveAds
