import React, { Component } from 'react'
import { getCapabilities } from '../servcies/jobService'
import { Link, Redirect } from 'react-router-dom'
import AddCapability from './add-capability'
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
			console.log('Capability deleted')
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
		return user === '' ? (
			<Redirect to='/login' />
		) : (
			<>
				<h1 class='pb-3'>Capabilities</h1>
				<div className='row'>
					<div className={`col${user === 'ADMI' ? '-8' : ''}`}>
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
											<td className='align-middle'>
											{user === 'ADMI' && (
												<a
													class='btn btn-danger text-white'
													style={{opacity: capability.jobFamilyCount > 0 ? 0.5 : 1.0}}
													onClick={() =>
														{capability.jobFamilyCount > 0 ? alert("You cannot delete a Capability with an associated Job Family") : this.handleDelete(capability.capabilityName)}
													}
												>
													Delete Capability
												</a>
											)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					{user === 'ADMI' && (
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
