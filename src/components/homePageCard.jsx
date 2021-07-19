import React from 'react'
import { Link } from 'react-router-dom'

const HomePageCard = ({ link, image, title }) => {
	return (
		<Link to={`/${link}`}>
			<div className='my-3 p-3 rounded'>
				<div className='card-body'>
					<img src={image} alt='nothing' width='150' height='150' />
					<div className='card-title'>
						<h2>{title}</h2>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default HomePageCard
