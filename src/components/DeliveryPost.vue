<template>
  <div class="delivery__open--item">
    <div style="color:red; font-size: 12px;">{{ error}}</div>
    <input type="text" placeholder="Индекс *" v-model="index" @input="validatedZip" maxlength="6">
    <input type="text" placeholder="Адрес *" v-model="address">
  </div>
</template>

<script>


export default {
  name: 'DeliveryPost',

  props: {
    isActive: Boolean,
  },

  emits: {
    deliveryDetails: Object
  },

  data() {
    return {
      vps: '/php/checkout/post/tax.php',
      index: '',
      address: '',
      error: ''
    }
  },

  methods: {
    async getTax() {
      const response = await fetch(this.vps + '?index=' + this.index + '&weight=' + this.config.weight);
      const result = await response.json();

      if (result['total-rate'] === 0) return this.error = 'Данный индекс не существует.';

      this.tax = Math.ceil((result['total-rate'] + result['total-vat']) / 100);
      this.tax = this.tax <= 250 ? 250 : this.tax;
      this.days = result['delivery-time']['max-days'];

      this.returnDetails();
    },

    validatedZip(event) {
      this.index = event.target.value.replace(/[^0-9]/g, '');
      this.error = '';

      if (this.index.length >= 6) {
        this.getTax();
      }
    },

    returnDetails() {
      if (this.isActive) {
        const details = {};
        if (this.tax) details.tax = this.tax;
        if (this.tax) details.index = this.index;
        if (this.address !== '') details.address = this.address;
        if (this.days) details.days = this.days;

        this.$emit('deliveryDetails', details);
      }
    }
  },

  beforeUpdate() {
    this.returnDetails();
  }
}
</script>
