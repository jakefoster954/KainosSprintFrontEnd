import http from './httpService'

export function getJobRoles() {
	return http.get('http://localhost:8080/api/employee/getJobNames', {
		withCredentials: true,
	})
}

export function getJobRole(jobName) {
	return http.get(`http://localhost:8080/api/employee/getJobData/${jobName}`, {
		withCredentials: true,
	})
}

export function getCapabilities() {
	console.log('GetCapabilities() is running')
	return http.get('http://localhost:8080/api/employee/getCapabilityLeads', {
		withCredentials: true,
	})
}

export function getCapabilityLeadNames() {
	return http.get('http://localhost:8080/api/employee/getCapabilityLeadNames')
}

export function addJobToDb(job) {
	console.log(job)
	return http.post(
		`http://localhost:8080/api/admin/add-job`,
		{
			jobName: job.jobName,
			jobSpec: job.jobSpec,
			jobUrl: job.jobURL,
			capabilityName: job.capability,
			bandLevelName: job.bandLevel,
		},
		{
			withCredentials: true,
		}
	)
}

export function addCapabilityToDb(capability) {
	return http.post('http://localhost:8080/api/admin/add-capability', {
		capabilityName: capability.capabilityName,
		leadName: capability.capabilityLead,
	})
}

export function getCapabilityLead(leadName) {
	return http.get(
		`http://localhost:8080/api/employee/getCapabilityLeadData/${leadName}`,
		{
			withCredentials: true,
		}
	)
}

export function getBandLevels() {
	return http.get('http://localhost:8080/api/employee/getBandLevels', {
		withCredentials: true,
	})
}

export function getCapabilityNames() {
	return http.get('http://localhost:8080/api/employee/getCapabilities', {
		withCredentials: true,
	})
}

export function deleteJobRole(jobRoleName) {
	return http.delete(
		`http://localhost:8080/api/admin/delete-job/${jobRoleName}`,
		{
			withCredentials: true,
		}
	)
}

export function deleteCapability(capabilityName) {
	return http.delete(
		`http://localhost:8080/api/admin/delete-capability/${capabilityName}`,
		{
			withCredentials: true,
		}
	)
}
