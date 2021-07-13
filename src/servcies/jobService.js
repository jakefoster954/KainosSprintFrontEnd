import http from './httpService'

export function getJobRoles() {
	return http.get('http://localhost:8080/api/job-roles')
}

export function getJobRole(jobName) {
	const newJobName = jobName.replace(/\W+/g, '-')
	console.log(newJobName, jobName)
	return http.get(`http://localhost:8080/api/job-roles/${newJobName}`)
}

export function getCapabilities() {
	console.log("GetCapabilities() is running")
	return http.get('http://localhost:8080/api/capabilities')
}

export function getCapabilityLead(leadName) {
	const newLeadName = leadName.replace(/\W+/g, '-')
	console.log(leadName, newLeadName)
	return http.get(`http://localhost:8080/api/capabilities/${newLeadName}`)
}