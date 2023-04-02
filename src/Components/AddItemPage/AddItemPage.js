import React, { useState, useEffect } from 'react'
import { Divider, Steps, Cascader, Button, message, Input, Form, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
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

	const [formCategory] = Form.useForm()
	const [formDatas] = Form.useForm()
	const [, forceUpdate] = useState({})

	const [formData, setFormData] = useState({
		category: null,
		name: '',
		characteristics: [],
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

	const onFinish = (values) => {
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

	useEffect(() => {
		setItems(
			steps.map((item) => ({
				key: item.title,
				title: item.title,
				description: item.description,
				disabled: item.disabled,
			}))
		)
		forceUpdate({})
	}, [])

	const onCategoryChange = (value) => {
		setFormData({ ...formData, category: value })
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const StepContent = () => {
		const { category, name, description } = formData
		if (current === 0)
			return (
				<Form
					name='dynamic_form_nest_item'
					form={formCategory}
					onFinish={(values) => onFinish(values)}
					style={{
						maxWidth: 600,
					}}
					autoComplete='off'
				>
					<Form.Item
						name='category'
						label='Категория'
						rules={[{ required: true, message: 'Пожалуйста, выберите категорию' }]}
					>
						<Cascader
							options={options}
							value={category}
							onChange={onCategoryChange}
							placeholder='Выберите категорию'
							className='cascader'
						/>
					</Form.Item>
					<Form.Item shouldUpdate>
						{() => (
							<Button type='primary' htmlType='submit'>
								Следующий шаг
							</Button>
						)}
					</Form.Item>
				</Form>
			)
		if (current === 1)
			return (
				<div>
					<Form
						name='dynamic_form_nest_item'
						onFinish={onFinish}
						style={{
							maxWidth: 600,
						}}
						form={formDatas}
						autoComplete='off'
					>
						<Form.Item
							name='name'
							label='Название:'
							rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
						>
							<Input
								type='text'
								name='name'
								value={name}
								placeholder='Введите название'
								className='form-control'
							/>
						</Form.Item>

						<label>Характеристики:</label>

						<Form.List name='characteristics'>
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, ...restField }) => (
										<Space
											key={key}
											style={{
												display: 'flex',
												marginBottom: 8,
											}}
											align='baseline'
										>
											<Form.Item
												{...restField}
												name={[name, 'parameter']}
												rules={[
													{
														required: true,
														message: 'Missing first name',
													},
												]}
											>
												<Input placeholder='Введите параметр' />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'characteristic']}
												rules={[
													{
														required: true,
														message: 'Missing last name',
													},
												]}
											>
												<Input placeholder='Введите характеристику' />
											</Form.Item>
											<MinusCircleOutlined onClick={() => remove(name)} />
										</Space>
									))}
									<Form.Item>
										<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
											Add field
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
						<Form.Item
							name='description'
							label='Описание:'
							rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
						>
							<Input
								name='description'
								value={description}
								placeholder='Введите описание'
								className='form-control'
							/>
						</Form.Item>

						<Form.Item shouldUpdate>
							{current < steps.length - 1 && (
								<Button
									type='primary'
									htmlType='submit'
									disabled={
										!formDatas.isFieldsTouched(true) ||
										!!formDatas.getFieldsError().filter(({ errors }) => errors.length).length
									}
								>
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
						</Form.Item>
					</Form>
				</div>
			)
		if (current === 2)
			return (
				<>
					<h1>{formData.name}</h1>
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
				<Steps current={current} onChange={onChange} items={items} />
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
