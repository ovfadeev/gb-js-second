<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW5-2 - Oleg Fadeev</title>
    <link rel="stylesheet" href="css/main.css?<?=time()?>" />

    <script src="js/vendors/jquery-3.2.1.min.js"></script>
    <script src="js/Container.js?<?=time()?>"></script>
    <script src="js/Basket.js?<?=time()?>"></script>
    <script src="js/Reviews.js?<?=time()?>"></script>
    <script src="js/main.js?<?=time()?>"></script>
</head>
<body>
  <div class="wrapper">
    <form class="form-review" action="">
      <input type="hidden" name="user" value="123456"/>
      <div class="form-input">
        <input type="text" name="name" value="" placeholder="Введите имя" />
      </div>
      <div class="form-input">
        <textarea name="message" placeholder="Сообщение"></textarea>
      </div>
      <div class="form-submit">
        <input type="submit" name="submit" value="Send" class="js-form-submit" />
      </div>
    </form>
    <div id="reviews"></div>
  </div>
</body>
</html>