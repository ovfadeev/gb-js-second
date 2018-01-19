function Reviews() {
  Container.call(this, 'reviews');

  this.classReviewsItems = 'reviews-list';
  this.classReviewsItemsList = 'items-list';
  this.classReviewsItem = 'item';
  this.classDeleteReviewIstem = 'remove-item';

  this.classModerationItems = 'reviews-moderation-list';
  this.classModerationItemsGood = 'reviews-moderation-good';

  this.reviewsItems = {
    'reviews': [],
    'moderation': []
  };
  this.collectReviewsItems();
}

Reviews.prototype = Object.create(Container.prototype);
Reviews.prototype.constructor = Reviews;

Reviews.prototype.render = function (root) {
  var reviewsDiv = $('<div />', {
        class: this.classReviewsItems,
      });
  var reviewsModerationDiv = $('<div />', {
        class: this.classModerationItems,
        text: 'На модерации:'
      });
  console.log(reviewsDiv);
  console.log(reviewsModerationDiv);
  reviewsDiv.appendTo(root);
  reviewsModerationDiv.appendTo(root);
};

Reviews.prototype.add = function (name, message) {
  var reviewItem = {
    "name": name,
    "message": message,
    "moderated": false
  };
  this.reviewsItems.moderation.push(reviewItem);
  this.refresh();
};

Reviews.prototype.delete = function (idReview) {

};

Reviews.prototype.htmlReviewsItems = function (items) {
  for (var index in items) {
      var htmlItem = "";
      var itemDiv = $('<div />', {
        class: this.classReviewsItem
      });

      htmlItem += this.htmlItem(items[index]);

      itemDiv.append(htmlItem);
  }
  return itemDiv;
};

Reviews.prototype.refresh = function () {
  var reviewsItemsDiv = $('.' + this.classReviewsItems);
  var moderationItemsDiv = $('.' + this.classModerationItems);

  reviewsItemsDiv.empty();
  reviewsItemsDiv.append(this.htmlReviewsItems(this.reviewsItems.reviews));
  moderationItemsDiv.append(this.htmlReviewsItems(this.reviewsItems.moderation));
};

Reviews.prototype.htmlItem = function (item) {
  var html = "";
  html += '<p>' + item.name + '</p>';
  html += '<p>Сообщение: ' + item.message + '</p>';
  html += '<a href="#" data-id-reviews="' + item.id + '" class="' + this.classDeleteReviewIstem + '">Удалить</a>';
  if (item.moderated === false){
    html += '<a href="#" data-id-reviews="' + item.id + '" class="' + this.classDeleteReviewIstem + '">Одобрить</a>';
  }
  return html;
}

Reviews.prototype.collectReviewsItems = function () {
  $.ajax({
    url: 'ajax/getreviews.json',
    dataType: 'json',
    success: function (data) {
      for (var index in data.reviews) {
        if (data.reviews[index].name != "" || data.reviews[index].message != ""){
          if (data.reviews[index].moderated){
            this.reviewsItems.reviews.push(data.reviews[index]);
          } else {
            this.reviewsItems.moderation.push(data.reviews[index]);
          }
        }
      }

      this.refresh();
    },
    context: this
  });
};