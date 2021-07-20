import http from './httpService'

export function getJobRoles() {
	return http.get('http://localhost:8080/api/employee/getJobNames')
}

export function getJobRole(jobName) {
	return http.get(`http://localhost:8080/api/employee/getJobData/${jobName}`)
}

export function getCapabilities() {
	console.log('GetCapabilities() is running')
	return http.get('http://localhost:8080/api/employee/getCapabilityLeads')
}

export function addJobToDb(job) {
	console.log(job)
	return http.post(`http://localhost:8080/api/admin/add-job`, {
		jobName: job.jobName,
		jobSpec: job.jobSpec,
		jobUrl: job.jobURL,
		capabilityName: job.capability,
		bandLevelName: job.bandLevel,
	})
}

export function getCapabilityLead(leadName) {
	return http.get(`http://localhost:8080/api/employee/getCapabilityLeadData/${leadName}`)
}

export function getBandLevels() {
	return http.get('http://localhost:8080/api/employee/getBandLevels')
}

export function getCapabilityNames() {
	return http.get('http://localhost:8080/api/employee/getCapabilities')
}

export function deleteJobRole(jobRoleName) {
	return http.delete(`http://localhost:8080/api/admin/delete-job/${jobRoleName}`)
}

export function deleteCapability(capabilityName) {
	return http.delete(`http://localhost:8080/api/admin/delete-capability/${capabilityName}`)
}
