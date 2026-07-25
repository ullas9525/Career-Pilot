import api from './client'

export function login(email, password) {
  return api.post('/api/auth/login', { email, password })
}

export function signup(email, password, isCoordinator = false) {
  return api.post('/api/auth/signup', { email, password, is_coordinator: isCoordinator })
}

export function googleAuth(token) {
  return api.post('/api/auth/google', { token })
}
