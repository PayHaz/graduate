import React, { useState } from 'react'
import { Steps, Button, message, Form, Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
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

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

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
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
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
		const formData = new FormData()
		fileList.forEach((file) => {
			formData.append('files', file.originFileObj)
		})

		fetch('http://localhost:1337/api/upload', {
			method: 'POST',
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error('Failed to upload images')
				}
			})
			.then((data) => {
				const adData = {
					images: data.map((file) => ({ url: file.url })),
				}
				fetch('http://localhost:1337/api/ads', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(adData),
				})
					.then((response) => {
						if (response.ok) {
							message.success('Ad created successfully')
						} else {
							throw new Error('Failed to create ad')
						}
					})
					.catch((error) => {
						message.error(error.message)
					})
			})
			.catch((error) => {
				message.error(error.message)
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

	const handleCancel = () => setPreviewOpen(false)
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}
		setPreviewImage(file.url || file.preview)
		setPreviewOpen(true)
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
	}
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	)

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
					<h3>Загрузите фотографии:</h3>
					<div>
						<Upload
							action='http://localhost:1337/api/upload'
							listType='picture-card'
							fileList={fileList}
							onPreview={handlePreview}
							onChange={handleChange}
						>
							{fileList.length >= 8 ? null : uploadButton}
						</Upload>
						<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
							<img
								alt='example'
								style={{
									width: '100%',
								}}
								src={previewImage}
							/>
						</Modal>
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
				</div>
			</div>
		</div>
	)
}

export default AddItemPage
