export default {
  goodsList: {
    props: ['goods'],
    template: `
    <div>
      <div class="goods-list" v-if=goods.length>
        <goods-item v-for="good in goods" :good="good"></goods-item>
      </div>
      <div class="empty-goods-list" v-else>Ничего не найдено</div>
    </div>
  `
  },
  goodsItem: {
    props: ['good'],
    data() {
      return {
        addToCart: this.$root.addToCart
      }
    },
    template: `
    <div class="goods-item">
      <h3 class="goods-item__name">{{ good.product_name }}</h3>
      <p class="goods-item__price">{{ good.price }}</p>
      <button class="btn goods-item__button" type="button" @click=addToCart(good)>Купить</button>
    </div>
  `
  }
}