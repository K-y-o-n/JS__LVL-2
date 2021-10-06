import goodsSearch from './components/goods-search.js'
Vue.component("goods-search", goodsSearch);

import goodsList from './components/goods-list.js'
Vue.component("goods-list", goodsList.goodsList);
Vue.component("goods-item", goodsList.goodsItem);

import cartList from './components/cart-list.js'
Vue.component("cart-list", cartList.cartList);
Vue.component("cart-item", cartList.cartItem);


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
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
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
    removeFromCart(good) {
      // this.cartGoods = [...this.cartGoods.slice(0, index), ...this.cartGoods.slice(index + 1)]
      let remove = this.sendData('/removeFromCart', good);
      remove.then(object => {
        this.cartGoods = object;
      })
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

    let cart = this.getData(`/cartData`);
    cart.then(object => {
      this.cartGoods = object;
    });
  }
});