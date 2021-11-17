<template>
  <div class="delivery__open">
    <div class="delivery__open--item">
      <div class="courierM">
        <div :class="{ active: item.active }" class="courierM__item" v-for="(item, key) in costPoint" :key="key" @click="changePoint(key)">
          {{ item.title }}
        </div>
      </div>
      <input type="text" placeholder="Адрес *" v-model="address">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeliveryCourierMosscow',

  props: {
    isActive: Boolean,
  },

  emits: {
    deliveryDetails: Object
  },

  data() {
    return {
      costPoint: [{
          title: 'В пределах МКАД',
          price: 400,
          active: true,
        },
        {
          title: 'До 10 км от МКАД',
          price: 700,
          active: false,
        },
        // {
        //   title: 'От 10 до 20 км от МКАД',
        //   price: 800,
        //   active: false,
        // },
        // {
        //   title: 'От 20 до 30 км от МКАД',
        //   price: 1000,
        //   active: false,
        // },
      ],
      address: ''
    }
  },

  methods: {
    clearActive() {
      for (let i = 0; i < this.costPoint.length; i++) {
        this.costPoint[i].active = false;
      }
    },

    searchActive() {
      for (let i = 0; i < this.costPoint.length; i++) {
        if (this.costPoint[i].active === true) return this.costPoint[i].price;
      }
    },

    changePoint(key) {
      this.clearActive();
      this.costPoint[key].active = true;
    }
  },

  beforeUpdate() {
    if (this.isActive) {
      const details = {};
      details.tax = this.searchActive();
      if (this.address !== '') details.address = this.address;

      this.$emit('deliveryDetails', details);
    }
  }
}
</script>
