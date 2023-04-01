import React, { useState } from 'react'
import { Divider, Steps, Cascader, Button, message } from 'antd'

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
	const [category, setСategory] = useState()

	const onChange = (value) => {
		setCurrent(value)
	}

	const onCategoryChange = (value) => {
		setСategory(value)
	}

	const next = () => {
		setCurrent(current + 1)
	}

	const StepContent = () => {
		if (current === 0)
			return (
				<Cascader options={options} value={category} onChange={onCategoryChange} placeholder='Please select' />
			)
	}

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
		description: item.description,
		disabled: item.disabled,
	}))

	return (
		<div className='container'>
			<div className='row'>
				<h1>Категория</h1>
				<Steps current={current} onChange={onChange} items={items} />
				<div className='pt-5'>
					{StepContent()}
					{current < steps.length - 1 && (
						<Button type='primary' onClick={() => next()}>
							Next
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
