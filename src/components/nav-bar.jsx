import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import KainosLogo from '../kainosLogo.png'

const NavBar = ({ user }) => {
	console.log(user)
	return (
		<header>
			<nav class="navbar navbar-expand-lg  navbar-light bg-primary">
				<a class="navbar-brand pb-3" href="/job-roles">
					<img src={KainosLogo} alt='' height={30} width={130} />
					</a>
						{user=== "ADMIN" && (
							<a class="nav-item text-white font-weight-bold disabled">Admin</a>
						)}
						{user=== "EMPLOYEE" && (
							<a class="nav-item text-white font-weight-bold disabled">Employee</a>
						)}
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul class="navbar-nav">

						{user && (
							<>
								<li class="nav-item">
									<a class="nav-link text-secondary" href="/job-roles">Job Roles</a>
								</li>
								<li class="nav-item">
									<a class="nav-link text-secondary" href="/capabilities">Capabilities</a>
								</li>
								<li class="nav-item">
									<a class="nav-link btn btn-secondary ml-3" role="button" href="/logout">Logout</a>
								</li>
							</>
						)}
						{!user && (
							<li class="nav-item">
								<a class="nav-link btn btn-secondary" role="button" href="/login">Login</a>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</header>
	)
}

export default NavBar
