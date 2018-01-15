<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HW4 - Oleg Fadeev</title>
    <link rel="stylesheet" href="css/main.css?<?=time()?>" />

    <script src="js/vendors/jquery-3.2.1.min.js"></script>
    <script src="js/main.js?<?=time()?>"></script>
</head>
<body>
  <div class="wrapper">
    <div class="tabs-list">
      <ul>
        <li>
          <a class="tabs-list-title" href="#tabs1">Tabs 1</a>
        </li>
        <li>
          <a class="tabs-list-title" href="#tabs2">Tabs 2</a>
        </li>
        <li>
          <a class="tabs-list-title" href="#tabs3">Tabs 3</a>
        </li>
      </ul>
      <div id="tabs1" class="tabs-list-desc">
        tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1 tabs 1
      </div>
      <div id="tabs2" class="tabs-list-desc">
        tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2 tabs 2
      </div>
      <div id="tabs3" class="tabs-list-desc">
        tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3 tabs 3
      </div>
    </div>
    <form id="form-feedback" action="">
      <div class="form-input">
        <input type="text" name="name" value="" placeholder="Введите имя" data-validate="text" />
      </div>
      <div class="form-input">
        <input type="email" name="email" value="" placeholder="Введите email" data-validate="email" />
      </div>
      <div class="form-input">
        <input type="tel" name="phone" value="" placeholder="Введите телефон +7(000)000-0000" data-validate="phone" />
      </div>
      <div class="form-input">
        <input type="text" name="city" value="" placeholder="Введите город" data-validate="text" />
        <div class="load"></div>
      </div>
      <div class="form-input">
        <textarea name="text" placeholder="Сообщение" data-validate="text"></textarea>
      </div>
      <div class="form-submit">
        <input type="submit" name="submit" value="Send" class="js-form-submit" />
      </div>
    </form>
  </div>
</body>
</html>