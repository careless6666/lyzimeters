<script setup lang="ts">
import { ref } from 'vue'

const photos = [
  { src: '/img/staczim.jpeg', alt: 'Лизиметрическая станция' },
  { src: '/img/МГУ_Старые_теплицы.jpg', alt: 'Старые теплицы МГУ' },
  { src: '/img/facgz4.jpg', alt: 'Факультет почвоведения' },
]

const current = ref(0)

function next() {
  current.value = (current.value + 1) % photos.length
}

function prev() {
  current.value = (current.value - 1 + photos.length) % photos.length
}
</script>

<template>
  <div class="container">
    <h1 class="page-title">Фотогалерея</h1>

    <div class="gallery">
      <button class="gallery__btn gallery__btn--prev" @click="prev" aria-label="Назад">❮</button>

      <div class="gallery__viewport">
        <div
          class="gallery__track"
          :style="{ transform: `translateX(-${current * 100}%)` }"
        >
          <div v-for="(photo, i) in photos" :key="i" class="gallery__slide">
            <img :src="photo.src" :alt="photo.alt" />
            <p class="gallery__caption">{{ photo.alt }}</p>
          </div>
        </div>
      </div>

      <button class="gallery__btn gallery__btn--next" @click="next" aria-label="Вперёд">❯</button>
    </div>

    <div class="gallery__dots">
      <button
        v-for="(photo, i) in photos"
        :key="i"
        class="gallery__dot"
        :class="{ 'is-active': i === current }"
        @click="current = i"
        :aria-label="`Слайд ${i + 1}`"
      ></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.gallery {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: $spacing-sm;

  &__viewport {
    flex: 1;
    overflow: hidden;
    border-radius: $radius-md;
    box-shadow: $shadow-md;
  }

  &__track {
    display: flex;
    transition: transform 0.4s ease;
  }

  &__slide {
    min-width: 100%;

    img {
      width: 100%;
      height: 450px;
      object-fit: cover;
    }
  }

  &__caption {
    text-align: center;
    padding: $spacing-sm;
    color: $color-text-light;
    font-style: italic;
  }

  &__btn {
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: $color-primary;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: $color-primary-dark;
    }
  }

  &__dots {
    display: flex;
    justify-content: center;
    gap: $spacing-xs;
    margin-top: $spacing-md;
  }

  &__dot {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: rgba($color-primary, 0.3);
    cursor: pointer;
    transition: background 0.2s ease;

    &.is-active {
      background: $color-primary;
    }
  }
}

@media (max-width: $bp-mobile) {
  .gallery__slide img {
    height: 250px;
  }

  .gallery__btn {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}
</style>
