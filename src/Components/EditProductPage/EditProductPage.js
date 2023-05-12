import React, { useState, useEffect } from 'react'
import { Input, Button, Space, Select, InputNumber, Checkbox, Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { message } from 'antd'
import './EditProductPage.css'

const options = [
	{
		value: 'N',
		label: 'рублей',
	},
	{
		value: 'S',
		label: 'за услугу',
	},
	{
		value: 'H',
		label: 'за час',
	},
	{
		value: 'U',
		label: 'за единицу',
	},
	{
		value: 'D',
		label: 'за день',
	},
	{
		value: 'MT',
		label: 'за месяц',
	},
	{
		value: 'M2',
		label: 'за м^2',
	},
	{
		value: 'M',
		label: 'за метр',
	},
]

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

const EditProductPage = () => {
	const [product, setProduct] = useState(null)
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState(0)
	const { productId } = useParams()
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
	const [checked, setChecked] = useState(true)
	const [fileList, setFileList] = useState([])
	const [productCity, setProductCity] = useState('')
	const [cities, setCities] = useState([])
	const { TextArea } = Input
	const [selectedValue, setSelectedValue] = useState()

	const fetchData = async () => {
		try {
			const response = await fetch('http://127.0.0.1:8000/city')
			const responseData = await response.json()
			const formatedData = responseData.map((obj) => ({
				value: obj.id,
				label: obj.name,
			}))
			setCities(formatedData)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	async function fetchProduct() {
		try {
			const response = await fetch(`http://localhost:8000/product/${productId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			})
			if (response.status === 200) {
				const data = await response.json()
				setProduct(data)
				setName(data.name)
				setDescription(data.description)
				setPrice(data.price)
				setProductCity(data.city_id)
				setChecked(data.is_lower_bound)
				setSelectedValue(data.price_suffix)
				const images = data.images.map((image, index) => ({
					id: image.id,
					uid: -index,
					name: `image-${index}.png`,
					status: 'done',
					url: 'http://localhost:8000' + image.img,
				}))
				setFileList(images)
			} else {
				throw new Error('Ошибка загрузки продукта')
			}
		} catch (error) {
			console.error(error)
			message.error('Ошибка загрузки продукта')
		}
	}

	useEffect(() => {
		fetchProduct()
	}, [productId])

	const handleNameChange = (event) => {
		setName(event.target.value)
	}

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value)
	}

	const handleCityChange = (value) => {
		console.log(value)
		setProductCity(value)
	}

	const handleCheckChange = (value) => {
		setChecked(value.target.checked)
	}

	const handlePriceChange = (event) => {
		setPrice(event.target.value)
	}

	const onSelectChange = (value) => {
		setSelectedValue(value)
	}

	const handleUpdateClick = () => {
		fetch(`http://localhost:8000/product/${productId}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			body: JSON.stringify({
				name,
				description,
				price,
				city_id: productCity,
				is_lower_bound: checked,
				price_suffix: selectedValue,
			}),
		})
			.then((response) => {
				if (response.ok) {
					message.success('Продукт успешно изменён!')
					return response.json()
				} else {
					throw new Error('Failed to update product.')
				}
			})
			.then((data) => {
				console.log(data)
			})
			.catch((error) => {
				console.error(error)
			})
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
	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

	if (!product) {
		return <div>Loading...</div>
	}

	const handleRemove = (file) => {
		const product_id = productId
		const image_id = file.id
		console.log(file.id)
		fetch(`http://localhost:8000/products/${product_id}/images/${file.id}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
		})
			.then((response) => {
				if (response.status === 204) {
					console.log('Image deleted successfully')
				} else {
					console.error('Failed to delete image')
				}
			})
			.catch((error) => console.error(error))
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

	return (
		<div className='container'>
			<div className='row justify-content-center'>
				<div className='col-md-6'>
					<form>
						<div className='form-group text-center mb-3'>
							<Upload
								action={`http://localhost:8000/product/${productId}/image`}
								name='images'
								listType='picture-card'
								fileList={fileList}
								onPreview={handlePreview}
								onChange={handleChange}
								onRemove={handleRemove}
								headers={{
									Authorization: `Bearer ${Cookies.get('token')}`,
								}}
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
							<label htmlFor='name'>Город</label>
							<Select
								showSearch
								placeholder='Выберите город'
								defaultValue={productCity}
								onChange={handleCityChange}
								style={{ width: '100%' }}
								options={cities}
							></Select>
							<label htmlFor='name'>Название</label>
							<Input
								type='text'
								className='form-control'
								id='name'
								value={name}
								onChange={handleNameChange}
							/>
						</div>
						<div className='form-group text-center mb-3'>
							<label htmlFor='description'>Описание</label>
							<TextArea
								name='description'
								value={description}
								onChange={handleDescriptionChange}
								placeholder='Введите описание'
								className='form-control'
								maxLength={1000}
							/>
						</div>
						<div className='form-group text-center mb-3 price__group'>
							<label htmlFor='price'>Цена</label>
							<Space.Compact className='mt-2'>
								<InputNumber
									id='price'
									placeholder='Введите стоимость'
									value={price}
									onChange={handlePriceChange}
									style={{ width: '200px' }}
								/>
								<Select
									value={selectedValue}
									defaultValue={'N'}
									onChange={onSelectChange}
									options={options}
									style={{ width: '125px' }}
								/>
							</Space.Compact>
							<Checkbox checked={checked} onChange={handleCheckChange} className='mt-2'>
								Это начальная стоимость
							</Checkbox>
						</div>
						<div className='form-group text-center'>
							<Button type='primary' onClick={handleUpdateClick}>
								Изменить
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default EditProductPage
