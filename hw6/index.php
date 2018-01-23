<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW5-1 - Oleg Fadeev</title>
    <link rel="stylesheet" href="css/main.css?<?=time()?>" />

    <script src="js/vendors/jquery-3.2.1.min.js"></script>
    <script src="js/Container.js?<?=time()?>"></script>
    <script src="js/Basket.js?<?=time()?>"></script>
    <script src="js/main.js?<?=time()?>"></script>
</head>
<body>
  <div class="wrapper">
    <div class="basket-list"></div>
    <div class="goods-list">
      <h2>Товары:</h2>
      <div class="good-item">
        <p class="name">Товар с ID 123</p>
        <p>Цена: 300 руб.</p>
        <input type="number" value="1" min="1" max="10" class="quantity">
        <button class="buyme" data-id-product="123" data-price="300">Добавить</button>
      </div>
      <div class="good-item">
        <p class="name">Товар с ID 234</p>
        <p>Цена: 200 руб.</p>
        <input type="number" value="1" min="1" max="10" class="quantity">
        <button class="buyme" data-id-product="234" data-price="200">Добавить</button>
      </div>
    </div>
    <form class="form-review" action="">
      <div class="form-input">
        <input type="text" name="name" value="" placeholder="Введите имя" data-validate="text" />
      </div>
      <div class="form-input">
        <input type="email" name="email" value="" placeholder="Введите email" data-validate="email" />
      </div>
      <div class="form-input">
        <input type="text" name="phone" value="" placeholder="Введите телефон" data-validate="phone" />
      </div>
      <div class="form-input">
        <textarea name="message" placeholder="Сообщение" data-validate="text"></textarea>
      </div>
      <div class="form-submit">
        <input type="submit" name="submit" value="Send" class="js-form-submit" />
      </div>
    </form>
  </div>
</body>
</html>