import React, { Component, Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import JobRoles from './components/job-roles'
import JobRole from './components/job-role'
import Capabilities from './components/capabilities'
import CapabilityLead from './components/capability-lead'
import NavBar from './components/nav-bar'
import NotFound from './components/not-found'
import 'bootstrap/dist/css/bootstrap.min.css'
import './theme.css'

class App extends Component {
	render() {
		return (
			<Fragment>
				<NavBar />
				<main>
					<div className='container p-5'>
						<Switch>
							<Route path='/job-roles' component={JobRoles} />
							<Route path='/job-role/:jobName' component={JobRole} />
							<Route path='/capabilities' component={Capabilities} />
							<Route path='/capability/:leadName' component={CapabilityLead} />
							<Route path='/not-found' component={NotFound} />
							<Redirect to='/not-found' />
						</Switch>
					</div>
				</main>
			</Fragment>
		)
	}
}

export default App
