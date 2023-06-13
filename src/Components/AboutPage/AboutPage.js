import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../features/counter/counterSlice'

const AboutPage = () => {
	const count = useSelector((state) => state.counter.value)
	const dispatch = useDispatch()

	return (
		<div className='container'>
			<p>
				<strong>О проекте</strong>
			</p>
			<p>
				Данное приложение разработано в качестве дипломной работы студентом 4ого курса НВГУ Ермаковым Вадимом
				Константиновичем.&nbsp;
				<br />
				<br />В стеке технологий используется Django, React, Redux.
			</p>
			<p></p>
		</div>
	)
}

export default AboutPage
