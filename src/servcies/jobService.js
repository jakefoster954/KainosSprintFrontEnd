import http from './httpService'

export function getJobRoles() {
	return http.get('http://localhost:8080/api/job-roles')
}

export function getJobRole(jobName) {
	const newJobName = jobName.replace(/\W+/g, '-')
	return http.get(`http://localhost:8080/api/job-roles/${newJobName}`)
}

export function getCapabilities() {
	return http.get('http://localhost:8080/api/capabilities')
}
