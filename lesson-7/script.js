
Vue.component("goods-search", {
  props: ['search', `filter`],
  template: `
    <form action="#" class="search">
      <input type="text" class="goods-search" v-model="search"/>
      <button class="search-button" type="button" @click="filter(search)"></button>
    </form>
  `
});

Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list" v-if=goods.length>
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
  `
});

Vue.component("empty-goods-list", {
  props: ['goods'],
  template: `<div class="empty-goods-list" v-if=!goods.length>Ничего не найдено</div>`
});

Vue.component('goods-item', {
  props: ['good'],
  data() {
    return {
      addToCart: app.addToCart
    }
  },
  template: `
    <div class="goods-item">
      <h3 class="goods-item__name">{{ good.product_name }}</h3>
      <p class="goods-item__price">{{ good.price }}</p>
      <button class="goods-item__button" type="button" @click=addToCart(good)>Купить</button>
    </div>
  `
});

Vue.component(`cart-item`, {
  props: ["item", "index", `remove`],
  // data() {
  //   return {
  //     removeFromCart: app.removeFromCart
  //   }
  // },
  template: `
    <div class="сart-item">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <button class="basket-item__button" type="button" @click=remove(index)>Удалить</button>
    </div>
  `
});

Vue.component(`cart-list`, {
  props: ['goods', `total`, `visible`, `remove`],
  template: `
    <div class="сart" v-if=visible>
      <p class="сart-list__total">{{ total }}</p>
      <div class="сart-list" v-if=goods.length>
        <cart-item v-for="(item,index) in goods" :item="item" :index="index" :remove="remove"></cart-item>
      </div>
    </div>
  `
});


const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    cartGoods: [],
    searchLine: '',
    isVisibleCart: false
  },

  methods: {
    async getData(url) {
      // let option = {
      //   method: "post", 
      //   body: data 
      // }; // GET запрос поэтому option не нужен
      let responce = await fetch(url);
      let result = await responce.json();
      return result;
    },

    // асинхронная функция отправки данных
    async sendData(url, data) {
      let option = {
        method: "post",
        // headers: { "content-type": "application/json" },
        body: data
      };
      let responce = await fetch(url, option);
      let result = await responce.json();
      return result;
    },

    // изменение списка товаров в зависимости от поиска
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },

    // добавление товара в корзину
    addToCart(good) {
      // this.cartGoods.push(good);
      let add = this.sendData('/addToCart', good);
      add.then(object => {
        this.cartGoods = object;
      });
    },

    // удаление товара из корзины
    removeFromCart(index) {
      this.cartGoods = [...this.cartGoods.slice(0, index), ...this.cartGoods.slice(index + 1)]
    }
  },

  computed: {
    // количество и стоимость товаров в корзине
    cartTotalPrice() {
      let goods = this.cartGoods.length;
      let sum = this.cartGoods.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);

      return this.cartGoods.length ? `В корзине ${goods} товаров на сумму ${sum} рублей` : "Корзина пуста";
    }
  },

  mounted() {
    let goods = this.getData(`/catalogData`);
    goods.then(object => {
      this.goods = object;
      this.filteredGoods = object;
    });
  }
});