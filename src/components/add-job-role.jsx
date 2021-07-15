import React, { Component } from 'react'
import Input from './common/input'
import Select from './common/select'
import {
	addJobToDb,
	getCapabilityNames,
	getBandLevels,
} from '../servcies/jobService'
import Joi from 'joi-browser'

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
		errors: {},
	}

	schema = {
		jobName: Joi.string().min(5).required().label('Job Name'),
		jobSpec: Joi.string().max(2000).required().label('Job Specification'),
		jobURL: Joi.string().max(300).required().label('Job URL'),
		capability: Joi.string().required().label('Capability'),
		bandLevel: Joi.string().required().label('Band Level'),
	}

	validate = () => {
		const options = { abortEarly: false }
		const { error } = Joi.validate(this.state.jobRole, this.schema, options)
		if (!error) return null
		const errors = {}
		for (let item of error.details) errors[item.path[0]] = item.message
		return errors
	}

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value }
		const schema = { [name]: this.schema[name] }
		const { error } = Joi.validate(obj, schema)
		return error ? error.details[0].message : null
	}

	async componentDidMount() {
		await this.retreiveCapabilities()
		await this.retreiveBandLevels()
	}

	async addJob() {
		await addJobToDb(this.state.jobRole)
	}

	async retreiveCapabilities() {
		const { data: capabilities } = await getCapabilityNames()
		this.setState({ capabilities })
		console.log(capabilities)
	}

	async retreiveBandLevels() {
		const { data: bandLevels } = await getBandLevels()
		this.setState({ bandLevels })
		console.log(bandLevels)
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input)
		if (errorMessage) errors[input.name] = errorMessage
		else delete errors[input.name]
		const jobRole = { ...this.state.jobRole }
		jobRole[input.name] = input.value
		this.setState({ jobRole, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const errors = this.validate()
		this.setState({ errors: errors || {} })

		if (errors) return

		const response = await addJobToDb(this.state.jobRole)
		console.log(response)
	}

	render() {
		const { capabilities, bandLevels, errors } = this.state
		console.log(errors)
		return (
			<div>
				<div className='card-header'>
					<h3>Add New Job</h3>
				</div>
				<div className='card-body'>
					<form onSubmit={this.handleSubmit}>
						<Input
							label='Job Role Name'
							name='jobName'
							onChange={this.handleChange}
							error={errors.jobName}
						/>
						<Input
							label='Job Role Specification'
							name='jobSpec'
							onChange={this.handleChange}
							error={errors.jobSpec}
						/>
						<Input
							label='Job Role Link'
							name='jobURL'
							onChange={this.handleChange}
							error={errors.jobURL}
						/>
						<Select
							label='Capability'
							name='capability'
							options={capabilities}
							onChange={this.handleChange}
							error={errors.capability}
						/>
						<Select
							label='Band Level'
							name='bandLevel'
							options={bandLevels}
							onChange={this.handleChange}
							error={errors.bandLevel}
						/>
						<button
							disabed={this.validate()}
							type='submit'
							className='btn btn-light'
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		)
	}
}

export default AddJobRole
