import React, { Component } from 'react'
import { getCapabilityLead } from '../servcies/jobService'
import './lead.css'

class CapabilityLead extends Component {
	state = {
		capabilityLead: {},
	}

	async retreiveCapabilityLead() {
		const { data: capabilityLead } = await getCapabilityLead(this.props.match.params.leadName)
		this.setState({ capabilityLead })
	}

	async componentDidMount() {
		await this.retreiveCapabilityLead()
	}

	render() {
		const { capabilityLead } = this.state
		return (
			
			<div className='row mt-3 d-flex justify-content-center'>
				<div className='card' id='capabilityLeadCard'>
					<div className='card-header text-center'>
						<h1 id='capabilityLeadHeader'>{capabilityLead.leadName}</h1>
					</div>
					<div>
						<img src = {capabilityLead.leadPhoto} width ='100' className = "center rounded-circle"></img>
					</div>
					<div className='card-body'>
						<div className='jumbotron'>
							<h3 className='display-9'>Capability Lead Message</h3>
							<div className='mt-3'>
								<p className='card-text'>{capabilityLead.leadMessage}</p>
							</div>
						</div>
					</div>
					{/* <div className='card-body'>
						Find out more{' '}
						<a
							href='#'
							target='_blank'
							rel='noopener noreferrer'
						>
							here
						</a>
					</div> */}
				</div>
			</div>
		)
	}
}

export default CapabilityLead
