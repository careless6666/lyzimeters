<script setup lang="ts">
import { ref } from 'vue'

const base = import.meta.env.BASE_URL
const isMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О лизиметрах' },
  { to: '/research', label: 'Исследования' },
  { to: '/photo', label: 'Фото' },
  { to: '/contacts', label: 'Контакты' },
]

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="nav">
    <div class="nav__inner">
      <router-link to="/" class="nav__logo" @click="closeMenu">
        <img :src="`${base}img/logo.png`" alt="Логотип" class="nav__logo-img" />
        <span class="nav__logo-text">Лизиметрическая станция МГУ</span>
      </router-link>

      <button
        class="nav__toggle"
        :class="{ 'is-open': isMenuOpen }"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="nav__links" :class="{ 'is-open': isMenuOpen }">
        <li v-for="link in navLinks" :key="link.to">
          <router-link
            :to="link.to"
            class="nav__link"
            active-class="nav__link--active"
            exact-active-class="nav__link--active"
            @click="closeMenu"
          >
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: $nav-height;
  background: linear-gradient(135deg, $nav-bg-start, $nav-bg-end);
  box-shadow: $shadow-md;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-sm;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;

    &-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    &-text {
      font-family: $font-title;
      font-size: 1.15rem;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;

    li {
      margin: 0;
    }
  }

  &__link {
    display: block;
    padding: 0.5rem 1rem;
    font-family: $font-body;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    border-radius: $radius-sm;
    transition: all 0.2s ease;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.15);
    }

    &--active {
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }
  }

  &__toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 101;

    span {
      display: block;
      height: 3px;
      width: 100%;
      background: #fff;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    &.is-open {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }
}

@media (max-width: $bp-tablet) {
  .nav {
    &__toggle {
      display: flex;
    }

    &__links {
      position: fixed;
      top: $nav-height;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      background: linear-gradient(135deg, $nav-bg-start, $nav-bg-end);
      padding: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;

      &.is-open {
        max-height: 400px;
        padding: $spacing-sm 0;
        box-shadow: $shadow-md;
      }

      li {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

    &__link {
      padding: $spacing-sm $spacing-md;
      border-radius: 0;
    }

    &__logo-text {
      font-size: 0.95rem;
    }
  }
}

@media (max-width: $bp-mobile) {
  .nav__logo-text {
    display: none;
  }
}
</style>
