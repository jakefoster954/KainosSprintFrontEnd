import React, { Component } from 'react'
import Input from './common/input'
import Select from './common/select'
import {
	addJobToDb,
	getCapabilities,
	getBandLevels,
} from '../servcies/jobService'

class AddJobRole extends Component {
	state = {
		jobRole: {
			jobName: '',
			jobSpec: '',
			jobURL: '',
			capability: '',
			bandLevel: '',
		},
		capabilities: [],
		bandLevels: [],
	}

	async componentDidMount() {
		await this.retreiveCapabilities()
		await this.retreiveBandLevels()
	}

	async addJob() {
		await addJobToDb(this.state.jobRole)
	}

	async retreiveCapabilities() {
		const { data: capabilities } = await getCapabilities()
		this.setState({ capabilities })
		console.log(capabilities)
	}

	async retreiveBandLevels() {
		const { data: bandLevels } = await getBandLevels()
		this.setState({ bandLevels })
		console.log(bandLevels)
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
		const { capabilities, bandLevels } = this.state
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
							name='jobName'
							onChange={this.handleChange}
						/>
						<Input
							label='Job Role Specification'
							name='jobSpec'
							onChange={this.handleChange}
						/>
						<Input
							label='Job Role Link'
							name='jobURL'
							onChange={this.handleChange}
						/>
						<Select
							label='Capability'
							name='capability'
							options={capabilities}
							onChange={this.handleChange}
						/>
						<Select
							label='Band Level'
							name='bandLevel'
							options={bandLevels}
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
