function Basket() {
    Container.call(this, 'basket');

    this.countGoods = 0;
    this.amount = 0;

    this.basketItems = [];
    this.collectBasketItems(); // Загружаем товары, которые уже добавлены (json файл)
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

//
// TODO посмотреть метод render!
//

Basket.prototype.render = function (root) { // Генерация базовой разметки
    var basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина'
    });

    var basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    basketItemsDiv.appendTo(basketDiv);
    basketDiv.appendTo(root);
};

Basket.prototype.add = function (idProduct, quantity, price) {
    // console.log(product, quantity, price);
    var basketItems = {
      "id_product": idProduct,
      "quantity": quantity,
      "price": price
    };


    this.countGoods += +quantity;
    this.amount += +price * +quantity;

    this.basketItems.push(basketItems);
    this.refresh();
};

Basket.prototype.delete = function (idProduct) {
    
    this.refresh();
};

Basket.prototype.refresh = function () {
  var basketData = $('<div />', {
          id: 'basket_data'
      });

  basketData.empty();
  basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
  basketData.append('<p>Сумма: ' + this.amount + '</p>');

  console.log(this.basketItems);
};

Basket.prototype.collectBasketItems = function () {
  var countGoods = 0;

  $.get({
      url: 'ajax/getbasket.json',
      dataType: 'json',
      success: function (data) {
          for(i = 0; i < data.basket.length; i++){
            countGoods += parseInt(data.basket[i].quantity);
          }
          this.countGoods = countGoods;
          this.amount = data.amount;
          for (var index in data.basket) {
              this.basketItems.push(data.basket[index]);
          }
          this.refresh();
      },
      context: this
  });
};