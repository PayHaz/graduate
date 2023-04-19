/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { AutoComplete, Input, Form, Button, Select, Modal } from 'antd'
import { useState } from 'react'
import './AppHeader.css'
import { useSelector } from 'react-redux'
import RentaruLogo from './img/RentaRu.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const { Option } = Select

const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань']

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min
const searchResult = (query) =>
	new Array(getRandomInt(5))
		.join('.')
		.split('.')
		.map((_, idx) => {
			const category = `${query}${idx}`
			return {
				value: category,
				label: (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<span>
							Найдено {query} on{' '}
							<a
								href={`https://s.taobao.com/search?q=${query}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								{category}
							</a>
						</span>
						<span>{getRandomInt(200, 100)} results</span>
					</div>
				),
			}
		})

const LowerHeader = () => {
	const count = useSelector((state) => state.counter.value)
	const [options, setOptions] = useState([])
	const [visible, setVisible] = useState(false)
	const [selectedCity, setSelectedCity] = useState(null)
	const handleSearch = (value) => {
		setOptions(value ? searchResult(value) : [])
	}
	const onSelect = (value) => {
		console.log('onSelect', value)
	}
	const onChange = (value) => {
		console.log(value)
	}

	const showModal = () => {
		setVisible(true)
	}

	const handleOk = () => {
		setVisible(false)
	}

	const handleCancel = () => {
		setVisible(false)
	}

	const handleCitySelect = (value) => {
		setSelectedCity(value)
		handleOk()
	}

	return (
		<div className='container'>
			<header className='py-3 mb-2 mt-1'>
				<div className='container site-header__middle flex-wrap'>
					<a
						href='/'
						className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'
					>
						<img src={RentaruLogo} />
					</a>

					<Form style={{ display: 'flex', alignItems: 'center' }}>
						<AutoComplete
							dropdownMatchSelectWidth={252}
							className='search_panel'
							options={options}
							onSelect={onSelect}
							onSearch={handleSearch}
							onChange={onChange}
						>
							<Input.Search
								className='search_panel'
								size='large'
								placeholder='Поиск по объявлениям'
								enterButton
							/>
						</AutoComplete>
						<>
							<Button type='text' onClick={showModal} style={{ marginLeft: '10px', fontSize: '17px' }}>
								<i class='fa fa-map-marker' style={{ color: '#00aaff', paddingRight: '5px' }}></i>
								{selectedCity ? selectedCity : 'Выберите город'}
							</Button>
							<Modal title='Выберите город' visible={visible} onOk={handleOk} onCancel={handleCancel}>
								<Select
									showSearch
									placeholder='Выберите город'
									style={{ width: '100%' }}
									onChange={handleCitySelect}
								>
									{cities.map((city) => (
										<Option key={city} value={city}>
											{city}
										</Option>
									))}
								</Select>
							</Modal>
						</>
					</Form>
				</div>
			</header>
		</div>
	)
}

export default LowerHeader
