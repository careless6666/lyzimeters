<script setup lang="ts">
const base = import.meta.env.BASE_URL

const directions = [
  {
    icon: `${base}img/monitoring.svg`,
    title: 'Мониторинг почв',
    text: 'Систематические наблюдения за состоянием почвенного покрова и динамикой почвенных процессов.',
  },
  {
    icon: `${base}img/digging.svg`,
    title: 'Режимные исследования',
    text: 'Изучение температурного, водного и воздушного режимов почв в естественных условиях.',
  },
  {
    icon: `${base}img/water-drop.svg`,
    title: 'Миграция веществ',
    text: 'Исследование перемещения растворённых веществ и элементов питания по почвенному профилю.',
  },
  {
    icon: `${base}img/agriculture.svg`,
    title: 'Агрофизические и агрохимические исследования',
    text: 'Определение физико-химических свойств почв и их изменения под воздействием различных факторов.',
  },
  {
    icon: `${base}img/bacteria.svg`,
    title: 'Микробиологические исследования',
    text: 'Изучение почвенной микробиоты и её роли в процессах трансформации органического вещества.',
  },
  {
    icon: `${base}img/line-graph.svg`,
    title: 'Математическое моделирование',
    text: 'Построение моделей почвенных процессов для прогнозирования и оптимизации управления плодородием.',
  },
]
</script>

<template>
  <div class="container">
    <h1 class="page-title">Направления исследований</h1>

    <div class="research">
      <div v-for="(d, i) in directions" :key="i" class="research__card">
        <div class="research__icon">
          <img :src="d.icon" :alt="d.title" />
        </div>
        <h2 class="research__title">{{ d.title }}</h2>
        <p class="research__text">{{ d.text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.research {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-lg;
  max-width: 1000px;
  margin: 0 auto;

  &__card {
    background: $color-surface;
    border-radius: $radius-md;
    padding: $spacing-lg $spacing-md;
    text-align: center;
    box-shadow: $shadow-sm;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-md;
    }
  }

  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto $spacing-sm;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-family: $font-title;
    font-size: 1.15rem;
    font-weight: 700;
    color: $color-primary-dark;
    margin-bottom: $spacing-xs;
  }

  &__text {
    font-size: 0.95rem;
    color: $color-text-light;
    line-height: 1.5;
  }
}
</style>
