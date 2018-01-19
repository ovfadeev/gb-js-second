<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW4 - Oleg Fadeev</title>
    <link rel="stylesheet" href="css/main.css?<?=time()?>" />

    <script src="js/vendors/jquery-3.2.1.min.js"></script>
    <script src="js/Container.js?<?=time()?>"></script>
    <script src="js/basket.js?<?=time()?>"></script>
    <script src="js/reviews.js?<?=time()?>"></script>
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