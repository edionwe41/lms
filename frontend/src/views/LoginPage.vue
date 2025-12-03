<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card card">
        <div class="auth-header">
          <button @click="goToLanding" class="back-link">
            ← Back to Home
          </button>
          <h2 class="auth-title">Sign In</h2>
          <p class="auth-subtitle">Welcome back! Please enter your credentials.</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div v-if="error" class="alert alert-error">{{ error }}</div>
          
          <div class="form-group">
            <label class="form-label">Username</label>
            <input 
              v-model="loginForm.username" 
              type="text" 
              class="form-input" 
              placeholder="Enter your username"
              required
              autofocus
            />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              v-model="loginForm.password" 
              type="password" 
              class="form-input" 
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? 
            <button @click="goToRegister" class="link-primary link-button">Create one here</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const loading = ref(false)
    const error = ref('')

    const loginForm = ref({
      username: '',
      password: ''
    })

    const goToLanding = () => {
      router.push('/')
    }

    const goToRegister = () => {
      router.push('/register')
    }

    const handleLogin = async () => {
      error.value = ''
      loading.value = true

      try {
        const response = await api.login(loginForm.value.username, loginForm.value.password)
        authStore.setAuth(response.access_token, response.user)
        router.push('/books')
      } catch (err) {
        error.value = err.response?.data?.detail || 'Login failed. Please check your credentials.'
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      error,
      loginForm,
      handleLogin,
      goToLanding,
      goToRegister
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 440px;
}

.auth-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.auth-header {
  margin-bottom: 32px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--text-light);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--primary-color);
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-dark);
}

.auth-subtitle {
  color: var(--text-light);
  font-size: 15px;
}

.auth-form {
  margin-bottom: 24px;
}

.btn-block {
  width: 100%;
  margin-top: 8px;
}

.auth-footer {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.auth-footer p {
  color: var(--text-light);
  font-size: 14px;
}

.link-primary {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.link-primary:hover {
  text-decoration: underline;
}

.link-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: inherit;
}

.link-button:hover {
  text-decoration: underline;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--text-light);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 20px;
  transition: color 0.3s ease;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.back-link:hover {
  color: var(--primary-color);
}
</style>
