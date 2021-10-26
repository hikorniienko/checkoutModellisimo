<template>
  <div class="checkout__aside">
    <div class="checkout__aside--block">
      <h3>Информация о заказе</h3>
      <div class="checkout__aside--block--item" v-if="location.city !== undefined">
        <span>Город</span> {{  location.city }} <small v-if="location.country !== undefined">({{ location.country.name }})</small>
      </div>
      <div class="checkout__aside--block--item" v-if="details.fio !== undefined">
        <span>Фио</span> {{ details.fio.name }} {{ details.fio.surname }} {{ details.fio.patronymic }}
      </div>
      <div class="checkout__aside--block--item" v-if="details.phone !== undefined">
        <span>Телефон</span> {{ details.phone }}
      </div>
      <div class="checkout__aside--block--item" v-if="details.email !== undefined">
        <span>Email</span> {{ details.email }}
      </div>
      <div class="checkout__aside--block--item" v-if="delivery.name !== undefined">
        <span>Метод доставки</span> {{ delivery.name }}
      </div>
      <div class="checkout__aside--block--item" v-if="delivery.address !== undefined">
        <span>Адрес доставки</span> {{ delivery.address }}
      </div>
      <div class="checkout__aside--block--item" v-if="delivery.tax !== undefined">
        <span>Стоимость доставки</span> {{ delivery.tax }} руб.
      </div>
      <div class="checkout__aside--block--item" v-if="delivery.days !== undefined">
        <span>Время доставки</span> {{ delivery.days }} д.
      </div>
      <div class="checkout__aside--block--item" v-if="pay.name !== undefined">
        <span>Метод оплаты</span> {{ pay.name }}
      </div>
      <div class="checkout__aside--block--item" v-if="this.config.amount !== undefined">
        <span>Стоимость товара</span> {{ this.config.amount }} руб.
      </div>
      <div class="checkout__aside--block--item" v-if="this.config.amount !== undefined">
        <span>Итого</span> {{ Number(this.config.amount) +  (delivery.tax !== undefined ? Number(delivery.tax) : 0)}} руб.
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TheResult',

  props: {
    location: Object,
    details: Object,
    delivery: Object,
    pay: Object
  },

  data() {
    return {

    }
  }
}
</script>
