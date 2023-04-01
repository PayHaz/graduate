import React, { useState, useEffect } from 'react'
import { Divider, Steps, Cascader, Button, message } from 'antd'
import './AddItemPage.css'

const options = [
	{
		value: 'zhejiang',
		label: 'Zhejiang',
		children: [
			{
				value: 'hangzhou',
				label: 'Hangzhou',
				children: [
					{
						value: 'xihu',
						label: 'West Lake',
					},
				],
			},
		],
	},
	{
		value: 'jiangsu',
		label: 'Jiangsu',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
				children: [
					{
						value: 'zhonghuamen',
						label: 'Zhong Hua Men',
					},
				],
			},
		],
	},
]

const steps = [
	{
		title: 'Шаг 1',
		description: 'Выберите категорию',
		disabled: false,
	},
	{
		title: 'Шаг 2',
		description: 'Введите данные о товаре',
		disabled: true,
	},
	{
		title: 'Шаг 3',
		description: 'Добавьте фотографии',
		disabled: true,
	},
	{
		title: 'Шаг 4',
		description: 'Публикация',
		disabled: true,
	},
]

const AddItemPage = () => {
	const [current, setCurrent] = useState(0)
	const [category, setCategory] = useState()
	const [items, setItems] = useState([])
	const [nextStepButton, setNextStepButton] = useState(true)

	const [formData, setFormData] = useState({
		category: null,
		name: '',
		characteristics: '',
		description: '',
	})

	const onChange = (value) => {
		setCurrent(value)
		console.log(value)
	}

	const next = () => {
		setCurrent(current + 1)
		setNextStepButton(true)
	}

	useEffect(() => {
		setItems(
			steps.map((item) => ({
				key: item.title,
				title: item.title,
				description: item.description,
				disabled: item.disabled,
			}))
		)
	}, [])

	const onCategoryChange = (value) => {
		setCategory(value)
		if (current === 0 && value) {
			setNextStepButton(false)
			setFormData({ ...formData, category: value })
			setItems((prevItems) => {
				const newItems = [...prevItems]
				newItems[1].disabled = false
				return newItems
			})
		}
		if (value === undefined) {
			setNextStepButton(true)
			setItems((prevItems) => {
				const newItems = [...prevItems]
				newItems[1].disabled = true
				return newItems
			})
		}
	}

	const StepContent = () => {
		const { category, name, characteristics, description } = formData
		const onInputChange = (e) => {
			setFormData({ ...formData, [e.target.name]: e.target.value })
			if (
				current === 1 &&
				formData.name !== '' &&
				formData.characteristics !== '' &&
				formData.description !== ''
			) {
				setNextStepButton(false)
			} else {
				setNextStepButton(true)
			}
		}
		if (current === 0)
			return (
				<Cascader
					options={options}
					value={category}
					onChange={onCategoryChange}
					placeholder='Выберите категорию'
					className='cascader'
				/>
			)
		if (current === 1)
			return (
				<div>
					<label>Название:</label>
					<input
						type='text'
						name='name'
						value={name}
						onChange={onInputChange}
						placeholder='Введите название'
						className='form-control'
					/>
					<label>Характеристики:</label>
					<input
						type='text'
						name='characteristics'
						value={characteristics}
						onChange={onInputChange}
						placeholder='Введите характеристики'
						className='form-control'
					/>
					<label>Описание:</label>
					<textarea
						name='description'
						value={description}
						onChange={onInputChange}
						placeholder='Введите описание'
						className='form-control'
					/>
				</div>
			)
	}

	return (
		<div className='container'>
			<div className='row'>
				<h1>Новое объявление</h1>
				<Steps current={current} onChange={onChange} items={items} />
				<div className='pt-5 change__category__group'>
					{StepContent()}
					{current < steps.length - 1 && (
						<Button type='primary' className='mt-3' disabled={nextStepButton} onClick={() => next()}>
							Следующий шаг
						</Button>
					)}
					{current === steps.length - 1 && (
						<Button type='primary' onClick={() => message.success('Processing complete!')}>
							Done
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default AddItemPage
