import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import KainosLogo from '../kainosLogo.png'

const NavBar = ({ user }) => {
	console.log(user)
	return (
		<header>
			<nav className='navbar navbar-light bg-primary'>
				<Link className='navbar-brand' to='/job-roles'>
					<img src={KainosLogo} alt='' height={30} width={130} />
				</Link>
				{user && (
					<NavLink className='navbar-link' to='/logout'>
						<h4 className='text-secondary'>Logout</h4>
					</NavLink>
				)}
				{!user && (
					<NavLink className='navbar-link' to='/login'>
						<h4 className='text-secondary'>Login</h4>
					</NavLink>
				)}
			</nav>
		</header>
	)
}

export default NavBar
