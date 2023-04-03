import React, { useState } from 'react'
import { Steps, Button, message, Form, Upload } from 'antd'
import './AddItemPage.css'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'

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
	const [fileList, setFileList] = useState([])
	const [formCategory] = Form.useForm()
	const [formInform] = Form.useForm()

	const [formData, setFormData] = useState({
		category: null,
		name: '',
		characteristics: [],
		description: '',
		images: [],
	})

	const handleChange = ({ fileList: newFileList }) => {
		setFileList(newFileList.slice(0, 10))
	}

	const handleUpload = () => {
		setFormData({ ...formData, images: fileList })
		console.log(fileList)
		fetch('/api/upload', {
			method: 'POST',
			body: {
				name: formData.name,
				images: formData.images,
			},
		})
			.then((response) => {
				if (response.ok) {
					message.success('Images uploaded successfully')
				} else {
					message.error('Failed to upload images')
				}
			})
			.catch((error) => {
				message.error('Failed to upload images')
			})
	}

	const onChange = (value) => {
		setCurrent(value)
		console.log(value)
	}

	const next = () => {
		setCurrent(current + 1)
	}

	const onFinish = (values) => {
		if (current === 0) {
			setFormData({ ...formData, category: values })
		}
		if (current === 1) {
			setFormData({
				...formData,
				name: values.name,
				description: values.description,
				characteristics: values.characteristics,
			})
		}
		console.log(formData)
		next()
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const StepContent = () => {
		const { category } = formData
		if (current === 0)
			return <FirstStep formCategory={formCategory} onFinish={onFinish} options={options} category={category} />
		if (current === 1)
			return (
				<SecondStep
					formInform={formInform}
					onFinish={onFinish}
					current={current}
					formData={formData}
					steps={steps}
					prev={prev}
				/>
			)
		if (current === 2)
			return (
				<>
					<div>
						<Upload
							action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
							listType='picture-card'
							fileList={fileList}
							onChange={handleChange}
							onRemove={() => false}
						>
							{fileList.length < 10 && '+ Upload'}
						</Upload>
						<Button onClick={handleUpload}>Отправить данные на проверку</Button>
					</div>

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
					{current > 0 && (
						<Button
							style={{
								margin: '0 8px',
							}}
							onClick={() => prev()}
						>
							Previous
						</Button>
					)}
				</>
			)
	}

	const onBtnClick = (e) => {
		e.preventDefault()
		console.log(formData)
	}

	return (
		<div className='container'>
			<div className='row'>
				<h1>Новое объявление</h1>
				<Steps current={current} onChange={onChange} items={steps} />
				<div className='pt-5 change__category__group'>
					{StepContent()}

					{current === steps.length - 1 && (
						<Button type='primary' onClick={() => message.success('Processing complete!')}>
							Done
						</Button>
					)}
					<Button type='primary' onClick={onBtnClick}>
						Test
					</Button>
				</div>
			</div>
		</div>
	)
}

export default AddItemPage
