<template>
  <div class="borrows-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">{{ authStore.isLibrarian ? 'All Borrowed Books' : 'My Borrowed Books' }}</h1>
        <div class="summary-stats" v-if="borrows.length > 0">
          <div class="stat-item">
            <span class="stat-value">{{ activeCount }}</span>
            <span class="stat-label">Active</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ overdueCount }}</span>
            <span class="stat-label">Overdue</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ returnedCount }}</span>
            <span class="stat-label">Returned</span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="spinner"></div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error">{{ error }}</div>

      <!-- Desktop Table View -->
      <div v-else-if="borrows.length > 0" class="card desktop-view">
        <table class="table">
          <thead>
            <tr>
              <th v-if="authStore.isLibrarian">Borrower</th>
              <th>Book Details</th>
              <th>Borrowed At</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Late Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="borrow in borrows" :key="borrow.id" :class="{ 'overdue-row': !borrow.returned_at && isOverdue(borrow.due_date) }">
              <td v-if="authStore.isLibrarian">
                <div class="user-info-cell">
                  <div class="user-name-cell"><strong>{{ borrow.user_name }}</strong></div>
                  <div class="user-username-cell">@{{ borrow.username }}</div>
                </div>
              </td>
              <td>
                <div class="book-info">
                  <div class="book-title-cell"><strong>{{ borrow.book_title }}</strong></div>
                  <div class="book-author-cell">by {{ borrow.book_author }}</div>
                  <div class="book-isbn-cell">ISBN: {{ borrow.book_isbn }}</div>
                </div>
              </td>
              <td>
                <div class="date-cell">
                  <span class="date-icon">📅</span>
                  {{ formatDate(borrow.borrowed_at) }}
                </div>
              </td>
              <td>
                <div class="date-cell">
                  <span class="date-icon">⏰</span>
                  {{ formatDate(borrow.due_date) }}
                </div>
              </td>
              <td>
                <span v-if="borrow.returned_at" class="badge badge-success">
                  ✓ Returned
                </span>
                <span v-else-if="isOverdue(borrow.due_date)" class="badge badge-danger">
                  ⚠ Overdue
                </span>
                <span v-else class="badge badge-primary">
                  ⏳ Active
                </span>
              </td>
              <td>
                <span class="fee-amount" :class="{ 'has-fee': borrow.fee_applied > 0 }">
                  ₦{{ borrow.fee_applied || 0 }}
                </span>
              </td>
              <td>
                <button 
                  v-if="!borrow.returned_at"
                  @click="returnBook(borrow.id)"
                  class="btn btn-success btn-sm"
                >
                  Return Book
                </button>
                <span v-else class="returned-date">
                  {{ formatDate(borrow.returned_at) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div v-else-if="borrows.length > 0" class="mobile-view">
        <div v-for="borrow in borrows" :key="borrow.id" class="borrow-card card">
          <div class="card-header-mobile">
            <div class="book-icon-mobile">📖</div>
            <span v-if="borrow.returned_at" class="badge badge-success">
              ✓ Returned
            </span>
            <span v-else-if="isOverdue(borrow.due_date)" class="badge badge-danger">
              ⚠ Overdue
            </span>
            <span v-else class="badge badge-primary">
              ⏳ Active
            </span>
          </div>
          
          <div v-if="authStore.isLibrarian" class="mobile-user-info">
            <strong>👤 {{ borrow.user_name }}</strong>
            <span class="mobile-username">@{{ borrow.username }}</span>
          </div>
          
          <h3 class="mobile-book-title">{{ borrow.book_title }}</h3>
          <p class="mobile-book-author">by {{ borrow.book_author }}</p>
          <p class="mobile-book-isbn">ISBN: {{ borrow.book_isbn }}</p>
          
          <div class="mobile-dates">
            <div class="date-row">
              <span class="date-label">📅 Borrowed:</span>
              <span class="date-value">{{ formatDate(borrow.borrowed_at) }}</span>
            </div>
            <div class="date-row">
              <span class="date-label">⏰ Due:</span>
              <span class="date-value">{{ formatDate(borrow.due_date) }}</span>
            </div>
            <div class="date-row" v-if="borrow.returned_at">
              <span class="date-label">✓ Returned:</span>
              <span class="date-value">{{ formatDate(borrow.returned_at) }}</span>
            </div>
          </div>
          
          <div class="mobile-fee" v-if="borrow.fee_applied > 0">
            <span class="fee-label">Late Fee:</span>
            <span class="fee-value">₦{{ borrow.fee_applied }}</span>
          </div>
          
          <button 
            v-if="!borrow.returned_at"
            @click="returnBook(borrow.id)"
            class="btn btn-success btn-block mt-2"
          >
            Return Book
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state card">
        <div class="empty-icon">📚</div>
        <h3>No Borrowed Books</h3>
        <p>You haven't borrowed any books yet.</p>
        <router-link to="/books" class="btn btn-primary mt-3">Browse Books</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'
import { showToast } from '../components/Toast.vue'

export default {
  name: 'MyBorrows',
  setup() {
    const authStore = useAuthStore()
    const borrows = ref([])
    const loading = ref(false)
    const error = ref('')

    const activeCount = computed(() => 
      borrows.value.filter(b => !b.returned_at).length
    )
    
    const overdueCount = computed(() => 
      borrows.value.filter(b => !b.returned_at && isOverdue(b.due_date)).length
    )
    
    const returnedCount = computed(() => 
      borrows.value.filter(b => b.returned_at).length
    )

    const loadBorrows = async () => {
      loading.value = true
      error.value = ''
      
      try {
        // Librarians see all borrows, students see only their own
        if (authStore.isLibrarian.value) {
          borrows.value = await api.getAllBorrows()
        } else {
          borrows.value = await api.getMyBorrows()
        }
      } catch (err) {
        error.value = 'Failed to load borrows'
        console.error('Error loading borrows:', err)
      } finally {
        loading.value = false
      }
    }

    const returnBook = async (borrowId) => {
      if (!confirm('Are you sure you want to return this book?')) return
      
      try {
        await api.returnBook(borrowId)
        showToast('Book returned successfully!', 'success')
        loadBorrows()
      } catch (err) {
        showToast(err.response?.data?.detail || 'Failed to return book', 'error')
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const isOverdue = (dueDate) => {
      return new Date(dueDate) < new Date()
    }

    onMounted(() => {
      loadBorrows()
    })

    return {
      authStore,
      borrows,
      loading,
      error,
      activeCount,
      overdueCount,
      returnedCount,
      returnBook,
      formatDate,
      isOverdue
    }
  }
}
</script>

<style scoped>
.borrows-page {
  padding: 40px 0;
  min-height: calc(100vh - 70px);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 20px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-dark);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.summary-stats {
  display: flex;
  gap: 20px;
  background: white;
  padding: 16px 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 12px;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.desktop-view {
  display: block;
}

.mobile-view {
  display: none;
}

.overdue-row {
  background-color: rgba(231, 76, 60, 0.05) !important;
}

.book-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-info-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-name-cell {
  font-size: 14px;
  color: var(--text-dark);
}

.user-username-cell {
  font-size: 12px;
  color: var(--text-light);
}

.book-title-cell {
  font-size: 15px;
  color: var(--text-dark);
}

.book-author-cell {
  font-size: 13px;
  color: var(--text-light);
}

.book-isbn-cell {
  font-size: 11px;
  color: var(--text-muted);
  font-family: 'Courier New', monospace;
}

.date-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.date-icon {
  font-size: 16px;
}

.fee-amount {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-dark);
}

.fee-amount.has-fee {
  color: var(--danger-color);
}

.returned-date {
  font-size: 13px;
  color: var(--text-light);
}

.empty-state {
  text-align: center;
  padding: 60px 40px;
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

/* Mobile Card Styles */
.borrow-card {
  margin-bottom: 16px;
}

.card-header-mobile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-light);
}

.book-icon-mobile {
  font-size: 32px;
}

.mobile-user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  padding: 10px;
  background: var(--bg-light);
  border-radius: 8px;
}

.mobile-username {
  font-size: 12px;
  color: var(--text-light);
}

.mobile-book-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-dark);
}

.mobile-book-author {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 6px;
}

.mobile-book-isbn {
  font-size: 12px;
  color: var(--text-muted);
  font-family: 'Courier New', monospace;
  margin-bottom: 16px;
}

.mobile-dates {
  background: var(--bg-light);
  padding: 12px;
  border-radius: var(--radius-md);
  margin-bottom: 12px;
}

.date-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
}

.date-label {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 500;
}

.date-value {
  font-size: 13px;
  color: var(--text-dark);
  font-weight: 600;
}

.mobile-fee {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
}

.fee-label {
  font-size: 14px;
  color: var(--danger-color);
  font-weight: 600;
}

.fee-value {
  font-size: 16px;
  color: var(--danger-color);
  font-weight: 700;
}

@media (max-width: 968px) {
  .desktop-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-stats {
    width: 100%;
    justify-content: space-around;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }

  .summary-stats {
    gap: 12px;
    padding: 12px 16px;
  }

  .stat-value {
    font-size: 20px;
  }
}
</style>
