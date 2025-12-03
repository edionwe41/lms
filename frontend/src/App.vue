<template>
  <div id="app">
    <Navbar v-if="showDashboardNav" />
    <Notifications v-if="isAuthenticated" />
    <Toast />
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'
import Notifications from './components/Notifications.vue'
import Toast from './components/Toast.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Notifications,
    Toast
  },
  setup() {
    const authStore = useAuthStore()
    const route = useRoute()
    
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    
    // Show dashboard navbar only when authenticated and not on landing/auth pages
    const showDashboardNav = computed(() => {
      const publicRoutes = ['/', '/login', '/register']
      return isAuthenticated.value && !publicRoutes.includes(route.path)
    })

    return {
      isAuthenticated,
      showDashboardNav
    }
  }
}
</script>
