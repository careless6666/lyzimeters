<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'

const scrollProgress = ref(0)
const showBackToTop = ref(false)

function handleScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  showBackToTop.value = scrollTop > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Nav />
  <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
  <main class="main-content">
    <router-view v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </main>
  <Footer />
  <button
    class="back-to-top"
    :class="{ 'is-visible': showBackToTop }"
    @click="scrollToTop"
    aria-label="Наверх"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>
</template>

<style lang="scss">
.main-content {
  min-height: calc(100vh - 70px);
}
</style>
