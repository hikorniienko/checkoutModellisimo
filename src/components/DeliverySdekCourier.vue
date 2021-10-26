<template>
  <div :class="{load: !preloader}" class="delivery__open--item preloader">
    <input type="text" placeholder="Адрес *" v-model="address">
  </div>
</template>

<script>


export default {
  name: 'DeliverySdekCourier',

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
        tax: '/php/checkout/sdek/tax.php'
      },
      address: '',
      tax: 0,
      preloader: false,
      tariff: [137, 482, 8]
    }
  },

  methods: {
    async getTax() {
      const response = await fetch(this.vps.tax + '?city_code=' + this.location.code + '&tariff_code=' + this.tariffCode + '&weight=' + this.config.weight);
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

    returnDetails() {
      if (this.isActive) {
        const details = {};
        if (this.tax) details.tax = this.tax;
        if (this.address !== '') details.address = this.address;
        if (this.days) details.days = this.days;

        this.$emit('deliveryDetails', details);
      }
    }
  },

  beforeUpdate() {
    this.returnDetails();
  },

  mounted() {
    this.getTax();
  }
}
</script>
