<template>
  <div class="users-page">
    <div class="container">
      <div class="page-header">
        <h1>User Management</h1>
        <button @click="showAddModal = true" class="btn btn-primary">+ Add User</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="spinner"></div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error">{{ error }}</div>

      <!-- Users Table -->
      <div v-else-if="users.length > 0" class="card">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.full_name }}</td>
              <td>
                <span :class="['badge', getRoleBadgeClass(user.role)]">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span :class="['badge', user.is_active ? 'badge-success' : 'badge-danger']">
                  {{ user.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="card text-center">
        <p>No users found.</p>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Add New User</h3>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>

        <form @submit.prevent="handleSubmit">
          <div v-if="modalError" class="alert alert-error">{{ modalError }}</div>

          <div class="form-group">
            <label class="form-label">Username *</label>
            <input v-model="userForm.username" type="text" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input v-model="userForm.full_name" type="text" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Password *</label>
            <input 
              v-model="userForm.password" 
              type="password" 
              class="form-input" 
              required 
              minlength="6"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Role *</label>
            <select v-model="userForm.role" class="form-select" required>
              <option value="student">Student</option>
              <option value="librarian">Librarian</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              {{ submitting ? 'Creating...' : 'Create User' }}
            </button>
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { showToast } from '../components/Toast.vue'

export default {
  name: 'Users',
  setup() {
    const users = ref([])
    const loading = ref(false)
    const error = ref('')
    
    const showAddModal = ref(false)
    const modalError = ref('')
    const submitting = ref(false)
    
    const userForm = ref({
      username: '',
      full_name: '',
      password: '',
      role: 'student'
    })

    const loadUsers = async () => {
      loading.value = true
      error.value = ''
      
      try {
        users.value = await api.getUsers()
      } catch (err) {
        error.value = err.response?.data?.detail || 'Failed to load users'
      } finally {
        loading.value = false
      }
    }

    const handleSubmit = async () => {
      modalError.value = ''
      submitting.value = true

      try {
        await api.createUser(userForm.value)
        showToast('User created successfully!', 'success')
        closeModal()
        loadUsers()
      } catch (err) {
        modalError.value = err.response?.data?.detail || 'Failed to create user'
      } finally {
        submitting.value = false
      }
    }

    const closeModal = () => {
      showAddModal.value = false
      modalError.value = ''
      userForm.value = {
        username: '',
        full_name: '',
        password: '',
        role: 'student'
      }
    }

    const getRoleBadgeClass = (role) => {
      const classes = {
        admin: 'badge-danger',
        librarian: 'badge-primary',
        student: 'badge-success'
      }
      return classes[role] || 'badge-secondary'
    }

    onMounted(() => {
      loadUsers()
    })

    return {
      users,
      loading,
      error,
      showAddModal,
      modalError,
      submitting,
      userForm,
      handleSubmit,
      closeModal,
      getRoleBadgeClass
    }
  }
}
</script>

<style scoped>
.users-page {
  padding: 40px 0;
  min-height: calc(100vh - 70px);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-dark);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .page-header .btn {
    width: 100%;
  }
}
</style>
