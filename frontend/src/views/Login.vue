<template>
  <div class="auth-container">
    <div class="auth-card card">
      <h2 class="card-title text-center">Library Management System</h2>
      
      <div class="auth-tabs">
        <button 
          @click="activeTab = 'login'" 
          :class="['tab-btn', { active: activeTab === 'login' }]"
        >
          Login
        </button>
        <button 
          @click="activeTab = 'register'" 
          :class="['tab-btn', { active: activeTab === 'register' }]"
        >
          Register
        </button>
      </div>

      <!-- Login Form -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="mt-3">
        <div v-if="error" class="alert alert-error">{{ error }}</div>
        
        <div class="form-group">
          <label class="form-label">Username</label>
          <input 
            v-model="loginForm.username" 
            type="text" 
            class="form-input" 
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            class="form-input" 
            required
          />
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading" style="width: 100%;">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <!-- Register Form -->
      <form v-if="activeTab === 'register'" @submit.prevent="handleRegister" class="mt-3">
        <div v-if="error" class="alert alert-error">{{ error }}</div>
        <div v-if="success" class="alert alert-success">{{ success }}</div>
        
        <div class="form-group">
          <label class="form-label">Username</label>
          <input 
            v-model="registerForm.username" 
            type="text" 
            class="form-input" 
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input 
            v-model="registerForm.full_name" 
            type="text" 
            class="form-input" 
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input 
            v-model="registerForm.password" 
            type="password" 
            class="form-input" 
            required
            minlength="6"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Role</label>
          <select v-model="registerForm.role" class="form-select">
            <option value="student">Student</option>
            <option value="librarian">Librarian</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading" style="width: 100%;">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>
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
    
    const activeTab = ref('login')
    const loading = ref(false)
    const error = ref('')
    const success = ref('')

    const loginForm = ref({
      username: '',
      password: ''
    })

    const registerForm = ref({
      username: '',
      full_name: '',
      password: '',
      role: 'student'
    })

    const handleLogin = async () => {
      error.value = ''
      loading.value = true

      try {
        const response = await api.login(loginForm.value.username, loginForm.value.password)
        authStore.setAuth(response.access_token, response.user)
        router.push('/')
      } catch (err) {
        error.value = err.response?.data?.detail || 'Login failed. Please check your credentials.'
      } finally {
        loading.value = false
      }
    }

    const handleRegister = async () => {
      error.value = ''
      success.value = ''
      loading.value = true

      try {
        await api.register(registerForm.value)
        success.value = 'Registration successful! Please login.'
        registerForm.value = {
          username: '',
          full_name: '',
          password: '',
          role: 'student'
        }
        setTimeout(() => {
          activeTab.value = 'login'
          success.value = ''
        }, 2000)
      } catch (err) {
        error.value = err.response?.data?.detail || 'Registration failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    return {
      activeTab,
      loading,
      error,
      success,
      loginForm,
      registerForm,
      handleLogin,
      handleRegister
    }
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 440px;
}

.auth-tabs {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.tab-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: var(--bg-light);
  color: var(--text-dark);
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.tab-btn:hover:not(.active) {
  background-color: #e9ecef;
}
</style>
