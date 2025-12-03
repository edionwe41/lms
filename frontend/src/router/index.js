import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Login from '../views/Login.vue'
import Books from '../views/Books.vue'
import MyBorrows from '../views/MyBorrows.vue'
import Reservations from '../views/Reservations.vue'
import Users from '../views/Users.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Books',
    component: Books,
    meta: { requiresAuth: true }
  },
  {
    path: '/my-borrows',
    name: 'MyBorrows',
    component: MyBorrows,
    meta: { requiresAuth: true }
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: Reservations,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true, requiresLibrarian: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
  } else if (to.meta.requiresLibrarian && !authStore.isLibrarian) {
    alert('Access denied. Librarian or Admin role required.')
    next('/')
  } else {
    next()
  }
})

export default router
