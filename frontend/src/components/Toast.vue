<template>
  <transition-group name="toast" tag="div" class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
    >
      <span class="toast-icon">{{ getIcon(toast.type) }}</span>
      <span class="toast-message">{{ toast.message }}</span>
      <button @click="removeToast(toast.id)" class="toast-close">×</button>
    </div>
  </transition-group>
</template>

<script>
import { ref } from 'vue'

const toasts = ref([])
let nextId = 1

export function showToast(message, type = 'info', duration = 3000) {
  const id = nextId++
  toasts.value.push({ id, message, type })

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
}

function removeToast(id) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

export default {
  name: 'Toast',
  setup() {
    const getIcon = (type) => {
      const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
      }
      return icons[type] || icons.info
    }

    return {
      toasts,
      getIcon,
      removeToast
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  border-left: 4px solid;
  min-width: 300px;
  animation: slideIn 0.3s ease-out;
}

.toast-success {
  border-left-color: var(--secondary-color);
  background-color: #d4edda;
}

.toast-error {
  border-left-color: var(--danger-color);
  background-color: #f8d7da;
}

.toast-warning {
  border-left-color: var(--warning-color);
  background-color: #fff3cd;
}

.toast-info {
  border-left-color: var(--primary-color);
  background-color: #d1ecf1;
}

.toast-icon {
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
}

.toast-success .toast-icon {
  color: var(--secondary-color);
}

.toast-error .toast-icon {
  color: var(--danger-color);
}

.toast-warning .toast-icon {
  color: var(--warning-color);
}

.toast-info .toast-icon {
  color: var(--primary-color);
}

.toast-message {
  flex: 1;
  color: var(--text-dark);
  font-size: 14px;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-light);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s;
}

.toast-close:hover {
  color: var(--text-dark);
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideIn 0.3s ease-out reverse;
}

@media (max-width: 768px) {
  .toast-container {
    right: 10px;
    left: 10px;
    max-width: none;
  }

  .toast {
    min-width: auto;
  }
}
</style>
