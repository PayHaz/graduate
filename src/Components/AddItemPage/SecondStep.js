import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Space, Select, InputNumber } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'

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

const SecondStep = ({ formInform, onFinish, current, formData, steps, prev }) => {
	const { name, description } = formData
	const [checked, setChecked] = useState(true)
	const { TextArea } = Input
	const [cities, setCities] = useState([])

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

	const onChange = (e) => {
		setChecked(e.target.checked)
	}

	return (
		<div>
			<h3>Введите данные о товаре:</h3>
			<Form
				name='dynamic_form_nest_item'
				onFinish={onFinish}
				style={{
					maxWidth: 600,
				}}
				form={formInform}
				autoComplete='off'
			>
				<Form.Item
					name='name'
					label='Название:'
					rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
				>
					<Input type='text' name='name' value={name} placeholder='Введите название' />
				</Form.Item>
				<Form.Item
					name='city'
					label='Город:'
					rules={[{ required: true, message: 'Пожалуйста, выберите город' }]}
				>
					<Select showSearch placeholder='Выберите город' style={{ width: '100%' }} options={cities}></Select>
				</Form.Item>
				<div className='row'>
					<label>Характеристики:</label>

					<Form.List name='features'>
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
								))}
								<Form.Item>
									<Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
										Добавить характеристику
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
				</div>

				<Form.Item
					name='description'
					label='Описание:'
					rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
				>
					<TextArea
						name='description'
						value={description}
						placeholder='Введите описание'
						className='form-control'
						maxLength={1000}
					/>
				</Form.Item>

				<Space.Compact>
					<Form.Item
						name='price'
						label='Стоимость:'
						rules={[{ required: true, message: 'Пожалуйста, введите стоимость' }]}
					>
						<InputNumber placeholder='Введите стоимость' style={{ width: '200px' }} />
					</Form.Item>
					<Form.Item name='price_suffix'>
						<Select defaultValue='N' value='N' options={options} style={{ width: '125px' }} />
					</Form.Item>
				</Space.Compact>

				<Form.Item name='is_lower_bound' valuePropName='checked'>
					<Checkbox checked={checked} onChange={onChange}>
						Это начальная стоимость
					</Checkbox>
				</Form.Item>

				<Form.Item shouldUpdate>
					{current > 0 && (
						<Button
							style={{
								margin: '0 8px',
							}}
							onClick={() => prev()}
						>
							Вернуться назад
						</Button>
					)}
					{current < steps.length - 1 && (
						<Button type='primary' htmlType='submit'>
							Следующий шаг
						</Button>
					)}
				</Form.Item>
			</Form>
		</div>
	)
}

export default SecondStep
