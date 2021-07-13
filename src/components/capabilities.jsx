import React, { Component } from 'react'
import { getCapabilities } from '../servcies/jobService'
import { Link } from 'react-router-dom'

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
		console.log(capabilities)

		return (
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
		)
	}
}

export default Capabilities
