const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
    // // асинхронная функция отправки данных
    async sendData(url, data) {
      // let option = {
      //   method: "post", 
      //   body: data 
      // }; // GET запрос поэтому option не нужен
      let responce = await fetch(url);
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
      this.cartGoods.push(good);
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
    let moreGoods = [
      {
        'id_product': 124,
        'product_name': 'Клавиатура',
        'price': 1500
      },
      {
        'id_product': 701,
        'product_name': 'Коврик',
        'price': 300
      }
    ];
    let goods = this.sendData(`${API_URL}/catalogData.json`, null);
    goods.then(object => {
      this.goods = object.concat(moreGoods);
      this.filteredGoods = object.concat(moreGoods);
    });
  }
});

