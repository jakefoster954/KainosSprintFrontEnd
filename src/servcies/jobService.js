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

export function addJobToDb(job) {
	console.log(job)
	return http.post(`http://localhost:8080/api/add-job`, {
		jobName: job.jobName,
		jobSpec: job.jobSpec,
		jobURL: job.jobURL,
		capabilityName: job.capability,
		bandLevelName: job.bandLevel,
	})
}

export function getCapabilityLead(leadName) {
	return http.get(`http://localhost:8080/api/getCapabilityData/${leadName}`)
}

export function getBandLevels() {
	return http.get('http://localhost:8080/api/getBandLevels')
}

export function getCapabilityNames() {
	return http.get('http://localhost:8080/api/getCapabilities')
}
