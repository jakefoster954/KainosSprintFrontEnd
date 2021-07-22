import React, { Component } from 'react'
import Input from './common/input'
import Select from './common/select'
import {
	getCapabilityLeadNames,
	addCapabilityToDb,
} from '../servcies/jobService'
import Joi from 'joi-browser'

class AddCapability extends Component {
	state = {
		capability: {
			capabilityName: '',
			capabilityLead: '',
		},
		capabilityLeadNames: [],
		errors: {},
	}

	schema = {
		capabilityName: Joi.string().min(4).required().label('Capability Name'),
		capabilityLead: Joi.string().required().label('Capability Lead'),
	}

	validate = () => {
		const options = { abortEarly: false }
		const { error } = Joi.validate(this.state.capability, this.schema, options)
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

	async retrieveCapabilityLeadNames() {
		const { data: capabilityLeadNames } = await getCapabilityLeadNames()
		this.setState({ capabilityLeadNames })
	}

	async componentDidMount() {
		await this.retrieveCapabilityLeadNames()
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input)
		if (errorMessage) errors[input.name] = errorMessage
		else delete errors[input.name]
		const capability = { ...this.state.capability }
		capability[input.name] = input.value
		this.setState({ capability, errors })
	}

	handleSubmit = async (e) => {
		console.log('submitted')
		e.preventDefault()
		const errors = this.validate()
		console.log(errors)
		this.setState({ errors: errors || {} })

		if (errors) {
			e.preventDefault()
			return
		}

		try {
			await addCapabilityToDb(this.state.capability)
			e.target.reset()
			await this.props.retreiveCapbilities()
		} catch (e) {
			if (e.response && e.response.code === 500) {
				const errors = { ...this.state.errors }
				errors.jobName = 'Something went wrong...'
				this.setState({ errors })
			}
		}
	}

	render() {
		const { capabilityLeadNames, errors } = this.state
		console.log(errors)
		return (
			<>
				<div className='card-header'>
					<h3>Add New Capability</h3>
				</div>
				<div className='card-body'>
					<form onSubmit={this.handleSubmit}>
						<Input
							label='Capability Name'
							name='capabilityName'
							onChange={this.handleChange}
							error={errors.capabilityName}
						/>
						<Select
							label='Capability Lead'
							name='capabilityLead'
							options={capabilityLeadNames}
							onChange={this.handleChange}
							error={errors.capabilityLead}
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
			</>
		)
	}
}

export default AddCapability
