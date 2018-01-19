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
    <form id="form-review" action="">
      <div class="form-input">
        <input type="text" name="name" value="" placeholder="Введите имя" data-validate="text" />
      </div>
      <div class="form-input">
        <textarea name="text" placeholder="Сообщение" data-validate="text"></textarea>
      </div>
      <div class="form-submit">
        <input type="submit" name="submit" value="Send" class="js-form-submit" />
      </div>
    </form>
    <div id="reviews"></div>
  </div>
</body>
</html>