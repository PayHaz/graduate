import React from 'react'
import { Form, Cascader, Button } from 'antd'

const FirstStep = ({ formCategory, onFinish, options, category }) => {
	return (
		<>
			<h3>Выберите категорию:</h3>
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
		</>
	)
}

export default FirstStep
