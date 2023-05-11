import React, { useState, useEffect } from 'react'
import { Input, Button, Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

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
	const [fileList, setFileList] = useState([])

	useEffect(() => {
		fetch(`http://localhost:8000/product/${productId}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setProduct(data)
				setName(data.name)
				setDescription(data.description)
				setPrice(data.price)
				console.log(data.images)
				const images = data.images.map(
					(image, index) => ({
						id: image.id,
						uid: `-${index}`,
						name: `image-${index}.png`,
						status: 'done',
						url: 'http://localhost:8000' + image.img,
					}),
					console.log(data.images)
				)
				setFileList(images)
			})
			.catch((error) => console.error(error))
	}, [productId])

	const handleNameChange = (event) => {
		setName(event.target.value)
	}

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value)
	}

	const handlePriceChange = (event) => {
		setPrice(event.target.value)
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
			}),
		})
			.then((response) => {
				if (response.ok) {
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
							<textarea
								className='form-control'
								id='description'
								value={description}
								onChange={handleDescriptionChange}
							/>
						</div>
						<div className='form-group text-center mb-3'>
							<label htmlFor='price'>Цена</label>
							<Input
								type='number'
								className='form-control'
								id='price'
								value={price}
								onChange={handlePriceChange}
							/>
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
