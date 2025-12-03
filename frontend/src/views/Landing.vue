<template>
  <div class="landing-container">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">📚 Library Management System</h1>
            <p class="hero-subtitle">Your complete solution for managing books, borrows, and reservations</p>
            
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">📖</div>
                <h3>Browse Books</h3>
                <p>Explore our extensive catalogue of books</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🔄</div>
                <h3>Easy Borrowing</h3>
                <p>Borrow and return books seamlessly</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🔔</div>
                <h3>Real-time Updates</h3>
                <p>Get instant notifications on your activity</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📅</div>
                <h3>Reservations</h3>
                <p>Reserve books when they're unavailable</p>
              </div>
            </div>

            <div class="cta-buttons">
              <router-link to="/login" class="btn btn-primary btn-lg">
                Sign In
              </router-link>
              <router-link to="/register" class="btn btn-secondary btn-lg">
                Create Account
              </router-link>
            </div>
          </div>

          <div class="hero-image">
            <div class="book-illustration">
              <div class="book-stack">
                <div class="book book-1">📗</div>
                <div class="book book-2">📘</div>
                <div class="book book-3">📕</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-section">
      <div class="container">
        <h2 class="section-title">Why Choose Our Library System?</h2>
        
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">⚡</div>
            <h3>Fast & Efficient</h3>
            <p>Quick book searches and instant borrowing process</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your data is protected with industry-standard security</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📱</div>
            <h3>Accessible</h3>
            <p>Access from any device, anywhere, anytime</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🎯</div>
            <h3>User-Friendly</h3>
            <p>Intuitive interface designed for everyone</p>
          </div>
        </div>

        <div class="final-cta">
          <h3>Ready to get started?</h3>
          <p>Join thousands of users managing their library efficiently</p>
          <router-link to="/register" class="btn btn-primary btn-lg">
            Get Started Now
          </router-link>
        </div>
      </div>
    </div>

    <footer class="landing-footer">
      <div class="container">
        <p>&copy; 2025 Library Management System. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: white;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px 100px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.05)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
  background-size: cover;
  opacity: 0.5;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.95;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.feature-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.feature-item h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-item p {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.5;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-lg {
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
}

.btn-secondary {
  background-color: white;
  color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
}

.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-illustration {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-stack {
  position: relative;
  transform: perspective(1000px) rotateY(-15deg);
  animation: float 3s ease-in-out infinite;
}

.book {
  font-size: 120px;
  position: absolute;
  transition: transform 0.3s ease;
}

.book-1 {
  transform: translateX(-30px) translateY(20px) rotate(-5deg);
  animation: bookFloat1 4s ease-in-out infinite;
}

.book-2 {
  transform: translateX(0) translateY(0);
  animation: bookFloat2 4s ease-in-out infinite 0.5s;
}

.book-3 {
  transform: translateX(30px) translateY(-20px) rotate(5deg);
  animation: bookFloat3 4s ease-in-out infinite 1s;
}

@keyframes float {
  0%, 100% { transform: perspective(1000px) rotateY(-15deg) translateY(0); }
  50% { transform: perspective(1000px) rotateY(-15deg) translateY(-20px); }
}

@keyframes bookFloat1 {
  0%, 100% { transform: translateX(-30px) translateY(20px) rotate(-5deg); }
  50% { transform: translateX(-30px) translateY(0px) rotate(-5deg); }
}

@keyframes bookFloat2 {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(0) translateY(-15px); }
}

@keyframes bookFloat3 {
  0%, 100% { transform: translateX(30px) translateY(-20px) rotate(5deg); }
  50% { transform: translateX(30px) translateY(-35px) rotate(5deg); }
}

.info-section {
  padding: 80px 20px;
  background: var(--bg-light);
}

.section-title {
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 50px;
  color: var(--text-dark);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.benefit-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.benefit-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.benefit-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-dark);
}

.benefit-card p {
  color: var(--text-light);
  line-height: 1.6;
}

.final-cta {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: var(--shadow-lg);
}

.final-cta h3 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-dark);
}

.final-cta p {
  font-size: 18px;
  color: var(--text-light);
  margin-bottom: 32px;
}

.landing-footer {
  background: var(--text-dark);
  color: white;
  padding: 24px 20px;
  text-align: center;
}

.landing-footer p {
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .hero-image {
    order: -1;
  }

  .book-illustration {
    width: 200px;
    height: 200px;
  }

  .book {
    font-size: 80px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 28px;
  }

  .final-cta h3 {
    font-size: 24px;
  }
}
</style>
