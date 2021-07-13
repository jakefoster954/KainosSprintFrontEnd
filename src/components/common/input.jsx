import React from 'react'

const Input = ({ name, label, error, ...rest }) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input {...rest} className='form-control' id={name} name={name}></input>
			{error && <div className='badge text-danger'>{error}</div>}
		</div>
	)
}

export default Input
