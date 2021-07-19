import React from 'react'
import HomePageCard from './homePageCard'
import jobRoles from '../jobroles.png'
import capabilities from '../capabilities.png'
import login from '../login.png'

const HomePage = ({ user }) => {
	return (
		<>
			<div className='row text-center my-auto'>
				{user && (
					<>
						<div className='col-xl'>
							<HomePageCard
								link='job-roles'
								image={jobRoles}
								title='Job Roles'
							/>
						</div>
						<div className='col-xl'>
							<HomePageCard
								link='capabilities'
								image={capabilities}
								title='Capabilities'
							/>
						</div>
					</>
				)}
				{!user && (
					<>
						<div className='col-xl'>
							<HomePageCard link='login' image={login} title='Login' />
						</div>
					</>
				)}
			</div>
		</>
	)
}

export default HomePage
