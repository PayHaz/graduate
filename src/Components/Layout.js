import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader/AppHeader'
import AppFooter from './AppFooter/AppFooter'

const Layout = () => {
	return (
		<div>
			<AppHeader />
			<Outlet />
			<AppFooter />
		</div>
	)
}

export default Layout
