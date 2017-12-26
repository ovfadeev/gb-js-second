// Описываем базовый класс
function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
}

Container.prototype.render = function () {
  return this.htmlCode;
};

Container.prototype.remove = function(id){
  var element = document.getElementById(id);

  element.remove();
}

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
    var item = new MenuItem(this.items[i]);
    result += item.render();
  }

  result += '</ul>';
  return result;
}

// Описываем класс пунктов меню
function MenuItem(objItem){
  Container.call(this);
  this.href = objItem.href;
  this.name = objItem.name;
  this.child = objItem.child;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
  return this.bildItem(this.href, this.name, this.child);
};

MenuItem.prototype.bildItem = function(href, name, child){
  var item = '';

  item += '<li>';
  item += this.bildLink(href, name);

  if (Array.isArray(child)) {
    item += this.bildSubItem(child);
  }

  item += '</li>';
  return item;
}

MenuItem.prototype.bildSubItem = function(arChild){
  var subItem = '';

  subItem += '<ul>';

  for (var i = 0; i < arChild.length; i++) {
    subItem += this.bildItem(arChild[i].href, arChild[i].name, arChild[i].child);
  }

  subItem += '</ul>';

  return subItem;
}

MenuItem.prototype.bildLink = function(href, name){
  return '<a href="' + href + '">' + name + '</a>';
}

function removeMenu(e){
  e.preventDefault();
  var menu = new Menu();
  menu.remove(idMenuList);
}

function addMenu(e) {
  e.preventDefault();

  var menu = new Menu(idMenuList, classMenuList, arMenuItems);

  renderMenu = menu.render();

  document.getElementById(idMenuContainer).innerHTML = renderMenu;
}

/* --- variables --- */
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
var idMenuContainer = 'menu';
var idMenuList = 'menu-list';
var classMenuList = 'menu-list';

window.onload = function () {

  document.getElementById('menu-remove').addEventListener('click', removeMenu);
  document.getElementById('menu-add').addEventListener('click', addMenu);

};