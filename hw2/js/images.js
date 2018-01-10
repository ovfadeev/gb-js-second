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
function GetJson(linkAjax) {
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

GetJson.prototype.constructor = GetJson;

GetJson.prototype.render = function(){
  var res = JSON.parse(this.ajaxResult);
  if (res.result !== false){
    return res.images;
  }
  return false;
}

// Описываем класс меню
function Gallery(my_id, my_class, my_items) {
  Container.call(this);

  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}

Gallery.prototype = Object.create(Container.prototype);
Gallery.prototype.constructor = Gallery;

Gallery.prototype.render = function () {
  var result = '<ul class="' + this.className + '" id="' + this.id + '">';

  for (var i = 0; i < this.items.length; i++) {
    var item = new ImageItem(this.items[i]);
    result += item.render();
  }

  result += '</ul>';
  return result;
}

// Описываем класс галереи
function ImageItem(objItem){
  Container.call(this);
  this.link = objItem.src;
  this.text = objItem.name;
  this.linkPreview = objItem.preview;
}

ImageItem.prototype = Object.create(Container.prototype);
ImageItem.prototype.constructor = ImageItem;

ImageItem.prototype.render = function () {
  return this.bildItem(this.link, this.linkPreview, this.text);
};

ImageItem.prototype.bildItem = function(link, linkPreview, text){
  var item = '';

  item += '<li>';
  item += '<a href="' + link + '" download="' + text + '"><img src="' + linkPreview + '"></a>';
  item += '</li>';
  return item;
}

/* --- variables --- */
var arImagesItems;
var linkAjaxImages = "./ajax/images.json";
var idGalleryContainer = 'gallery';
var idGalleryList = 'images-list';
var classGalleryList = 'images-list';

window.onload = function () {

  var imageJson = new GetJson(linkAjaxImages);
  arImagesItems = imageJson.render();

  console.log(arImagesItems);

  if (arImagesItems !== false){
    var gallery = new Gallery(idGalleryList, classGalleryList, arImagesItems);

    renderGallery = gallery.render();

    document.getElementById(idGalleryContainer).innerHTML = renderGallery;
  } else {
    alert('Error images items');
  }

};