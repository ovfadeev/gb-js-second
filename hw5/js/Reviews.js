function Reviews() {
  Container.call(this, 'reviews');

  this.classReviewsItems = 'reviews-items';
  this.classReviewsItemsList = 'items-list';
  this.classReviewsItem = 'item';
  this.classDeleteReviewIstem = 'remove-item';

  this.reviewsItems = [];
  this.collectReviewsItems();
}

Reviews.prototype = Object.create(Container.prototype);
Reviews.prototype.constructor = Reviews;

Reviews.prototype.render = function (root) {
  var reviewsDiv = $('<div />', {
    id: this.id,
    text: 'Отзывы:'
  });

  var reviewsItemsDiv = $('<div />', {
    class: this.classReviewsItems
  });

  reviewsItemsDiv.appendTo(reviewsDiv);
  reviewsDiv.appendTo(root);
};

Reviews.prototype.add = function (name, message) {
  var reviewItem = {
    "name": name,
    "message": message
  };
};

Reviews.prototype.delete = function (idReview) {

};

Reviews.prototype.refresh = function () {
  var reviewsItemsDiv = $('.' + this.classReviewsItems);

  reviewsItemsDiv.empty();

  for (var index in this.reviewsItems) {
      var htmlItem = "";
      var itemDiv = $('<div />', {
        class: this.classReviewsItem
      });

      htmlItem += this.htmlItem(this.reviewsItems[index]);

      itemDiv.append(htmlItem);
      reviewsItemsDiv.append(itemDiv);
  }
};

Basket.prototype.htmlItem = function (item) {
  var html = "";
  html += '<p>' + item.name + '</p>';
  html += '<p>Сообщение: ' + item.message + '</p>';
  html += '<a href="#" data-id-reviews="' + item.id + '" class="' + this.classDeleteReviewIstem + '">Удалить</a>';
  return html;
}

Reviews.prototype.collectReviewsItems = function () {
  $.ajax({
    url: 'ajax/getreviews.json',
    dataType: 'json',
    success: function (data) {
      for (var index in data.reviews) {
        this.reviewsItems.push(data.reviews[index]);
      }
    },
    context: this
  });
  this.refresh();
};