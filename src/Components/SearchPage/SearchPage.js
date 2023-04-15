import React, { useState, useEffect } from 'react'
import { TreeSelect, Slider, Button, Form, Carousel } from 'antd'
import './SerachPage.css'

const contentStyle = {
	margin: 0,
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
}

const onLoadCards = [
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '1',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '2',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '3',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '4',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '5',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '6',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '7',
	},
	{
		label: 'Трактер',
		description: 'Какое-то очень интересное описание трактера, который очень хороший и производительный',
		location: 'Нижневартовск',
		coast: '1000р',
		key: '8',
	},
]

const treeData = [
	{
		value: 'parent 1',
		title: 'parent 1',
		children: [
			{
				value: 'parent 1-0',
				title: 'parent 1-0',
				children: [
					{
						value: 'leaf1',
						title: 'leaf1',
					},
					{
						value: 'leaf2',
						title: 'leaf2',
					},
				],
			},
			{
				value: 'parent 1-1',
				title: 'parent 1-1',
				children: [
					{
						value: 'leaf3',
						title: <b style={{ color: '#08c' }}>leaf3</b>,
					},
				],
			},
		],
	},
]

const marks = {
	0: '0 ₽',
	100: {
		style: {
			width: '50px',
		},
		label: <strong>100 ₽</strong>,
	},
}

const SearchPage = () => {
	const [value, setValue] = useState()
	const [inputValue, setInputValue] = useState(0)
	const [allCards] = useState(onLoadCards)
	const [data, setData] = useState([])
	const onChange = (newValue) => {
		setValue(newValue)
	}

	const onSliderChange = (value) => {
		if (isNaN(value)) {
			return
		}
		setInputValue(value)
		console.log(value)
	}

	async function fetchData() {
		try {
			const response = await fetch('http://localhost:8000/category/tree')
			const responseData = await response.json()
			console.log(responseData)
			setData(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const card = allCards.map((el, index) => {
		return (
			<div className='col' key={index}>
				<div className={index < 3 ? 'card' : 'card mt-5'}>
					<Carousel autoplay autoplaySpeed={Math.random() * (6000 - 3000) + 3000}>
						<div>
							<h3 style={contentStyle}>1</h3>
						</div>
						<div>
							<h3 style={contentStyle}>2</h3>
						</div>
						<div>
							<h3 style={contentStyle}>3</h3>
						</div>
						<div>
							<h3 style={contentStyle}>4</h3>
						</div>
					</Carousel>
					<div className='card-body'>
						<h5 className='card-title'>
							<a href='/' className='card__title'>
								{el.label}
							</a>
						</h5>
						<p className='card-text'>{el.description}</p>
						<p className='card-text'>{el.coast}</p>
						<p className='card-text'>{el.location}</p>
					</div>
				</div>
			</div>
		)
	})

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-3 widget-products'>
						<h5 className='filter__title'>Фильтр</h5>
						<Form>
							<div className='pt-3'>
								<p className='category__selector__label'>Категория:</p>
								<Form.Item>
									<TreeSelect
										showSearch
										style={{
											width: '100%',
										}}
										value={value}
										dropdownStyle={{
											maxHeight: 400,
											overflow: 'auto',
										}}
										placeholder='Please select'
										allowClear
										treeDefaultExpandAll
										onChange={onChange}
										treeData={data}
									/>
								</Form.Item>
							</div>
							<div>
								<p className='category__selector__label'>Цена:</p>
								<Form.Item>
									<Slider onChange={onSliderChange} range marks={marks} defaultValue={[0, 100]} />
								</Form.Item>
							</div>
							<div className=' filter__button'>
								<Form.Item>
									<Button type='primary'>Применить</Button>
								</Form.Item>
							</div>
						</Form>
					</div>
					<div className='col-9'>
						<div className='px-4'>
							<div className='row  row-cols-1 row-cols-lg-3 col-md-auto '>{card}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SearchPage
