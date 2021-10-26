<template>
  <div class="checkout__block" v-if="config.promoId !== undefined">
    <h3>Промо-код</h3>
    <input type="text" :id="id" :name="name" value="">
    <input type="button" value="Проверить код" @click="checkPromo">
    <input type="button" value="Очистить" @click="removePromo">
  </div>
</template>

<script>
export default {
  name: 'ThePromo',

  data() {
    return {

    }
  },

  computed: {
    id() {
      return 'order-fld-' + this.config.promoId;
    },

    name() {
      return 'fld' + this.config.promoId;
    }
  },

  methods: {
    checkPromo() {
      checkPromo(this.config.promoId);
    },

    removePromo() {
      checkPromo(this.config.promoId, 1);
    }
  }
}
</script>
