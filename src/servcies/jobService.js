import http from './httpService'

export function getJobRoles() {
	return http.get('http://localhost:8080/api/getJobNames')
}

export function getJobRole(jobName) {
	return http.get(`http://localhost:8080/api/getJobData/${jobName}`)
}

export function getCapabilities() {
	console.log('GetCapabilities() is running')
	return http.get('http://localhost:8080/api/getCapabilityLeads')
}

export function getCapabilityLead(leadName) {
	return http.get(`http://localhost:8080/api/getCapabilityLeadData/${leadName}`)
}
