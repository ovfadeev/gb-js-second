<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW6 - Oleg Fadeev</title>
    <link rel="stylesheet" href="css/vendors/jquery-ui/jquery-ui.css" />
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
    <form class="form-review" action="">
      <div class="form-input">
        <input type="text" name="name" value="" placeholder="Введите имя" data-validate="text" />
      </div>
      <div class="form-input">
        <input type="email" name="email" value="" placeholder="Введите email" data-validate="email" />
      </div>
      <div class="form-input">
        <input type="text" name="phone" value="" placeholder="Введите телефон +7(123)000-0000" data-validate="phone" />
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