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
    var itemMenu = new MenuParentItem(this.items[i].href, this.items[i].name, this.items[i].child);
    result += itemMenu.render();
  }

  result += '</ul>';
  return result;
};

// описываем класс родительских пунктов меню
function MenuParentItem(my_href, my_name, my_child){
  Container.call(this);
  this.href = my_href;
  this.name = my_name;
  this.child = my_child;
}

MenuParentItem.prototype = Object.create(Container.prototype);
MenuParentItem.prototype.constructor = MenuParentItem;

MenuParentItem.prototype.render = function () {
  var item = '';
  var itemParentMenu = new MenuItem(this.href, this.name);

  item += '<li>';
  item += itemParentMenu.render();
  if (Array.isArray(this.child)) {
    item += '<ul>';
    for (var i = 0; i < this.child.length; i++) {
      var itemMenu = new MenuParentItem(this.child[i].href, this.child[i].name, this.child[i].child);
      item += itemMenu.render();
    }
    item += '</ul>';
  }
  item += '</li>'
  return item;
};

// Описываем класс пунктов меню
function MenuItem(my_href, my_name) {
  Container.call(this);
  this.href = my_href;
  this.name = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
  return '<a href="' + this.href + '">' + this.name + '</a>';
};

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

  console.log(menu);

  document.getElementById('menu').innerHTML = menu.render();

};