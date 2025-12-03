import { reactive } from 'vue'

const state = reactive({
  notifications: [],
  unreadCount: 0
})

export function useNotificationStore() {
  function addNotification(notification) {
    const exists = state.notifications.find(n => n.id === notification.id)
    if (!exists) {
      state.notifications.unshift(notification)
      if (!notification.read) {
        state.unreadCount++
      }
    }
  }

  function setNotifications(notifications) {
    state.notifications = notifications
    state.unreadCount = notifications.filter(n => !n.read).length
  }

  function markAsRead(id) {
    const notification = state.notifications.find(n => n.id === id)
    if (notification && !notification.read) {
      notification.read = true
      state.unreadCount--
    }
  }

  function clearNotifications() {
    state.notifications = []
    state.unreadCount = 0
  }

  return {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    addNotification,
    setNotifications,
    markAsRead,
    clearNotifications
  }
}
