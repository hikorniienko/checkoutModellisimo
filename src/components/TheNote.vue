<template>
  <div class="checkout__block">
    <h3>Примечание</h3>
    <textarea v-model="text" @input="returnDetails"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'TheNote',

    emits: {
      note: String
    },

    data() {
      return {
        text: ''
      }
    },

    methods: {
      returnDetails() {
       this.$emit('note', String(this.text));
      }
    }
  }
</script>
