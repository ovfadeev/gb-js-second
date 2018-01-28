var pageApp = {
  'init':function(){
    var curApp = $('#app').attr('data-app');
    if (pageApp[curApp]) { pageApp[curApp](); }
  },
  'page-index':function(){
    moduleApp.mainSLider();
  },
  'page-product':function(){
    moduleApp.filterProductsRange();
  },
  'page-product-detail':function(){
    moduleApp.productSLider();
    $('a.gallery-product').fancybox();
  },
  'page-checkout':function(){
    moduleApp.checkoutAccordion();
  },
  'page-cart':function(){
    
  }
}

var moduleApp = {
  'init':function(){
    this.searchDropdown();
    this.subscribeSlider();
    this.menuMobile();
    this.basketDropdown();
    this.checkBasket();
    this.validationForm();
  },
  'searchDropdown':function(){
    $('.search-dropdown-title a').on('click', function(e){
      e.preventDefault();
      var dropdown = $('.js-search-dropdown');
      if (dropdown.is(':hidden')){
        dropdown.removeClass('close');
      } else {
        dropdown.addClass('close');
      }
    });
  },
  'mainSLider':function(){
    var mSlider = $('.js-slider-main');
    mSlider.bxSlider(
      {
        auto: true,
        mode: 'fade',
        controls: false,
        pager: false,
      }
    );
  },
  'productSLider':function(){
    var mSlider = $('.js-slider-product');
    mSlider.bxSlider(
      {
        auto: false,
        mode: 'fade',
        controls: true,
        pager: false,
      }
    );
  },
  'subscribeSlider':function(){
    var mSlider = $('.js-subscribe-slider');
    mSlider.bxSlider(
      {
        auto: true,
        mode: 'fade',
        controls: false,
        pager: true,
      }
    );
  },
  'filterProductsRange':function(){
    var minRange = parseFloat($('.js-filter-slider-range').attr('data-min')),
      maxRange = parseFloat($('.js-filter-slider-range').attr('data-max'));
    $('.js-filter-slider-range').slider({
      range: true,
      min: minRange,
      max: maxRange,
      values: [minRange, maxRange],
      slide: function(event, ui) {
        $('.js-min-range').val(ui.values[0]);
        $('.js-max-range').val(ui.values[1]);
      }
    });
    $('.js-min-range').val($('.js-filter-slider-range').slider('values', 0));
    $('.js-max-range').val($('.js-filter-slider-range').slider('values', 1));
  },
  'checkoutAccordion':function(){
    $('.js-checkout-accordion').accordion({
      header: "div.step-title",
      content: "div.step-desc",
      heightStyle: "content"
    });
  },
  'basketDropdown':function(){
    $('.cart-dropdown').on('click', function(e){
      e.preventDefault();
      var dropdown = $('.js-cart-dropdown');
      if (dropdown.is(':hidden')){
        dropdown.removeClass('close');
      } else {
        dropdown.addClass('close');
      }
    });
  },
  'checkBasket':function(){
    var basket = new Basket();
    basket.render('.js-cart-dropdown');

    $('.js-basket-add').on('click', function (e) {
      e.preventDefault();
      var idPruduct = parseInt($(this).attr('data-id-product'));
      var name = $(this).attr('data-name');
      var quantity = parseInt($(this).attr('data-quantity'));
      var price = parseInt($(this).attr('data-price'));
      var image = $(this).attr('data-image');

      basket.add(idPruduct, quantity, price, name, image);
    });

    $('.js-basket-add-detail').on('click', function (e) {
      e.preventDefault();
      var arForm = $(this).closest('form').serializeArray();

      for (var index in arForm) {
        switch(arForm[index].name){
          case 'id':
            idPruduct = arForm[index].value;
            break;
          case 'quantity':
            quantity = arForm[index].value;
            break;
          case 'price':
            price = arForm[index].value;
            break;
          case 'name':
            name = arForm[index].value;
            break;
          case 'image':
            image = arForm[index].value;
            break;
        }
      }

      basket.add(idPruduct, quantity, price, name, image);
    });

    $('.js-cart-dropdown').on('click', '.remove-item a', function (e) {
      e.preventDefault();
      var idPruduct = parseInt($(this).attr('data-id-product'));

      basket.delete(idPruduct);
    });

    $('.page-cart').on('click', '.remove-cart', function (e) {
      e.preventDefault();
      var idPruduct = parseInt($(this).attr('data-id-product'));

      basket.delete(idPruduct);
      $(this).closest('.cart-items').remove();
    });

    $('.page-cart').on('click', 'input[name="remove-cart"]', function (e) {
      e.preventDefault();
      var cartItems = $('a.remove-cart');

      $.each(cartItems, function(key, item){
        var $cartItem = $(item).closest('.cart-items');
        var idPruduct = parseInt($(item).attr('data-id-product'));

        basket.delete(idPruduct);
        $cartItem.remove();
      });
    });
  },
  'menuMobile':function(){
    $('.js-menu-mobile').on('click', function(e){
      e.preventDefault();
      var menu = $('.js-nav');
      if (menu.is(':hidden')){
        menu.show();
      } else {
        menu.hide();
      }
    });
  },
  'validationForm':function($submitBtn,submitFunction){
    $submitBtn = $submitBtn || $('.js-form-submit');
    submitFunction = submitFunction || false;
    $submitBtn.closest('form').addClass('is-form-validation');
    $submitBtn.click(function(e){
      var $this = $(this);
      if ($this.hasClass('disabled')) { return false; }
      var $form  = $this.closest('form');
      var $forms = $form.find('[data-validate]');
      var result = formChecking($forms,true);
      if (result) {
        if (submitFunction) {
          $this.addClass('disabled');
          submitFunction();
        } else {
          return true;
        }
      } else {
        $forms.on('keyup keypress change', function() {
          var $current = $(this);
          setTimeout(function(){ formChecking($current); }, 50);
        });
      }
      e.preventDefault();
    });

    $(document).on('keydown',function(e){
      if(e.keyCode == 13) {
        var $thisFocus = $(document.activeElement);
        if ($thisFocus.is('textarea')) { return true; alert('123'); }
        if ($thisFocus.closest('.form-select').length) { return true; }
        if ($thisFocus.closest('.is-form-validation').length) { $submitBtn.trigger('click'); }
      }
    });

    function formChecking($inp,onFocus) {
      onFocus = onFocus || false;
      var noError = true;
      $inp.each(function(ind,elm){
        var $this = $(elm);
        var mask = $this.data('validate');
        var value = $this.val();
        var placeHolder = $this.attr('placeholder');
        if (mask == 'text') {
          if ((value.length < 1) || (value == placeHolder)) {
            noError = false;
            $this.closest('.input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.input').removeClass('show-error'); }
        }
        if (mask == 'textarea') {
          if ((value.length < 1) || (value == placeHolder)) {
            noError = false;
            $this.closest('.textarea').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.textarea').removeClass('show-error'); }
        }
        if (mask == 'email') {
          var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (!regex.test(value) || (value == placeHolder)) {
            noError = false;
            $this.closest('.input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.input').removeClass('show-error'); }
        }
        if (mask == 'phone') {
          var regex = /^\+7\(([0-9]{3})+\)([0-9]{3})+\-([0-9]{4})$/;
          if (!regex.test(value) || (value == placeHolder)) {
            noError = false;
            $this.closest('.input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.input').removeClass('show-error'); }
        }
      });
      return noError;
    }
  },
}

$(document).ready(function(){
  moduleApp.init();
  pageApp.init();
});