import React, { Component } from 'react'
import { getCapabilityLead } from '../servcies/jobService'
import { Redirect } from 'react-router-dom'
import NoPhoto from '../NoPhoto.png'
import '../lead.css'

class CapabilityLead extends Component {
	state = {
		capabilityLead: {},
	}

	async retreiveCapabilityLead() {
		const { data: capabilityLead } = await getCapabilityLead(
			this.props.match.params.leadName
		)
		this.setState({ capabilityLead })
	}

	async componentDidMount() {
		await this.retreiveCapabilityLead()
	}

	render() {
		const { capabilityLead } = this.state
		const { user } = this.props
		return (
			<div className='row mt-3 d-flex justify-content-center'>
				<div className='card' id='capabilityLeadCard'>
					<div className='card-header text-center'>
						<h1 id='capabilityLeadHeader'>{capabilityLead.leadName}</h1>
					</div>
					<div>
						<img
							id='capabilityLeadPhoto'
							src={
								capabilityLead.leadPhoto ? capabilityLead.leadPhoto : NoPhoto
							}
							alt=''
							width='100'
							className='center rounded-circle'
						></img>
					</div>
					<div className='card-body'>
						<div className='jumbotron'>
							<h3 className='display-9'>Capability Lead Message</h3>
							<div className='mt-3'>
								<p id='capabilityLeadMsg' className='card-text'>
									{capabilityLead.leadMessage}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CapabilityLead
