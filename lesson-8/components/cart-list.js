export default {
  cartList: {
    props: ['goods', `total`, `visible`, `remove`],
    template: `
    <div class="сart" v-if=visible>
      <p class="сart-list__total">{{ total }}</p>
      <div class="сart-list" v-if=goods.length>
        <cart-item v-for="(item,index) in goods" :item="item" :index="index" :remove="remove"></cart-item>
      </div>
    </div>
  `
  },
  cartItem: {
    props: ["item", "index", `remove`],
    template: `
    <div class="сart-item">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <button class="btn basket-item__button" type="button" @click=remove(item)>Удалить</button>
    </div>
  `
  }
}