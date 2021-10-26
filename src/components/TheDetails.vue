<template>
  <div class="checkout__block">
    <h3>Контактные данные</h3>
    <div class="checkout__block--row" style="display: flex; column-gap: 10px;">
      <input type="text" placeholder="Имя *" v-model="fio.name" @input='eventDetails'>
      <div v-tooltip="'Необходимо для Почты России, Счет для физических лиц'" style="width: 100%">
        <input type="text" placeholder="Фамилия" v-model="fio.surname" @input='eventDetails'>
      </div>
      <div v-tooltip="'Необходимо для Счет для физических лиц'" style="width: 100%">
        <input type="text" placeholder="Отчество" v-model="fio.patronymic" @input='eventDetails'>
      </div>
    </div>
    <input type="tel" v-maska="'+7 (9##) ###-##-####'" :class="{ active: phone.length > 18 }" v-model="phone" @input='eventDetails' placeholder="Телефон *" autocomplete="tel" maxlength="20" />
    <input type="text" v-model="email" @input='eventDetails' placeholder="Email *">
  </div>
</template>

<script>
export default {
  name: 'TheDetails',

  emits: {
    details: Object
  },

  data() {
    return {
      fio: {
        name: '',
        surname: '',
        patronymic: ''
      },
      phone: '',
      email: ''
    }
  },

  methods : {
    eventDetails() {
      const details = {};
      if (this.fio.name !== '' || this.fio.surname !== '' || this.fio.patronymic !== '') details.fio = {};

      if (this.fio.name !== '') details.fio.name = this.fio.name;
      if (this.fio.surname !== '') details.fio.surname = this.fio.surname;
      if (this.fio.patronymic !== '') details.fio.patronymic = this.fio.patronymic;

      if (this.phone !== '') details.phone = this.phone;
      if (this.email !== '') details.email = this.email;

      this.$emit('details', details);
    }
  }
}
</script>
