<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="navbar-brand">
          <router-link to="/">📚 Library MS</router-link>
        </div>

        <div class="navbar-menu">
          <router-link to="/" class="nav-link">Books</router-link>
          <router-link to="/my-borrows" class="nav-link">My Borrows</router-link>
          <router-link to="/reservations" class="nav-link">Reservations</router-link>
          <router-link 
            v-if="authStore.isLibrarian" 
            to="/users" 
            class="nav-link"
          >
            Users
          </router-link>
        </div>

        <div class="navbar-actions">
          <div class="user-info">
            <span class="user-name">{{ authStore.currentUser?.full_name }}</span>
            <span :class="['user-role', 'badge', getRoleBadge()]">
              {{ authStore.currentUser?.role }}
            </span>
          </div>
          <button @click="handleLogout" class="btn btn-secondary btn-sm">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    const handleLogout = () => {
      authStore.clearAuth()
      notificationStore.clearNotifications()
      router.push('/login')
    }

    const getRoleBadge = () => {
      const role = authStore.currentUser?.role
      if (role === 'admin') return 'badge-danger'
      if (role === 'librarian') return 'badge-primary'
      return 'badge-success'
    }

    return {
      authStore,
      handleLogout,
      getRoleBadge
    }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  gap: 20px;
}

.navbar-brand a {
  font-size: 20px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar-menu {
  display: flex;
  gap: 24px;
  flex: 1;
  margin-left: 40px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-weight: 500;
  color: white;
}

.user-role {
  font-size: 11px;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-menu {
    margin-left: 0;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .navbar-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
