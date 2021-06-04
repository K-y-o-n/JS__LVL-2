class GoodsItem {
  // характеристики товара
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  // вывод html-разметки
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p><button class="goods-item__button" type="button">Добавить</button></div>`;
  }
}

class GoodsList {
  // список товаров
  constructor() {
    this.goods = [];
  }

  // метод для заполнения списка товаров
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }

  // вывод списка товаров
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  // метод, определяющий суммарную стоимость всех товаров в магазине
  totalPrice() {
    // Чтобы суммировать значения, содержащиеся в массиве объектов, надо указать initialValue (в конце функции), чтобы каждый элемент смог пройти через callback.
    let sum = this.goods.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    console.log(sum);
  }

  //по идее тут еще нужен метод для добавления товара в корзину
}

class BasketItem {
  // не уверен нужен ли тут конструктор или можно уже созданный в GoodsItem товар просто добавлять в BasketList ?
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  // вывод html-разметки
  render() {
    return `<div class="basket-item"><h3>${this.title}</h3><p>${this.price}</p><button class="basket-item__button" type="button">Удалить</button></div>`;
  }
}

class BasketList {
  constructor() {
    this.goods = [];
  }

  // вывод списка товаров
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const basketItem = new BasketItem(good.title, good.price);
      listHtml += basketItem.render();
    });
    document.querySelector('.basket-list').innerHTML = listHtml;
  }

  basketTotal() {
    // Чтобы суммировать значения, содержащиеся в массиве объектов, надо указать initialValue (в конце функции), чтобы каждый элемент смог пройти через callback.
    let goods = this.goods.length;
    let sum = this.goods.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    return `В корзине ${goods} товаров на сумму ${sum}`;
  }

  //по идее нужен метод для удаления товара из корзины
}

const list = new GoodsList();

const init = () => {
  list.fetchGoods();
  list.render();
  list.totalPrice();
}

window.onload = init;

