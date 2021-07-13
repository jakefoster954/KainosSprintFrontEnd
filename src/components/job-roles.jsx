import React, { Component } from 'react'
import { getJobRoles } from '../servcies/jobService'
import { Link } from 'react-router-dom'

class JobRoles extends Component {
	state = {
		jobRoles: [],
	}

	async retreiveJobRoles() {
		const { data: jobRoles } = await getJobRoles()
		this.setState({ jobRoles })
	}

	async componentDidMount() {
		await this.retreiveJobRoles()
	}

	render() {
		const { jobRoles } = this.state

		return (
			<div className='d-flex justify-content-center'>
				<table
					className='table table-striped table-bordered text-center'
					id='jobTable'
				>
					<thead>
						<tr>
							<th>Job Name</th>
							<th>Capability</th>
							<th>Band Level</th>
						</tr>
					</thead>
					<tbody>
						{jobRoles.map((jobRole) => (
							<tr className='tableBody' key={jobRole.jobID}>
								<td>
									<Link
										to={{
											pathname: `/job-role/${jobRole.jobName}`,
										}}
									>
										{jobRole.jobName}
									</Link>
								</td>
								<td>{jobRole.capabilityName}</td>
								<td>{jobRole.bandLevelName}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}

export default JobRoles
