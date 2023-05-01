import React, { useEffect, useState } from 'react'
import { Steps, Button, message, Form, Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './AddItemPage.css'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import Cookies from 'js-cookie'
import { setToken } from '../../features/session/sessionSlice'
import { useSelector, useDispatch } from 'react-redux'

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
	const [setLoading] = useState(false)
	const dispatch = useDispatch()
	if (Cookies.get('token') !== undefined) {
		dispatch(setToken(Cookies.get('token')))
	}
	const session = useSelector((state) => state.session.value)

	const [formCategory] = Form.useForm()
	const [formInform] = Form.useForm()

	const [formData, setFormData] = useState({
		category: null,
		name: '',
		features: [],
		description: '',
		is_lower_bound: false,
		price_suffix: 'N',
		price: 100,
		city: 0,
	})

	const handleChange = ({ fileList: newFileList }) => {
		setFileList(newFileList.slice(0, 10))
	}

	const onChange = (value) => {
		setCurrent(value)
	}

	const fetchData = async () => {
		if (current === 2) {
			const response = await fetch('http://localhost:8000/product', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
				body: JSON.stringify(formData),
			})
			const data = await response.json()
			if (response.status === 201) {
				message.success('Всё ок')
			} else {
				message.error('Печалька :c')
			}
		}
	}

	const next = () => {
		setCurrent(current + 1)
	}

	useEffect(() => {
		fetchData()
	}, [formData])

	const onFinish = (values) => {
		if (current === 0) {
			setFormData({ ...formData, category: values })
			next()
		}
		if (current === 1) {
			setFormData({
				...formData,
				name: values.name,
				description: values.description,
				characteristics: values.characteristics,
				priceSuffix: values.priceSuffix,
				price: values.price,
				city: values.city,
			})
			next()
		}
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
		if (current === 0) return <FirstStep formCategory={formCategory} onFinish={onFinish} />
		if (current === 1) {
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
		}
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

	const addItemContent = () => {
		if (session !== '')
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
		else return <h1>Печалька</h1>
	}

	return addItemContent()
}

export default AddItemPage
