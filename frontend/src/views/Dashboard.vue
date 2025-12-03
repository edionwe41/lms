<template>
  <div class="dashboard-page">
    <div class="container">
      <!-- Student Dashboard -->
      <div v-if="!authStore.isLibrarian" class="student-dashboard">
        <div class="welcome-section">
          <div class="welcome-content">
            <h1 class="welcome-title">Welcome back, {{ authStore.currentUser?.full_name }}! 👋</h1>
            <p class="welcome-subtitle">Here's your library activity overview</p>
          </div>
          <router-link to="/books" class="btn btn-primary">
            📖 Browse Books
          </router-link>
        </div>

        <!-- Quick Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.activeBorrows }}</div>
              <div class="stat-label">Active Borrows</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔔</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.activeReservations }}</div>
              <div class="stat-label">Pending Reservations</div>
            </div>
          </div>
          <div class="stat-card warning">
            <div class="stat-icon">⏰</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.overdueBorrows }}</div>
              <div class="stat-label">Overdue Books</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.totalReturned }}</div>
              <div class="stat-label">Total Returned</div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="activity-section">
          <h2 class="section-title">📖 Recent Activity</h2>
          <div class="activity-cards">
            <div class="activity-card" v-if="recentBorrows.length > 0">
              <h3 class="activity-card-title">Currently Borrowed</h3>
              <div class="activity-list">
                <div v-for="borrow in recentBorrows.slice(0, 3)" :key="borrow.id" class="activity-item">
                  <div class="book-icon-small">📕</div>
                  <div class="activity-details">
                    <div class="book-title-small">{{ borrow.book_title }}</div>
                    <div class="book-meta">Due: {{ formatDate(borrow.due_date) }}</div>
                  </div>
                  <span v-if="isOverdue(borrow.due_date)" class="badge badge-danger">Overdue</span>
                  <span v-else class="badge badge-success">Active</span>
                </div>
              </div>
              <router-link to="/my-borrows" class="view-all-link">View all borrows →</router-link>
            </div>

            <div class="activity-card" v-if="recentReservations.length > 0">
              <h3 class="activity-card-title">Your Reservations</h3>
              <div class="activity-list">
                <div v-for="reservation in recentReservations.slice(0, 3)" :key="reservation.id" class="activity-item">
                  <div class="book-icon-small">📗</div>
                  <div class="activity-details">
                    <div class="book-title-small">{{ reservation.book_title }}</div>
                    <div class="book-meta">Reserved {{ formatDate(reservation.created_at) }}</div>
                  </div>
                  <span :class="['badge', reservation.notified ? 'badge-success' : 'badge-warning']">
                    {{ reservation.notified ? 'Notified' : 'Pending' }}
                  </span>
                </div>
              </div>
              <router-link to="/reservations" class="view-all-link">View all reservations →</router-link>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="recentBorrows.length === 0 && recentReservations.length === 0" class="empty-state">
            <div class="empty-icon">📚</div>
            <h3>No Activity Yet</h3>
            <p>Start browsing books to see your activity here</p>
            <router-link to="/books" class="btn btn-primary mt-3">Browse Books</router-link>
          </div>
        </div>
      </div>

      <!-- Librarian Dashboard -->
      <div v-else class="librarian-dashboard">
        <div class="welcome-section">
          <div class="welcome-content">
            <h1 class="welcome-title">Library Management 📊</h1>
            <p class="welcome-subtitle">{{ authStore.currentUser?.full_name }} • {{ authStore.currentUser?.role }}</p>
          </div>
          <router-link to="/books" class="btn btn-primary">
            + Add New Book
          </router-link>
        </div>

        <!-- Admin Stats -->
        <div class="stats-grid">
          <div class="stat-card primary">
            <div class="stat-icon">📚</div>
            <div class="stat-info">
              <div class="stat-value">{{ adminStats.totalBooks }}</div>
              <div class="stat-label">Total Books</div>
            </div>
          </div>
          <div class="stat-card success">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <div class="stat-value">{{ adminStats.totalUsers }}</div>
              <div class="stat-label">Active Users</div>
            </div>
          </div>
          <div class="stat-card info">
            <div class="stat-icon">🔄</div>
            <div class="stat-info">
              <div class="stat-value">{{ adminStats.activeBorrows }}</div>
              <div class="stat-label">Active Borrows</div>
            </div>
          </div>
          <div class="stat-card warning">
            <div class="stat-icon">⚠️</div>
            <div class="stat-info">
              <div class="stat-value">{{ adminStats.overdueBooks }}</div>
              <div class="stat-label">Overdue Books</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2 class="section-title">⚡ Quick Actions</h2>
          <div class="action-grid">
            <router-link to="/books" class="action-card">
              <div class="action-icon">📖</div>
              <div class="action-title">Manage Books</div>
              <div class="action-desc">Add, edit, or remove books</div>
            </router-link>
            <router-link to="/users" class="action-card">
              <div class="action-icon">👥</div>
              <div class="action-title">Manage Users</div>
              <div class="action-desc">View and manage user accounts</div>
            </router-link>
            <router-link to="/my-borrows" class="action-card">
              <div class="action-icon">📋</div>
              <div class="action-title">View All Borrows</div>
              <div class="action-desc">Track all borrowing activity</div>
            </router-link>
            <router-link to="/reservations" class="action-card">
              <div class="action-icon">🔔</div>
              <div class="action-title">Reservations</div>
              <div class="action-desc">Manage book reservations</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'

export default {
  name: 'Dashboard',
  setup() {
    const authStore = useAuthStore()
    const stats = ref({
      activeBorrows: 0,
      activeReservations: 0,
      overdueBorrows: 0,
      totalReturned: 0
    })

    const adminStats = ref({
      totalBooks: 0,
      totalUsers: 0,
      activeBorrows: 0,
      overdueBooks: 0
    })

    const recentBorrows = ref([])
    const recentReservations = ref([])

    const loadStudentData = async () => {
      try {
        console.log('Loading student dashboard data...')
        // Load borrows
        const borrows = await api.getMyBorrows()
        console.log('Student borrows loaded:', borrows.length)
        recentBorrows.value = borrows.filter(b => !b.returned_at)
        
        stats.value.activeBorrows = borrows.filter(b => !b.returned_at).length
        stats.value.overdueBorrows = borrows.filter(b => !b.returned_at && isOverdue(b.due_date)).length
        stats.value.totalReturned = borrows.filter(b => b.returned_at).length

        // Load reservations
        const reservationsData = await api.getReservations({ page: 1, page_size: 10 })
        console.log('Student reservations loaded:', reservationsData)
        recentReservations.value = reservationsData.items || []
        stats.value.activeReservations = reservationsData.items?.length || 0
      } catch (err) {
        console.error('Failed to load student data:', err)
      }
    }

    const loadLibrarianData = async () => {
      try {
        console.log('Loading librarian dashboard data...')
        // Load books
        const books = await api.getBooks()
        adminStats.value.totalBooks = books.length
        console.log('Books loaded:', books.length)

        // Load users (if accessible)
        try {
          const users = await api.getUsers()
          adminStats.value.totalUsers = users.filter(u => u.is_active).length
          console.log('Users loaded:', users.length)
        } catch (err) {
          console.log('User count not available:', err.message)
        }

        // Load all borrows for stats (librarians can see all borrows)
        try {
          const borrows = await api.getAllBorrows()
          adminStats.value.activeBorrows = borrows.filter(b => !b.returned_at).length
          adminStats.value.overdueBooks = borrows.filter(b => !b.returned_at && isOverdue(b.due_date)).length
          console.log('All borrows loaded:', borrows.length)
        } catch (err) {
          console.log('Borrows count not available:', err.message)
        }
      } catch (err) {
        console.error('Failed to load librarian data:', err)
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }

    const isOverdue = (dueDate) => {
      return new Date(dueDate) < new Date()
    }

    onMounted(() => {
      console.log('Dashboard mounted. User role:', authStore.currentUser?.role, 'isLibrarian:', authStore.isLibrarian)
      if (authStore.isLibrarian) {
        loadLibrarianData()
      } else {
        loadStudentData()
      }
    })

    return {
      authStore,
      stats,
      adminStats,
      recentBorrows,
      recentReservations,
      formatDate,
      isOverdue
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  padding: 40px 0;
  min-height: calc(100vh - 70px);
  background: var(--bg-light);
}

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: white;
  padding: 32px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.welcome-content {
  flex: 1;
}

.welcome-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.welcome-subtitle {
  font-size: 16px;
  color: var(--text-light);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: var(--transition);
  border: 2px solid transparent;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.stat-card.warning {
  border-color: rgba(243, 156, 18, 0.3);
  background: rgba(243, 156, 18, 0.05);
}

.stat-card.primary {
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.05);
}

.stat-card.success {
  border-color: rgba(80, 200, 120, 0.3);
  background: rgba(80, 200, 120, 0.05);
}

.stat-card.info {
  border-color: rgba(52, 152, 219, 0.3);
  background: rgba(52, 152, 219, 0.05);
}

.stat-icon {
  font-size: 48px;
  line-height: 1;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-light);
  font-weight: 500;
}

.activity-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text-dark);
}

.activity-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.activity-card {
  background: white;
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.activity-card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-dark);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-light);
  border-radius: var(--radius-md);
}

.book-icon-small {
  font-size: 28px;
}

.activity-details {
  flex: 1;
}

.book-title-small {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.book-meta {
  font-size: 13px;
  color: var(--text-light);
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: var(--transition);
}

.view-all-link:hover {
  color: var(--primary-dark);
  gap: 6px;
}

.empty-state {
  text-align: center;
  padding: 60px 40px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-dark);
}

.empty-state p {
  color: var(--text-light);
  font-size: 16px;
  margin-bottom: 24px;
}

/* Librarian Dashboard */
.quick-actions {
  margin-top: 32px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.action-card {
  background: white;
  padding: 28px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  text-decoration: none;
  transition: var(--transition);
  border: 2px solid transparent;
  display: block;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.action-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.action-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.action-desc {
  font-size: 14px;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .welcome-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .welcome-section .btn {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .activity-cards {
    grid-template-columns: 1fr;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .welcome-title {
    font-size: 24px;
  }
}
</style>
