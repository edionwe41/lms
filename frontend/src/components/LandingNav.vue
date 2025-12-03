<template>
  <nav class="landing-nav">
    <div class="container">
      <div class="nav-content">
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-icon">📚</span>
            <span class="brand-text">Library MS</span>
          </router-link>
        </div>

        <div class="nav-menu" :class="{ 'is-active': menuOpen }">
          <a href="#features" class="nav-item" @click="closeMenu">Features</a>
          <a href="#benefits" class="nav-item" @click="closeMenu">Benefits</a>
          <div class="nav-actions">
            <router-link to="/login" class="btn-nav btn-ghost" @click="closeMenu">
              Sign In
            </router-link>
            <router-link to="/register" class="btn-nav btn-primary" @click="closeMenu">
              Get Started
            </router-link>
          </div>
        </div>

        <button class="mobile-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger-icon" :class="{ 'is-active': menuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LandingNav',
  setup() {
    const menuOpen = ref(false)

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    return {
      menuOpen,
      toggleMenu,
      closeMenu
    }
  }
}
</script>

<style scoped>
.landing-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  position: relative;
}

.nav-brand {
  z-index: 1001;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
  transition: transform 0.2s ease;
}

.brand-link:hover {
  transform: scale(1.05);
}

.brand-icon {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.brand-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-item {
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  padding: 8px 4px;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #667eea;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-nav {
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: inline-block;
}

.btn-ghost {
  color: var(--text-dark);
  border-color: var(--border-color);
}

.btn-ghost:hover {
  border-color: #667eea;
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.hamburger-icon {
  display: block;
  width: 26px;
  height: 20px;
  position: relative;
}

.hamburger-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: var(--text-dark);
  border-radius: 3px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.hamburger-icon span:nth-child(1) {
  top: 0;
}

.hamburger-icon span:nth-child(2) {
  top: 8px;
}

.hamburger-icon span:nth-child(3) {
  top: 16px;
}

.hamburger-icon.is-active span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.hamburger-icon.is-active span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.hamburger-icon.is-active span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    background: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 30px 30px;
    gap: 24px;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .nav-menu.is-active {
    transform: translateX(0);
  }

  .nav-item {
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
  }

  .nav-actions {
    flex-direction: column;
    width: 100%;
    gap: 12px;
    margin-top: 12px;
  }

  .btn-nav {
    width: 100%;
    text-align: center;
    padding: 12px 24px;
  }
}
</style>
