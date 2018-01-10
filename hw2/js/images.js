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

// Описываем класс ajax запроса
function getJson(linkAjax) {
  Container.call(this);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', linkAjax, false);
  xhr.send();

  if (xhr.status !== 200) {
    alert('Error' + ' ' + xhr.status + ' ' + xhr.statusText);
  } else {
    this.ajaxResult = xhr.responseText;
  }
};

getJson.prototype.constructor = getJson;

getJson.prototype.render = function(){
  var res = JSON.parse(this.ajaxResult);
  if (res.result !== false){
    return res.menu;
  }
  return false;
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
  this.link = objItem.link;
  this.text = objItem.text;
  this.child = objItem.child;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
  return this.bildItem(this.link, this.text, this.child);
};

MenuItem.prototype.bildItem = function(link, text, child){
  var item = '';

  item += '<li>';
  item += this.bildLink(link, text);

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
    subItem += this.bildItem(arChild[i].link, arChild[i].text, arChild[i].child);
  }

  subItem += '</ul>';

  return subItem;
}

MenuItem.prototype.bildLink = function(link, text){
  return '<a href="' + link + '">' + text + '</a>';
}

function removeMenu(e){
  e.preventDefault();

  var menu = new Menu();

  menu.remove(idMenuList);
}

function addMenu(e) {
  e.preventDefault();

  var menuJson = new getJson(linkAjaxMenu);
  arMenuItems = menuJson.render();

  console.log(arMenuItems);

  if (arMenuItems !== false){
    var menu = new Menu(idMenuList, classMenuList, arMenuItems);

    renderMenu = menu.render();

    document.getElementById(idMenuContainer).innerHTML = renderMenu;
  } else {
    alert('Error menu items');
  }
}

/* --- variables --- */
var arMenuItems;
var linkAjaxMenu = "./ajax/menu.json";
var idMenuContainer = 'menu';
var idMenuList = 'menu-list';
var classMenuList = 'menu-list';

window.onload = function () {

  document.getElementById('menu-remove').addEventListener('click', removeMenu);
  document.getElementById('menu-add').addEventListener('click', addMenu);

};