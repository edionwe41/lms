<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card card">
        <div class="auth-header">
          <button @click="goToLanding" class="back-link">
            ← Back to Home
          </button>
          <h2 class="auth-title">Create Account</h2>
          <p class="auth-subtitle">Join us and start managing your library today!</p>
        </div>

        <form @submit.prevent="handleRegister" class="auth-form">
          <div v-if="error" class="alert alert-error">{{ error }}</div>
          <div v-if="success" class="alert alert-success">{{ success }}</div>
          
          <div class="form-group">
            <label class="form-label">Username *</label>
            <input 
              v-model="registerForm.username" 
              type="text" 
              class="form-input" 
              placeholder="Choose a username"
              required
              autofocus
            />
          </div>

          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input 
              v-model="registerForm.full_name" 
              type="text" 
              class="form-input" 
              placeholder="Enter your full name"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Password *</label>
            <input 
              v-model="registerForm.password" 
              type="password" 
              class="form-input" 
              placeholder="Create a secure password (min 6 characters)"
              required
              minlength="6"
            />
            <small class="form-hint">Password must be at least 6 characters long</small>
          </div>

          <div class="form-group">
            <label class="form-label">I am a *</label>
            <select v-model="registerForm.role" class="form-select">
              <option value="student">Student</option>
              <option value="librarian">Librarian</option>
            </select>
            <small class="form-hint">Select your role in the library system</small>
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? 
            <button @click="goToLogin" class="link-primary link-button">Sign in here</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    
    const loading = ref(false)
    const error = ref('')
    const success = ref('')

    const registerForm = ref({
      username: '',
      full_name: '',
      password: '',
      role: 'student'
    })

    const goToLanding = () => {
      router.push('/')
    }

    const goToLogin = () => {
      router.push('/login')
    }

    const handleRegister = async () => {
      error.value = ''
      success.value = ''
      loading.value = true

      try {
        await api.register(registerForm.value)
        success.value = 'Registration successful! Redirecting to login...'
        
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (err) {
        error.value = err.response?.data?.detail || 'Registration failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      error,
      success,
      registerForm,
      handleRegister,
      goToLanding,
      goToLogin
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

.form-hint {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: var(--text-light);
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
