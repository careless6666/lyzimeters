<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const base = import.meta.env.BASE_URL

const photos = [
  { src: `${base}img/staczim.jpeg`, alt: 'Лизиметрическая станция' },
  { src: `${base}img/МГУ_Старые_теплицы.jpg`, alt: 'Старые теплицы МГУ' },
  { src: `${base}img/facgz4.jpg`, alt: 'Факультет почвоведения' },
]

const current = ref(0)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function next() {
  current.value = (current.value + 1) % photos.length
}

function prev() {
  current.value = (current.value - 1 + photos.length) % photos.length
}

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function lightboxNext() {
  lightboxIndex.value = (lightboxIndex.value + 1) % photos.length
}

function lightboxPrev() {
  lightboxIndex.value = (lightboxIndex.value - 1 + photos.length) % photos.length
}

function handleKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'ArrowRight') lightboxNext()
  else if (e.key === 'ArrowLeft') lightboxPrev()
  else if (e.key === 'Escape') closeLightbox()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">Фотогалерея</h1>

    <div class="gallery" v-reveal="'fade-up'">
      <button class="gallery__btn gallery__btn--prev" @click="prev" aria-label="Назад">❮</button>

      <div class="gallery__viewport">
        <div
          class="gallery__track"
          :style="{ transform: `translateX(-${current * 100}%)` }"
        >
          <div
            v-for="(photo, i) in photos"
            :key="i"
            class="gallery__slide"
            @click="openLightbox(i)"
          >
            <img :src="photo.src" :alt="photo.alt" />
            <p class="gallery__caption">{{ photo.alt }}</p>
            <span class="gallery__zoom-hint">🔍 Нажмите для увеличения</span>
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

    <!-- Thumbnail grid -->
    <div class="thumbs" v-reveal="'fade-up'">
      <h2 class="thumbs__title">Все фотографии</h2>
      <div class="thumbs__grid">
        <button
          v-for="(photo, i) in photos"
          :key="i"
          class="thumbs__item"
          :class="{ 'is-active': i === current }"
          @click="current = i; openLightbox(i)"
          :aria-label="photo.alt"
        >
          <img :src="photo.src" :alt="photo.alt" />
        </button>
      </div>
    </div>

    <!-- Lightbox modal -->
    <Transition name="lightbox">
      <div
        v-if="lightboxOpen"
        class="lightbox"
        @click.self="closeLightbox"
      >
        <button class="lightbox__close" @click="closeLightbox" aria-label="Закрыть">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <button class="lightbox__nav lightbox__nav--prev" @click.stop="lightboxPrev" aria-label="Назад">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="lightbox__content" @click.self="closeLightbox">
          <img
            :src="photos[lightboxIndex].src"
            :alt="photos[lightboxIndex].alt"
            class="lightbox__img"
          />
          <p class="lightbox__caption">{{ photos[lightboxIndex].alt }}</p>
          <span class="lightbox__counter">{{ lightboxIndex + 1 }} / {{ photos.length }}</span>
        </div>

        <button class="lightbox__nav lightbox__nav--next" @click.stop="lightboxNext" aria-label="Вперёд">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </Transition>
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
    transition: transform 0.4s $ease-out-expo;
  }

  &__slide {
    min-width: 100%;
    cursor: pointer;
    position: relative;

    img {
      width: 100%;
      height: 450px;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.02);
    }
  }

  &__caption {
    text-align: center;
    padding: $spacing-sm;
    color: $color-text-light;
    font-style: italic;
  }

  &__zoom-hint {
    display: block;
    text-align: center;
    padding-bottom: $spacing-sm;
    font-size: 0.85rem;
    color: $color-primary;
    opacity: 0.7;
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
    transition: background $transition-fast, transform $transition-fast;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: $color-primary-dark;
      transform: scale(1.1);
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
    transition: background $transition-fast, transform $transition-fast;

    &.is-active {
      background: $color-primary;
      transform: scale(1.2);
    }
  }
}

/* Thumbnail grid */
.thumbs {
  max-width: 800px;
  margin: 3rem auto 0;

  &__title {
    font-family: $font-title;
    font-size: 1.4rem;
    color: $color-primary-dark;
    margin-bottom: $spacing-md;
    text-align: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    @media (max-width: $bp-mobile) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__item {
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: $radius-sm;
    overflow: hidden;
    background: none;
    transition: transform $transition-fast, box-shadow $transition-fast;
    outline: 3px solid transparent;
    outline-offset: 2px;

    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-md;

      img {
        transform: scale(1.08);
      }
    }

    &.is-active {
      outline-color: $color-primary;
    }
  }
}

/* Lightbox modal */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &__close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background $transition-fast, transform $transition-fast;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: rotate(90deg);
    }
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background $transition-fast, transform $transition-fast;

    &--prev {
      left: 1.5rem;
    }

    &--next {
      right: 1.5rem;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-50%) scale(1.1);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90vw;
    max-height: 90vh;
  }

  &__img {
    max-width: 90vw;
    max-height: 80vh;
    object-fit: contain;
    border-radius: $radius-sm;
  }

  &__caption {
    color: rgba(255, 255, 255, 0.85);
    font-style: italic;
    margin-top: 1rem;
    font-size: 1rem;
  }

  &__counter {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }
}

/* Lightbox transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;

  .lightbox__img {
    transition: transform 0.3s $ease-out-expo, opacity 0.3s ease;
  }
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;

  .lightbox__img {
    transform: scale(0.9);
    opacity: 0;
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

  .lightbox {
    padding: 1rem;

    &__nav {
      width: 40px;
      height: 40px;

      &--prev {
        left: 0.5rem;
      }

      &--next {
        right: 0.5rem;
      }
    }
  }

  .thumbs__item img {
    height: 100px;
  }
}
</style>
