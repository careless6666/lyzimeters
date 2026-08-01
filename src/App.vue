<script setup lang="ts">
import Nav from '@/components/Nav.vue'
</script>

<template>
  <Nav />
  <main class="main-content">
    <router-view />
  </main>
</template>

<style lang="scss">
.main-content {
  min-height: calc(100vh - 70px);
}
</style>
