class GoodsItem {
  // характеристики товара
  constructor(title, price) {
    this.product_name = title;
    this.price = price;
  }

  // вывод html-разметки
  render() {
    return `<div class="goods-item"><h3 class="goods-item__name">${this.product_name}</h3><p class="goods-item__price">${this.price}</p><button class="goods-item__button" type="button">Добавить</button></div>`;
  }
}


const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
  // список товаров
  constructor() {
    this.goods = [];
    this.filteredGoods = [];
  }


  // метод для заполнения списка товаров
  fetchGoods() {
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
    ]

    let goods = sendData(`${API_URL}/catalogData.json`, null);
    goods.then(object => {
      this.goods = object.concat(moreGoods);
      this.filteredGoods = object.concat(moreGoods);
      this.render();
      this.totalPrice();
    });

    // makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
    //   this.goods = JSON.parse(goods).concat(moreGoods);
    //   cb();    // было fetchGoods(cb) и вызывался метод render
    // })
  }


  // вывод списка товаров
  render() {
    let listHtml = '';
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
    addGoodsItemBtnListener();
  }

  // изменение списка товаров в зависимости от поиска 
  filterGoods(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    this.render();
  }



  // метод, определяющий суммарную стоимость всех товаров в магазине
  totalPrice() {
    // Чтобы суммировать значения, содержащиеся в массиве объектов, надо указать initialValue (в конце функции), чтобы каждый элемент смог пройти через callback.
    let sum = this.goods.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    console.log(`Сумма всех товаров в магазине: ${sum} рублей`);
  }

}

class BasketItem {
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
      const item = new BasketItem(good.title, good.price);
      listHtml += item.render();
    });
    document.querySelector('.basket-list').innerHTML = listHtml;
    console.log(basketList.basketTotal());
  }

  // добавление товара в корзину
  addToBasket(name, price) {
    let basketItem = new BasketItem(name, price);
    this.goods.push(basketItem);
  }

  // количество и стоимость товаров в корзине
  basketTotal() {
    // Чтобы суммировать значения, содержащиеся в массиве объектов, надо указать initialValue (в конце функции), чтобы каждый элемент смог пройти через callback.
    let goods = this.goods.length;
    let sum = this.goods.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);

    let totalDiv = document.querySelector(".basket-list__total");
    totalDiv.innerText = `В корзине ${goods} товаров на сумму ${sum} рублей`;
  }


  //метод для удаления товара из корзины
  removeFromBasket() {

  }
}

// function makeGETRequest(url,callback) {
//   var xhr;

//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest();
//   } else if (window.ActiveXObject) {
//     xhr = new ActiveXObject("Microsoft.XMLHTTP");
//   }

//   // xhr.onreadystatechange = function () {
//   //   if (xhr.readyState === 4) {
//   //     callback(xhr.responseText);
//   //   }
//   // }

//   xhr.onreadystatechange = () => {
//     return new Promise((resolve, reject) => {
//       if (xhr.readyState === 4) {
//         resolve(xhr.responseText);
//       } else reject("error");
//     });
//   }

//   xhr.open('GET', url, true);
//   xhr.send();
// }


// асинхронная функция отправки данных
async function sendData(url, data) {
  // let option = {
  //   method: "post", 
  //   body: data 
  // }; // GET запрос поэтому option не нужен
  let responce = await fetch(url);
  let result = await responce.json();
  return result;
}

// слушатель дя кнопки поиска
function addSearchBtnListener() {
  let searchInput = document.querySelector(".goods-search");
  let searchButton = document.querySelector(".search-button");
  searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
  });
}

// слушатель для кнопки "Корзина"
function addBasketBtnListener() {
  let btn = document.querySelector(".cart-button");
  let basketDiv = document.querySelector(".basket");
  btn.addEventListener("click", () => {
    basketDiv.classList.toggle("visible");
  });
}

// добавление слашателя кнопкам "Добавить"
function addGoodsItemBtnListener() {
  let shopDiv = document.querySelectorAll(".goods-item");
  shopDiv.forEach(elem => elem.addEventListener("click", function (e) {
    if (e.target.className == "goods-item__button") {
      let name = this.querySelector(".goods-item__name").innerHTML;
      let price = +(this.querySelector(".goods-item__price").innerHTML);

      basketList.addToBasket(name, price);
      basketList.render();
    }
  }));
}


const list = new GoodsList();
const basketList = new BasketList();

const init = () => {
  list.fetchGoods();
  addBasketBtnListener();
  addSearchBtnListener()
}

window.onload = init;