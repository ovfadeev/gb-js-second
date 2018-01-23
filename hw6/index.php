<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW6 - Oleg Fadeev</title>
    <link rel="stylesheet" href="css/vendors/jquery-ui/jquery-ui.css" />
    <link rel="stylesheet" href="css/vendors/jquery-ui/jquery-ui.structure.css" />
    <link rel="stylesheet" href="css/vendors/jquery-ui/jquery-ui.structure.css" />
    <link rel="stylesheet" href="css/main.css?<?=time()?>" />

    <script src="js/vendors/jquery-3.2.1.min.js"></script>
    <script src="js/vendors/jquery-ui.min.js"></script>
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
      <div class="good-item">
        <p class="name">Товар с ID 345</p>
        <p>Цена: 100 руб.</p>
        <input type="number" value="1" min="1" max="10" class="quantity">
        <button class="buyme" data-id-product="345" data-price="100">Добавить</button>
      </div>
      <div class="good-item">
        <p class="name">Товар с ID 456</p>
        <p>Цена: 250 руб.</p>
        <input type="number" value="1" min="1" max="10" class="quantity">
        <button class="buyme" data-id-product="456" data-price="250">Добавить</button>
      </div>
      <div class="good-item">
        <p class="name">Товар с ID 567</p>
        <p>Цена: 350 руб.</p>
        <input type="number" value="1" min="1" max="10" class="quantity">
        <button class="buyme" data-id-product="567" data-price="350">Добавить</button>
      </div>
      <div class="good-item">
        <p class="name">Товар с ID 678</p>
        <p>Цена: 210 руб.</p>
        <input type="number" value="1" min="1" max="10" class="quantity">
        <button class="buyme" data-id-product="678" data-price="210">Добавить</button>
      </div>
      <div class="good-item">
        <p class="name">Товар с ID 789</p>
        <p>Цена: 220 руб.</p>
        <input type="number" value="1" min="1" max="10" class="quantity">
        <button class="buyme" data-id-product="789" data-price="220">Добавить</button>
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
        <input type="text" name="phone" value="" placeholder="+7(123)000-0000" data-validate="phone" />
      </div>
      <div class="form-input">
        <input type="text" name="date" value="" placeholder="Дата рождения" data-validate="date" />
      </div>
      <div class="form-input">
        <textarea name="message" placeholder="Сообщение" data-validate="text"></textarea>
      </div>
      <div class="form-submit">
        <input type="submit" name="submit" value="Send" class="js-form-submit" />
      </div>
    </form>
    <div class="form-errors"></div>
  </div>
</body>
</html>