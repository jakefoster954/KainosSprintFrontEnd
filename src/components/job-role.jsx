import React, { Component } from 'react'
import {
	deleteJobRole,
	getJobRole,
	getTrainingData,
} from '../servcies/jobService'
import { Redirect } from 'react-router-dom'

class JobRole extends Component {
	state = {
		jobRole: {},
		trainingCourses: [],
	}

	async retreiveJobRole() {
		const { data: jobRole } = await getJobRole(this.props.match.params.jobName)
		this.setState({ jobRole })
	}

	async retrieveTraining() {
		const { jobRole } = this.state
		const { data: trainingCourses } = await getTrainingData(jobRole.bandName)
		this.setState({ trainingCourses })
		console.log(trainingCourses)
	}

	async componentDidMount() {
		await this.retreiveJobRole()
		await this.retrieveTraining()
	}

	handleDelete = async (jobName) => {
		try {
			await deleteJobRole(jobName)
			console.log('Job deleted')
			alert(`Job role ${jobName} has successfully been deleted`)
			window.location = '/job-roles'
		} catch (e) {
			if (e.response) {
				console.log(e.response.data)
			}
		}
	}

	render() {
		const { jobRole, trainingCourses } = this.state
		const { user } = this.props
		return (
			<div className='row mt-3 d-flex justify-content-center'>
				<div className='card' id='jobCard'>
					<div className='card-header text-center'>
						<h1 id='jobHeader'>{jobRole.jobName}</h1>
						<h3 id='capabilityHeader'>Capability - {jobRole.capabilityName}</h3>
						<h3 id='bandLevelHeader'>Band Level - {jobRole.bandName}</h3>
						{user === 'ADMI' && (
							<a
								class='btn btn-danger text-white'
								onClick={() => this.handleDelete(jobRole.jobName)}
							>
								Delete Job Role
							</a>
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
					<div className='card-body text-center'>
						<a
							class='btn btn-primary text-white'
							href={`${jobRole.jobUrl}`}
							target='_blank'
							rel='noopener noreferrer'
						>
							Find out more
						</a>
					</div>
					<div className='p-5'>
						<h2 className='pb-3'>
							Relevant Training (Band - {jobRole.bandName})
						</h2>
						<table
							className='table table-striped table-bordered text-center pt-3'
							id='trainingTable'
						>
							<thead>
								<tr>
									<th>Training</th>
									<th>Link</th>
								</tr>
							</thead>
							<tbody>
								{trainingCourses.map((training) => (
									<tr className='tableBody' key={training.trainingName}>
										<td>{training.trainingName}</td>
										<td>
											<a
												className='btn btn-secondary'
												href={`${training.trainingLink}`}
												target='_blank'
												rel='noopener noreferrer'
											>
												Find out more
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default JobRole
