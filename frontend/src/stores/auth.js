import { reactive, computed } from 'vue'

const state = reactive({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null
})

export function useAuthStore() {
  const isAuthenticated = computed(() => !!state.token)
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
