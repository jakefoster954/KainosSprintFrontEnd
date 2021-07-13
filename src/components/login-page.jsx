import React, { Component } from 'react'
import Input from './common/input'
import { login } from '../servcies/userService'
import Joi from 'joi-browser'

class LoginPage extends Component {
	state = {
		account: {
			email: '',
			password: '',
		},
		errors: {},
	}

	schema = {
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().required().label('Password'),
	}

	validate = () => {
		const options = { abortEarly: false }
		const { error } = Joi.validate(this.state.account, this.schema, options)
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

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input)
		if (errorMessage) errors[input.name] = errorMessage
		else delete errors[input.name]
		const account = { ...this.state.account }
		console.log(account)
		console.log(errors)
		account[input.name] = input.value
		this.setState({ account, errors })
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const errors = this.validate()
		this.setState({ errors: errors || {} })

		const response = await login(this.state.email, this.state.password)
		console.log(response)
	}

	render() {
		const { account, errors } = this.state
		return (
			<div>
				<div className='card-header'>
					<h3>Login</h3>
				</div>
				<div className='card-body'>
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit}>
						<Input
							label='Email'
							name='email'
							placeholder='Enter Email'
							value={account.email}
							onChange={this.handleChange}
							error={errors.email}
						/>
						<Input
							label='Password'
							name='password'
							type='password'
							placeholder='Enter Password'
							value={account.password}
							onChange={this.handleChange}
							error={errors.password}
						/>
						<button
							disabled={this.validate()}
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

export default LoginPage
