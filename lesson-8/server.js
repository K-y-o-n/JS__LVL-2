const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
// app.use(bodyParser.json()); // Указываем, что содержимое - JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/catalogData', (req, res) => {
  fs.readFile('catalog.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.get('/cartData', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;

      cart.push(item);

      //Поскольку браузер будет ждать ответа от сервера, чтобы завершить запрос, будем посылать объект с полем result. В этом поле будем записывать 1, если всё прошло без ошибок, и 0, если были ошибки и записать не удалось:
      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          // res.send('{"result": 1}');
          fs.readFile('cart.json', 'utf8', (err, data) => {
            if (err) {
              res.send('{"result": 00}');
            } else {
              res.send(data);
            }
          })
        }
      });
    }
  });
});

app.post('/removeFromCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": error}');
    } else {
      let cart = JSON.parse(data);
      let item = req.body;
      let index = cart.findIndex(el => el.product_id == item.product_id);
      cart = [...cart.slice(0, index), ...cart.slice(index + 1)]


      fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": error}');
        } else {
          fs.readFile('cart.json', 'utf8', (err, data) => {
            if (err) {
              res.send('{"result": 00}');
            } else {
              res.send(data);
            }
          })
        }
      })
    }
  })
})


app.listen(3000, function () {
  console.log('server is running on port 3000!');
});