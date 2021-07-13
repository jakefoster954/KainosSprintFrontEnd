import http from './httpService'

export function login(email, password) {
	console.log(password)
	return http.post('http://localhost:8080/api/login', { email, password })
}
