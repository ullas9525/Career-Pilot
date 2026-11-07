import api from './client'

export function login(email, password) {
  return api.post('/api/auth/login', { email, password })
}

export function signup(email, password, isCoordinator = false) {
  return api.post('/api/auth/signup', { email, password, is_coordinator: isCoordinator })
}

export function getMe() {
  return api.get('/api/users/me')
}

export function updateProfile(data) {
  return api.put('/api/users/profile', data)
}

export function uploadResume(file) {
  const fd = new FormData()
  fd.append('file', file)
  return api.post('/api/users/resume/upload', fd, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
