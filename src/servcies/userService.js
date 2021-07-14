import http from './httpService'

export function login(userEmail, userPassword) {
	console.log(userPassword)
	return http.post('http://localhost:8080/api/login', {
		userEmail,
		userPassword,
	})
}
