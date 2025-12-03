import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 Unauthorized (invalid/expired token)
    // Don't handle 403 Forbidden (valid token but insufficient permissions)
    if (error.response?.status === 401) {
      // Clear invalid auth
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Only redirect if not already on login page
      const currentPath = window.location.pathname
      if (currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/') {
        console.warn('Authentication failed, redirecting to login...')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default {
  // Auth
  async login(username, password) {
    const response = await api.post('/auth/login', { username, password })
    return response.data
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Books
  async getBooks(query = '') {
    const url = query ? `/books/?q=${encodeURIComponent(query)}` : '/books/'
    const response = await api.get(url)
    return response.data
  },

  async getBook(id) {
    const response = await api.get(`/books/${id}`)
    return response.data
  },

  async addBook(bookData) {
    const response = await api.post('/books/', bookData)
    return response.data
  },

  async updateBook(id, bookData) {
    const response = await api.put(`/books/${id}`, bookData)
    return response.data
  },

  async deleteBook(isbn) {
    const response = await api.delete(`/books/${isbn}`)
    return response.data
  },

  // Borrows
  async borrowBook(bookId) {
    const response = await api.post('/borrows/', { book_id: bookId })
    return response.data
  },

  async returnBook(borrowId) {
    const response = await api.post(`/borrows/return/${borrowId}`)
    return response.data
  },

  async getMyBorrows() {
    const response = await api.get('/borrows/me')
    return response.data
  },

  async getAllBorrows() {
    const response = await api.get('/borrows/')
    return response.data
  },

  // Reservations
  async createReservation(bookId) {
    const response = await api.post('/reservations/', { book_id: bookId })
    return response.data
  },

  async getReservations(params = {}) {
    const queryParams = new URLSearchParams(params).toString()
    const url = queryParams ? `/reservations/?${queryParams}` : '/reservations/'
    const response = await api.get(url)
    return response.data
  },

  async getReservation(id) {
    const response = await api.get(`/reservations/${id}`)
    return response.data
  },

  async cancelReservation(id) {
    const response = await api.delete(`/reservations/${id}`)
    return response.data
  },

  // Users
  async getUsers() {
    const response = await api.get('/users/')
    return response.data
  },

  async getUser(id) {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  async createUser(userData) {
    const response = await api.post('/users/', userData)
    return response.data
  },

  // Notifications
  async getNotifications() {
    const response = await api.get('/notifications/')
    return response.data
  },

  async markNotificationRead(id) {
    const response = await api.post('/notifications/mark-read', { id })
    return response.data
  }
}
