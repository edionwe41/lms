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
        router.push('/dashboard')
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
  position: relative;
  overflow: hidden;
}

.auth-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.05)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
  background-size: cover;
  opacity: 0.5;
}

.auth-container {
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 1;
}

.auth-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.auth-header {
  margin-bottom: 36px;
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--text-light);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 24px;
  transition: var(--transition);
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.back-link:hover {
  color: var(--primary-color);
  background: var(--bg-light);
}

.auth-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-dark);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-subtitle {
  color: var(--text-light);
  font-size: 15px;
  line-height: 1.6;
}

.auth-form {
  margin-bottom: 28px;
}

.btn-block {
  width: 100%;
  margin-top: 12px;
  padding: 14px;
  font-size: 16px;
  font-weight: 700;
}

.auth-footer {
  text-align: center;
  padding-top: 28px;
  border-top: 2px solid var(--border-light);
}

.auth-footer p {
  color: var(--text-light);
  font-size: 14px;
}

.link-primary {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.link-primary:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.link-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: inherit;
  transition: var(--transition);
}

.link-button:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 32px 24px;
  }

  .auth-title {
    font-size: 26px;
  }
}
</style>
