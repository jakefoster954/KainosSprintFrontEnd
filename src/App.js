import React, { Component, Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import JobRoles from './components/job-roles'
import JobRole from './components/job-role'
import Capabilities from './components/capabilities'
import CapabilityLead from './components/capability-lead'
import NavBar from './components/nav-bar'
import NotFound from './components/not-found'
import LoginPage from './components/login-page'
import AddJobRole from './components/add-job-role'
import 'bootstrap/dist/css/bootstrap.min.css'
import './theme.css'
import Logout from './components/logout'
import HomePage from './components/home'

class App extends Component {
	state = {
		user: {},
	}
	componentDidMount() {
		const user = localStorage.getItem('user')
		this.setState({ user })
	}

	render() {
		console.log(this.state.user)
		return (
			<Fragment>
				<NavBar user={this.state.user} />
				<main>
					<div className='container p-5'>
						<Switch>
							<Route
								path='/job-roles'
								render={(props) => (
									<JobRoles user={this.state.user} {...props} />
								)}
							/>
							<Route
								path='/job-role/:jobName'
								render={(props) => (
									<JobRole user={this.state.user} {...props} />
								)}
							/>
							<Route path='/login' component={LoginPage} />
							<Route
								path='/home'
								render={(props) => (
									<HomePage user={this.state.user} {...props} />
								)}
							/>
							<Route path='/capabilities' component={Capabilities} />
							<Route path='/capability/:leadName' component={CapabilityLead} />
							<Route path='/not-found' component={NotFound} />
							<Route path='/addJob' component={AddJobRole} />
							<Route path='/logout' component={Logout} />
							<Redirect to='/not-found' />
						</Switch>
					</div>
				</main>
			</Fragment>
		)
	}
}

export default App
