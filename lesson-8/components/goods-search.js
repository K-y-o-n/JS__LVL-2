export default {
  props: ['search', `filter`],
  template: `
      <form action="#" class="search">
        <input type="text" class="goods-search" v-model="search"/>
        <button class="search-button" type="button" @click="filter(search)"></button>
      </form>
    `
};