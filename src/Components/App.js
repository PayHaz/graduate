import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import AppBody from './AppBody/AppBody'
import AboutPage from './AboutPage/AboutPage'
import { store } from '../App/store'
import { Provider } from 'react-redux'
import ProductPage from './ProductPage/ProductPage'
import UserAdsPage from './UserAdsPage/UserAdsPage'

const App = () => {
	return (
		<>
			<Provider store={store}>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<AppBody />} />
						<Route path='aboute' element={<AboutPage />} />
						<Route path='product' element={<ProductPage />} />
						<Route path='ads' element={<UserAdsPage />} />
					</Route>
				</Routes>
			</Provider>
		</>
	)
}

export default App
