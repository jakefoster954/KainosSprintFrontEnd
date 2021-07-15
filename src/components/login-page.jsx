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
		errors: {
			email: '',
		},
	}

	schema = {
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().required().label('Password'),
	}

	async hash(password) {
		const cryptoJS = require('crypto-js')
		const hash = cryptoJS.SHA3(password).toString()
		console.log(hash)
		return hash
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
		account[input.name] = input.value
		this.setState({ account, errors })
		console.log(this.state.account)
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const errors = this.validate()
		this.setState({ errors: errors || {} })

		if (errors) return

		const password = await this.hash(this.state.account.password)

		try {
			const { data: user } = await login(this.state.account.email, password)
			console.log(user)
			console.log(password)
			localStorage.setItem('user', user.userType)
			window.location = '/home'
		} catch (e) {
			if (e.response && e.response.status === 401) {
				const errors = { ...this.state.errors }
				console.log(errors)
				console.log(e.response.data)
				errors.email = e.response.data.error
				this.setState({ errors })
			}
		}
	}

	render() {
		const { account, errors } = this.state
		console.log(errors)
		return (
			<div>
				<div className='card-header'>
					<h1>Login</h1>
				</div>
				<div className='card-body'>
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
