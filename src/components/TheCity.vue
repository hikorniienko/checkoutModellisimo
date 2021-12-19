<template>
  <div :class="{load: !preloader}" class="checkout__block preloader">
    <h3 v-if="city === ''">Ваш город (Выберите вариант из предложенного ниже списка)</h3>
    <h3 v-if="city !== ''">Ваш город {{ city }}</h3>
    <input type="text" placeholder="Город" @input="eventCity" :value="city">
    <div v-show="cityHelp" style="color:#5b3c67; font-weight:600;"><small>Выберите вариант из предложенного ниже списка</small></div>
    <ul class="cityList" @click="eventCityList">
      <li v-show="item.city.toLowerCase().includes(citySearch)" v-for="item in cityList" :key="item.code" :data-city-code="item.code" :data-city-name="item.city" :data-city-country="item.country" :data-city-country-name="countryList[item.country]">
        {{ countryList[item.country] }},  {{ item.region }}, {{ item.city }}
      </li>
    </ul>
  </div>
</template>

<script>
import country from '@/assets/country.json';

export default {
  name: 'TheCity',
  emits: {
    location: Object
  },

  data(){
    return {
      vps: {
        city: '/php/checkout/city.php'
      },
      city: '',
      cityCode: '',
      cityCountry: '',
      cityCountryName: '',
      cityList: false,
      citySearch: '',
      cityHelp: true,
      countryList: country,
      preloader: false
    }
  },

  methods: {
    location() {
      const storage = JSON.parse(localStorage.getItem('city'));
      if (storage === null) return this.createCityList();

      this.getCityInfo(storage);
    },

    async createCityList() {
      if (typeof this.cityList === 'object') return;

      this.preloader = true;
      const response = await fetch(this.vps.city);
      const result = await response.json();

      this.cityList = result;
      this.preloader = false;
    },

    getCityInfo({city, code, country}) {
      this.city = city;
      this.cityCode = code;
      this.cityCountry = country.code;
      this.cityCountryName = country.name;
      this.cityHelp = false;

      this.$emit('location', {
        city: this.city,
        code: this.cityCode,
        country: {
          code: this.cityCountry,
          name: this.cityCountryName
        }
      });
    },

    eventCityList(event) {
      this.cityCode = event.target.dataset.cityCode;
      this.city = event.target.dataset.cityName;
      this.cityCountry = event.target.dataset.cityCountry;
      this.cityCountryName = event.target.dataset.cityCountryName;
      this.citySearch = null;
      this.cityHelp = false;

      localStorage.setItem('city', JSON.stringify({
        code: event.target.dataset.cityCode,
        city: event.target.dataset.cityName,
        country: {
          code: event.target.dataset.cityCountry,
          name: event.target.dataset.cityCountryName
        }
      }))

      this.$emit('location', {
        city: this.city,
        code: this.cityCode,
        country: {
          code: this.cityCountry,
          name: this.cityCountryName
        }
      });
    },

    eventCity(event) {
      this.createCityList();
      this.citySearch = event.target.value.toLowerCase();
      this.city = event.target.value;
      this.cityHelp = true;

      this.$emit('location', {city: this.city});
    }
  },

  mounted() {
    this.location();
  }
}
</script>
