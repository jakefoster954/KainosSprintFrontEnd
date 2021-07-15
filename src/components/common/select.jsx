import React from 'react'

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<select
				name={name}
				id={name}
				key={name}
				{...rest}
				className='form-control'
			>
				<option></option>
				{options.map((option) => (
					<option key={option.name} value={option.name}>
						{option.name}
					</option>
				))}
			</select>
			{error && <div className='badge text-danger'>{error}</div>}
		</div>
	)
}

export default Select
