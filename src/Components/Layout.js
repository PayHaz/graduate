import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader/AppHeader'
import AppFooter from './AppFooter/AppFooter'
import './Layout.css'

const Layout = () => {
	return (
		<div className='wrapper'>
			<AppHeader />
			<div class='content'>
				<Outlet />
			</div>

			<div className='footer'>
				<AppFooter />
			</div>
		</div>
	)
}

export default Layout
