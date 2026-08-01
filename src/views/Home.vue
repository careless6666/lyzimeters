<script setup lang="ts">
</script>

<template>
  <section class="hero">
    <div class="hero__overlay">
      <div class="hero__content">
        <h1 class="hero__title">Лизиметрическая станция<br />почвенного стационара МГУ</h1>
        <p class="hero__subtitle">Научно-исследовательский центр изучения почв</p>
        <router-link to="/about" class="hero__btn">Узнать больше</router-link>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.hero {
  position: relative;
  min-height: calc(100vh - 70px);
  background: url('/img/grass.jpg') center / cover no-repeat fixed;
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
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
      background: $color-primary-dark;
      color: #fff;
      transform: translateY(-2px);
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
}

@media (max-width: $bp-mobile) {
  .hero__title {
    font-size: 1.6rem;
  }
}
</style>
