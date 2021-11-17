<template>
  <div class="checkout__block">
    <label>
      <input type="checkbox" checked v-model="check1">
      Прочитал и согласен с Публичной офертой - <a href="/oferta" target="_blank">ссылка</a>
    </label><br>

    <label>
      <input type="checkbox" checked v-model="check2">
      Прочитал и принимаю Пользовательское соглашение - <a href="/polzovatelskoe_soglashenie" target="_blank">ссылка</a>
    </label><br>

    <label>
      <input type="checkbox" checked v-model="check3">
      Прочитал и согласен с правилами обработки персональных данных - <a href="/personalnye_dannye" target="_blank">ссылка</a>
    </label><br>

    <label>
      <input type="checkbox" checked v-model="check4">
      С правилами обмена и возврата товаров ознакомлен - <a href="/obmen_vozvrat" target="_blank">ссылка</a>
    </label><br>
  </div>
</template>

<script>
export default {
  name: 'TheRules',

  emits: {
    rules: Object
  },

  data() {
    return {
      check1: true,
      check2: true,
      check3: true,
      check4: true
    }
  },

  methods: {

  },

  beforeUpdate() {
    this.$emit('rules', this.$data);
  },

  mounted() {
    this.$emit('rules', this.$data);
  }
}
</script>
