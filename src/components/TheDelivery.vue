<template>
  <div class="checkout__block" v-show="show">
    <h3>Выберите удобный способ получения заказа в {{ location.city }}</h3>
    <div class="delivery">
      <div class="delivery__buttons">
        <div :class="{ active: item.active }" class="delivery__buttons--item" v-for="(item, key) in delivery" :key="key" v-show="item.show" @click="changeDelivery(key)">
          {{ item.name }}
        </div>
      </div>

      <delivery-courier-mosscow v-if="delivery.courierMosscow.show" v-show="delivery.courierMosscow.active" :isActive="delivery.courierMosscow.active" @deliveryDetails='deliveryDetails'></delivery-courier-mosscow>
      <delivery-shop v-if="delivery.shop.show" v-show="delivery.shop.active" :isActive="delivery.shop.active" @deliveryDetails='deliveryDetails'></delivery-shop>
      <delivery-post v-if="delivery.post.show" v-show="delivery.post.active" :isActive="delivery.post.active" @deliveryDetails='deliveryDetails'></delivery-post>
      <delivery-sdek-pvz v-if="delivery.cdekPVZ.show" v-show="delivery.cdekPVZ.active" :isActive="delivery.cdekPVZ.active" :location="location" @deliveryDetails='deliveryDetails'></delivery-sdek-pvz>
      <delivery-sdek-courier v-if="delivery.cdekCourier.show" v-show="delivery.cdekCourier.active" :isActive="delivery.cdekCourier.active" :location="location" @deliveryDetails='deliveryDetails'></delivery-sdek-courier>

    </div>
  </div>
</template>

<script>
import DeliveryCourierMosscow from '@/components/DeliveryCourierMosscow.vue';
import DeliveryShop from '@/components/DeliveryShop.vue';
import DeliveryPost from '@/components/DeliveryPost.vue';
import DeliverySdekPvz from '@/components/DeliverySdekPvz.vue';
import DeliverySdekCourier from '@/components/DeliverySdekCourier.vue';

export default {
  name: 'TheDelivery',

  components: {
    DeliveryCourierMosscow,
    DeliveryShop,
    DeliveryPost,
    DeliverySdekPvz,
    DeliverySdekCourier
  },

  props: {
    location: Object
  },

  emits: {
    delivery: Object
  },

  data() {
    return {
      show: true,
      delivery: {
        courierMosscow: {name: 'Курьерская доставка', show: false, active: false, id: 0},
        cdekCourier: {name: 'Курьерская доставка СДЕК', show: false, active: false, id: 1},
        cdekPVZ: {name: 'СДЕК ПВЗ', show: false, active: false, id: 2},
        shop: {name: 'Самовывоз из розничного магазина', show: false, active: false, id: 3},
        post: {name: 'Почта России', show: false, active: false, id: 4}
      }
    }
  },

  computed: {
    init() {
      if (this.location.code === undefined && this.location.city !== undefined) {
        this.show = this.location.city === '' ? false : true;

        this.clearShow();
        this.clearActive();

        this.delivery.post.show = true;
        this.delivery.post.active = true;
        return;
      }

      this.clearShow();
      this.clearActive();
      this.show = true;

      if (this.location.code === '44') {
        this.delivery.courierMosscow.show = true;
        this.delivery.shop.show = true;
      }

      if (this.location.country.code === 'RU' && this.location.code !== '44') {
        this.delivery.post.show = true;
      }

      if (this.location.code !== '44') {
        this.delivery.cdekCourier.show = true;
      }

      this.delivery.cdekPVZ.show = true;

      this.searchFirstShow();
    }
  },

  methods: {
    clearShow() {
      for (const key of Object.keys(this.delivery)) {
        this.delivery[key].show = false;
      }
    },

    clearActive() {
      for (const key of Object.keys(this.delivery)) {
        this.delivery[key].active = false;
      }
    },

    searchFirstShow() {
      for (const key of Object.keys(this.delivery)) {
        if (this.delivery[key].show == true) return this.delivery[key].active = true;
      }
    },

    searchActiveName() {
      for (const key of Object.keys(this.delivery)) {
        if (this.delivery[key].active == true) return this.delivery[key].name;
      }
    },

    searchActiveId() {
      for (const key of Object.keys(this.delivery)) {
        if (this.delivery[key].active == true) return this.delivery[key].id;
      }
    },

    changeDelivery(key) {
      this.clearActive();
      this.delivery[key].active = true;
    },

    deliveryDetails(data) {
      data.name = this.searchActiveName();
      data.id = this.searchActiveId();
      this.$emit('delivery', data);
    }
  },

  beforeUpdate() {
    this.init;
  }
}
</script>
