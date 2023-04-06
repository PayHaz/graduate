import React from 'react'
import { Form, Input, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const SecondStep = ({ formInform, onFinish, current, formData, steps, prev }) => {
	const { name, description } = formData
	const { TextArea } = Input
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
					<Input
						type='text'
						name='name'
						value={name}
						placeholder='Введите название'
						className='form-control'
					/>
				</Form.Item>
				<div className='row'>
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
										className={key === 0 ? 'pt-3' : ''}
									>
										<Form.Item
											{...restField}
											name={[name, 'parameter']}
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
											name={[name, 'characteristic']}
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
						<Button
							type='primary'
							htmlType='submit'
							disabled={
								!formInform.isFieldsTouched(true) ||
								!!formInform.getFieldsError().filter(({ errors }) => errors.length).length
							}
						>
							Следующий шаг
						</Button>
					)}
				</Form.Item>
			</Form>
		</div>
	)
}

export default SecondStep
