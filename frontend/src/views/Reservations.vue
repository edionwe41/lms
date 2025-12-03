<template>
  <div class="reservations-page">
    <div class="container">
      <h1 class="page-title">Book Reservations</h1>

      <!-- Filters -->
      <div class="filters card mb-3">
        <div class="flex gap-2">
          <div class="form-group" style="flex: 1;">
            <label class="form-label">Filter by Book ID</label>
            <input 
              v-model.number="filters.book_id" 
              type="number" 
              placeholder="Enter book ID"
              class="form-input"
            />
          </div>
          <div class="form-group" style="flex: 1;">
            <label class="form-label">Page Size</label>
            <select v-model.number="filters.page_size" class="form-select">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
          <div style="display: flex; align-items: flex-end;">
            <button @click="loadReservations" class="btn btn-primary">Apply Filters</button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="spinner"></div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error">{{ error }}</div>

      <!-- Reservations List -->
      <div v-else-if="reservations.items && reservations.items.length > 0" class="card">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Book Details</th>
              <th>Reserved At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations.items" :key="reservation.id">
              <td>{{ reservation.id }}</td>
              <td>
                <div><strong>{{ reservation.username }}</strong></div>
                <div class="text-light" style="font-size: 12px;">{{ reservation.full_name }}</div>
              </td>
              <td>
                <div><strong>{{ reservation.book_title }}</strong></div>
                <div class="text-light" style="font-size: 12px;">by {{ reservation.book_author }}</div>
                <div class="text-light" style="font-size: 11px;">ISBN: {{ reservation.book_isbn }}</div>
              </td>
              <td>{{ formatDate(reservation.created_at) }}</td>
              <td>
                <span :class="['badge', reservation.notified ? 'badge-success' : 'badge-warning']">
                  {{ reservation.notified ? 'Notified' : 'Pending' }}
                </span>
              </td>
              <td>
                <button 
                  @click="cancelReservation(reservation.id)"
                  class="btn btn-danger btn-sm"
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination mt-3">
          <button 
            @click="changePage(reservations.page - 1)"
            :disabled="reservations.page <= 1"
            class="btn btn-secondary btn-sm"
          >
            Previous
          </button>
          <span class="pagination-info">
            Page {{ reservations.page }} ({{ reservations.total }} total)
          </span>
          <button 
            @click="changePage(reservations.page + 1)"
            :disabled="reservations.page * reservations.page_size >= reservations.total"
            class="btn btn-secondary btn-sm"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="card text-center">
        <p>No pending reservations found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { showToast } from '../components/Toast.vue'

export default {
  name: 'Reservations',
  setup() {
    const reservations = ref({
      items: [],
      page: 1,
      page_size: 50,
      total: 0
    })
    const loading = ref(false)
    const error = ref('')
    
    const filters = ref({
      book_id: null,
      page: 1,
      page_size: 50
    })

    const loadReservations = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const params = {
          page: filters.value.page,
          page_size: filters.value.page_size
        }
        
        if (filters.value.book_id) {
          params.book_id = filters.value.book_id
        }
        
        reservations.value = await api.getReservations(params)
      } catch (err) {
        error.value = 'Failed to load reservations'
      } finally {
        loading.value = false
      }
    }

    const cancelReservation = async (id) => {
      if (!confirm('Are you sure you want to cancel this reservation?')) return
      
      try {
        await api.cancelReservation(id)
        showToast('Reservation cancelled successfully!', 'success')
        loadReservations()
      } catch (err) {
        showToast(err.response?.data?.detail || 'Failed to cancel reservation', 'error')
      }
    }

    const changePage = (newPage) => {
      filters.value.page = newPage
      loadReservations()
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    onMounted(() => {
      loadReservations()
    })

    return {
      reservations,
      loading,
      error,
      filters,
      loadReservations,
      cancelReservation,
      changePage,
      formatDate
    }
  }
}
</script>

<style scoped>
.reservations-page {
  padding: 30px 0;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
}

.filters {
  background-color: white;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-info {
  font-size: 14px;
  color: var(--text-light);
}
</style>
