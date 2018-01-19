var moduleApp = {
  'checkBasket':function(){
    var basket = new Basket();
    basket.render('.basket-list');

    $('.buyme').on('click', function () {
        var idPruduct = parseInt($(this).attr('data-id-product'));
        var name = $(this).parent().find('.name').html();
        var quantity = parseInt($(this).parent().find('.quantity').val());
        var price = parseInt($(this).attr('data-price'));

        basket.add(idPruduct, quantity, price, name);
    });

    $('.basket-list').on('click', '.remove-item', function (e) {
        e.preventDefault();
        var idPruduct = parseInt($(this).attr('data-id-product'));

        basket.delete(idPruduct);
    });
  },
  'checkReviews':function(){
    var reviews = new Reviews();
    reviews.render('#reviews');
  }
}

$(document).ready(function(){
  moduleApp.checkBasket();
  moduleApp.checkReviews();
});