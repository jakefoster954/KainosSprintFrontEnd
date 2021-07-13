import React, { Component } from 'react'
import { getCapabilities } from '../servcies/jobService'

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
								<td>{capability.leadName}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Capabilities
