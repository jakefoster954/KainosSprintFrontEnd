import React, { Component } from 'react'
import { getCapabilities } from '../servcies/jobService'
import { Link } from 'react-router-dom'
import { deleteCapability } from '../servcies/jobService'

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

	handleDelete = async (capabilityName) => {
		try {
			await deleteCapability(capabilityName)
			console.log("Capability deleted")
			alert(`Capability ${capabilityName} has successfully been deleted`)
			window.location = '/capabilities'
		} catch (e) {
			if (e.response) {
				console.log(e.response.data)
			}
		}
	}

	render() {
		const { capabilities } = this.state
		const { user } = this.props
		console.log(capabilities)
		return (
			<>
				<h1 class="pb-3">Capabilities</h1>
				<div className='d-flex justify-content-center'>
					<table
						className='table table-striped table-bordered text-center'
						id='capabilityTable'
					>
						<thead>
							<tr>
								<th>Capability</th>
								<th>Capability Lead</th>
								{ user === "ADMIN" && (<th>DELETE Capability</th>)}
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
									{ user === "ADMIN" && (<a class="btn btn-danger text-white" onClick={() => this.handleDelete(capability.capabilityName)}>Delete Capability</a> )}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</>
		)
	}
}

export default Capabilities
