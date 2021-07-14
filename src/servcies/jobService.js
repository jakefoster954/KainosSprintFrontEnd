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
	return http.get('http://localhost:8080/api/getCapabilities')
}

export function getBandLevels() {
	return http.get('http://localhost:8080/api/getBandLevels')
}

export function getCapabilityLead(leadName) {
	const newLeadName = leadName.replace(/\W+/g, '-')
	console.log(leadName, newLeadName)
	return http.get(`http://localhost:8080/api/capabilities/${newLeadName}`)
}

export function addJobToDb(job) {
	return http.post(`http://localhost:8080/api/add-job`, {
		jobName: job.jobName,
		jobSpec: job.jobSpec,
		jobURL: job.jobURL,
		capabilityName: job.capability,
		bandLevelName: job.bandLevel,
	})
}
