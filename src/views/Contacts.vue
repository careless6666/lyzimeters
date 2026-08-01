<script setup lang="ts">
</script>

<template>
  <div class="container">
    <h1 class="page-title">Контакты</h1>

    <div class="content contacts">
      <div class="contacts__info">
        <h2 class="sub-title">Адрес</h2>
        <p>Россия, Москва, ул. Ленинские горы, 1</p>
        <p>МГУ имени М.В. Ломоносова, факультет почвоведения</p>

        <h2 class="sub-title">Телефон</h2>
        <p>
          <a href="tel:+84959398787">8 (495) 939-87-87</a>
        </p>

        <h2 class="sub-title">Email</h2>
        <p>
          <a href="mailto:msu@gmail.com">msu@gmail.com</a>
        </p>
      </div>

      <div class="contacts__map">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.530887%2C55.703282&z=15"
          width="100%"
          height="400"
          frameborder="0"
          allowfullscreen="true"
          title="Карта — МГУ, Ленинские горы"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as *;

.contacts {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;

  &__info {
    p {
      margin-bottom: $spacing-xs;
    }
  }

  &__map {
    border-radius: $radius-md;
    overflow: hidden;
    box-shadow: $shadow-md;
  }
}

@media (min-width: $bp-tablet) {
  .contacts {
    flex-direction: row;
    align-items: flex-start;

    &__info {
      flex: 0 0 35%;
    }

    &__map {
      flex: 1;
      height: 400px;

      iframe {
        height: 100%;
      }
    }
  }
}
</style>
