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

Reviews.prototype.add = function (name, content) {
  var basketItem = {
    "name": name,
    "content": content
  };
};

Reviews.prototype.delete = function (idReview) {

};

Reviews.prototype.collectreviewsItems = function () {
  var countGoods = 0;
  $.ajax({
    url: 'ajax/getreviews.json',
    dataType: 'json',
    success: function (data) {
      for (var index in data.basket) {
        this.reviewsItems.push(data.basket[index]);
      }
    },
    context: this
  });
};