<template>
  <div class="notifications-dropdown">
    <div class="notification-bell" @click="toggleDropdown">
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="badge-count">{{ unreadCount }}</span>
    </div>

    <div v-if="showDropdown" class="dropdown-overlay" @click="toggleDropdown"></div>
    
    <div v-if="showDropdown" class="dropdown-menu">
      <div class="dropdown-header">
        <h4>Notifications</h4>
        <span class="notification-count">{{ unreadCount }} unread</span>
      </div>

      <div class="notifications-list">
        <div v-if="notifications.length === 0" class="empty-state">
          No notifications
        </div>

        <div 
          v-for="notification in notifications.slice(0, 10)" 
          :key="notification.id"
          :class="['notification-item', { unread: !notification.read }]"
          @click="markAsRead(notification.id)"
        >
          <div class="notification-icon">
            {{ getNotificationIcon(notification.type) }}
          </div>
          <div class="notification-content">
            <p class="notification-message">{{ getNotificationMessage(notification) }}</p>
            <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNotificationStore } from '../stores/notifications'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'

export default {
  name: 'Notifications',
  setup() {
    const notificationStore = useNotificationStore()
    const authStore = useAuthStore()
    const showDropdown = ref(false)
    let eventSource = null

    const notifications = computed(() => notificationStore.notifications)
    const unreadCount = computed(() => notificationStore.unreadCount)

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    const markAsRead = async (id) => {
      try {
        await api.markNotificationRead(id)
        notificationStore.markAsRead(id)
      } catch (err) {
        console.error('Failed to mark notification as read:', err)
      }
    }

    const getNotificationIcon = (type) => {
      const icons = {
        borrowed: '📚',
        returned: '✅',
        reservation_ready: '🔔',
        overdue: '⚠️',
        default: 'ℹ️'
      }
      return icons[type] || icons.default
    }

    const getNotificationMessage = (notification) => {
      const messages = {
        borrowed: `You borrowed a book (ID: ${notification.book_id})`,
        returned: `Book returned (Borrow ID: ${notification.borrow_id})`,
        reservation_ready: `Your reserved book is now available!`,
        overdue: `You have an overdue book!`,
      }
      return messages[notification.type] || notification.message || 'New notification'
    }

    const formatTime = (timestamp) => {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date
      const minutes = Math.floor(diff / 60000)
      
      if (minutes < 1) return 'Just now'
      if (minutes < 60) return `${minutes}m ago`
      
      const hours = Math.floor(minutes / 60)
      if (hours < 24) return `${hours}h ago`
      
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    }

    const connectSSE = () => {
      const token = localStorage.getItem('token')
      if (!token) return

      eventSource = new EventSource(`/api/notifications/stream?token=${token}`)

      eventSource.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data)
          notification.timestamp = new Date().toISOString()
          notification.read = false
          notificationStore.addNotification(notification)
        } catch (err) {
          console.error('Failed to parse notification:', err)
        }
      }

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error)
        eventSource.close()
        // Reconnect after 5 seconds
        setTimeout(connectSSE, 5000)
      }
    }

    const loadNotifications = async () => {
      try {
        const response = await api.getNotifications()
        const items = response.items.map(item => ({
          ...item,
          timestamp: item.timestamp || new Date().toISOString(),
          read: item.read || false
        }))
        notificationStore.setNotifications(items)
      } catch (err) {
        console.error('Failed to load notifications:', err)
      }
    }

    onMounted(() => {
      loadNotifications()
      connectSSE()
    })

    onUnmounted(() => {
      if (eventSource) {
        eventSource.close()
      }
    })

    return {
      showDropdown,
      notifications,
      unreadCount,
      toggleDropdown,
      markAsRead,
      getNotificationIcon,
      getNotificationMessage,
      formatTime
    }
  }
}
</script>

<style scoped>
.notifications-dropdown {
  position: relative;
}

.notification-bell {
  position: relative;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.notification-bell:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.bell-icon {
  font-size: 20px;
}

.badge-count {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: var(--danger-color);
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 998;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 360px;
  max-height: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  z-index: 999;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-light);
}

.dropdown-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.notification-count {
  font-size: 12px;
  color: var(--text-light);
}

.notifications-list {
  max-height: 400px;
  overflow-y: auto;
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: var(--text-light);
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: var(--bg-light);
}

.notification-item.unread {
  background-color: #e3f2fd;
}

.notification-item.unread:hover {
  background-color: #bbdefb;
}

.notification-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-message {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: var(--text-dark);
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: var(--text-light);
}
</style>
