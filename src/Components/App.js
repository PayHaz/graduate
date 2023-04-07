import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import AppBody from './AppBody/AppBody'
import AboutPage from './AboutPage/AboutPage'
import { store } from '../App/store'
import { Provider } from 'react-redux'
import ProductPage from './ProductPage/ProductPage'
import UserAdsPage from './UserAdsPage/UserAdsPage'
import AddItemPage from './AddItemPage/AddItemPage'
import { ConfigProvider } from 'antd'

const App = () => {
	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						fontFamily: 'Golos Text',
						colorPrimary: '#00aaff',
					},
				}}
			>
				<Provider store={store}>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<AppBody />} />
							<Route path='aboute' element={<AboutPage />} />
							<Route path='product' element={<ProductPage />} />
							<Route path='ads' element={<UserAdsPage />} />
							<Route path='additem' element={<AddItemPage />} />
						</Route>
					</Routes>
				</Provider>
			</ConfigProvider>
		</>
	)
}

export default App
