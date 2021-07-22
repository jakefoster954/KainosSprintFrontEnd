import React, { Component } from 'react'
import { logout } from '../servcies/userService'

class Logout extends Component {
	async componentDidMount() {
		localStorage.removeItem('user')
		await logout()
		document.cookie = 'sessionKey= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
		window.location = '/login'
	}

	render() {
		return null
	}
}

export default Logout
