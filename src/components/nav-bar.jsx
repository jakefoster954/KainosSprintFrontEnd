import React from 'react'
import { NavLink } from 'react-router-dom'
import KainosLogo from '../kainosLogo.png'

const NavBar = ({ user }) => {
	console.log(user)
	return (
		<header>
			<nav className='navbar navbar-expand-lg  navbar-light bg-primary'>
				<NavLink to='/home' className='navbar-brand pb-3'>
					<img src={KainosLogo} alt='' height={30} width={130} />
				</NavLink>
				{user === 'ADMI' && (
					//eslint-disable-next-line
					<a className='nav-item text-white font-weight-bold disabled'>Admin</a>
				)}
				{user === 'EMPL' && (
					//eslint-disable-next-line
					<a className='nav-item text-white font-weight-bold disabled'>
						Employee
					</a>
				)}
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse justify-content-end'
					id='navbarNav'
				>
					<ul className='navbar-nav'>
						{user !== '' && (
							<>
								<li className='nav-item'>
									<a className='nav-link text-secondary' href='/job-roles'>
										Job Roles
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link text-secondary' href='/capabilities'>
										Capabilities
									</a>
								</li>
								<li className='nav-item'>
									<a
										className='nav-link btn btn-secondary ml-3'
										role='button'
										href='/logout'
									>
										Logout
									</a>
								</li>
							</>
						)}
						{user === '' && (
							<li className='nav-item'>
								<a
									className='nav-link btn btn-secondary'
									role='button'
									href='/login'
								>
									Login
								</a>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</header>
	)
}

export default NavBar
