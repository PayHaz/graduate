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
import SearchPage from './SearchPage/SearchPage'
import CategoryPage from './CategoryPage/CategoryPage'
import EditProductPage from './EditProductPage/EditProductPage'
import FavoritePage from './FavoritePage/FavoritePage'
import EditUserPage from './EditUserPage/EditUserPage'

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
							<Route path='product/:id' element={<ProductPage />} />
							<Route path='ads' element={<UserAdsPage />} />
							<Route path='additem' element={<AddItemPage />} />
							<Route path='search/:params' element={<SearchPage />} />
							<Route path='category/:params' element={<CategoryPage />} />
							<Route path='edit/product/:productId' element={<EditProductPage />} />
							<Route path='favorite' element={<FavoritePage />} />
							<Route path='edit/user' element={<EditUserPage />} />
						</Route>
					</Routes>
				</Provider>
			</ConfigProvider>
		</>
	)
}

export default App
