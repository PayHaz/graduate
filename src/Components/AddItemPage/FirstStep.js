import React, { useState, useEffect } from 'react'
import { Form, Button, TreeSelect } from 'antd'
import './AddItemPage.css'

const backendAPI = 'http://194.67.74.221:8000'

const FirstStep = ({ formCategory, onFinish }) => {
	const [data, setData] = useState()
	const [value, setValue] = useState()
	const onChange = (newValue) => {
		setValue(newValue)
	}

	async function fetchData() {
		try {
			const response = await fetch(`${backendAPI}/category/tree`)
			const responseData = await response.json()
			setData(responseData)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<h3>Выберите категорию:</h3>
			<Form
				name='dynamic_form_nest_item'
				form={formCategory}
				onFinish={() => onFinish(value)}
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
					<TreeSelect
						showSearch
						style={{
							width: '100%',
						}}
						value={value}
						dropdownStyle={{
							maxHeight: 400,
							overflow: 'auto',
						}}
						placeholder='Пожалуйста, выберите категорию'
						allowClear
						treeDefaultExpandAll
						onChange={onChange}
						treeData={data}
					/>
				</Form.Item>
				<Form.Item className='next__step'>
					<Button type='primary' htmlType='submit'>
						Следующий шаг
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default FirstStep
