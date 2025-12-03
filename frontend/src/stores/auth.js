import { reactive, computed } from 'vue'

// Validate token format (basic check)
function isValidToken(token) {
  if (!token) return false
  // JWT tokens have 3 parts separated by dots
  const parts = token.split('.')
  return parts.length === 3
}

// Initialize state with validation
function initializeState() {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  
  // Validate token format
  if (token && !isValidToken(token)) {
    console.warn('Invalid token format detected, clearing auth...')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return { user: null, token: null }
  }
  
  // Validate user data
  let user = null
  if (userStr) {
    try {
      user = JSON.parse(userStr)
      // Ensure user has required fields
      if (!user || !user.id || !user.username) {
        console.warn('Invalid user data, clearing auth...')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return { user: null, token: null }
      }
    } catch (e) {
      console.error('Failed to parse user data:', e)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return { user: null, token: null }
    }
  }
  
  return { user, token }
}

const state = reactive(initializeState())

export function useAuthStore() {
  const isAuthenticated = computed(() => {
    return !!state.token && !!state.user && isValidToken(state.token)
  })
  const currentUser = computed(() => state.user)
  const isLibrarian = computed(() => state.user?.role === 'librarian' || state.user?.role === 'admin')
  const isAdmin = computed(() => state.user?.role === 'admin')

  function setAuth(token, user) {
    state.token = token
    state.user = user
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  function clearAuth() {
    state.token = null
    state.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    isAuthenticated,
    currentUser,
    isLibrarian,
    isAdmin,
    setAuth,
    clearAuth
  }
}
