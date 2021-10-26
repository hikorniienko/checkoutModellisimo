<template>
  <div class="container">
    <div class="checkout__inner">
      <div class="checkout__left">

        <the-orders></the-orders>
        <the-city @location="connectLocation"></the-city>
        <the-details @details="connectDetails"></the-details>
        <the-delivery :location="location" @delivery="connectDelivery"></the-delivery>
        <the-pay :location="location" :delivery="delivery" @pay="connectPay"></the-pay>
        <the-note  @note="connectNote"></the-note>
        <the-promo></the-promo>

      </div>
      <div class="checkout__right">
        <the-result :location="location" :details="details" :delivery="delivery" :pay="pay"></the-result>
        <input class="checkout__aside--order" type="button" id="order-button" value="Оформить заказ" onclick="shopCheckOut()">
      </div>

    </div>
  </div>
</template>

<script>
import TheOrders from '@/components/TheOrders.vue';
import TheCity from '@/components/TheCity.vue';
import TheDetails from '@/components/TheDetails.vue';
import TheDelivery from '@/components/TheDelivery.vue';
import ThePay from '@/components/ThePay.vue';
import TheNote from '@/components/TheNote.vue';
import ThePromo from '@/components/ThePromo.vue';
import TheResult from '@/components/TheResult.vue';

export default {
  name: 'App',

  components: {
    TheOrders,
    TheCity,
    TheDetails,
    TheDelivery,
    ThePay,
    TheNote,
    ThePromo,
    TheResult
  },

  data() {
    return {
      location: {},
      details: {},
      delivery: {},
      pay: {},
      note: ''
    }
  },

  methods: {
    connectLocation(data) {
      this.location = data;
    },

    connectDetails(data) {
      this.details = data;
    },

    connectDelivery(data) {
      this.delivery = data;
    },

    connectPay(data) {
      this.pay = data;
    },

    connectNote(data) {
      this.note = data;
      this.config.feedback(this.$data);
    }
  },

  beforeUpdate() {
    this.config.feedback(this.$data);
  }
}
</script>
