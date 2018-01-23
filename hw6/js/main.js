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
            $this.closest('.form-input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-input').removeClass('show-error'); }
        }
        if (mask == 'textarea') {
          if ((value.length < 1) || (value == placeHolder)) {
            noError = false;
            $this.closest('.form-textarea').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-textarea').removeClass('show-error'); }
        }
        if (mask == 'email') {
          var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (!regex.test(value) || (value == placeHolder)) {
            noError = false;
            $this.closest('.form-input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-input').removeClass('show-error'); }
        }
        if (mask == 'phone') {
          var regex = /^\+7\(([0-9]{3})+\)([0-9]{3})+\-([0-9]{4})$/;
          if (!regex.test(value) || (value == placeHolder)) {
            noError = false;
            $this.closest('.form-input').addClass('show-error');
            if (onFocus) { $this.focus(); onFocus = false; }
          } else { $this.closest('.form-input').removeClass('show-error'); }
        }
      });
      return noError;
    }
  },
}

$(document).ready(function(){
  moduleApp.checkBasket();
  moduleApp.checkReviews();
  moduleApp.validationForm();
});