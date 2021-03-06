import React, { Component } from 'react'
import { getJobRoles } from '../servcies/jobService'
import { Link, Redirect } from 'react-router-dom'
import AddJobRole from './add-job-role'

class JobRoles extends Component {
	state = {
		jobRoles: [],
	}

	retreiveJobRoles = async () => {
		const { data: jobRoles } = await getJobRoles()
		this.setState({ jobRoles })
	}

	async componentDidMount() {
		await this.retreiveJobRoles()
	}

	render() {
		const { jobRoles } = this.state
		const { user } = this.props
		console.log(this.props.user)

		return (
			<>
				<h1 class='pb-3'>Job Roles</h1>
				<div className='row'>
					<div className={`col${user === 'ADMI' ? '-8' : ''}`}>
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
										<tr className='tableBody' key={jobRole.jobName}>
											<td>
												<Link
													to={{
														pathname: `/job-role/${jobRole.jobName}`,
													}}
												>
													<div>{jobRole.jobName}</div>
												</Link>
											</td>
											<td>{jobRole.capabilityName}</td>
											<td>{jobRole.bandName}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{user === 'ADMI' && (
						<div className='col-4'>
							<AddJobRole retreiveJobRoles={this.retreiveJobRoles} />
						</div>
					)}
				</div>
			</>
		)
	}
}

export default JobRoles
