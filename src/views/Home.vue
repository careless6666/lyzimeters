<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const base = import.meta.env.BASE_URL
const heroBg = `${base}img/grass.jpg`

// Count-up animation for stats
const stats = [
  { target: 60, suffix: '+', label: 'лет исследований' },
  { target: 6, suffix: '', label: 'направлений работы' },
  { target: 1960, suffix: '', label: 'год основания' },
]

const animatedStats = ref(stats.map(() => 0))

function animateStats() {
  stats.forEach((stat, i) => {
    const duration = 1500
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out-quad
      const eased = 1 - (1 - progress) * (1 - progress)
      animatedStats.value[i] = Math.round(stat.target * eased)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

let statsTriggered = false
function checkStatsVisibility() {
  if (statsTriggered) return
  const el = document.querySelector('.stats')
  if (el) {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.85) {
      statsTriggered = true
      animateStats()
      window.removeEventListener('scroll', checkStatsVisibility)
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkStatsVisibility, { passive: true })
  checkStatsVisibility()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkStatsVisibility)
})
</script>

<template>
  <section class="hero" :style="{ backgroundImage: `url(${heroBg})` }">
    <div class="hero__overlay">
      <div class="hero__content">
        <h1 class="hero__title hero-anim" style="animation-delay: 0.1s">
          Лизиметрическая станция<br />почвенного стационара МГУ
        </h1>
        <p class="hero__subtitle hero-anim" style="animation-delay: 0.3s">
          Научно-исследовательский центр изучения почв
        </p>
        <router-link to="/about" class="hero__btn hero-anim" style="animation-delay: 0.5s">
          Узнать больше
        </router-link>
      </div>
    </div>
  </section>

  <section class="stats" v-reveal="'fade-up'">
    <div class="stats__inner">
      <div v-for="(stat, i) in stats" :key="i" class="stats__item">
        <span class="stats__number">{{ animatedStats[i] }}{{ stat.suffix }}</span>
        <span class="stats__label">{{ stat.label }}</span>
      </div>
    </div>
  </section>

  <section class="intro" v-reveal="'fade-up'">
    <div class="intro__inner">
      <h2 class="intro__title">О нашей станции</h2>
      <p class="intro__text">
        Лизиметрическая станция МГУ — уникальный научный объект, созданный в 1960 году
        по инициативе профессора Н.А. Качинского. На протяжении более чем 60 лет
        станция ведёт непрерывные наблюдения за водно-солевым режимом почв,
        процессами миграции веществ и динамикой почвенных процессов.
      </p>
      <router-link to="/research" class="intro__link">
        Направления исследований →
      </router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

/* Hero entrance animations */
.hero-anim {
  opacity: 0;
  animation: heroFadeUp 0.8s $ease-out-expo forwards;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  position: relative;
  min-height: calc(100vh - 70px);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  &__overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-lg;
  }

  &__content {
    text-align: center;
    color: #fff;
    max-width: 800px;
  }

  &__title {
    font-family: $font-title;
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: $spacing-md;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
  }

  &__subtitle {
    font-size: 1.3rem;
    margin-bottom: $spacing-xl;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  }

  &__btn {
    display: inline-block;
    padding: 0.8rem 2.5rem;
    background: $color-primary;
    color: #fff;
    border-radius: $radius-sm;
    font-size: 1.1rem;
    font-family: $font-title;
    transition: background $transition-normal, transform $transition-fast, box-shadow $transition-normal;

    &:hover {
      background: $color-primary-dark;
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba($color-primary, 0.4);
    }
  }
}

/* Stats section */
.stats {
  background: $color-primary-dark;
  color: #fff;
  padding: 3rem 1.5rem;

  &__inner {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    flex-wrap: wrap;
  }

  &__item {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__number {
    font-family: $font-title;
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    line-height: 1;
  }

  &__label {
    font-size: 0.9rem;
    opacity: 0.75;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

/* Intro section */
.intro {
  padding: 4rem 1.5rem;
  background: $color-bg;

  &__inner {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    font-family: $font-title;
    font-size: 2rem;
    color: $color-primary-dark;
    margin-bottom: $spacing-md;
  }

  &__text {
    font-size: 1.1rem;
    line-height: 1.7;
    color: $color-text;
    margin-bottom: $spacing-lg;
  }

  &__link {
    display: inline-block;
    color: $color-primary;
    font-family: $font-title;
    font-size: 1.05rem;
    font-weight: 600;
    text-decoration: none;
    transition: color $transition-fast, transform $transition-fast;

    &:hover {
      color: $color-primary-dark;
      transform: translateX(4px);
    }
  }
}

@media (max-width: $bp-tablet) {
  .hero {
    background-attachment: scroll;

    &__title {
      font-size: 2rem;
    }

    &__subtitle {
      font-size: 1.1rem;
    }
  }

  .stats__number {
    font-size: 2rem;
  }
}

@media (max-width: $bp-mobile) {
  .hero__title {
    font-size: 1.6rem;
  }

  .stats__inner {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
