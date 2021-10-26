<template>
  <div class="checkout__block">
    <h3>Способ оплаты</h3>
    <div class="pay">
      <div :class="{ active: pay.active }" class="pay__item" v-for="(pay, key) in pays" v-show="pay.show" @click="changePay(key)">
        {{ pay.name }}
      </div>
    </div>

    <div v-if="pays['4'].active">
      <input type="text" placeholder="Название организации *" v-model="org.name">
      <input type="text" placeholder="Юр. адрес *" v-model="org.address">
      <input type="text" placeholder="ОГРН *" v-model="org.ogrn">
      <input type="text" placeholder="ИНН *" v-model="org.inn">
      <input type="text" placeholder="КПП *" v-model="org.kpp">
      <input type="text" placeholder="БИК *" v-model="org.bik">
      <input type="text" placeholder="Расчетный счет *" v-model="org.wallet">
      После проверки наличия моделей, Вы получите Счет на оплату, на указанную Вами электронную почту.
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThePay',

  props: {
    location: Object,
    delivery: Object
  },

  emits: {
    pay: Object
  },

  data() {
    return {
      pays: {
        0:{
          name: 'Оплата банковской картой (на сайте)',
          show: false,
          active: false
        },
        1:{
          name: 'Оплата наличными при получении',
          show: false,
          active: false
        },
        2:{
          name: 'Оплата банковской картой при получении',
          show: false,
          active: false
        },
        3:{
          name: 'Переводом на карту Сбербанка',
          show: false,
          active: false
        },
        4:{
          name: 'Счет для юридических лиц',
          show: false,
          active: false
        },
        5:{
          name: 'Счет для физических лиц',
          show: false,
          active: false
        }
      },
      org: {}
    }
  },

  computed: {
    init() {
      this.clearShow();
      this.clearActive();

      if(this.delivery.id === 0) this.pays['2'].show = false;

      if(this.delivery.id === 1 || this.delivery.id === 2 || this.delivery.id === 4) {
        this.pays['1'].show = false;
        this.pays['2'].show = false;
      };

      this.searchFirstShow();
    }
  },

  methods: {
    clearShow() {
      for (const key of Object.keys(this.pays)) {
        this.pays[key].show = true;
      }
    },

    clearActive() {
      for (const key of Object.keys(this.pays)) {
        this.pays[key].active = false;
      }
    },

    searchFirstShow() {
      for (const key of Object.keys(this.pays)) {
        if (this.pays[key].show == true) return this.pays[key].active = true;
      }
    },

    searchActiveName() {
      for (const key of Object.keys(this.pays)) {
        if (this.pays[key].active == true) return this.pays[key].name;
      }
    },

    searchActiveId() {
      for (const key of Object.keys(this.pays)) {
        if (this.pays[key].active == true) return key;
      }
    },

    changePay(key) {
      this.clearActive();
      this.pays[key].active = true;


    },

    returnDetails() {
      const details = {};
      details.id = this.searchActiveId();
      details.name = this.searchActiveName();

      if (Object.keys(this.org).length !== 0)  details.org = {};
      if (this.org.name !== undefined && this.org.name !== '')  details.org.name = this.org.name;
      if (this.org.address !== undefined && this.org.address !== '')  details.org.address = this.org.address;
      if (this.org.ogrn !== undefined && this.org.ogrn !== '')  details.org.ogrn = this.org.ogrn;
      if (this.org.inn !== undefined && this.org.inn !== '')  details.org.inn = this.org.inn;
      if (this.org.kpp !== undefined && this.org.kpp !== '')  details.org.kpp = this.org.kpp;
      if (this.org.bik !== undefined && this.org.bik !== '')  details.org.bik = this.org.bik;
      if (this.org.wallet !== undefined && this.org.wallet !== '')  details.org.wallet = this.org.wallet;

      this.$emit('pay', details);
    }
  },

  beforeUpdate() {
    this.init;
    this.returnDetails();
  }
}
</script>
