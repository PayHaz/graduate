/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Input, Button, Space, Select, InputNumber, Checkbox, Upload, Modal } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { message, TreeSelect, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../features/session/sessionSlice'
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

const backendAPI = 'http://194.67.74.221:8000'

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
	const [categoryValue, setCategoryValue] = useState()
	const [productCity, setProductCity] = useState('')
	const [category, setCategory] = useState([])
	const [cities, setCities] = useState([])
	const { TextArea } = Input
	const [selectedValue, setSelectedValue] = useState()
	const [initialValues, setInitialValues] = useState([])
	const [formData, setFormData] = useState([])
	const dispatch = useDispatch()
	if (Cookies.get('token') !== undefined) {
		dispatch(setToken(Cookies.get('token')))
	}
	const session = useSelector((state) => state.session.value)

	const fetchData = async () => {
		try {
			const response = await fetch(`${backendAPI}/city`)
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
		if (session) {
			fetchData()
		}
	}, [])

	async function fetchProduct() {
		try {
			const response = await fetch(`${backendAPI}/product/${productId}`, {
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
				setCategoryValue(data.category)
				setChecked(data.is_lower_bound)
				const features = data.features.map((item) => ({ name: item.name, value: item.value }))
				setInitialValues({ features: features })
				const selectedOption = options.find((option) => option.label === data.price_suffix)
				if (selectedOption) {
					setSelectedValue(selectedOption.value)
				}
				const images = data.images.map((image, index) => ({
					id: image.id,
					uid: -index,
					name: `image-${index}.png`,
					status: 'done',
					url: `${backendAPI}` + image.img,
				}))
				setFileList(images)
			} else {
				throw new Error('Ошибка загрузки продукта')
			}
		} catch (error) {
			console.log(error)
			message.error('Ошибка загрузки продукта')
		}
	}

	async function fetchCategory() {
		try {
			const response = await fetch(`${backendAPI}/category/tree`)
			const responseData = await response.json()
			setCategory(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (formData !== undefined) {
			handleUpdateClick()
		}
	}, [formData])

	const onFinish = (values) => {
		console.log(values)
		setFormData(values)
	}

	useEffect(() => {
		fetchCategory()
		fetchProduct()
		if (session) {
			fetchCategory()
			fetchProduct()
		}
	}, [productId])

	const handleNameChange = (event) => {
		setName(event.target.value)
	}

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value)
	}

	const handleCityChange = (value) => {
		setProductCity(value)
	}

	const handleCheckChange = (value) => {
		setChecked(value.target.checked)
	}

	const handlePriceChange = (value) => {
		setPrice(value)
	}

	const onSelectChange = (value) => {
		setSelectedValue(value)
	}

	const onCategoryChange = (newValue) => {
		setCategoryValue(newValue)
	}

	const handleUpdateClick = () => {
		fetch(`${backendAPI}/product/${productId}/`, {
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
				category: categoryValue,
				features: formData.features,
				status: 'MD',
			}),
		})
			.then((response) => {
				if (response.ok) {
					message.success('Продукт успешно изменён и отправлен на модерацию!')
					return response.json()
				} else {
					throw new Error('Ошибка!')
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
		return <div className='container'>Loading...</div>
	}

	const handleRemove = (file) => {
		const product_id = productId
		fetch(`${backendAPI}/products/${product_id}/images/${file.id}/`, {
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

	if (session !== '')
		return (
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-md-6'>
						<Form
							name='dynamic_form_nest_item'
							style={{ maxWidth: 600 }}
							autoComplete='off'
							initialValues={initialValues}
							onFinish={onFinish}
						>
							<div className='form-group text-center mb-3'>
								<Upload
									action={`${backendAPI}/product/${productId}/image`}
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
								<label htmlFor='name'>Категория</label>
								<TreeSelect
									showSearch
									style={{
										width: '100%',
									}}
									value={categoryValue}
									dropdownStyle={{
										maxHeight: 400,
										overflow: 'auto',
									}}
									placeholder='Пожалуйста, выберите категорию'
									allowClear
									treeDefaultExpandAll
									onChange={onCategoryChange}
									treeData={category}
									filterTreeNode={(inputValue, treeNode) =>
										treeNode.title.toLowerCase().includes(inputValue.toLowerCase())
									}
								/>
								<label htmlFor='name'>Город</label>
								<Select
									showSearch
									placeholder='Выберите город'
									style={{ width: '100%' }}
									optionFilterProp='children'
									defaultValue={productCity}
									onChange={handleCityChange}
								>
									{cities.map((city) => (
										<Select.Option key={city.value} value={city.value}>
											{city.label}
										</Select.Option>
									))}
								</Select>
								<label htmlFor='name'>Название</label>
								<Input
									type='text'
									className='form-control'
									id='name'
									value={name}
									onChange={handleNameChange}
								/>
							</div>
							<div className='row'>
								<label className='next__step mb-2'>Характеристики:</label>

								<Form.List name='features'>
									{(fields, { add, remove }) => (
										<>
											{fields.map(({ key, name, ...restField }, index) => {
												//const feature = initialValues.features[index] || { name: '', value: '' }
												return (
													<Space
														key={key}
														style={{
															display: 'flex',
															marginBottom: 8,
															justifyContent: 'center',
														}}
														align='baseline'
														className={key === 0 ? 'pt-3' : ''}
													>
														<Form.Item
															{...restField}
															name={[name, 'name']}
															rules={[
																{
																	required: true,
																	message: 'Введите параметр',
																},
															]}
														>
															<Input placeholder='Введите параметр' />
														</Form.Item>
														<Form.Item
															{...restField}
															name={[name, 'value']}
															rules={[
																{
																	required: true,
																	message: 'Введите характеристику',
																},
															]}
														>
															<Input placeholder='Введите характеристику' />
														</Form.Item>
														<MinusCircleOutlined onClick={() => remove(name)} />
													</Space>
												)
											})}
											<Form.Item>
												<Button
													type='dashed'
													onClick={() => add()}
													block
													icon={<PlusOutlined />}
												>
													Добавить характеристику
												</Button>
											</Form.Item>
										</>
									)}
								</Form.List>
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
							<Form.Item>
								<div className='form-group text-center'>
									<Button type='primary' htmlType='submit'>
										Изменить
									</Button>
								</div>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		)
	else
		return (
			<div className='container'>
				<div className='error__label'>
					<h3>Авторизируйтесь для доступа к этой странице.</h3>
				</div>
			</div>
		)
}

export default EditProductPage
