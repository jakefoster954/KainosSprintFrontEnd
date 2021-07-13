import React, { Component } from 'react'
import Input from './common/input'
import Select from './common/select'
import { addJobToDb } from '../servcies/jobService'

class AddJobRole extends Component {
	state = {
		jobRole: {
			jobName: '',
			jobSpec: '',
			jobURL: '',
			capability: '',
			bandLevel: '',
		},
	}

	async addJob() {
		await addJobToDb(this.state.jobRole)
	}

	handleChange = ({ currentTarget: input }) => {
		const jobRole = { ...this.state.jobRole }
		jobRole[input.name] = input.value
		this.setState({ jobRole })
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const response = await addJobToDb(this.state.jobRole)
		console.log(response)
	}

	render() {
		return (
			<div>
				<h1>Add Job</h1>
				<div className='card-header'>
					<h3>Add New Job</h3>
				</div>
				<div className='card-body'>
					<form onSubmit={this.handleSubmit}>
						<Input
							label='Job Role Name'
							name='jobRoleName'
							onChange={this.handleChange}
						/>
						<Input
							label='Job Role Specification'
							name='jobSpec'
							onChange={this.handleChange}
						/>
						<Input
							label='Job Role Link'
							name='jobRoleLink'
							onChange={this.handleChange}
						/>
						<Select
							label='Capability'
							name='capability'
							options={[{ name: 'Engineering' }, { name: 'AI' }]}
							onChange={this.handleChange}
						/>
						<Select
							label='Band Level'
							name='bandLevel'
							options={[]}
							onChange={this.handleChange}
						/>
						<button type='submit' className='btn btn-light'>
							Submit
						</button>
					</form>
				</div>
			</div>
		)
	}
}

export default AddJobRole
