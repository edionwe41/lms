<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="navbar-brand">
          <router-link to="/dashboard" class="brand-link">
            <span class="brand-icon">📚</span>
            <span class="brand-text">Library MS</span>
          </router-link>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': menuOpen }">
          <router-link to="/dashboard" class="nav-link" @click="closeMenu">
            <span class="nav-icon">🏠</span>
            <span>Dashboard</span>
          </router-link>
          <router-link to="/books" class="nav-link" @click="closeMenu">
            <span class="nav-icon">📖</span>
            <span>Books</span>
          </router-link>
          <router-link to="/my-borrows" class="nav-link" @click="closeMenu">
            <span class="nav-icon">📚</span>
            <span>My Borrows</span>
          </router-link>
          <router-link to="/reservations" class="nav-link" @click="closeMenu">
            <span class="nav-icon">🔔</span>
            <span>Reservations</span>
          </router-link>
          <router-link 
            v-if="authStore.isLibrarian" 
            to="/users" 
            class="nav-link"
            @click="closeMenu"
          >
            <span class="nav-icon">👥</span>
            <span>Users</span>
          </router-link>
        </div>

        <div class="navbar-actions">
          <div class="user-info">
            <div class="user-details">
              <span class="user-name">{{ authStore.currentUser?.full_name }}</span>
              <span :class="['user-role', 'badge', getRoleBadge()]">
                {{ authStore.currentUser?.role }}
              </span>
            </div>
          </div>
          <button @click="handleLogout" class="btn-logout">
            <span>Logout</span>
            <span class="logout-icon">🚪</span>
          </button>
        </div>

        <button class="mobile-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger-icon" :class="{ 'is-active': menuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()
    const menuOpen = ref(false)

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

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    return {
      authStore,
      handleLogout,
      getRoleBadge,
      menuOpen,
      toggleMenu,
      closeMenu
    }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  position: relative;
}

.navbar-brand {
  z-index: 101;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.brand-link:hover {
  transform: scale(1.05);
}

.brand-icon {
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.brand-text {
  letter-spacing: -0.5px;
}

.navbar-menu {
  display: flex;
  gap: 8px;
  flex: 1;
  margin-left: 40px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-icon {
  font-size: 18px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 101;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 16px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.user-details {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-weight: 600;
  color: white;
  font-size: 14px;
}

.user-role {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 600;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.logout-icon {
  font-size: 16px;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 101;
}

.hamburger-icon {
  display: block;
  width: 26px;
  height: 20px;
  position: relative;
}

.hamburger-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: white;
  border-radius: 3px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.hamburger-icon span:nth-child(1) {
  top: 0;
}

.hamburger-icon span:nth-child(2) {
  top: 8px;
}

.hamburger-icon span:nth-child(3) {
  top: 16px;
}

.hamburger-icon.is-active span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.hamburger-icon.is-active span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.hamburger-icon.is-active span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}

@media (max-width: 968px) {
  .mobile-toggle {
    display: block;
  }

  .navbar-menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    align-items: stretch;
    padding: 80px 20px 30px;
    gap: 8px;
    margin-left: 0;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .navbar-menu.is-active {
    transform: translateX(0);
  }

  .nav-link {
    width: 100%;
    padding: 14px 16px;
    justify-content: flex-start;
  }

  .navbar-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .user-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .btn-logout {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .brand-link {
    font-size: 18px;
  }

  .brand-icon {
    font-size: 24px;
  }

  .user-name {
    font-size: 13px;
  }
}
</style>
