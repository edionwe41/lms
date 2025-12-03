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

      <!-- Search Bar -->
      <div class="search-bar">
        <input 
          v-model="searchQuery" 
          @input="handleSearch"
          type="text" 
          placeholder="Search by title, author, or ISBN..." 
          class="form-input"
        />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="spinner"></div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-error">{{ error }}</div>

      <!-- Books Grid -->
      <div v-else-if="books.length > 0" class="grid grid-3">
        <div v-for="book in books" :key="book.id" class="book-card card">
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">by {{ book.author }}</p>
          <p class="book-isbn">ISBN: {{ book.isbn }}</p>
          <p class="book-description" v-if="book.description">{{ book.description }}</p>
          
          <div class="book-availability">
            <span :class="['badge', book.available_copies > 0 ? 'badge-success' : 'badge-danger']">
              {{ book.available_copies }} / {{ book.total_copies }} available
            </span>
          </div>

          <div class="book-actions mt-2 flex gap-1">
            <button 
              v-if="book.available_copies > 0" 
              @click="borrowBook(book.id)"
              class="btn btn-primary btn-sm"
            >
              Borrow
            </button>
            <button 
              v-else 
              @click="reserveBook(book.id)"
              class="btn btn-secondary btn-sm"
            >
              Reserve
            </button>
            
            <button 
              v-if="authStore.isLibrarian" 
              @click="editBook(book)"
              class="btn btn-secondary btn-sm"
            >
              Edit
            </button>
            
            <button 
              v-if="authStore.isLibrarian" 
              @click="deleteBook(book)"
              class="btn btn-danger btn-sm"
            >
              Delete
            </button>
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

    const borrowBook = async (bookId) => {
      try {
        await api.borrowBook(bookId)
        alert('Book borrowed successfully!')
        loadBooks(searchQuery.value)
      } catch (err) {
        alert(err.response?.data?.detail || 'Failed to borrow book')
      }
    }

    const reserveBook = async (bookId) => {
      try {
        await api.createReservation(bookId)
        alert('Book reserved successfully!')
      } catch (err) {
        alert(err.response?.data?.detail || 'Failed to reserve book')
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
        alert('Book deleted successfully!')
        loadBooks(searchQuery.value)
      } catch (err) {
        alert(err.response?.data?.detail || 'Failed to delete book')
      }
    }

    const handleSubmit = async () => {
      modalError.value = ''
      submitting.value = true

      try {
        if (showEditModal.value) {
          await api.updateBook(currentBook.value.id, bookForm.value)
          alert('Book updated successfully!')
        } else {
          await api.addBook(bookForm.value)
          alert('Book added successfully!')
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
  padding: 30px 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
}

.book-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.book-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-dark);
}

.book-author {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 8px;
}

.book-isbn {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 12px;
}

.book-description {
  font-size: 14px;
  color: var(--text-dark);
  margin-bottom: 12px;
  flex-grow: 1;
  line-height: 1.5;
}

.book-availability {
  margin-bottom: 12px;
}

.book-actions {
  margin-top: auto;
  flex-wrap: wrap;
}
</style>
