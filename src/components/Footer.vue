<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const base = import.meta.env.BASE_URL
const year = new Date().getFullYear()

const links = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О станции' },
  { to: '/research', label: 'Исследования' },
  { to: '/photo', label: 'Фотогалерея' },
  { to: '/contacts', label: 'Контакты' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <img :src="`${base}img/logo.png`" alt="Логотип" class="footer__logo" />
        <p class="footer__desc">
          Лизиметрическая станция почвенного стационара МГУ
        </p>
      </div>

      <nav class="footer__nav">
        <h3 class="footer__heading">Навигация</h3>
        <ul class="footer__list">
          <li v-for="link in links" :key="link.to">
            <router-link
              :to="link.to"
              class="footer__link"
              :class="{ 'footer__link--active': route.path === link.to }"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="footer__info">
        <h3 class="footer__heading">Контакты</h3>
        <p class="footer__text">Москва, МГУ имени М.В. Ломоносова</p>
        <p class="footer__text">Факультет почвоведения</p>
      </div>
    </div>

    <div class="footer__bottom">
      <p>© {{ year }} Лизиметрическая станция МГУ</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.footer {
  background: $color-primary-dark;
  color: rgba(#fff, 0.85);
  padding: 3rem 0 0;
  margin-top: auto;

  &__inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 2.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (max-width: 768px) {
      align-items: center;
    }
  }

  &__logo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  &__desc {
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.8;
    max-width: 280px;

    @media (max-width: 768px) {
      max-width: none;
    }
  }

  &__heading {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #fff;
  }

  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  &__link {
    color: rgba(#fff, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color $transition-fast, padding-left $transition-fast;

    &:hover,
    &--active {
      color: #fff;
      padding-left: 4px;
    }
  }

  &__text {
    font-size: 0.9rem;
    line-height: 1.6;
    opacity: 0.75;
    margin: 0;
  }

  &__bottom {
    margin-top: 2.5rem;
    padding: 1.25rem 1.5rem;
    text-align: center;
    border-top: 1px solid rgba(#fff, 0.12);
    font-size: 0.85rem;
    opacity: 0.6;
  }
}
</style>
