<template>
  <div class="landing-container">
    <LandingNav />
    <div class="hero-section" id="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="star-icon">⭐</span>
            <span>Trusted by students, librarians & administrators</span>
          </div>
          
          <h1 class="hero-title">
            Turn Book Management Into<br>
            <span class="gradient-text">Seamless Experiences</span>
          </h1>
          
          <p class="hero-subtitle">
            Hand-picked features for library management, student engagement,<br>
            and efficient operations — organize, track, and manage with confidence.
          </p>

          <button @click="goToRegister" class="hero-cta">
            Get started for free
            <span class="arrow">→</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section" id="features">
      <div class="container">
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
      </div>
    </div>

    <div class="info-section" id="benefits">
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
          <button @click="goToRegister" class="btn btn-primary btn-lg">
            Get Started Now
          </button>
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
import { useRouter } from 'vue-router'
import LandingNav from '../components/LandingNav.vue'

export default {
  name: 'Landing',
  components: {
    LandingNav
  },
  setup() {
    const router = useRouter()

    const goToLogin = () => {
      router.push('/login')
    }

    const goToRegister = () => {
      router.push('/register')
    }

    return {
      goToLogin,
      goToRegister
    }
  }
}
</script>

<style scoped>
.landing-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #e8ebff 0%, #f5f7ff 50%, #ffffff 100%);
  padding-top: 70px; /* Account for fixed nav */
}

.hero-section {
  padding: 80px 20px 120px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  color: #3730a3;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.star-icon {
  font-size: 16px;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero-subtitle {
  font-size: 18px;
  line-height: 1.7;
  color: #6b7280;
  max-width: 720px;
  margin: 0;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 16px 32px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
}

.arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.hero-cta:hover .arrow {
  transform: translateX(4px);
}

/* Features Section */
.features-section {
  padding: 60px 20px;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  background: white;
  padding: 32px 24px;
  border-radius: 16px;
  border: 2px solid var(--border-light);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-item h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-dark);
}

.feature-item p {
  font-size: 15px;
  color: var(--text-light);
  line-height: 1.6;
  margin: 0;
}

.info-section {
  padding: 80px 20px;
  background: var(--bg-light);
}

.section-title {
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 50px;
  color: var(--text-dark);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.benefit-card {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.benefit-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.benefit-card h3 {
  font-size: 20px;
  font-weight: 700;
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
  max-width: 800px;
  margin: 0 auto;
}

.final-cta h3 {
  font-size: 32px;
  font-weight: 700;
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
  .hero-title {
    font-size: 42px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-subtitle br {
    display: none;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 32px;
  }

  .final-cta h3 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-badge {
    font-size: 12px;
    padding: 10px 20px;
  }

  .hero-cta {
    font-size: 14px;
    padding: 14px 28px;
  }
}
</style>
