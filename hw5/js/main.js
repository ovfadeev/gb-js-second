var moduleApp = {
  'addBasket':function(){
    var basket = new Basket();

    basket.render('.basket-list');
    // console.log(basket);

    $('.buyme').on('click', function () {
        var idPruduct = parseInt($(this).attr('data-id-product'));
        var name = $(this).parent().find('.name').html();
        var quantity = parseInt($(this).parent().find('.quantity').val());
        var price = parseInt($(this).attr('data-price'));

        basket.add(idPruduct, quantity, price, name);
    });
  }
}

$(document).ready(function(){
  moduleApp.addBasket();
});