import React, { Component } from 'react'
import { getCapabilities } from '../servcies/jobService'
import { Link } from 'react-router-dom'
import AddCapability from './add-capability'

class Capabilities extends Component {
	state = {
		capabilities: [],
	}

	async retreiveCapabilities() {
		const { data: capabilities } = await getCapabilities()
		this.setState({ capabilities })
	}

	async componentDidMount() {
		await this.retreiveCapabilities()
	}

	render() {
		const { capabilities } = this.state
		const { user } = this.props
		console.log(capabilities)

		return (
			<>
				<h1 class='pb-3'>Capabilities</h1>
				<div className='row'>
					<div className={`col${user === 'ADMIN' ? '-8' : ''}`}>
						<div className='d-flex justify-content-center'>
							<table
								className='table table-striped table-bordered text-center'
								id='capabilityTable'
							>
								<thead>
									<tr>
										<th>Capability</th>
										<th>Capability Lead</th>
									</tr>
								</thead>
								<tbody>
									{capabilities.map((capability) => (
										<tr className='tableBody' key={capability.capabilityName}>
											<td>{capability.capabilityName}</td>
											<td>
												<Link
													to={{
														pathname: `/capability/${capability.leadName}`,
													}}
												>
													{capability.leadName}
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{user === 'ADMIN' && (
						<div className='col-4'>
							<AddCapability retreiveJobRoles={this.retreiveCapabilities} />
						</div>
					)}
				</div>
			</>
		)
	}
}

export default Capabilities
