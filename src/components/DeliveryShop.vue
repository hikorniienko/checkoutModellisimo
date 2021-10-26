<template>
  <div class="delivery__open--item">
    <div class="point">
      <div class="point__map">
        <yandex-maps>
          <yandex-map :center="coord">
            <yandex-placemark :coord="coord" />
          </yandex-map>
        </yandex-maps>
      </div>
      <div class="point__info">
        <p>График работы: 10:00 - 20:00</p>
        <p>Телефон: 8-800-700-5420</p>
        <p>Адрес: Москва, Багратионовский проезд, д. 7, к. 3, ТК «Горбушкин двор», Сектор "Н", 2-й Этаж, пав. Н2-015 (ст. метро "Багратионовская" - 600 метров)</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'DeliveryShop',

  props: {
    isActive: Boolean,
  },

  emits: {
    deliveryDetails: Object
  },

  data() {
    return {
      coord: [55.741937, 37.504058]
    }
  },

  beforeUpdate() {
    if (this.isActive) {
      this.$emit('deliveryDetails', {});
    }
  }
}
</script>
