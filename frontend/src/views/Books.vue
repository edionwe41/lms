<template>
  <div class="books-page">
    <div class="container">
      <div class="page-header">
        <h1>Book Catalogue</h1>
        <button 
          v-if="authStore.isLibrarian" 
          @click="showAddModal = true" 
          class="btn btn-primary"
        >
          + Add Book
        </button>
      </div>

      <!-- Search and Filters -->
      <div class="search-section card mb-3">
        <div class="search-bar-enhanced">
          <div class="search-input-wrapper">
            <span class="search-icon">🔍</span>
            <input 
              v-model="searchQuery" 
              @input="handleSearch"
              type="text" 
              placeholder="Search by title, author, or ISBN..." 
              class="form-input search-input"
            />
            <button 
              v-if="searchQuery" 
              @click="clearSearch" 
              class="clear-btn"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="spinner"></div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error">{{ error }}</div>

      <!-- Books Grid -->
      <div v-else-if="books.length > 0" class="grid grid-3">
        <div v-for="book in books" :key="book.id" class="book-card card">
          <div class="book-header">
            <div class="book-icon">📖</div>
            <span :class="['availability-badge', book.available_copies > 0 ? 'available' : 'unavailable']">
              {{ book.available_copies > 0 ? 'Available' : 'Unavailable' }}
            </span>
          </div>
          
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">✍️ {{ book.author }}</p>
          <p class="book-isbn">📑 ISBN: {{ book.isbn }}</p>
          
          <p class="book-description" v-if="book.description">{{ book.description }}</p>
          
          <div class="book-availability">
            <div class="availability-indicator">
              <span class="availability-text">{{ book.available_copies }} of {{ book.total_copies }}</span>
              <div class="availability-bar">
                <div 
                  class="availability-fill" 
                  :style="{ width: `${(book.available_copies / book.total_copies) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>

          <div class="book-actions mt-2">
            <button 
              v-if="book.available_copies > 0 && !authStore.isLibrarian" 
              @click="borrowBook(book.id)"
              class="btn btn-primary btn-sm btn-block"
            >
              📚 Borrow Now
            </button>
            <button 
              v-else-if="!authStore.isLibrarian" 
              @click="reserveBook(book.id)"
              class="btn btn-secondary btn-sm btn-block"
            >
              🔔 Reserve Book
            </button>
            
            <div v-if="authStore.isLibrarian" class="librarian-actions">
              <button 
                @click="editBook(book)"
                class="btn btn-secondary btn-sm"
              >
                ✏️ Edit
              </button>
              <button 
                @click="deleteBook(book)"
                class="btn btn-danger btn-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="card text-center">
        <p>No books found.</p>
      </div>
    </div>

    <!-- Add/Edit Book Modal -->
    <div v-if="showAddModal || showEditModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">{{ showEditModal ? 'Edit Book' : 'Add New Book' }}</h3>
          <button @click="closeModal" class="modal-close">&times;</button>
        </div>

        <form @submit.prevent="handleSubmit">
          <div v-if="modalError" class="alert alert-error">{{ modalError }}</div>

          <div class="form-group">
            <label class="form-label">Title *</label>
            <input v-model="bookForm.title" type="text" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Author *</label>
            <input v-model="bookForm.author" type="text" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">ISBN *</label>
            <input 
              v-model="bookForm.isbn" 
              type="text" 
              class="form-input" 
              :disabled="showEditModal"
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">Total Copies *</label>
            <input 
              v-model.number="bookForm.total_copies" 
              type="number" 
              min="1"
              class="form-input" 
              required 
            />
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea v-model="bookForm.description" class="form-textarea"></textarea>
          </div>

          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              {{ submitting ? 'Saving...' : 'Save' }}
            </button>
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'
import { showToast } from '../components/Toast.vue'

export default {
  name: 'Books',
  setup() {
    const authStore = useAuthStore()
    
    const books = ref([])
    const loading = ref(false)
    const error = ref('')
    const searchQuery = ref('')
    
    const showAddModal = ref(false)
    const showEditModal = ref(false)
    const modalError = ref('')
    const submitting = ref(false)
    const currentBook = ref(null)
    
    const bookForm = ref({
      title: '',
      author: '',
      isbn: '',
      total_copies: 1,
      description: ''
    })

    const loadBooks = async (query = '') => {
      loading.value = true
      error.value = ''
      
      try {
        books.value = await api.getBooks(query)
      } catch (err) {
        error.value = 'Failed to load books'
      } finally {
        loading.value = false
      }
    }

    let searchTimeout
    const handleSearch = () => {
      clearTimeout(searchTimeout)
      searchTimeout = setTimeout(() => {
        loadBooks(searchQuery.value)
      }, 300)
    }

    const clearSearch = () => {
      searchQuery.value = ''
      loadBooks('')
    }

    const borrowBook = async (bookId) => {
      try {
        await api.borrowBook(bookId)
        showToast('Book borrowed successfully!', 'success')
        loadBooks(searchQuery.value)
      } catch (err) {
        showToast(err.response?.data?.detail || 'Failed to borrow book', 'error')
      }
    }

    const reserveBook = async (bookId) => {
      try {
        await api.createReservation(bookId)
        showToast('Book reserved successfully!', 'success')
      } catch (err) {
        showToast(err.response?.data?.detail || 'Failed to reserve book', 'error')
      }
    }

    const editBook = (book) => {
      currentBook.value = book
      bookForm.value = {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        total_copies: book.total_copies,
        description: book.description || ''
      }
      showEditModal.value = true
    }

    const deleteBook = async (book) => {
      if (!confirm(`Are you sure you want to delete "${book.title}"?`)) return
      
      try {
        await api.deleteBook(book.isbn)
        showToast('Book deleted successfully!', 'success')
        loadBooks(searchQuery.value)
      } catch (err) {
        showToast(err.response?.data?.detail || 'Failed to delete book', 'error')
      }
    }

    const handleSubmit = async () => {
      modalError.value = ''
      submitting.value = true

      try {
        if (showEditModal.value) {
          await api.updateBook(currentBook.value.id, bookForm.value)
          showToast('Book updated successfully!', 'success')
        } else {
          await api.addBook(bookForm.value)
          showToast('Book added successfully!', 'success')
        }
        
        closeModal()
        loadBooks(searchQuery.value)
      } catch (err) {
        modalError.value = err.response?.data?.detail || 'Failed to save book'
      } finally {
        submitting.value = false
      }
    }

    const closeModal = () => {
      showAddModal.value = false
      showEditModal.value = false
      modalError.value = ''
      currentBook.value = null
      bookForm.value = {
        title: '',
        author: '',
        isbn: '',
        total_copies: 1,
        description: ''
      }
    }

    onMounted(() => {
      loadBooks()
    })

    return {
      authStore,
      books,
      loading,
      error,
      searchQuery,
      showAddModal,
      showEditModal,
      modalError,
      submitting,
      bookForm,
      handleSearch,
      clearSearch,
      borrowBook,
      reserveBook,
      editBook,
      deleteBook,
      handleSubmit,
      closeModal
    }
  }
}
</script>

<style scoped>
.books-page {
  padding: 40px 0;
  min-height: calc(100vh - 70px);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-dark);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.search-section {
  background: white;
  padding: 24px;
  margin-bottom: 32px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.search-bar-enhanced {
  width: 100%;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  font-size: 20px;
  pointer-events: none;
  opacity: 0.5;
}

.search-input {
  padding-left: 50px !important;
  padding-right: 44px !important;
  font-size: 15px;
  height: 50px;
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-color);
  transition: var(--transition);
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.clear-btn {
  position: absolute;
  right: 14px;
  background: var(--bg-light);
  border: none;
  color: var(--text-light);
  cursor: pointer;
  font-size: 18px;
  padding: 6px 10px;
  border-radius: 6px;
  transition: var(--transition);
  font-weight: 700;
}

.clear-btn:hover {
  background: var(--danger-color);
  color: white;
}

.book-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: linear-gradient(to bottom, white 0%, #fafbfc 100%);
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.book-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-light);
}

.book-icon {
  font-size: 36px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.availability-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.availability-badge.available {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
  border: 1px solid #b1dfbb;
}

.availability-badge.unavailable {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  color: #721c24;
  border: 1px solid #f1b0b7;
}

.book-title {
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-dark);
  line-height: 1.4;
  min-height: 52px;
}

.book-author {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 8px;
  font-weight: 500;
}

.book-isbn {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 14px;
  font-family: 'Courier New', monospace;
}

.book-description {
  font-size: 14px;
  color: var(--text-dark);
  margin-bottom: 16px;
  flex-grow: 1;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-availability {
  margin-bottom: 18px;
  padding: 14px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: var(--radius-md);
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.availability-indicator {
  width: 100%;
}

.availability-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
  display: block;
}

.availability-bar {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.availability-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
  border-radius: 4px;
  transition: width 0.4s ease;
  box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
}

.book-actions {
  margin-top: auto;
}

.btn-block {
  width: 100%;
  justify-content: center;
}

.librarian-actions {
  display: flex;
  gap: 8px;
}

.librarian-actions .btn {
  flex: 1;
}

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
