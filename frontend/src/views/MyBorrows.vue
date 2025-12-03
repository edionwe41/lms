<template>
  <div class="borrows-page">
    <div class="container">
      <h1 class="page-title">My Borrowed Books</h1>

      <!-- Loading State -->
      <div v-if="loading" class="spinner"></div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error">{{ error }}</div>

      <!-- Borrows List -->
      <div v-else-if="borrows.length > 0" class="card">
        <table class="table">
          <thead>
            <tr>
              <th>Book Details</th>
              <th>Borrowed At</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Late Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="borrow in borrows" :key="borrow.id">
              <td>
                <div><strong>{{ borrow.book_title }}</strong></div>
                <div class="text-light" style="font-size: 12px;">by {{ borrow.book_author }}</div>
                <div class="text-light" style="font-size: 11px;">ISBN: {{ borrow.book_isbn }}</div>
              </td>
              <td>{{ formatDate(borrow.borrowed_at) }}</td>
              <td>{{ formatDate(borrow.due_date) }}</td>
              <td>
                <span v-if="borrow.returned_at" class="badge badge-success">
                  Returned
                </span>
                <span v-else-if="isOverdue(borrow.due_date)" class="badge badge-danger">
                  Overdue
                </span>
                <span v-else class="badge badge-primary">
                  Active
                </span>
              </td>
              <td>₦{{ borrow.fee_applied || 0 }}</td>
              <td>
                <button 
                  v-if="!borrow.returned_at"
                  @click="returnBook(borrow.id)"
                  class="btn btn-success btn-sm"
                >
                  Return
                </button>
                <span v-else class="text-light" style="font-size: 12px;">
                  {{ formatDate(borrow.returned_at) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="card text-center">
        <p>You haven't borrowed any books yet.</p>
        <router-link to="/books" class="btn btn-primary mt-2">Browse Books</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { showToast } from '../components/Toast.vue'

export default {
  name: 'MyBorrows',
  setup() {
    const borrows = ref([])
    const loading = ref(false)
    const error = ref('')

    const loadBorrows = async () => {
      loading.value = true
      error.value = ''
      
      try {
        borrows.value = await api.getMyBorrows()
      } catch (err) {
        error.value = 'Failed to load borrows'
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
      borrows,
      loading,
      error,
      returnBook,
      formatDate,
      isOverdue
    }
  }
}
</script>

<style scoped>
.borrows-page {
  padding: 30px 0;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
}
</style>
