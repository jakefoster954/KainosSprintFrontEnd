import React from 'react'
import { Link } from 'react-router-dom'
import KainosLogo from '../kainosLogo.png'

const NavBar = () => {
	return (
		<header>
			<nav className='navbar navbar-light bg-primary'>
				<Link className='navbar-brand' to='/job-roles'>
					<img src={KainosLogo} alt='' height={30} width={130} />
				</Link>
			</nav>
		</header>
	)
}

export default NavBar
