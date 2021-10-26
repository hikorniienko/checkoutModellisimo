<template>
  <div v-if="orders">
    <div :class="{active: isActive === key}" class="checkout__basket" v-for="(item, key) of orders" :key="key">
        <img :src="'https://alfamodeli.ru/photo_preview/' + art(item) + '.jpg'" alt="image" onerror="this.src = 'http://alfamodeli.ru/img/no_img.jpg'">
        <a :href="url(item)" class="checkout__basket--name">{{ name(item) }}</a>
        <div class="checkout__basket--price">{{ price(item) }}</div>
        <div class="checkout__basket--count">
          <div class="checkout__basket--count--minus" @click="minus(item,key)"></div>
          <input class="checkout__basket--count--input" type="number" min="1" :value="count(item)" readonly>
          <div class="checkout__basket--count--plus" @click="plus(item,key)"></div>
        </div>
        <div class="checkout__basket--delete js-basket-delete" @click="remove(item,key)"></div>
        <div class="checkout__basket--info">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TheOrders',

    data() {
      return {
        isActive: false
      }
    },

    computed: {
      orders() {
        let orderForm = document.querySelectorAll('#order-form .order-item');
        return orderForm;
      }
    },

    methods: {
      art(item) {
        return item.querySelector('.order-item-art').innerText;
      },

      url(item) {
        if (item.title) return 'javascript:void(0)';
        return item.querySelector('.order-item-name a').href;
      },

      name(item) {
        if (item.title) return item.querySelector('.order-item-name').innerText.split('*')[0];
        return item.querySelector('.order-item-name a').innerText.split('*')[0];
      },

      price(item) {
        return item.querySelector('.order-item-price').innerText;
      },

      count(item) {
        return item.querySelector('.order-item-cnt input').value;
      },

      minus(item, key) {
        this.isActive = key;
        const input = item.querySelector('.order-item-cnt input');
        input.value = Number(input.value) - 1;
        this.refresh();
      },

      plus(item, key) {
        this.isActive = key;
        const input = item.querySelector('.order-item-cnt input');
        input.value = Number(input.value) + 1;
        this.refresh();
      },

      remove(item, key) {
        this.isActive = key;
        item.querySelector('.order-item-del input').checked = true;
        this.refresh();
      },

      refresh() {
        document.querySelector('#order-form [type="submit"]').click();
      }
    }
  }
</script>
