<template>
  <div :class="{load: !preloader}" class="delivery__open--item preloader">
    <div class="point">
      <div id="map" class="point__map">
        <yandex-maps>
          <yandex-map :center="view.coord">
            <yandex-placemark :coord="view.coord" />
          </yandex-map>
        </yandex-maps>
      </div>
      <div class="point__info">
        <p><span>График работы:</span> {{ view.work_time }} </p>
        <p><span>Телефон:</span> {{ view.phone }}</p>
        <p><span>Адрес:</span> {{ view.address }}</p>
      </div>

      <input v-if="pvz.length > 10" type="text" v-model="pvzSearch" placeholder="Начните вводить адрес">

      <ul class="points">
        <li v-show="item.location.address.toLowerCase().includes(pvzSearch)" v-for="(item, key) of pvz" :key="key" @click="updateView(key)" :class="{active: view.active === key}">
          {{ item.location.address }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: 'DeliverySdekPvz',

  props: {
    isActive: Boolean,
    location: Object
  },

  emits: {
    deliveryDetails: Object
  },

  data() {
    return {
      vps: {
        pvz: '/php/checkout/sdek/pvz.php',
        tax: '/php/checkout/sdek/tax.php'
      },
      coord: [55.741937, 37.504058],
      view: {
        coord: [0,0],
        phone: '',
        address: '',
        work_time: '',
        active: 0
      },
      pvz: [],
      pvzSearch: '',
      tax: 0,
      preloader: false,
      tariff: [136, 483, 8]
    }
  },

  methods: {
    async getPvz() {
      const response = await fetch(this.vps.pvz + '?city_code=' + this.location.code);
      const result = await response.json();

      this.pvz = result;

      if (this.pvz.length === 0) return;

      this.updateView(0);
    },

    async getTax() {
      const response = await fetch(this.vps.tax + '?city_code=' + this.location.code + '&weight=' + this.config.weight);
      const result = await response.json();

      if (result.errors) {
        this.preloader = true;
        return console.log(result.errors[0].message)
      };

      if (result.tariff_codes === undefined) return console.log('Получили пустой список тарифов сдек.');

      let status = true;
      let count = 0;
      let filter;

      while (status) {
        filter = result.tariff_codes.filter(item => item.tariff_code === this.tariff[count]);

        if (filter.length !== 0) {
          status = false;
        }

        count += 1;
        if (count === this.tariff.length) status = false;
      }

      this.tax = Math.ceil(filter[0].delivery_sum);
      this.tax = this.tax <= 250 ? 250 : this.tax;
      this.days = filter[0].period_max;

      this.returnDetails();
    },

    updateView(key) {
      this.view.coord = [this.pvz[key].location.latitude, this.pvz[key].location.longitude];
      this.view.phone = this.pvz[key].phones[0].number;
      this.view.address = this.pvz[key].location.address_full;
      this.view.work_time = this.pvz[key].work_time;
      this.view.active = key;
    },

    returnDetails() {
      if (this.isActive) {
        const details = {};
        if (this.tax) details.tax = this.tax;
        if (this.view.address) details.address = this.view.address;
        if (this.days) details.days = this.days;

        this.$emit('deliveryDetails', details);
      }
    }
  },

  beforeUpdate() {
    this.returnDetails();
  },

  mounted() {
    this.getPvz();
    this.getTax();
  }
}
</script>
