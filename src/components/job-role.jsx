import React, { Component } from 'react'
import { deleteJobRole, getJobRole } from '../servcies/jobService'

class JobRole extends Component {
	state = {
		jobRole: {},
	}

	async retreiveJobRole() {
		const { data: jobRole } = await getJobRole(this.props.match.params.jobName)
		this.setState({ jobRole })
	}

	async componentDidMount() {
		await this.retreiveJobRole()
	}

	handleDelete = async (jobName) => {
		try {
			await deleteJobRole(jobName)
			console.log("Job deleted")
			alert(`Job role ${jobName} has successfully been deleted`)
			window.location = '/job-roles'
		} catch (e) {
			if (e.response) {
				console.log(e.response.data)
			}
		}
	}

	render() {
		const { jobRole } = this.state
		const { user } = this.props
		return (
			<div className='row mt-3 d-flex justify-content-center'>
				<div className='card' id='jobCard'>
					<div className='card-header text-center'>
						<h1 id='jobHeader'>{jobRole.jobName}</h1>
						<h3 id='capabilityHeader'>Capability - {jobRole.capabilityName}</h3>
						<h3 id='bandLevelHeader'>Band Level - {jobRole.bandName}</h3>
						{user === "ADMIN" && (
							<a class="btn btn-danger text-white" onClick={() => this.handleDelete(jobRole.jobName)}>Delete Job Role</a>
						)}
					</div>
					<div className='card-body'>
						<div className='jumbotron'>
							<h3 className='display-9'>Job Specification Summary</h3>
							<div className='mt-3'>
								<p className='card-text'>{jobRole.jobSpec}</p>
							</div>
						</div>
					</div>
					<div className='card-body'>
						Find out more{' '}
						<a
							href={`${jobRole.jobUrl}`}
							target='_blank'
							rel='noopener noreferrer'
						>
							here
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default JobRole
