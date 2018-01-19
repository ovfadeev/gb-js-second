function Reviews() {
  Container.call(this, 'basket');

  this.countGoods = 0;
  this.amount = 0;

  this.classBasketItems = 'basket-items';
  this.classBasketData = 'basket-data';
  this.classBasketItemsList = 'items-list';
  this.classBasketItem = 'item';
  this.classDeleteBasketItem = 'remove-item';

  this.basketItems = [];
  this.collectBasketItems();
}

Reviews.prototype = Object.create(Container.prototype);
Reviews.prototype.constructor = Reviews;

Reviews.prototype.render = function (root) {
  var basketDiv = $('<div />', {
    id: this.id,
    text: 'Корзина:'
  });

  var basketItemsDiv = $('<div />', {
    class: this.classBasketItems
  });

  basketItemsDiv.appendTo(basketDiv);
  basketDiv.appendTo(root);
};

Reviews.prototype.update = function (item) {
  var update = false;
  for(i = 0; i < this.basketItems.length; i++){
    if (this.basketItems[i].id == item.id){
      this.basketItems[i].quantity += item.quantity;
      update = true;
      break;
    }
  }
  return update;
};

Reviews.prototype.add = function (idProduct, quantity, price, name) {
  var basketItem = {
    "name": name,
    "id": idProduct,
    "quantity": quantity,
    "price": price
  };

  if (this.update(basketItem) === false){
    this.basketItems.push(basketItem);
  }
  this.refresh();
};

Reviews.prototype.delete = function (idProduct) {
  for (var index in this.basketItems) {
    if (this.basketItems[index].id == idProduct){
      this.basketItems.splice(index, 1);
      break;
    }
  }

  this.refresh();
};

Reviews.prototype.refresh = function () {
  var basketDataDiv = $('<div />', {
    class: this.classBasketData
  });
  var basketItemsListDiv = $('<div />', {
    class: this.classBasketItemsList
  });
  var basketItemsDiv = $('.' + this.classBasketItems);

  var count = 0;
  var amount = 0;

  basketItemsDiv.empty();
  basketDataDiv.empty();
  basketItemsListDiv.empty();

  for (var index in this.basketItems) {
    var htmlItem = "";
    var itemDiv = $('<div />', {
      class: this.classBasketItem
    });
    htmlItem += '<p>' + this.basketItems[index].name + '</p>';
    htmlItem += '<p>' + this.basketItems[index].price + ' руб.</p>';
    htmlItem += '<p>Количество: ' + this.basketItems[index].quantity + '</p>';
    htmlItem += '<a href="#" data-id-product="' + this.basketItems[index].id + '" class="' + this.classDeleteBasketItem + '">Удалить</a>';

    itemDiv.append(htmlItem);
    basketItemsListDiv.append(itemDiv);

    count += +this.basketItems[index].quantity;
    amount = +this.basketItems[index].price * +this.basketItems[index].quantity;
  }

  this.countGoods = count;
  this.amount = amount;

  basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
  basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');

  basketItemsDiv.append(basketItemsListDiv);
  basketItemsDiv.append(basketDataDiv);
};

Reviews.prototype.collectBasketItems = function () {
  var countGoods = 0;
  $.ajax({
    url: 'ajax/getbasket.json',
    dataType: 'json',
    success: function (data) {
      for (var index in data.basket) {
        this.basketItems.push(data.basket[index]);
      }
      this.refresh();
    },
    context: this
  });
};