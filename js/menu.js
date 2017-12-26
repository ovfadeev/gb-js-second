// Описываем базовый класс
function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
}

Container.prototype.render = function () {
  return this.htmlCode;
};

// Описываем класс меню
function Menu(my_id, my_class, my_items) {
  Container.call(this);

  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function () {
  var result = '<ul class="' + this.className + '" id="' + this.id + '">';

  for (var i = 0; i < this.items.length; i++) {
    var item = new MenuItem(this.items[i].href, this.items[i].name, this.items[i].child);
    result += item.render();
  }

  result += '</ul>';
  return result;
}

Menu.prototype.remove = function(){
  var element = document.getElementById(this.id);

  element.remove();
}

// Описываем класс пунктов меню
function MenuItem(my_href, my_name, my_child){
  Container.call(this);
  this.href = my_href;
  this.name = my_name;
  this.child = my_child;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
  var res = '';
  var item = '';

  item = new MenuItem();

  res += '<li>';
  res += item.bildLink(this.href, this.name);

  if (Array.isArray(this.child)) {

    res += '<ul>';

    for (var i = 0; i < this.child.length; i++) {
      item = new MenuItem(this.child[i].href, this.child[i].name, this.child[i].child);
      res += item.render();

    }

    res += '</ul>';

  }

  res += '</li>'

  return res;
};

MenuItem.prototype.bildLink = function(my_href, my_name){
  return '<a href="' + my_href + '">' + my_name + '</a>';
}

var arMenuItems = [
  {
    href: '/',
    name: 'Главная',
    child: false,
  },
  {
    href: '/catalogue/',
    name: 'Каталог',
    child: [
      {
        href: '/catalogue/velosipedy/',
        name: 'Велосипеды',
        child: [
          {
            href: '/catalogue/velosipedy/detskie/',
            name: 'Для детей',
            child: [
              {
                href: '/catalogue/velosipedy/detskie/malchiki/',
                name: 'Для мальчиков',
                child: false,
              },
              {
                href: '/catalogue/velosipedy/devochki/',
                name: 'Для девочек',
                child: false,
              },
            ],
          },
          {
            href: '/catalogue/velosipedy/vzroslie/',
            name: 'Для взрослых',
            child: false,
          },
        ],
      },
      {
        href: '/catalogue/samokaty/',
        name: 'Самокаты',
        child: [
          {
            href: '/catalogue/samokaty/malchiki/',
            name: 'Для мальчиков',
            child: false,
          },
          {
            href: '/catalogue/samokaty/devochki/',
            name: 'Для девочек',
            child: false,
          },
        ],
      },
      {
        href: '/catalogue/zapchasti/',
        name: 'Запчасти',
        child: false
      }
    ],
  },
  {
    href: '/contacts/',
    name: 'Контакты',
    child: false,
  }
];

window.onload = function () {

  var menu = new Menu('my_menu', 'my_class', arMenuItems);

  document.getElementById('menu').innerHTML = menu.render();

};