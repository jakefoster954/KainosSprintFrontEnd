import React, { Component } from 'react'
import Input from './common/input'

class AddJobRole extends Component {
	state = {
		jobRole: {
			jobName: '',
			jobSpec: '',
			jobURL: '',
			bandLevel: '',
			jobFamily: '',
		},
	}

	render() {
		return (
			<div>
				<h1>Add Job</h1>
				<div className='card-header'>
					<h3>Add New Job</h3>
				</div>
				<div className='card-body'>
					<Input label='Job Role Name' name='jobRoleName' />
					<Input label='Job Role Specification' name='jobSpec' />
					<Input label='Job Role Link' name='jobRoleLink' />
					<Input label='Job Role Name' name='jobRoleName' />
					<Input label='Job Role Name' name='jobRoleName' />
				</div>
			</div>
		)
	}
}

export default AddJobRole
