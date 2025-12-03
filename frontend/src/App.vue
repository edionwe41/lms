<template>
  <div id="app">
    <Navbar v-if="isAuthenticated" />
    <Notifications v-if="isAuthenticated" />
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'
import Notifications from './components/Notifications.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Notifications
  },
  setup() {
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => authStore.isAuthenticated)

    return {
      isAuthenticated
    }
  }
}
</script>
